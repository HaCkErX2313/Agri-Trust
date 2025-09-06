-- Step 1: Create a public view that excludes sensitive farmer information
CREATE OR REPLACE VIEW public.products_public AS
SELECT 
    product_id,
    product_name,
    crop_type,
    harvest_date,
    created_at,
    updated_at,
    id
FROM public.products;

-- Step 2: Update RLS policies for products table to require authentication
DROP POLICY IF EXISTS "Products are publicly readable" ON public.products;

-- Only authenticated users can view full product details (including farmer info)
CREATE POLICY "Authenticated users can view products" 
ON public.products 
FOR SELECT 
TO authenticated
USING (true);

-- Step 3: Grant appropriate permissions for the public view
GRANT SELECT ON public.products_public TO anon;
GRANT SELECT ON public.products_public TO authenticated;