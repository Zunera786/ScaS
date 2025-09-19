import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

# --------------------------
# Step 1: Load Dataset
# --------------------------
# Dataset: Crop_recommendation.csv (from Kaggle)
data = pd.read_csv("Crop_recommendation.csv")

# --------------------------
# Step 2: Prepare Features & Target
# --------------------------
X = data.drop('label', axis=1)   # N, P, K, temperature, humidity, ph, rainfall
y = data['label']                # Crop label

# --------------------------
# Step 3: Split Dataset
# --------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# --------------------------
# Step 4: Train Model
# --------------------------
crop_model = RandomForestClassifier(n_estimators=100, random_state=42)
crop_model.fit(X_train, y_train)

# Save the trained model (for backend use in Flask/FastAPI)
pickle.dump(crop_model, open("crop_model.pkl", "wb"))

# --------------------------
# Step 5: Prediction Function
# --------------------------
def recommend_crop(N, P, K, temp, humidity, ph, rainfall):
    features = np.array([[N, P, K, temp, humidity, ph, rainfall]])
    prediction = crop_model.predict(features)[0]
    return prediction

# --------------------------
# Step 6: Example Run
# --------------------------
result = recommend_crop(N=30, P=20, K=10, temp=28, humidity=65, ph=6.5, rainfall=200)
print("✅ Recommended Crop:", result)
