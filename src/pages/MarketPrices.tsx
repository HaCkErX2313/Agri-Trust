import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Search, MapPin, Calendar, RefreshCw } from "lucide-react";

const MarketPrices = () => {
  const marketData = [
    {
      crop: "Rice (Paddy)",
      variety: "Common",
      minPrice: 1940,
      maxPrice: 2100,
      modalPrice: 2020,
      trend: "up",
      change: "+2.5%",
      market: "Cuttack Mandi",
      state: "Odisha",
      arrivals: "450 quintals"
    },
    {
      crop: "Wheat",
      variety: "HD-2967",
      minPrice: 2125,
      maxPrice: 2180,
      modalPrice: 2150,
      trend: "up",
      change: "+1.2%",
      market: "Bhubaneswar Mandi",
      state: "Odisha",
      arrivals: "320 quintals"
    },
    {
      crop: "Maize",
      variety: "Yellow",
      minPrice: 1820,
      maxPrice: 1950,
      modalPrice: 1885,
      trend: "down",
      change: "-0.8%",
      market: "Balasore Mandi",
      state: "Odisha",
      arrivals: "280 quintals"
    },
    {
      crop: "Sugarcane",
      variety: "Common",
      minPrice: 350,
      maxPrice: 380,
      modalPrice: 365,
      trend: "up",
      change: "+1.5%",
      market: "Bargarh Mandi",
      state: "Odisha",
      arrivals: "850 quintals"
    },
    {
      crop: "Turmeric",
      variety: "Salem",
      minPrice: 7500,
      maxPrice: 8200,
      modalPrice: 7850,
      trend: "up",
      change: "+3.2%",
      market: "Rayagada Mandi",
      state: "Odisha",
      arrivals: "120 quintals"
    },
    {
      crop: "Onion",
      variety: "Red",
      minPrice: 1200,
      maxPrice: 1450,
      modalPrice: 1325,
      trend: "down",
      change: "-5.1%",
      market: "Kalahandi Mandi",
      state: "Odisha",
      arrivals: "380 quintals"
    }
  ];

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Live Mandi Prices</h1>
          <p className="text-muted-foreground">Real-time agricultural commodity prices from across India</p>
          <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
            <Calendar className="h-4 w-4 mr-1" />
            Last updated: {new Date().toLocaleDateString('en-IN')} at {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search crops..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="odisha">Odisha</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="haryana">Haryana</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Crops</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary hover:bg-primary/90">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Prices
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Market Prices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketData.map((item, index) => (
            <Card key={index} className="shadow-elegant hover:shadow-trust transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{item.crop}</CardTitle>
                  <Badge variant={item.trend === "up" ? "default" : "destructive"} className="flex items-center space-x-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                    <span>{item.change}</span>
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.variety} variety</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">₹{item.modalPrice}</div>
                      <div className="text-xs text-muted-foreground">Modal Price / Quintal</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Min:</span>
                      <span className="font-semibold ml-2">₹{item.minPrice}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max:</span>
                      <span className="font-semibold ml-2">₹{item.maxPrice}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.market}, {item.state}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Arrivals: {item.arrivals}
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Historical Trend
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Active Mandis</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">Quintal Arrivals Today</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">+2.3%</div>
              <div className="text-sm text-muted-foreground">Avg Price Increase</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">28</div>
              <div className="text-sm text-muted-foreground">Commodities Tracked</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default MarketPrices;