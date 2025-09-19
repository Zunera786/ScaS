import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import VoiceInput from "@/components/VoiceInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Beaker, Calendar, CheckCircle, Clock, Sprout, Bell } from "lucide-react";
import fertilizerImage from "@/assets/fertilizer-plans.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const FertilizerPlans = () => {
  const { t } = useLanguage();
  const language = document.documentElement.lang || "en";
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedStage, setSelectedStage] = useState("");
  const [plan, setPlan] = useState<any>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  // Sort crops and growthStages in ascending order
  const crops = [
  // Cereals
  "Wheat", "Rice", "Corn", "Barley", "Oats", "Millet", "Sorghum",

  // Pulses / Legumes
  "Chickpea", "Pigeon Pea", "Lentil", "Green Gram", "Black Gram", "Kidney Bean",

  // Oilseeds
  "Soybean", "Groundnut", "Sunflower", "Mustard", "Sesame", "Castor",

  // Vegetables
  "Tomato", "Potato", "Onion", "Garlic", "Carrot", "Cabbage", "Cauliflower", 
  "Brinjal", "Okra", "Cucumber", "Pumpkin", "Peas", "Chili", "Spinach",

  // Fruits
  "Banana", "Mango", "Apple", "Grapes", "Papaya", "Pineapple", "Guava", 
  "Watermelon", "Muskmelon", "Orange", "Lemon", "Pomegranate", "Strawberry",

  // Cash Crops
  "Cotton", "Sugarcane", "Tobacco", "Tea", "Coffee", "Jute", "Rubber",

  // Spices & Others
  "Turmeric", "Ginger", "Cardamom", "Black Pepper", "Coriander", "Cumin",
  "Fennel", "Fenugreek", "Clove"
].sort((a, b) => a.localeCompare(b));

  const growthStages = [
    "Seed Germination", "Vegetative Growth", "Flowering", "Fruit Development", "Maturity"
  ].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const generatePlan = async () => {
    if (selectedCrop && selectedStage) {
      try {
        const response = await fetch(
          "http://localhost:4000/fertilizer/plan",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              crop: selectedCrop,
              stage: selectedStage
            })
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPlan(data);
        } else {
          setPlan(null);
        }
      } catch {
        setPlan(null);
      }
    }
  };

  const toggleTaskCompletion = (index: number) => {
    setCompletedTasks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div
      className="min-h-screen bg-background"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">{t("fertilizer.title") || "Fertilizer Plans"}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("fertilizer.subtitle") ||
              "Get personalized fertilizer schedules based on your crop type and growth stage with AI-powered nutrient management recommendations."}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plan Generator */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Beaker className="h-5 w-5 text-earth" />
                {t("fertilizer.generatePlan") || "Generate Fertilizer Plan"}
              </CardTitle>
              <CardDescription>
                {t("fertilizer.generatePlanDesc") ||
                  "Select your crop and current growth stage to get customized recommendations"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t("fertilizer.selectCrop") || "Select Crop"}</label>
                  <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("fertilizer.chooseCrop") || "Choose your crop"} />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop} value={crop}>
                          {t(`crops.${crop}`) || crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">{t("fertilizer.growthStage") || "Growth Stage"}</label>
                  <Select value={selectedStage} onValueChange={setSelectedStage}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("fertilizer.currentStage") || "Current growth stage"} />
                    </SelectTrigger>
                    <SelectContent>
                      {growthStages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {t(`growthStages.${stage}`) || stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generatePlan}
                  className="w-full"
                  variant="earth"
                  disabled={!selectedCrop || !selectedStage}
                >
                  <Sprout className="h-4 w-4" />
                  {t("fertilizer.generatePlanBtn") || "Generate Plan"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Plan Details */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-success" />
                {t("fertilizer.schedule") || "Fertilizer Schedule"}
              </CardTitle>
              <CardDescription>
                {t("fertilizer.scheduleDesc") || "Your personalized fertilizer application timeline"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {plan ? (
                <div className="space-y-6">
                  {/* Plan Overview */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-earth/10 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{t("fertilizer.crop") || "Crop"}</p>
                      <p className="text-lg">{t(`crops.${plan.crop}`) || plan.crop}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("fertilizer.stage") || "Stage"}</p>
                      <p className="text-lg">{t(`growthStages.${plan.stage}`) || plan.stage}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("fertilizer.duration") || "Duration"}</p>
                      <p className="text-lg">{plan.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t("fertilizer.expectedYield") || "Expected Yield"}</p>
                      <p className="text-lg text-success">{plan.expectedYield}</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div>
                    <h4 className="font-semibold mb-4">{t("fertilizer.applicationSchedule") || "Application Schedule"}</h4>
                    <div className="space-y-3">
                      {plan.schedule.map((item: any, index: number) => (
                        <div
                          key={index}
                          className={`p-4 border rounded-lg transition-all ${
                            completedTasks.includes(index)
                              ? "bg-success/10 border-success/30"
                              : "bg-background border-border"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {t("fertilizer.day") || "Day"} {item.day}
                                </Badge>
                                <Badge variant={getPriorityColor(item.priority)}>
                                  {t(`fertilizer.${item.priority}`) || item.priority}
                                </Badge>
                              </div>
                              <h5 className="font-medium mb-1">{t(`fertilizer.${item.task}`) || item.task}</h5>
                              <p className="text-sm text-muted-foreground mb-1">
                                {t("fertilizer.dosage") || "Dosage"}: {item.dosage}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {t("fertilizer.method") || "Method"}: {item.method}
                              </p>
                            </div>
                            <Button
                              variant={completedTasks.includes(index) ? "success" : "outline"}
                              size="sm"
                              onClick={() => toggleTaskCompletion(index)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              {completedTasks.includes(index)
                                ? t("fertilizer.done") || "Done"
                                : t("fertilizer.markDone") || "Mark Done"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nutrient Requirements */}
                  <div>
                    <h4 className="font-semibold mb-3">{t("fertilizer.nutrientRequirements") || "Nutrient Requirements"}</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(plan.nutrients).map(([nutrient, requirement]) => (
                        <div key={nutrient} className="flex justify-between p-2 bg-secondary rounded">
                          <span className="capitalize text-sm font-medium">{t(`fertilizer.${nutrient}`) || nutrient}</span>
                          <span className="text-sm text-muted-foreground">{requirement as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost & Actions */}
                  <div className="space-y-4">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{t("fertilizer.estimatedCost") || "Estimated Cost"}</span>
                        <span className="text-lg font-bold text-success">{plan.cost}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="earth" className="flex-1">
                        <Bell className="h-4 w-4" />
                        {t("fertilizer.setReminders") || "Set Reminders"}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Calendar className="h-4 w-4" />
                        {t("fertilizer.exportSchedule") || "Export Schedule"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <img
                    src={fertilizerImage}
                    alt="Fertilizer Plans"
                    className="w-32 h-32 object-cover rounded-lg mx-auto mb-4 opacity-50"
                  />
                  <p className="text-muted-foreground">
                    {t("fertilizer.selectToGenerate") || "Select crop and stage to generate plan"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FertilizerPlans;