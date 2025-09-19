import Navigation from "@/components/Navigation";
import VoiceInput from "@/components/VoiceInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Calendar, MapPin, Bell } from "lucide-react";
import marketImage from "@/assets/market-prices.jpg";

const MarketPrices = () => {
  const marketData = [
    {
      crop: "Wheat",
      currentPrice: 2150,
      previousPrice: 2100,
      change: 2.4,
      unit: "per quintal",
      market: "Delhi Mandi",
      quality: "FAQ",
      trend: "up",
      prediction: "Prices expected to rise 5-8% next week"
    },
    {
      crop: "Rice",
      currentPrice: 3200,
      previousPrice: 3280,
      change: -2.4,
      unit: "per quintal", 
      market: "Punjab Mandi",
      quality: "Basmati",
      trend: "down",
      prediction: "Seasonal decline expected"
    },
    {
      crop: "Cotton",
      currentPrice: 5600,
      previousPrice: 5550,
      change: 0.9,
      unit: "per quintal",
      market: "Gujarat Mandi",
      quality: "Medium Staple",
      trend: "up",
      prediction: "Export demand driving prices up"
    },
    {
      crop: "Sugarcane",
      currentPrice: 320,
      previousPrice: 315,
      change: 1.6,
      unit: "per quintal",
      market: "Maharashtra Mandi",
      quality: "Fresh",
      trend: "up",
      prediction: "Peak season demand"
    },
    {
      crop: "Tomato",
      currentPrice: 1800,
      previousPrice: 2200,
      change: -18.2,
      unit: "per quintal",
      market: "Karnataka Mandi", 
      quality: "Grade A",
      trend: "down",
      prediction: "Good harvest lowering prices"
    },
    {
      crop: "Onion",
      currentPrice: 2500,
      previousPrice: 2300,
      change: 8.7,
      unit: "per quintal",
      market: "Nashik Mandi",
      quality: "Medium",
      trend: "up",
      prediction: "Storage shortage driving prices"
    }
  ];

  const recommendations = [
    {
      type: "Sell Now",
      crops: ["Cotton", "Sugarcane"],
      reason: "Prices at seasonal high",
      urgency: "high"
    },
    {
      type: "Wait",
      crops: ["Wheat"],
      reason: "Expected price rise next week", 
      urgency: "medium"
    },
    {
      type: "Hold",
      crops: ["Rice", "Tomato"],
      reason: "Prices may stabilize soon",
      urgency: "low"
    }
  ];

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up" || change > 0) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Market Prices</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track real-time commodity prices and get AI-powered insights 
            on the best time to sell your crops for maximum profit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Price Cards */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Prices</h2>
              <Badge variant="outline" className="text-sm">
                <Calendar className="h-3 w-3 mr-1" />
                Updated 2 hours ago
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketData.map((item, index) => (
                <Card key={index} className="animate-fade-in hover:shadow-medium transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.crop}</CardTitle>
                      {getTrendIcon(item.trend, item.change)}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.market} • {item.quality}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">₹{item.currentPrice.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">{item.unit}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${getTrendColor(item.change)}`}>
                          {item.change > 0 ? '+' : ''}{item.change}%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          from ₹{item.previousPrice}
                        </span>
                      </div>

                      <div className="p-2 bg-secondary rounded text-xs">
                        <strong>AI Prediction:</strong> {item.prediction}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voice Query */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <DollarSign className="h-5 w-5 text-warning" />
                  Price Query
                </CardTitle>
                <CardDescription>
                  Ask about prices in your language
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VoiceInput />
                <div className="mt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    "What's wheat price today?"
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    "Best time to sell cotton?"
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    "Tomato rates in my area?"
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selling Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-success" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  Smart selling advice based on market trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={getUrgencyColor(rec.urgency)}>
                          {rec.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {rec.urgency} priority
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          {rec.crops.join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {rec.reason}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="h-5 w-5 text-accent" />
                  Price Alerts
                </CardTitle>
                <CardDescription>
                  Get notified when prices hit your target
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Bell className="h-4 w-4" />
                    Set Price Alert
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4" />
                    Schedule Reports
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm font-medium text-accent mb-1">Active Alerts</p>
                  <div className="space-y-1">
                    <p className="text-xs">Wheat &gt; ₹2,200/quintal</p>
                    <p className="text-xs">Cotton &lt; ₹5,800/quintal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Market Analysis */}
        <div className="mt-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Market Analysis & Trends
              </CardTitle>
              <CardDescription>
                Weekly market insights and selling opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">Rising Markets</h4>
                  <p className="text-sm text-green-600 mb-3">
                    Export demand driving up grain prices. Good time to sell stored produce.
                  </p>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Wheat: +5.2%</div>
                    <div className="text-sm font-medium">Cotton: +3.8%</div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-700 mb-2">Stable Markets</h4>
                  <p className="text-sm text-yellow-600 mb-3">
                    Balanced supply-demand. Prices likely to remain steady for 2-3 weeks.
                  </p>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Sugarcane: +0.9%</div>
                    <div className="text-sm font-medium">Soybean: -0.3%</div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">Declining Markets</h4>
                  <p className="text-sm text-red-600 mb-3">
                    Good harvest season causing price drops. Consider holding for better rates.
                  </p>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Tomato: -18.2%</div>
                    <div className="text-sm font-medium">Rice: -2.4%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;