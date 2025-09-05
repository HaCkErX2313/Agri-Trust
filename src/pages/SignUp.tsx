import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Shield, User, Building, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <main className="min-h-screen bg-gradient-subtle flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Leaf className="h-8 w-8 text-primary" />
              <Shield className="h-4 w-4 text-trust absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-primary">AgriTrust</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Join AgriTrust</h1>
          <p className="text-muted-foreground">Create your account and start your digital farming journey</p>
        </div>

        <Tabs defaultValue="farmer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="farmer">Farmer</TabsTrigger>
            <TabsTrigger value="buyer">Buyer</TabsTrigger>
            <TabsTrigger value="govt">Government</TabsTrigger>
          </TabsList>

          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Farmer Registration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmer-name">Full Name</Label>
                    <Input id="farmer-name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmer-mobile">Mobile Number</Label>
                    <Input id="farmer-mobile" type="tel" placeholder="10-digit mobile number" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="farmer-state">State</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="odisha">Odisha</SelectItem>
                        <SelectItem value="punjab">Punjab</SelectItem>
                        <SelectItem value="haryana">Haryana</SelectItem>
                        <SelectItem value="maharashtra">Maharashtra</SelectItem>
                        <SelectItem value="karnataka">Karnataka</SelectItem>
                        <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                        <SelectItem value="west-bengal">West Bengal</SelectItem>
                        <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="bihar">Bihar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmer-district">District</Label>
                    <Input id="farmer-district" placeholder="Enter your district" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="land-size">Land Size (Acres)</Label>
                    <Input id="land-size" type="number" placeholder="Total land in acres" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-crop">Primary Crop</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                        <SelectItem value="pulses">Pulses</SelectItem>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmer-password">Create Password</Label>
                  <Input id="farmer-password" type="password" placeholder="Create a strong password" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="farmer-terms" />
                  <label htmlFor="farmer-terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the Terms & Conditions and Privacy Policy
                  </label>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Register as Farmer
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buyer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span>Buyer/Retailer Registration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyer-name">Business Name</Label>
                    <Input id="buyer-name" placeholder="Enter business name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyer-email">Email Address</Label>
                    <Input id="buyer-email" type="email" placeholder="business@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="buyer-mobile">Mobile Number</Label>
                    <Input id="buyer-mobile" type="tel" placeholder="10-digit mobile number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyer-type">Business Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retailer">Retailer</SelectItem>
                        <SelectItem value="wholesaler">Wholesaler</SelectItem>
                        <SelectItem value="distributor">Distributor</SelectItem>
                        <SelectItem value="processor">Food Processor</SelectItem>
                        <SelectItem value="exporter">Exporter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buyer-address">Business Address</Label>
                  <Input id="buyer-address" placeholder="Enter complete address" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gst-number">GST Number</Label>
                    <Input id="gst-number" placeholder="Enter GST number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="buyer-password">Create Password</Label>
                    <Input id="buyer-password" type="password" placeholder="Create a strong password" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="buyer-terms" />
                  <label htmlFor="buyer-terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the Terms & Conditions and Privacy Policy
                  </label>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Register as Buyer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="govt">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Government Official Registration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="govt-name">Full Name</Label>
                    <Input id="govt-name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="govt-email">Official Email</Label>
                    <Input id="govt-email" type="email" placeholder="official@gov.in" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="govt-id">Employee ID</Label>
                    <Input id="govt-id" placeholder="Enter employee ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="govt-dept">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="horticulture">Horticulture</SelectItem>
                        <SelectItem value="animal-husbandry">Animal Husbandry</SelectItem>
                        <SelectItem value="fisheries">Fisheries</SelectItem>
                        <SelectItem value="food-civil-supplies">Food & Civil Supplies</SelectItem>
                        <SelectItem value="rural-development">Rural Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="govt-designation">Designation</Label>
                  <Input id="govt-designation" placeholder="Enter your designation" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="govt-password">Create Password</Label>
                  <Input id="govt-password" type="password" placeholder="Create a strong password" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="govt-terms" />
                  <label htmlFor="govt-terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I confirm that I am authorized to represent my department
                  </label>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90">
                  Register as Official
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;