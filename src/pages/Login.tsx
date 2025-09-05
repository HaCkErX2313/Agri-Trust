import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Shield, Mail, Phone, User, Building } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="min-h-screen bg-gradient-subtle flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="relative">
              <Leaf className="h-8 w-8 text-primary" />
              <Shield className="h-4 w-4 text-trust absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-primary">AgriTrust</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your AgriTrust account</p>
        </div>

        <Tabs defaultValue="farmer" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="farmer">Farmer</TabsTrigger>
            <TabsTrigger value="buyer">Buyer</TabsTrigger>
            <TabsTrigger value="govt">Govt</TabsTrigger>
          </TabsList>

          <TabsContent value="farmer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Farmer Login</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-mobile">Mobile Number</Label>
                  <Input 
                    id="farmer-mobile" 
                    type="tel" 
                    placeholder="Enter your mobile number"
                    className="pl-10"
                  />
                  <Phone className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-password">Password</Label>
                  <Input id="farmer-password" type="password" placeholder="Enter your password" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Sign In as Farmer
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
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
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
                  <span>Buyer/Retailer Login</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer-email">Email Address</Label>
                  <Input 
                    id="buyer-email" 
                    type="email" 
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyer-password">Password</Label>
                  <Input id="buyer-password" type="password" placeholder="Enter your password" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Sign In as Buyer
                </Button>
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

          <TabsContent value="govt">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Government Official Login</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="govt-id">Official ID</Label>
                  <Input 
                    id="govt-id" 
                    type="text" 
                    placeholder="Enter your official ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="govt-password">Password</Label>
                  <Input id="govt-password" type="password" placeholder="Enter your password" />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Sign In as Official
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;