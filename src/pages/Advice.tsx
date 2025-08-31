import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Sprout, 
  Cloud, 
  Droplets, 
  Thermometer, 
  Calendar, 
  MapPin, 
  TrendingUp,
  Leaf,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Advice = () => {
  const [location, setLocation] = useState("");
  const [cropType, setCropType] = useState("");
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [advice, setAdvice] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const cropOptions = [
    "Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Pulses", 
    "Vegetables", "Fruits", "Spices", "Tea", "Coffee", "Rubber"
  ];

  const soilOptions = [
    "Alluvial", "Black/Regur", "Red", "Laterite", "Mountain", "Desert"
  ];

  const seasonOptions = [
    "Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"
  ];

  // Mock advice data
  const mockAdvice = {
    rice: {
      recommendation: "Highly Recommended",
      confidence: 92,
      reasoning: "Current weather conditions and soil moisture levels are optimal for rice cultivation.",
      tips: [
        "Maintain water level 2-5cm during vegetative stage",
        "Apply nitrogen in split doses for better yield",
        "Monitor for pest activity especially stem borer",
        "Harvest when 80% of grains turn golden yellow"
      ],
      marketPrice: "₹2,850 per quintal",
      expectedYield: "45-50 quintals per hectare",
      blockchain: "0xabc123...def456"
    }
  };

  const handleGetAdvice = async () => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setAdvice(mockAdvice.rice);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Smart Crop Advisory</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get AI-powered recommendations tailored to your soil, season, and irrigation conditions. 
            Make informed decisions backed by blockchain-verified data.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sprout className="h-6 w-6 text-primary" />
                <span>Crop Advisory Input</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Input
                    placeholder="Enter your district/location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Crop Type</label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropOptions.map((crop) => (
                        <SelectItem key={crop} value={crop.toLowerCase()}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Soil Type</label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilOptions.map((soil) => (
                        <SelectItem key={soil} value={soil.toLowerCase()}>
                          {soil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Season</label>
                  <Select value={season} onValueChange={setSeason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasonOptions.map((s) => (
                        <SelectItem key={s} value={s.toLowerCase()}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleGetAdvice}
                disabled={!location || !cropType || !soilType || !season || isLoading}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {isLoading ? "Analyzing..." : "Get Smart Advice"}
              </Button>
            </CardContent>
          </Card>

          {/* Current Conditions */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-6 w-6 text-primary" />
                <span>Current Conditions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Thermometer className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">28°C</p>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Droplets className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">75%</p>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Cloud className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">60%</p>
                  <p className="text-sm text-muted-foreground">Cloud Cover</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Droplets className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">Good</p>
                  <p className="text-sm text-muted-foreground">Soil Moisture</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendation Results */}
        {advice && (
          <div className="mt-12">
            <Card className="shadow-trust border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span>AI Recommendation</span>
                  </CardTitle>
                  <Badge variant="default" className="bg-primary">
                    {advice.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {advice.recommendation}
                  </h3>
                  <p className="text-muted-foreground">{advice.reasoning}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center space-x-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      <span>Cultivation Tips</span>
                    </h4>
                    <ul className="space-y-2">
                      {advice.tips.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <div className="bg-primary/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Market Price</span>
                      <span className="text-primary font-bold">{advice.marketPrice}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium">Expected Yield</span>
                      <span className="font-semibold">{advice.expectedYield}</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <span className="font-medium block mb-1">Blockchain Record</span>
                      <span className="text-xs text-muted-foreground font-mono">{advice.blockchain}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Features Overview */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="text-primary">How Smart Advisory Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-elegant text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Sprout className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Data Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  AI analyzes soil type, weather patterns, and historical data for personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Market Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time market prices and demand forecasting to maximize farmer profits.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant text-center">
              <CardContent className="pt-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Blockchain Verified</h3>
                <p className="text-sm text-muted-foreground">
                  All recommendations are recorded on blockchain for transparency and accountability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Advice;