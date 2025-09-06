import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard,
  Shield,
  Leaf,
  BarChart3,
  Droplets,
  Award,
  TrendingUp,
  ExternalLink
} from "lucide-react";

const Schemes = () => {
  const schemes = [
    {
      title: "PM-KISAN",
      description: "Direct income support scheme providing ₹6,000 annually to eligible farmer families through Direct Benefit Transfer.",
      icon: CreditCard,
      link: "https://pmkisan.gov.in/",
      highlight: "Income Support",
      details: "Launched in 2019, this scheme covers around 12 crore farmers across India."
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Comprehensive crop insurance scheme protecting farmers against production risks and natural calamities.",
      icon: Shield,
      link: "https://pmfby.gov.in/",
      highlight: "Crop Insurance",
      details: "Covers pre-sowing to post-harvest losses with affordable premium rates."
    },
    {
      title: "Soil Health Card Scheme",
      description: "Provides soil health information to farmers for optimal nutrient management and sustainable crop planning.",
      icon: Leaf,
      link: "https://soilhealth.dac.gov.in/",
      highlight: "Soil Testing",
      details: "Over 22 crore soil health cards issued to farmers across the country."
    },
    {
      title: "National Mission on Sustainable Agriculture (NMSA)",
      description: "Promotes climate-resilient practices, water conservation, and sustainable farming techniques.",
      icon: BarChart3,
      link: "https://agricoop.nic.in/en/nmsa",
      highlight: "Sustainability",
      details: "Focuses on 'Har Medh Par Ped' and climate-smart agriculture practices."
    },
    {
      title: "e-NAM (National Agriculture Market)",
      description: "Online trading platform connecting farmers directly to markets for transparent price discovery and better returns.",
      icon: TrendingUp,
      link: "https://enam.gov.in/",
      highlight: "Digital Marketing",
      details: "Pan-India electronic trading platform connecting 1000+ mandis."
    },
    {
      title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
      description: "Irrigation and water-use efficiency scheme to expand cultivated area under assured irrigation coverage.",
      icon: Droplets,
      link: "https://pmksy.gov.in/",
      highlight: "Irrigation",
      details: "Aims to achieve 'Har Khet Ko Pani' (water to every field) goal."
    },
    {
      title: "Kisan Credit Card (KCC)",
      description: "Provides farmers with timely credit support for agricultural needs at concessional interest rates.",
      icon: CreditCard,
      link: "https://www.nabard.org/auth/writereaddata/tender/1806181053KCC%20Guidelines%20-%20English.pdf",
      highlight: "Credit Support",
      details: "Over 7 crore farmers benefited with credit facility up to ₹3 lakh."
    },
    {
      title: "RKVY (Rashtriya Krishi Vikas Yojana)",
      description: "State-led funding support scheme for holistic agriculture development and infrastructure enhancement.",
      icon: Award,
      link: "https://rkvy.nic.in/",
      highlight: "Development",
      details: "Flexible funding for state-specific agriculture and allied sector plans."
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Leaf className="h-4 w-4 mr-2" />
              Government of India
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-primary">Agriculture Schemes</span>
              <br />
              for Farmers
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">
              Comprehensive support programs designed to empower farmers, enhance agricultural productivity, 
              and ensure sustainable farming practices across India.
            </p>
          </div>
        </div>
      </section>

      {/* Schemes Grid Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {schemes.map((scheme, index) => {
              const IconComponent = scheme.icon;
              return (
                <Card key={index} className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105 border-0 bg-card/80 backdrop-blur">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-primary/20 p-3 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {scheme.highlight}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-primary">{scheme.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed mb-4">{scheme.description}</p>
                    <p className="text-sm text-muted-foreground mb-6">{scheme.details}</p>
                    <a 
                      href={scheme.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                        Learn More
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-primary">Additional Resources</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access more government resources and support programs for farmers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="shadow-elegant text-center">
              <CardContent className="p-8">
                <div className="bg-primary/20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Kisan Call Center</h3>
                <p className="text-muted-foreground mb-4">24/7 helpline for farmers</p>
                <p className="text-2xl font-bold text-primary">1800-180-1551</p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant text-center">
              <CardContent className="p-8">
                <div className="bg-primary/20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Digital India Portal</h3>
                <p className="text-muted-foreground mb-4">Access all government services online</p>
                <a href="https://digitalindia.gov.in/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Visit Portal
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant text-center">
              <CardContent className="p-8">
                <div className="bg-primary/20 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ministry of Agriculture</h3>
                <p className="text-muted-foreground mb-4">Official ministry website</p>
                <a href="https://agricoop.nic.in/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Learn More
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Schemes;