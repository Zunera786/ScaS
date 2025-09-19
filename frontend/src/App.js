import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          N: Number(formData.N),
          P: Number(formData.P),
          K: Number(formData.K),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
        }),
      });

      const data = await res.json();
      setResult(data.crop || "Error in prediction");
    } catch (err) {
      console.error("Error:", err);
      setResult("Error connecting to backend");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🌱 Smart Crop Advisor</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
        <input name="N" placeholder="Nitrogen" value={formData.N} onChange={handleChange} />
        <input name="P" placeholder="Phosphorus" value={formData.P} onChange={handleChange} />
        <input name="K" placeholder="Potassium" value={formData.K} onChange={handleChange} />
        <input name="temperature" placeholder="Temperature" value={formData.temperature} onChange={handleChange} />
        <input name="humidity" placeholder="Humidity" value={formData.humidity} onChange={handleChange} />
        <input name="ph" placeholder="pH" value={formData.ph} onChange={handleChange} />
        <input name="rainfall" placeholder="Rainfall" value={formData.rainfall} onChange={handleChange} />

        <button type="submit" className="bg-green-500 text-white p-2 mt-2 rounded">
          Predict Crop
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">✅ Recommended Crop: {result}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
