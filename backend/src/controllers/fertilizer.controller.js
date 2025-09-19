import FertilizerPlan from '../models/FertilizerPlan.js';
import { getFertilizerPlan } from '../services/gemini.js';

export async function fertilizerPlan(req, res) {
  try {
    const { crop, stage } = req.body;
    if (!crop || !stage) {
      return res.status(400).json({ error: "Crop and growth stage are required." });
    }

    // Call Gemini service to get the plan
    const plan = await getFertilizerPlan({ crop, stage });

    // Store in DB
    const doc = await FertilizerPlan.create({
      userId: req.user.id,
      crop,
      stage,
      plan
    });

    return res.status(201).json(plan);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
