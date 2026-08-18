-- ==============================================================================
-- SciPrep / NEST SmartPrep — Complete Supabase Database Schema
-- Run this script in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ==============================================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  target_exam TEXT DEFAULT 'NEST 2027',
  target_score INTEGER DEFAULT 145,
  target_rank INTEGER DEFAULT 100,
  target_category TEXT DEFAULT 'General',
  weak_subjects TEXT[] DEFAULT '{}',
  strong_subjects TEXT[] DEFAULT '{}',
  daily_goal_minutes INTEGER DEFAULT 120,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Settings Table
CREATE TABLE IF NOT EXISTS public.user_settings (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  plan TEXT DEFAULT 'FREE',
  theme TEXT DEFAULT 'light',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  signup_date TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. User Progress (Smart Lessons)
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_key TEXT NOT NULL,
  title TEXT,
  is_completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  notes_read BOOLEAN DEFAULT FALSE,
  quiz_score INTEGER,
  last_studied_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_key)
);

-- 5. Question Attempts (PYQs & Drill Practice)
CREATE TABLE IF NOT EXISTS public.question_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_key TEXT NOT NULL,
  question_id UUID DEFAULT '00000000-0000-0000-0000-000000000000',
  is_correct BOOLEAN NOT NULL,
  selected_option TEXT,
  subject TEXT,
  topic TEXT,
  source TEXT DEFAULT 'pyq',
  mode TEXT DEFAULT 'PYQ',
  time_spent_seconds INTEGER DEFAULT 0,
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_key)
);

-- 6. Mock Test Attempts
CREATE TABLE IF NOT EXISTS public.mock_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mock_id TEXT NOT NULL,
  title TEXT,
  score NUMERIC(6, 2) DEFAULT 0,
  max_score NUMERIC(6, 2) DEFAULT 180,
  percentile NUMERIC(5, 2),
  accuracy NUMERIC(5, 2),
  duration_seconds INTEGER DEFAULT 0,
  section_scores JSONB DEFAULT '{}'::jsonb,
  subject_breakdown JSONB DEFAULT '{}'::jsonb,
  question_responses JSONB DEFAULT '[]'::jsonb,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Revision Items
CREATE TABLE IF NOT EXISTS public.revision_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_key TEXT NOT NULL,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT,
  priority TEXT DEFAULT 'HIGH',
  status TEXT DEFAULT 'PENDING',
  added_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, item_key)
);

-- 8. Readiness Snapshots
CREATE TABLE IF NOT EXISTS public.readiness_snapshots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_score NUMERIC(5, 2) NOT NULL,
  physics_score NUMERIC(5, 2) DEFAULT 0,
  chemistry_score NUMERIC(5, 2) DEFAULT 0,
  biology_score NUMERIC(5, 2) DEFAULT 0,
  math_score NUMERIC(5, 2) DEFAULT 0,
  predicted_rank INTEGER,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revision_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.readiness_snapshots ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can select/update their own profile
CREATE POLICY "Users can manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- Settings: Users can manage own settings
CREATE POLICY "Users can manage own settings" ON public.user_settings
  FOR ALL USING (auth.uid() = user_id);

-- Progress: Users can manage own lesson progress
CREATE POLICY "Users can manage own progress" ON public.user_progress
  FOR ALL USING (auth.uid() = user_id);

-- Questions: Users can manage own question attempts
CREATE POLICY "Users can manage own question attempts" ON public.question_attempts
  FOR ALL USING (auth.uid() = user_id);

-- Mocks: Users can manage own mock attempts
CREATE POLICY "Users can manage own mock attempts" ON public.mock_attempts
  FOR ALL USING (auth.uid() = user_id);

-- Revision: Users can manage own revision items
CREATE POLICY "Users can manage own revision items" ON public.revision_items
  FOR ALL USING (auth.uid() = user_id);

-- Readiness: Users can manage own readiness snapshots
CREATE POLICY "Users can manage own readiness snapshots" ON public.readiness_snapshots
  FOR ALL USING (auth.uid() = user_id);

-- 10. Indexes for Fast Query Performance
CREATE INDEX IF NOT EXISTS idx_user_progress_uid ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_uid ON public.question_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_mock_attempts_uid ON public.mock_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_revision_items_uid ON public.revision_items(user_id);
CREATE INDEX IF NOT EXISTS idx_readiness_snapshots_uid ON public.readiness_snapshots(user_id);
