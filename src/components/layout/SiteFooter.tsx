import { Leaf, Shield, MapPin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const SiteFooter = () => {
  return (
    <footer className="bg-gradient-subtle border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Leaf className="h-8 w-8 text-primary" />
                <Shield className="h-4 w-4 text-trust absolute -top-1 -right-1" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary">
                  AgriTrust
                </span>
                <p className="text-xs text-muted-foreground">Smart farming, transparent supply chains</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Transparent agricultural supply chain powered by blockchain technology, 
              ensuring fair pricing and quality assurance for farmers and consumers across India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/verify" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Verify Produce
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* For Stakeholders */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stakeholders</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                For Farmers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                For Distributors
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                For Retailers
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                For Consumers
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Pan India Operations</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@agritrust.gov.in</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91 11 XXXX XXXX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 AgriTrust India. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};