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
  Package
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
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable records ensure complete transparency and prevent fraud in the supply chain."
    },
    {
      icon: QrCode,
      title: "QR Code Tracking",
      description: "Simple scanning technology that provides instant access to complete product history."
    },
    {
      icon: TrendingUp,
      title: "Fair Pricing",
      description: "Real-time market data ensures farmers receive fair compensation for their produce."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Automated quality scoring and certification tracking for premium agricultural products."
    }
  ];

  const benefits = [
    "End-to-end traceability from farm to consumer",
    "Reduced exploitation of farmers by middlemen", 
    "Verified organic and quality certifications",
    "Real-time pricing and market information",
    "Blockchain-secured transaction records",
    "Direct farmer-consumer connections"
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
            <Leaf className="h-4 w-4 mr-2" />
            Government of Odisha Initiative
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transparent 
            <br />
            <span className="text-primary-glow">Agricultural</span> Supply Chain
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Revolutionary blockchain technology ensuring fair pricing, quality assurance, 
            and complete transparency from Odisha's farms to your table.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="hero" className="text-lg px-8 py-4">
              <QrCode className="h-5 w-5 mr-2" />
              Verify Produce Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
              Learn More
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary-glow" />
                  <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                How AgriChain Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our blockchain-powered platform connects every stakeholder in the agricultural 
              supply chain, ensuring transparency, quality, and fair pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="bg-gradient-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Transforming Agriculture
                </span>
                <br />
                in Odisha
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our blockchain-based solution addresses critical challenges in the agricultural 
                supply chain, from farmer exploitation to consumer uncertainty about product quality and origin.
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
                  <Button variant="hero" size="lg">
                    Learn More About Our Mission
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-trust">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-center">Supply Chain Transparency</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Farm Production</h4>
                        <p className="text-sm text-muted-foreground">Farmer registers product with quality details</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Blockchain Recording</h4>
                        <p className="text-sm text-muted-foreground">Immutable transaction recorded on blockchain</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Distribution Tracking</h4>
                        <p className="text-sm text-muted-foreground">Real-time tracking through supply chain</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Consumer Verification</h4>
                        <p className="text-sm text-muted-foreground">QR scan reveals complete product history</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Join the Agricultural Revolution?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Whether you're a farmer looking for fair pricing, a distributor seeking quality assurance, 
            or a consumer wanting transparency, AgriChain Odisha has the tools you need.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/verify">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <QrCode className="h-5 w-5 mr-2" />
                Verify a Product
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Join as a Farmer
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;