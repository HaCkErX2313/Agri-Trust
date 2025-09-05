import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Leaf, Sun, Moon, Globe, Phone, LogIn, UserPlus, Home, TrendingUp, Cloud, FileText, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "AI Advisory", href: "/advice" },
    { name: "Market Prices", href: "/market-prices" },
    { name: "Weather", href: "/weather" },
    { name: "Schemes", href: "/schemes" },
    { name: "Ledger", href: "/verify" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'ur', name: 'Urdu', native: 'اردو' },
    { code: 'bho', name: 'Bhojpuri', native: 'भोजपुरी' },
    { code: 'mai', name: 'Maithili', native: 'मैथिली' }
  ];

  const isActive = (href: string) => location.pathname === href;
  
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

  return (
    <>
      {/* Government Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center">
              <span className="mr-2">🇮🇳</span>
              Government of India - Ministry of Agriculture & Farmers Welfare
            </span>
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              Kisan Call Center: 1800-180-1551
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <span className="text-xs">A+ | A | A-</span>
          </div>
        </div>
      </div>

      {/* Logo Header */}
      <div className="bg-background border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* Government Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">भारत सरकार</span>
                  <br />
                  <span className="text-sm text-muted-foreground">GOVERNMENT OF INDIA</span>
                </div>
              </div>

              {/* AgriTrust Logo */}
              <Link to="/" className="flex items-center space-x-3">
                <div className="relative">
                  <Leaf className="h-12 w-12 text-primary" />
                  <Shield className="h-6 w-6 text-trust absolute -top-1 -right-1" />
                </div>
                <div>
                  <span className="text-2xl font-bold text-primary">AgriTrust</span>
                  <br />
                  <span className="text-sm text-muted-foreground">Digital farming, transparent supply chains</span>
                </div>
              </Link>
            </div>

            {/* Right side logos/certifications */}
            <div className="flex items-center space-x-4">
              <div className="text-right text-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-primary font-semibold">G20</span>
                  <span className="text-xs text-muted-foreground">Digital India</span>
                </div>
                <div className="text-xs text-muted-foreground">Agriculture Working Group</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/20 rounded ${
                    isActive(item.href)
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "text-primary-foreground/90"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                    <Globe className="h-4 w-4 mr-2" />
                    {getCurrentLanguage().native}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 max-h-60 overflow-y-auto bg-background">
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code} 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setSelectedLanguage(lang.code)}
                    >
                      <span>{lang.name}</span>
                      <span className="text-xs text-muted-foreground">{lang.native}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Login Buttons */}
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="secondary" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-primary-foreground/20">
              <div className="py-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-2 text-sm font-medium rounded transition-colors ${
                      isActive(item.href)
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "text-primary-foreground/90 hover:bg-primary-foreground/10"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-3 space-y-2 border-t border-primary-foreground/20 mt-3">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/20">
                    <Globe className="h-4 w-4 mr-2" />
                    {getCurrentLanguage().native}
                  </Button>
                  <Link to="/login" className="block">
                    <Button variant="ghost" size="sm" className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/20">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="block">
                    <Button variant="secondary" size="sm" className="w-full justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};