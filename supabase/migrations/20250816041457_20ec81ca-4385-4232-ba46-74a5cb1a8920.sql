-- Create role enum for the application
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for proper role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles safely
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles" 
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Drop existing insecure admin policies on sideline table
DROP POLICY IF EXISTS "Admin can delete sideline entries" ON public.sideline;
DROP POLICY IF EXISTS "Admin can insert sideline entries" ON public.sideline;
DROP POLICY IF EXISTS "Admin can update sideline entries" ON public.sideline;

-- Create secure admin policies that check actual admin role
CREATE POLICY "Admins can delete sideline entries" 
ON public.sideline 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert sideline entries" 
ON public.sideline 
FOR INSERT 
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sideline entries" 
ON public.sideline 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Allow public read access to sideline entries (since it's a public gallery)
CREATE POLICY "Public can view sideline entries" 
ON public.sideline 
FOR SELECT 
USING (true);

-- Drop the old restrictive user policy since we want public access
DROP POLICY IF EXISTS "Users can view their own sideline entries" ON public.sideline;