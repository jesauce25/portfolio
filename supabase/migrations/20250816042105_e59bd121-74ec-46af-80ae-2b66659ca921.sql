-- Manually assign admin role to the existing admin user
INSERT INTO public.user_roles (user_id, role) 
VALUES ('e2e18d74-50cc-42ec-acc2-a31f3ab59aaf', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;