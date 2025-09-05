import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  MapPin, 
  AlertTriangle,
  Leaf,
  Sprout
} from "lucide-react";
const [data, setData] = useState<any>(null);

useEffect(() => {
  const fetchWeather = async () => {
    try {
      const res = await fetch("/api/weather?city=Delhi"); // call your backend API
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch weather:", err);
    }
  };

  fetchWeather();
}, []);


const Weather = () => {
  const currentWeather = {
    location: "Bhubaneswar, Odisha",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 72,
    windSpeed: 12,
    visibility: 8,
    rainfall: 2.3,
    uvIndex: 6
  };

  const forecast = [
    { day: "Today", icon: Cloud, temp: "28°/22°", condition: "Partly Cloudy", rain: "10%" },
    { day: "Tomorrow", icon: CloudRain, temp: "26°/20°", condition: "Light Rain", rain: "60%" },
    { day: "Day 3", icon: CloudRain, temp: "24°/19°", condition: "Moderate Rain", rain: "80%" },
    { day: "Day 4", icon: Sun, temp: "29°/23°", condition: "Sunny", rain: "5%" },
    { day: "Day 5", icon: Cloud, temp: "27°/21°", condition: "Cloudy", rain: "20%" }
  ];

  const advisories = [
    {
      type: "warning",
      title: "Heavy Rainfall Alert",
      message: "Heavy rainfall expected in next 2-3 days. Avoid field operations and ensure proper drainage.",
      crop: "All Crops",
      severity: "High"
    },
    {
      type: "info",
      title: "Irrigation Advisory",
      message: "Reduce irrigation frequency due to expected rainfall. Monitor soil moisture levels.",
      crop: "Rice, Vegetable",
      severity: "Medium"
    },
    {
      type: "success",
      title: "Favorable Conditions",
      message: "Good weather conditions expected after Day 4. Ideal for harvesting and post-harvest activities.",
      crop: "Mature Crops",
      severity: "Low"
    }
  ];

  const cropSpecificAdvice = [
    {
      crop: "Rice",
      stage: "Flowering",
      advice: "Protect from heavy rains. Ensure proper drainage to prevent waterlogging.",
      priority: "high"
    },
    {
      crop: "Maize",
      stage: "Vegetative",
      advice: "Good moisture conditions. Monitor for pest attacks due to high humidity.",
      priority: "medium"
    },
    {
      crop: "Vegetables",
      stage: "All Stages",
      advice: "Cover young plants. Harvest ready vegetables before heavy rains.",
      priority: "high"
    },
    {
      crop: "Turmeric",
      stage: "Harvesting",
      advice: "Delay harvesting until weather clears. Store harvested produce in dry conditions.",
      priority: "medium"
    }
  ];

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Weather & Agricultural Advisory</h1>
          <p className="text-muted-foreground">Real-time weather updates and farming recommendations</p>
        </div>

        {/* Current Weather */}
        <Card className="mb-6 shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{currentWeather.location}</span>
              </CardTitle>
              <Badge variant="outline">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Weather */}
              <div className="col-span-1 text-center">
                <Cloud className="h-16 w-16 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold text-foreground">{currentWeather.temperature}°C</div>
                <div className="text-muted-foreground">{currentWeather.condition}</div>
              </div>

              {/* Weather Details */}
              <div className="col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-muted-foreground">Humidity</div>
                  <div className="font-semibold">{currentWeather.humidity}%</div>
                </div>
                <div className="text-center">
                  <Wind className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                  <div className="text-sm text-muted-foreground">Wind Speed</div>
                  <div className="font-semibold">{currentWeather.windSpeed} km/h</div>
                </div>
                <div className="text-center">
                  <Eye className="h-6 w-6 mx-auto mb-2 text-gray-500" />
                  <div className="text-sm text-muted-foreground">Visibility</div>
                  <div className="font-semibold">{currentWeather.visibility} km</div>
                </div>
                <div className="text-center">
                  <CloudRain className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm text-muted-foreground">Rainfall</div>
                  <div className="font-semibold">{currentWeather.rainfall} mm</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5-Day Weather Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.map((day, index) => {
                const IconComponent = day.icon;
                return (
                  <div key={index} className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="font-semibold text-sm mb-2">{day.day}</div>
                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="font-bold text-lg mb-1">{day.temp}</div>
                    <div className="text-xs text-muted-foreground mb-1">{day.condition}</div>
                    <Badge variant="outline" className="text-xs">
                      <Droplets className="h-3 w-3 mr-1" />
                      {day.rain}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Weather Advisories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>Weather Advisories</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {advisories.map((advisory, index) => (
                <Alert key={index} className={`
                  ${advisory.type === 'warning' ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20' : ''}
                  ${advisory.type === 'info' ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : ''}
                  ${advisory.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : ''}
                `}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{advisory.title}</div>
                      <AlertDescription className="text-sm">
                        {advisory.message}
                      </AlertDescription>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">{advisory.crop}</Badge>
                        <Badge variant={
                          advisory.severity === 'High' ? 'destructive' : 
                          advisory.severity === 'Medium' ? 'default' : 'secondary'
                        } className="text-xs">
                          {advisory.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <span>Crop-Specific Advice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cropSpecificAdvice.map((advice, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Sprout className="h-4 w-4 text-primary" />
                      <span className="font-semibold">{advice.crop}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">{advice.stage}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{advice.advice}</p>
                  <Badge variant={advice.priority === 'high' ? 'destructive' : 'default'} className="text-xs">
                    {advice.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <CloudRain className="h-6 w-6 text-primary" />
                <span>Rainfall Forecast</span>
                <span className="text-xs text-muted-foreground">7-day detailed forecast</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Thermometer className="h-6 w-6 text-primary" />
                <span>Temperature Trends</span>
                <span className="text-xs text-muted-foreground">Monthly temperature data</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                <span>Weather Alerts</span>
                <span className="text-xs text-muted-foreground">Subscribe to notifications</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Weather;
