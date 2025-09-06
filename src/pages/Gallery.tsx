import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin } from "lucide-react";
import galleryFarmerField from "@/assets/gallery-farmer-field.jpg";
import galleryDigitalFarming from "@/assets/gallery-digital-farming.jpg";
import galleryBlockchainProduce from "@/assets/gallery-blockchain-produce.jpg";
import galleryCropFields from "@/assets/gallery-crop-fields.jpg";
import galleryMarket from "@/assets/gallery-market.jpg";
import galleryIrrigation from "@/assets/gallery-irrigation.jpg";
import galleryTechAgriculture from "@/assets/gallery-tech-agriculture.jpg";
import galleryCropDiversity from "@/assets/gallery-crop-diversity.jpg";

const Gallery = () => {
  const galleryImages = [
    { 
      src: galleryFarmerField, 
      alt: "Farmer inspecting crops in agricultural field", 
      title: "Modern Farming Practices",
      description: "Farmers using scientific methods to inspect crop health and growth",
      location: "Punjab, India",
      category: "Traditional Farming"
    },
    { 
      src: galleryDigitalFarming, 
      alt: "Farmers using digital technology", 
      title: "Digital Agriculture",
      description: "Implementation of IoT sensors and mobile technology in farming",
      location: "Karnataka, India",
      category: "Technology"
    },
    { 
      src: galleryBlockchainProduce, 
      alt: "Blockchain verified produce with QR codes", 
      title: "Blockchain Verification",
      description: "QR code verification system ensuring transparency in supply chain",
      location: "Maharashtra, India",
      category: "Blockchain"
    },
    { 
      src: galleryCropFields, 
      alt: "Rice paddies and wheat fields", 
      title: "Sustainable Crops",
      description: "Organic rice paddies demonstrating sustainable farming practices",
      location: "West Bengal, India",
      category: "Sustainability"
    },
    { 
      src: galleryMarket, 
      alt: "Agricultural marketplace", 
      title: "Transparent Markets",
      description: "Modern agricultural marketplaces with fair pricing mechanisms",
      location: "Gujarat, India",
      category: "Commerce"
    },
    { 
      src: galleryIrrigation, 
      alt: "Modern irrigation systems", 
      title: "Smart Irrigation",
      description: "Drip irrigation and water-efficient farming techniques",
      location: "Rajasthan, India",
      category: "Technology"
    },
    { 
      src: galleryTechAgriculture, 
      alt: "Technology in agriculture", 
      title: "AgriTech Solutions",
      description: "Advanced agricultural technology improving crop yields",
      location: "Tamil Nadu, India",
      category: "Innovation"
    },
    { 
      src: galleryCropDiversity, 
      alt: "Diverse Indian crops", 
      title: "Crop Diversity",
      description: "Showcasing India's rich agricultural biodiversity and heritage crops",
      location: "Uttar Pradesh, India",
      category: "Biodiversity"
    }
  ];

  const categories = ["All", "Traditional Farming", "Technology", "Blockchain", "Sustainability", "Commerce", "Innovation", "Biodiversity"];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center mb-6">
            <Camera className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">
              AgriTrust <span className="text-primary">Gallery</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore the transformation of Indian agriculture through blockchain technology, 
            digital innovation, and sustainable farming practices
          </p>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <MapPin className="h-4 w-4 mr-2" />
            Showcasing Innovation Across India
          </Badge>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {galleryImages.map((image, index) => (
              <Card 
                key={index} 
                className="group shadow-elegant hover:shadow-trust transition-all duration-500 transform hover:scale-105 overflow-hidden border-0 bg-card/80 backdrop-blur"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 left-4 bg-primary/90 text-primary-foreground border-0"
                  >
                    {image.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {image.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {image.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="text-primary">Join the Agricultural Revolution</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of India's digital agriculture transformation. Start using AgriTrust today 
            for transparent, efficient, and sustainable farming practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/advice">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors">
                Get Started with AI Advisory
              </button>
            </a>
            <a href="/verify">
              <button className="bg-transparent hover:bg-primary/10 text-primary border border-primary px-8 py-4 rounded-lg font-semibold transition-colors">
                Explore Blockchain Ledger
              </button>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Gallery;