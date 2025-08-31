import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  QrCode, 
  Leaf, 
  ArrowRight,
  CheckCircle,
  Globe,
  Award,
  BarChart3,
  Package,
  Brain,
  LinkIcon,
  Smartphone
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-agriculture.jpg";

const Index = () => {
  const stats = [
    { label: "Farmers Connected", value: "25,000+", icon: Users },
    { label: "Products Tracked", value: "1.2M+", icon: Package },
    { label: "Transparency Score", value: "98%", icon: Shield },
    { label: "Districts Covered", value: "30", icon: Globe }
  ];

  const features = [
    {
      icon: Brain,
      title: "Smart Advisory",
      description: "Recommendations tailored to your soil, season, and irrigation.",
      highlight: "AI-Powered"
    },
    {
      icon: Shield,
      title: "On-chain Trust",
      description: "Tamper-evident supply chain records with simple blockchain.",
      highlight: "Blockchain Verified"
    },
    {
      icon: LinkIcon,
      title: "From Farm to Fork",
      description: "Track batches across actors for clear transparency.",
      highlight: "Full Traceability"
    }
  ];

  const benefits = [
    "End-to-end traceability from farm to consumer",
    "AI-powered crop recommendations for maximum yield", 
    "Verified organic and quality certifications",
    "Real-time market pricing and demand forecasting",
    "Blockchain-secured transaction records",
    "Direct farmer-consumer connections"
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-background/90 dark:bg-background/95" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Leaf className="h-4 w-4 mr-2" />
              Smart farming, transparent supply chains
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Agriculture, made smarter
              <br />
              <span className="text-primary">with AI advisory and</span>
              <br />
              <span className="text-primary">blockchain transparency</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-3xl text-muted-foreground">
              AgriTrust helps farmers choose the right crops for their soil and season, while 
              building trust with an on-chain ledger for every batch from farm to fork.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/advice">
                <Button size="lg" className="text-lg px-8 py-4 bg-primary hover:bg-primary/90">
                  Get Crop Advice
                </Button>
              </Link>
              <Link to="/verify">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  Explore Ledger
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105 border-0 bg-card/80 backdrop-blur">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-primary/20 p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {feature.highlight}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Deep Dive */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-primary">Transforming Agriculture</span>
                <br />
                with Advanced Technology
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our platform combines artificial intelligence with blockchain technology to create 
                the most advanced agricultural advisory and supply chain transparency system in India.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90">
                    Learn More About Our Technology
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-trust border-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">
                    <span className="text-primary">Blockchain-Powered</span> Supply Chain
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">AI Crop Advisory</h4>
                        <p className="text-sm text-muted-foreground">Smart recommendations based on soil, weather & market data</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Blockchain Recording</h4>
                        <p className="text-sm text-muted-foreground">Immutable records from farm to consumer</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Supply Chain Tracking</h4>
                        <p className="text-sm text-muted-foreground">Real-time visibility across all stakeholders</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Consumer Verification</h4>
                        <p className="text-sm text-muted-foreground">Instant QR code verification for authenticity</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-primary">Seamless Integration</span> with Existing Systems
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            AgriTrust works with your existing farming practices and integrates with IoT sensors, 
            weather stations, and market data providers for comprehensive agricultural intelligence.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <Smartphone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Mobile Apps</h3>
                <p className="text-sm text-muted-foreground">iOS & Android apps for farmers and consumers</p>
              </CardContent>
            </Card>
            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">IoT Integration</h3>
                <p className="text-sm text-muted-foreground">Connect sensors for real-time crop monitoring</p>
              </CardContent>
            </Card>
            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Weather APIs</h3>
                <p className="text-sm text-muted-foreground">Integrated weather forecasting and alerts</p>
              </CardContent>
            </Card>
            <Card className="shadow-elegant">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Market Data</h3>
                <p className="text-sm text-muted-foreground">Real-time pricing from major agricultural markets</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Agricultural Experience?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of farmers, distributors, and consumers who trust AgriTrust 
            for transparent, technology-powered agriculture.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/advice">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Brain className="h-5 w-5 mr-2" />
                Get Crop Advice
              </Button>
            </Link>
            <Link to="/verify">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <QrCode className="h-5 w-5 mr-2" />
                Explore Ledger
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;