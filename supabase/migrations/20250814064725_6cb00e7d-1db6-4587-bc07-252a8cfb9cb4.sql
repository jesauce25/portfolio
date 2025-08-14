-- Create admin user account for login
-- Note: This will create the user via SQL, but the password will need to be set via the admin panel
-- or the user needs to go through the normal signup flow once

-- Insert admin user into auth.users if it doesn't exist
DO $$
BEGIN
  -- Check if admin user already exists
  IF NOT EXISTS (
    SELECT 1 FROM auth.users 
    WHERE email = 'pauloabaquita098956@gmail.com'
  ) THEN
    -- Create admin user with specified email
    -- Note: Supabase will require password to be set through auth flow
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'pauloabaquita098956@gmail.com',
      crypt('098956470123paulo', gen_salt('bf')),
      now(),
      null,
      null,
      '{"provider": "email", "providers": ["email"]}',
      '{}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;