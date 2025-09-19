import Navigation from "@/components/Navigation";
import VoiceInput from "@/components/VoiceInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRain, Sun, Cloud, Wind, Droplets, Thermometer, Eye, Bell } from "lucide-react";
import weatherImage from "@/assets/weather-monitoring.jpg";

const Weather = () => {
  const currentWeather = {
    location: "Maharashtra, India",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    visibility: 8,
    uvIndex: 6,
    forecast: [
      { day: "Today", high: 32, low: 24, condition: "Sunny", rain: 0 },
      { day: "Tomorrow", high: 29, low: 22, condition: "Rainy", rain: 80 },
      { day: "Day 3", high: 26, low: 20, condition: "Cloudy", rain: 30 },
      { day: "Day 4", high: 31, low: 23, condition: "Sunny", rain: 10 },
      { day: "Day 5", high: 28, low: 21, condition: "Partly Cloudy", rain: 20 }
    ]
  };

  const farmingAdvice = [
    {
      icon: <CloudRain className="h-5 w-5 text-blue-500" />,
      title: "Rain Expected Tomorrow",
      description: "Heavy rainfall predicted. Cover harvested crops and postpone irrigation.",
      priority: "high"
    },
    {
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      title: "Perfect for Harvesting",
      description: "Clear weather for next 3 days. Ideal time for harvesting mature crops.",
      priority: "medium"
    },
    {
      icon: <Wind className="h-5 w-5 text-gray-500" />,
      title: "Wind Alert",
      description: "Strong winds expected. Secure greenhouse structures and young plants.",
      priority: "low"
    }
  ];

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny": return <Sun className="h-6 w-6 text-yellow-500" />;
      case "rainy": return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "cloudy": return <Cloud className="h-6 w-6 text-gray-500" />;
      case "partly cloudy": return <Cloud className="h-6 w-6 text-gray-400" />;
      default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-200 bg-red-50";
      case "medium": return "border-yellow-200 bg-yellow-50";
      case "low": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Weather Guidance</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get real-time weather updates and AI-powered farming advice 
            to protect your crops and optimize agricultural activities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-accent" />
                Current Weather
              </CardTitle>
              <CardDescription>{currentWeather.location}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  {getConditionIcon(currentWeather.condition)}
                  <div className="text-3xl font-bold mt-2">{currentWeather.temperature}°C</div>
                  <div className="text-sm text-muted-foreground">{currentWeather.condition}</div>
                </div>
                
                <div className="text-center">
                  <Droplets className="h-6 w-6 text-blue-500 mx-auto" />
                  <div className="text-2xl font-semibold mt-2">{currentWeather.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>
                
                <div className="text-center">
                  <Wind className="h-6 w-6 text-gray-500 mx-auto" />
                  <div className="text-2xl font-semibold mt-2">{currentWeather.windSpeed}</div>
                  <div className="text-sm text-muted-foreground">km/h Wind</div>
                </div>
                
                <div className="text-center">
                  <Eye className="h-6 w-6 text-purple-500 mx-auto" />
                  <div className="text-2xl font-semibold mt-2">{currentWeather.visibility}</div>
                  <div className="text-sm text-muted-foreground">km Visibility</div>
                </div>
              </div>

              {/* 5-Day Forecast */}
              <div>
                <h4 className="font-semibold mb-4">5-Day Forecast</h4>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {currentWeather.forecast.map((day, index) => (
                    <div key={index} className="p-3 bg-secondary rounded-lg text-center">
                      <div className="text-sm font-medium mb-2">{day.day}</div>
                      {getConditionIcon(day.condition)}
                      <div className="text-sm mt-2">
                        <div className="font-semibold">{day.high}°</div>
                        <div className="text-muted-foreground">{day.low}°</div>
                      </div>
                      <div className="text-xs text-blue-500 mt-1">{day.rain}% rain</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Voice Weather Query */}
          <Card className="animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-warning" />
                Voice Weather Query
              </CardTitle>
              <CardDescription>
                Ask about weather in your local language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VoiceInput />
              <div className="mt-4 space-y-2">
                <Button variant="outline" size="sm" className="w-full text-left justify-start">
                  "What's tomorrow's weather?"
                </Button>
                <Button variant="outline" size="sm" className="w-full text-left justify-start">
                  "When should I water crops?"
                </Button>
                <Button variant="outline" size="sm" className="w-full text-left justify-start">
                  "Is it good time to harvest?"
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farming Advice */}
        <div className="mt-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-success" />
                AI Farming Advice
              </CardTitle>
              <CardDescription>
                Weather-based recommendations for your agricultural activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {farmingAdvice.map((advice, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${getPriorityColor(advice.priority)}`}
                  >
                    <div className="flex items-start gap-3">
                      {advice.icon}
                      <div>
                        <h4 className="font-semibold mb-1">{advice.title}</h4>
                        <p className="text-sm text-muted-foreground">{advice.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather Alerts */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Bell className="h-5 w-5" />
                Weather Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                  <CloudRain className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-700">Heavy Rainfall Warning</p>
                    <p className="text-sm text-red-600">Expected 80mm+ rain tomorrow. Take protective measures for crops.</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Bell className="h-4 w-4" />
                    Enable SMS Alerts
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Set Custom Alerts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Weather;