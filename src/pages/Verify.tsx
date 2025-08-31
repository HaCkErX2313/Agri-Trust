import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Search, CheckCircle, AlertCircle, Leaf, MapPin, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Verify = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  // Mock verification data
  const mockData = {
    "QR001": {
      status: "verified",
      product: "Organic Rice",
      farmer: "Rajesh Kumar",
      location: "Cuttack, Odisha",
      harvestDate: "2024-03-15",
      certifications: ["Organic", "Fair Trade"],
      blockchain: "0x1234...abcd",
      qualityScore: 95
    }
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      const result = mockData[searchTerm as keyof typeof mockData];
      setVerificationResult(result || { status: "not_found" });
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Verify Your Produce
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ensure the authenticity and quality of your agricultural products with our blockchain-powered verification system.
          </p>
        </div>

        {/* Verification Interface */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <QrCode className="h-6 w-6 text-primary" />
                <span>Product Verification</span>
              </CardTitle>
              <p className="text-muted-foreground">
                Enter the QR code or product ID to verify authenticity
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter QR code or Product ID (try: QR001)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleVerification}
                  disabled={!searchTerm || isVerifying}
                  variant="hero"
                >
                  {isVerifying ? (
                    "Verifying..."
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Verify
                    </>
                  )}
                </Button>
              </div>

              {/* Verification Result */}
              {verificationResult && (
                <div className="mt-8">
                  {verificationResult.status === "verified" ? (
                    <Card className="border-primary/20 bg-primary/5">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2 mb-4">
                          <CheckCircle className="h-6 w-6 text-primary" />
                          <h3 className="text-lg font-semibold text-primary">Product Verified</h3>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Leaf className="h-4 w-4 text-accent" />
                              <span className="font-medium">Product:</span>
                              <span>{verificationResult.product}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-accent" />
                              <span className="font-medium">Farmer:</span>
                              <span>{verificationResult.farmer}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-accent" />
                              <span className="font-medium">Location:</span>
                              <span>{verificationResult.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-accent" />
                              <span className="font-medium">Harvest Date:</span>
                              <span>{verificationResult.harvestDate}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium">Quality Score:</span>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${verificationResult.qualityScore}%` }}
                                  />
                                </div>
                                <span className="text-sm font-semibold">{verificationResult.qualityScore}%</span>
                              </div>
                            </div>
                            
                            <div>
                              <span className="font-medium">Certifications:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {verificationResult.certifications.map((cert: string) => (
                                  <Badge key={cert} variant="secondary">{cert}</Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <span className="font-medium">Blockchain ID:</span>
                              <p className="text-sm text-muted-foreground font-mono">
                                {verificationResult.blockchain}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-destructive/20 bg-destructive/5">
                      <CardContent className="pt-6">
                        <div className="flex items-center space-x-2 text-destructive">
                          <AlertCircle className="h-6 w-6" />
                          <h3 className="text-lg font-semibold">Product Not Found</h3>
                        </div>
                        <p className="text-muted-foreground mt-2">
                          The QR code or product ID you entered could not be verified. Please check the code and try again.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* How It Works */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-6">How Verification Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Scan QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Scan the QR code on the product packaging or enter the product ID manually.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Blockchain Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Our system verifies the product information against the immutable blockchain records.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Get Results</h3>
                <p className="text-sm text-muted-foreground">
                  View complete product information including origin, quality, and certification details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Verify;