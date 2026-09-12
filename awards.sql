-- Execute this script in your Supabase SQL Editor to create the awards table

CREATE TABLE awards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  year text,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;

-- Allow public read access to awards
CREATE POLICY "Allow public read access on awards"
ON awards FOR SELECT
TO public
USING (true);

-- Allow authenticated users to insert, update, delete
CREATE POLICY "Allow authenticated users full access on awards"
ON awards FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
