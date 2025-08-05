-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Create the sideline table for image batches
create table if not exists public.sideline (
  id uuid primary key default uuid_generate_v4(),
  title text,
  date_uploaded date not null,
  image_urls jsonb not null,
  thumbnail_url text not null,
  optimized boolean default false,
  created_at timestamp with time zone default timezone('utc', now()),
  user_id uuid references auth.users(id)
);

-- Create indexes for better performance
create index if not exists idx_sideline_date_uploaded
  on public.sideline (date_uploaded);

create index if not exists idx_sideline_optimized
  on public.sideline (optimized);

-- Enable Row Level Security
alter table public.sideline enable row level security;

-- Create policies for sideline table
create policy "Admin can view all sideline entries" 
on public.sideline 
for select 
using (true);

create policy "Admin can insert sideline entries" 
on public.sideline 
for insert 
with check (auth.uid() is not null);

create policy "Admin can update sideline entries" 
on public.sideline 
for update 
using (auth.uid() is not null);

create policy "Admin can delete sideline entries" 
on public.sideline 
for delete 
using (auth.uid() is not null);

-- Create storage bucket for sideline images
insert into storage.buckets (id, name, public) 
values ('sideline', 'sideline', true);

-- Create storage policies for sideline bucket
create policy "Anyone can view sideline images" 
on storage.objects 
for select 
using (bucket_id = 'sideline');

create policy "Admin can upload sideline images" 
on storage.objects 
for insert 
with check (bucket_id = 'sideline' AND auth.uid() is not null);

create policy "Admin can update sideline images" 
on storage.objects 
for update 
using (bucket_id = 'sideline' AND auth.uid() is not null);

create policy "Admin can delete sideline images" 
on storage.objects 
for delete 
using (bucket_id = 'sideline' AND auth.uid() is not null);