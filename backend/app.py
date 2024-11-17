from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
import pandas as pd
from vars import key
# Initialize Flask app and OpenAI client
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
client = OpenAI(api_key=key)  # Replace with your OpenAI API key
UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

assistant = None
vector_store = None

@app.route("/upload", methods=["POST"])
def upload_files():
    global assistant
    global vector_store
    if "files" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    files = request.files.getlist("files")
    saved_files = []

    # Save uploaded files locally
    for file in files:
        if not file.filename.endswith(".csv"):
            return jsonify({"error": f"Unsupported file type: {file.filename}"}), 400
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        saved_files.append(file_path)

    # Convert CSV to JSON
    json_files = []
    for csv_file in saved_files:
        json_file = csv_file.replace(".csv", ".json")
        try:
            df = pd.read_csv(csv_file)
            df.to_json(json_file, orient="records", indent=2)
            json_files.append(json_file)
        except Exception as e:
            return jsonify({"error": f"Error converting {csv_file} to JSON: {str(e)}"}), 500

    try:
        # Create a vector store
        vector_store = client.beta.vector_stores.create(name="Office Data")
        
        # Open JSON files for streaming
        file_streams = [open(path, "rb") for path in json_files]

        # Upload JSON files to OpenAI vector store
        file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
            vector_store_id=vector_store.id, files=file_streams
        )

        # Close file streams
        for stream in file_streams:
            stream.close()

        # Delete temporary files
        for path in saved_files + json_files:
            os.remove(path)

        # Create an assistant for the uploaded data
        assistant = client.beta.assistants.create(
            name="Sustainability Advisor",
            instructions="""
            This assistant is designed to provide sustainability advice for property managers looking to optimize their office spaces. It uses the data provided about carbon emissions, energy consumption, water usage, and waste management across various floors. Based on this data, the assistant can help identify areas for improvement and suggest actionable steps to reduce environmental impact.

            Sample queries include:
            - "How to reduce carbon footprint from my office space?"
            - "Which floors have the most electrical and water consumption?"
            - "Which floors could improve in waste management?"
            - "What steps can be taken to optimize energy usage in my office?"

            The assistant will analyze the data attributes from the provided files to give actionable advice on sustainability improvements in your office spaces.
            """,
            model="gpt-4o",
            tools=[{"type": "file_search"}],
            tool_resources={"file_search": {"vector_store_ids": [vector_store.id]}}
        )
        return jsonify({
            "message": "Files uploaded, converted, and added to vector store successfully",
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    global assistant
    global vector_store
    
    # Check if assistant and vector store are initialized
    if assistant is None or vector_store is None:
        return jsonify({"error": "Assistant or vector store not initialized. Please upload data first."}), 400

    # Get the user message from the request
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Create a thread for the conversation
        thread = client.beta.threads.create(assistant_id=assistant.id)

        # Add the user message to the thread
        client.beta.threads.messages.create(
            thread_id=thread.id,
            content={"role": "user", "text": user_message}
        )

        # Create and poll the run
        run = client.beta.threads.runs.create_and_poll(
            thread_id=thread.id, assistant_id=assistant.id
        )

        # Retrieve the messages from the thread
        messages = list(client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id))
        
        # Extract the response message
        response_message = messages[-1].content[0].text

        return jsonify({"response": response_message})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
