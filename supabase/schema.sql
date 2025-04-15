-- Create works table
CREATE TABLE works (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  year TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  duration TEXT,
  budget TEXT,
  preview_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create work_details table for the details array
CREATE TABLE work_details (
  id SERIAL PRIMARY KEY,
  work_id INTEGER REFERENCES works(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  value TEXT NOT NULL
);

-- Create insights table
CREATE TABLE insights (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  image TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create next_article table to reference the next article for each insight
CREATE TABLE next_articles (
  id SERIAL PRIMARY KEY,
  insight_id INTEGER REFERENCES insights(id) ON DELETE CASCADE,
  next_insight_id INTEGER REFERENCES insights(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  author TEXT NOT NULL,
  image TEXT NOT NULL,
  slug TEXT NOT NULL
);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Create policy to allow public access to images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
