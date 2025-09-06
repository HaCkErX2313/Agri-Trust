import React, { useState } from 'react';
import QRScanner from './QRScanner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Clock, Truck, Search, Download, QrCode, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';

interface Product {
  id: string;
  product_id: string;
  product_name: string;
  farmer_name: string;
  farmer_location: string;
  crop_type: string;
  harvest_date: string;
}

interface JourneyStage {
  id: string;
  stage_name: string;
  status: string;
  location: string;
  completion_date: string | null;
  notes: string | null;
}

const ProductTracker: React.FC = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showScanner, setShowScanner] = useState(false);

  const searchProduct = async (id: string) => {
    if (!id.trim()) {
      setError('Please enter a Product ID');
      return;
    }

    setLoading(true);
    setError('');
    setProduct(null);
    setJourneyStages([]);

    try {
      // Fetch product details
      const { data: productData, error: productError } = await supabase
        .from('products')
        .select('*')
        .eq('product_id', id.toUpperCase())
        .single();

      if (productError || !productData) {
        setError('No product found. Please check the ID.');
        return;
      }

      // Fetch journey stages
      const { data: stagesData, error: stagesError } = await supabase
        .from('journey_stages')
        .select('*')
        .eq('product_id', productData.id)
        .order('created_at', { ascending: true });

      if (stagesError) {
        setError('Error fetching journey data');
        return;
      }

      setProduct(productData);
      setJourneyStages(stagesData as JourneyStage[] || []);
    } catch (err) {
      setError('Error searching for product');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProduct(productId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'In Transit':
        return <Truck className="h-8 w-8 text-blue-600" />;
      case 'Pending':
        return <Clock className="h-8 w-8 text-gray-400" />;
      default:
        return <Clock className="h-8 w-8 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 dark:bg-green-900/30';
      case 'In Transit':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'Pending':
        return 'bg-gray-100 dark:bg-gray-900/30';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generatePDF = () => {
    if (!product || !journeyStages.length) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('Product Journey Report', 20, 30);
    
    // Product details
    doc.setFontSize(12);
    doc.text(`Product ID: ${product.product_id}`, 20, 50);
    doc.text(`Product Name: ${product.product_name}`, 20, 60);
    doc.text(`Farmer: ${product.farmer_name}`, 20, 70);
    doc.text(`Location: ${product.farmer_location}`, 20, 80);
    doc.text(`Crop Type: ${product.crop_type}`, 20, 90);
    doc.text(`Harvest Date: ${formatDate(product.harvest_date)}`, 20, 100);
    
    // Journey stages
    doc.text('Journey Timeline:', 20, 120);
    
    let yPosition = 140;
    journeyStages.forEach((stage, index) => {
      doc.text(`${index + 1}. ${stage.stage_name}`, 20, yPosition);
      doc.text(`   Status: ${stage.status}`, 20, yPosition + 8);
      doc.text(`   Location: ${stage.location}`, 20, yPosition + 16);
      doc.text(`   Date: ${formatDate(stage.completion_date)}`, 20, yPosition + 24);
      if (stage.notes) {
        doc.text(`   Notes: ${stage.notes}`, 20, yPosition + 32);
        yPosition += 40;
      } else {
        yPosition += 32;
      }
      yPosition += 8;
    });
    
    doc.save(`product-journey-${product.product_id}.pdf`);
  };

  const onScanSuccess = (decodedText: string) => {
    setProductId(decodedText);
    setShowScanner(false);
    searchProduct(decodedText);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-primary">Product Journey Tracker</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enter a Product ID or scan QR code to track your product's complete journey from farm to table
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-trust border-primary/20 p-8">
            {/* Search Section */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter Product ID (e.g., AGR001)"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="h-12 text-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="lg" disabled={loading}>
                    <Search className="h-5 w-5 mr-2" />
                    {loading ? 'Searching...' : 'Track Product'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="lg"
                    onClick={() => setShowScanner(!showScanner)}
                  >
                    <QrCode className="h-5 w-5 mr-2" />
                    Scan QR
                  </Button>
                </div>
              </form>
            </div>

            {/* Error Message */}
            {error && (
              <Alert className="mb-8 border-destructive/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="space-y-6">
                <div className="text-center">
                  <Skeleton className="h-8 w-64 mx-auto mb-4" />
                  <Skeleton className="h-4 w-96 mx-auto" />
                </div>
                <div className="grid md:grid-cols-5 gap-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-center">
                      <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                      <Skeleton className="h-6 w-20 mx-auto mb-2" />
                      <Skeleton className="h-4 w-24 mx-auto mb-2" />
                      <Skeleton className="h-3 w-16 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QR Scanner Modal */}
            {showScanner && (
              <QRScanner 
                onScanSuccess={onScanSuccess}
                onClose={() => setShowScanner(false)}
              />
            )}

            {/* Product Journey Display */}
            {product && journeyStages.length > 0 && (
              <div>
                {/* Product Details */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{product.product_name}</h3>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <span>Farmer: {product.farmer_name}</span>
                    <span>•</span>
                    <span>Type: {product.crop_type}</span>
                    <span>•</span>
                    <span>Harvest: {formatDate(product.harvest_date)}</span>
                  </div>
                </div>

                {/* Journey Timeline */}
                <div className="grid md:grid-cols-5 gap-6 mb-8">
                  {journeyStages.map((stage, index) => (
                    <div key={stage.id} className="text-center relative">
                      {/* Connection Line */}
                      {index < journeyStages.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border z-0" />
                      )}
                      
                      <div className={`${getStatusColor(stage.status)} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 relative z-10`}>
                        {getStatusIcon(stage.status)}
                      </div>
                      
                      <h4 className="font-semibold mb-2">{stage.stage_name}</h4>
                      
                      <Badge 
                        variant={stage.status === 'Completed' ? 'default' : stage.status === 'In Transit' ? 'secondary' : 'outline'}
                        className="mb-2"
                      >
                        {stage.status}
                      </Badge>
                      
                      <p className="text-sm text-muted-foreground mb-1">{stage.location}</p>
                      <p className="text-xs text-muted-foreground mb-2">{formatDate(stage.completion_date)}</p>
                      
                      {stage.notes && (
                        <p className="text-xs text-muted-foreground italic">{stage.notes}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="text-center space-x-4">
                  <Button onClick={generatePDF} variant="outline" size="lg">
                    <Download className="h-5 w-5 mr-2" />
                    Download Report
                  </Button>
                  <Button 
                    onClick={() => {
                      setProductId('');
                      setProduct(null);
                      setJourneyStages([]);
                      setError('');
                    }}
                    variant="ghost"
                    size="lg"
                  >
                    Track Another Product
                  </Button>
                </div>
              </div>
            )}

            {/* Default Message */}
            {!loading && !product && !error && (
              <div className="text-center py-12">
                <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Track Your Product</h3>
                <p className="text-muted-foreground">
                  Enter a Product ID above or scan a QR code to see the complete journey of your agricultural product.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                  <span>Try sample IDs:</span>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => { setProductId('AGR001'); searchProduct('AGR001'); }}
                    className="p-0 h-auto"
                  >
                    AGR001
                  </Button>
                  <span>•</span>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => { setProductId('AGR002'); searchProduct('AGR002'); }}
                    className="p-0 h-auto"
                  >
                    AGR002
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProductTracker;