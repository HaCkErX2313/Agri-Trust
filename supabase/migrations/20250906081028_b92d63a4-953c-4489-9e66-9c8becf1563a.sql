-- Create products table for tracking
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  farmer_name TEXT NOT NULL,
  farmer_location TEXT NOT NULL,
  crop_type TEXT NOT NULL,
  harvest_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create journey_stages table for tracking each stage
CREATE TABLE public.journey_stages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL CHECK (stage_name IN ('Farmer', 'FPO', 'Transport', 'Mandi', 'Retailer')),
  status TEXT NOT NULL CHECK (status IN ('Completed', 'Pending', 'In Transit')) DEFAULT 'Pending',
  location TEXT NOT NULL,
  completion_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey_stages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required for tracking)
CREATE POLICY "Products are publicly readable" 
ON public.products 
FOR SELECT 
USING (true);

CREATE POLICY "Journey stages are publicly readable" 
ON public.journey_stages 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_journey_stages_updated_at
BEFORE UPDATE ON public.journey_stages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.products (product_id, product_name, farmer_name, farmer_location, crop_type, harvest_date) VALUES
('AGR001', 'Organic Wheat', 'Raj Kumar Singh', 'Haryana, India', 'Wheat', '2024-12-15'),
('AGR002', 'Basmati Rice', 'Priya Sharma', 'Punjab, India', 'Rice', '2024-12-10'),
('AGR003', 'Organic Tomatoes', 'Amit Patel', 'Gujarat, India', 'Vegetables', '2024-12-20');

-- Insert journey stages for sample products
INSERT INTO public.journey_stages (product_id, stage_name, status, location, completion_date, notes) VALUES
-- AGR001 - Organic Wheat (completed journey)
((SELECT id FROM public.products WHERE product_id = 'AGR001'), 'Farmer', 'Completed', 'Haryana, India', '2024-12-15 10:00:00+00', 'Organic wheat harvested, quality checked'),
((SELECT id FROM public.products WHERE product_id = 'AGR001'), 'FPO', 'Completed', 'Delhi Hub', '2024-12-16 14:30:00+00', 'Quality verification passed'),
((SELECT id FROM public.products WHERE product_id = 'AGR001'), 'Transport', 'Completed', 'Mumbai Route', '2024-12-17 09:15:00+00', 'In transit to Mumbai'),
((SELECT id FROM public.products WHERE product_id = 'AGR001'), 'Mandi', 'Completed', 'Mumbai Mandi', '2024-12-18 11:45:00+00', 'Wholesale distribution'),
((SELECT id FROM public.products WHERE product_id = 'AGR001'), 'Retailer', 'Completed', 'Local Store', '2024-12-19 08:30:00+00', 'Available for consumers'),

-- AGR002 - Basmati Rice (in progress)
((SELECT id FROM public.products WHERE product_id = 'AGR002'), 'Farmer', 'Completed', 'Punjab, India', '2024-12-10 08:00:00+00', 'Premium Basmati rice harvested'),
((SELECT id FROM public.products WHERE product_id = 'AGR002'), 'FPO', 'Completed', 'Punjab FPO Center', '2024-12-11 16:00:00+00', 'Grading and packaging completed'),
((SELECT id FROM public.products WHERE product_id = 'AGR002'), 'Transport', 'In Transit', 'Delhi Route', now(), 'Currently in transit'),
((SELECT id FROM public.products WHERE product_id = 'AGR002'), 'Mandi', 'Pending', 'Delhi Mandi', null, 'Awaiting delivery'),
((SELECT id FROM public.products WHERE product_id = 'AGR002'), 'Retailer', 'Pending', 'Retail Stores', null, 'Not yet reached retail');

-- Create indexes for better performance
CREATE INDEX idx_products_product_id ON public.products(product_id);
CREATE INDEX idx_journey_stages_product_id ON public.journey_stages(product_id);
CREATE INDEX idx_journey_stages_stage_name ON public.journey_stages(stage_name);