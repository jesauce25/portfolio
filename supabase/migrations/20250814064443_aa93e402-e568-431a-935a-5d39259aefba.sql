-- Fix security vulnerability: Restrict sideline SELECT policy to user's own content
DROP POLICY IF EXISTS "Admin can view all sideline entries" ON public.sideline;

-- Create secure policy that only allows users to view their own sideline entries
CREATE POLICY "Users can view their own sideline entries" 
ON public.sideline 
FOR SELECT 
USING (auth.uid() = user_id);

-- Optional: Create a separate policy for public viewing if needed (currently disabled)
-- Uncomment the line below if you want to allow public viewing of specific entries
-- CREATE POLICY "Public can view published sideline entries" ON public.sideline FOR SELECT USING (is_public = true);