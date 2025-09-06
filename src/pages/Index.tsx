import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ProductTracker from '@/components/features/ProductTracker';
import { 
  Shield, 
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
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Send
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-agriculture.jpg";
import galleryFarmerField from "@/assets/gallery-farmer-field.jpg";
import galleryDigitalFarming from "@/assets/gallery-digital-farming.jpg";
import galleryBlockchainProduce from "@/assets/gallery-blockchain-produce.jpg";
import galleryCropFields from "@/assets/gallery-crop-fields.jpg";
import galleryMarket from "@/assets/gallery-market.jpg";
import galleryIrrigation from "@/assets/gallery-irrigation.jpg";
import galleryTechAgriculture from "@/assets/gallery-tech-agriculture.jpg";
import galleryCropDiversity from "@/assets/gallery-crop-diversity.jpg";

const Index = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const galleryImages = [
    { src: galleryFarmerField, alt: "Farmer inspecting crops in agricultural field", title: "Modern Farming Practices" },
    { src: galleryDigitalFarming, alt: "Farmers using digital technology", title: "Digital Agriculture" },
    { src: galleryBlockchainProduce, alt: "Blockchain verified produce with QR codes", title: "Blockchain Verification" },
    { src: galleryCropFields, alt: "Rice paddies and wheat fields", title: "Sustainable Crops" },
    { src: galleryMarket, alt: "Agricultural marketplace", title: "Transparent Markets" },
    { src: galleryIrrigation, alt: "Modern irrigation systems", title: "Smart Irrigation" },
    { src: galleryTechAgriculture, alt: "Technology in agriculture", title: "AgriTech Solutions" },
    { src: galleryCropDiversity, alt: "Diverse Indian crops", title: "Crop Diversity" }
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create email content
      const emailBody = `
        Name: ${contactForm.name}
        Email: ${contactForm.email}
        Subject: ${contactForm.subject}
        
        Message:
        ${contactForm.message}
        
        ---
        Sent from AgriTrust Contact Form
      `;

      // Create mailto link
      const mailtoLink = `mailto:support@agritrust.gov.in?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      toast({
        title: "Opening Email Client",
        description: "Your default email client will open with the pre-filled message.",
      });

      // Reset form after a delay
      setTimeout(() => {
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1000);

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open email client. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-primary">Transparent Farming with Blockchain.</span>
              <br />
              Trust built into every harvest.
            </h1>
            
            <p className="text-lg md:text-xl mb-8 max-w-3xl text-muted-foreground">
              AgriTrust uses blockchain to ensure farmers get fair prices, consumers get authentic produce, and every step is verified.
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

      <ProductTracker />

      {/* Blockchain Transparency Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-primary">Blockchain Transparency Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Revolutionary technology ensuring complete trust and transparency in every transaction
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105 border-0 bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Immutable Records</h3>
                <p className="text-muted-foreground">No tampering, full trust. Every transaction is permanently recorded on the blockchain.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105 border-0 bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Payments</h3>
                <p className="text-muted-foreground">Smart contracts ensure fairness. Automated payments guarantee farmers get paid instantly.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105 border-0 bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Traceability</h3>
                <p className="text-muted-foreground">Every product has a digital ID. Complete visibility from seed to shelf.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105 border-0 bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <QrCode className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Farmer to Consumer</h3>
                <p className="text-muted-foreground">Direct trust with QR scan. Consumers can verify authenticity instantly.</p>
              </CardContent>
            </Card>
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

      {/* Government Schemes Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-primary">Government Agriculture Schemes</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore key Government of India schemes designed to support farmers and promote sustainable agriculture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">PM-KISAN</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Direct income support scheme providing ₹6,000 annually to eligible farmer families.</p>
                <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Pradhan Mantri Fasal Bima Yojana (PMFBY)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Comprehensive crop insurance scheme protecting farmers against production risks.</p>
                <a href="https://pmfby.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Soil Health Card Scheme</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Provides soil health information to farmers for optimal nutrient management and crop planning.</p>
                <a href="https://soilhealth.dac.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">National Mission on Sustainable Agriculture (NMSA)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Promotes climate-resilient practices and sustainable farming techniques.</p>
                <a href="https://agricoop.nic.in/en/nmsa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">e-NAM (National Agriculture Market)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Online trading platform connecting farmers directly to markets for better price discovery.</p>
                <a href="https://enam.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Pradhan Mantri Krishi Sinchai Yojana (PMKSY)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Irrigation and water-use efficiency scheme to expand cultivated area under assured irrigation.</p>
                <a href="https://pmksy.gov.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Kisan Credit Card (KCC)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Provides farmers with timely credit support for agricultural needs at concessional rates.</p>
                <a href="https://www.nabard.org/auth/writereaddata/tender/1806181053KCC%20Guidelines%20-%20English.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-lg text-primary">RKVY (Rashtriya Krishi Vikas Yojana)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">State-led funding support scheme for holistic agriculture development and infrastructure.</p>
                <a href="https://rkvy.nic.in/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm font-medium">
                  Learn More →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-primary">Agriculture Gallery</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the future of agriculture through our collection of modern farming practices, 
              blockchain technology, and sustainable crop production
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {galleryImages.map((image, index) => (
              <Card key={index} className="group overflow-hidden shadow-elegant hover:shadow-trust transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-center px-4">{image.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-primary">Contact Us</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about AgriTrust? Need support? Get in touch with our team
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      placeholder="What is this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you..."
                      className="min-h-32"
                      required
                    />
                  </div>
                  
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-primary mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 rounded-full p-3 flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-muted-foreground">support@agritrust.gov.in</p>
                        <p className="text-muted-foreground">info@agritrust.gov.in</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 rounded-full p-3 flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Phone</h4>
                        <p className="text-muted-foreground">Toll Free: 1800-180-1551</p>
                        <p className="text-muted-foreground">Helpline: +91-11-2674-6789</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/20 rounded-full p-3 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Office</h4>
                        <p className="text-muted-foreground">
                          Ministry of Agriculture & Farmers Welfare<br />
                          Krishi Bhawan, Dr. Rajendra Prasad Road<br />
                          New Delhi - 110001, India
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold text-primary mb-4">Office Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
                    <p><strong>Saturday:</strong> 9:00 AM - 1:00 PM</p>
                    <p><strong>Sunday:</strong> Closed</p>
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground">
                      For urgent matters, please call our 24/7 helpline
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
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