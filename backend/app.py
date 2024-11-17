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
        print(f"Created vector store with ID: {vector_store.id}")
        
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
            You are a voice assistant designed to provide quick, actionable sustainability advice for property managers. Using data on carbon emissions, energy consumption, water usage, and waste management, you deliver brief insights and suggestions to optimize office spaces. Focus on providing concise, impactful responses.

Sample queries include:

"How can I reduce my office's carbon footprint?"
"Which floors consume the most energy and water?"
"Where can waste management be improved?"
"How can I optimize energy usage in the office?"
Provide clear, actionable recommendations in a conversational tone.
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

from flask_cors import cross_origin

@app.route("/chat", methods=["POST"])
def chat():
    global assistant
    global vector_store
    print("In chat")
    print(assistant.id,vector_store.id)
    
    # Check if assistant and vector store are initialized
    if assistant is None or vector_store is None:
        return jsonify({"error": "Assistant or vector store not initialized. Please upload data first."}), 400

    # Get the user message from the request
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        thread = client.beta.threads.create(
            messages=[
            {
                "role": "user",
                "content": user_message,
            }
        ])

        # Create and poll the run
        run = client.beta.threads.runs.create_and_poll(
            thread_id=thread.id, assistant_id=assistant.id
        )

        # Retrieve the messages from the thread
        messages = list(client.beta.threads.messages.list(thread_id=thread.id, run_id=run.id))
        print(messages)
        # Extract the response message
        response_message = messages[-1].content[0].text
        print(response_message)
        return jsonify({"response": response_message.value})

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
