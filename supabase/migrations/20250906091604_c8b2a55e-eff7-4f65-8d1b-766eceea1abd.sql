-- Fix the security definer view issue by recreating the view without SECURITY DEFINER
-- This ensures the view uses the permissions of the querying user, not the view creator
DROP VIEW IF EXISTS public.products_public;

CREATE VIEW public.products_public AS
SELECT 
    product_id,
    product_name,
    crop_type,
    harvest_date,
    created_at,
    updated_at,
    id
FROM public.products;

-- Re-grant permissions
GRANT SELECT ON public.products_public TO anon;
GRANT SELECT ON public.products_public TO authenticated;