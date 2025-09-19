from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ✅ Allow React frontend (port 3000) to access Flask backend (port 5000)

# --------------------------
# Load Trained Crop Model
# --------------------------
# Make sure you trained and saved it as "crop_model.pkl"
crop_model = pickle.load(open("crop_model.pkl", "rb"))

# --------------------------
# API Route for Prediction
# --------------------------
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        N, P, K = data['N'], data['P'], data['K']
        temp, humidity, ph, rainfall = (
            data['temperature'], data['humidity'], data['ph'], data['rainfall']
        )

        # Prepare input for model
        features = np.array([[N, P, K, temp, humidity, ph, rainfall]])
        crop = crop_model.predict(features)[0]

        return jsonify({"crop": crop})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# --------------------------
# Run the Backend
# --------------------------
if __name__ == '__main__':
    app.run(debug=True, port=5000)
