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

@app.route("/upload", methods=["POST"])
def upload_files():
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

        return jsonify({
            "message": "Files uploaded, converted, and added to vector store successfully",
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
