import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users, Zap, Globe, Award, TrendingUp } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable records ensure data integrity and prevent tampering throughout the supply chain."
    },
    {
      icon: Users,
      title: "Multi-Stakeholder Platform",
      description: "Connects farmers, distributors, retailers, and consumers in a transparent ecosystem."
    },
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Instant updates and verification at every stage of the agricultural supply chain."
    },
    {
      icon: Globe,
      title: "Scalable Infrastructure",
      description: "Cloud-based solution that scales from local farms to state-wide distribution networks."
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Automated quality scoring and certification tracking for premium agricultural produce."
    },
    {
      icon: TrendingUp,
      title: "Fair Pricing",
      description: "Transparent pricing mechanisms that ensure fair compensation for farmers."
    }
  ];

  const stakeholders = [
    {
      title: "Farmers",
      benefits: [
        "Direct access to market pricing information",
        "Reduced exploitation by middlemen",
        "Digital certification and quality tracking",
        "Access to premium market segments"
      ]
    },
    {
      title: "Distributors",
      benefits: [
        "Verified product authenticity and quality",
        "Streamlined logistics and tracking",
        "Reduced fraud and counterfeit products",
        "Automated compliance documentation"
      ]
    },
    {
      title: "Retailers",
      benefits: [
        "Complete product provenance information",
        "Enhanced customer trust and transparency",
        "Quality assurance guarantees",
        "Sustainable sourcing verification"
      ]
    },
    {
      title: "Consumers",
      benefits: [
        "Product origin and quality verification",
        "Support for local farmers",
        "Sustainable consumption choices",
        "Food safety and authenticity assurance"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              About AgriChain Odisha
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A revolutionary blockchain-based platform designed to bring transparency, 
            fairness, and trust to Odisha's agricultural supply chain. Our solution 
            connects farmers directly with consumers while ensuring quality, authenticity, 
            and fair pricing throughout the entire process.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 shadow-elegant">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                To empower Odisha's agricultural community through blockchain technology, 
                creating a transparent ecosystem that ensures fair pricing, reduces exploitation, 
                and guarantees the quality and authenticity of agricultural produce from farm to table.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-primary p-3 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technical Implementation */}
        <Card className="mb-16 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Blockchain Infrastructure</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Built on Ethereum and Hyperledger frameworks</li>
                  <li>• Smart contracts for automated tracking</li>
                  <li>• Immutable transaction records</li>
                  <li>• Decentralized data storage</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Integration Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• QR code generation and scanning</li>
                  <li>• IoT sensor data integration</li>
                  <li>• Cloud-based scalable infrastructure</li>
                  <li>• Mobile-responsive web interface</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stakeholder Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits for All Stakeholders</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {stakeholders.map((stakeholder, index) => (
              <Card key={index} className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-xl text-center bg-gradient-primary bg-clip-text text-transparent">
                    {stakeholder.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {stakeholder.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-2">
                        <div className="bg-primary/20 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Government Initiative */}
        <Card className="mb-16 bg-gradient-primary text-primary-foreground shadow-trust">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Government of Odisha Initiative</h2>
            <p className="text-lg mb-6 opacity-90">
              This platform is part of the Government of Odisha's commitment to digital transformation 
              in agriculture, supporting farmers with cutting-edge technology while ensuring food security 
              and sustainable farming practices across the state.
            </p>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Learn More About Digital Odisha
            </Button>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join the Agricultural Revolution?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you're a farmer, distributor, retailer, or consumer, our platform 
            offers tools and insights to participate in a more transparent and fair agricultural ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;