-- 1. BẢNG CÁC UNIT CỦA GIÁO TRÌNH PREPARE LEVEL 3
CREATE TABLE IF NOT EXISTS public.units (
  id SERIAL PRIMARY KEY,
  unit_number INT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  topic TEXT NOT NULL,
  grammar_summary TEXT
);

-- 2. BẢNG TỪ VỰNG CHI TIẾT THEO TỪNG UNIT
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES public.units(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  word TEXT NOT NULL,
  part_of_speech TEXT NOT NULL,
  ipa TEXT NOT NULL,
  meaning_vi TEXT NOT NULL,
  example_en TEXT,
  example_vi TEXT,
  audio_url TEXT
);

-- 3. BẢNG TIẾN ĐỘ TỪ VỰNG CÁ NHÂN (TÁCH BIỆT CHO MỖI TÀI KHOẢN)
CREATE TABLE IF NOT EXISTS public.vocabulary_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  vocabulary_id INT REFERENCES public.vocabulary(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'learning', 'mastered')),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, vocabulary_id)
);

-- 4. BẢNG GIÁO TRÌNH PHÁT ÂM (11 UNITS CẶP ÂM)
CREATE TABLE IF NOT EXISTS public.pronunciation_units (
  id SERIAL PRIMARY KEY,
  unit_number INT NOT NULL UNIQUE,
  sound_pair TEXT NOT NULL,
  title TEXT NOT NULL,
  guide_summary TEXT,
  dialogue TEXT
);

-- 5. BẢNG CHI TIẾT ÂM (KHẨU HÌNH, MINIMAL PAIRS, CÂU MẪU KÈM IPA)
CREATE TABLE IF NOT EXISTS public.pronunciation_sounds (
  id SERIAL PRIMARY KEY,
  unit_id INT REFERENCES public.pronunciation_units(id) ON DELETE CASCADE,
  ipa TEXT NOT NULL,
  sound_type TEXT NOT NULL,
  mouth_guide TEXT NOT NULL,
  minimal_pairs JSONB DEFAULT '[]'::jsonb,
  example_sentences JSONB DEFAULT '[]'::jsonb
);

-- 6. BẢNG LỊCH HỌC VỚI GIÁO VIÊN (DÙNG CHUNG CHO 2 BẠN)
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  teacher_name TEXT NOT NULL DEFAULT 'Cô giáo',
  unit_id INT REFERENCES public.units(id) ON DELETE SET NULL,
  unit_title TEXT,
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BẢNG TIẾN ĐỘ BÀI HỌC CÁ NHÂN
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  unit_id INT REFERENCES public.units(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, unit_id)
);

-- BẬT ROW LEVEL SECURITY (RLS)
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pronunciation_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pronunciation_sounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

-- CHÍNH SÁCH BẢO MẬT: NỘI DUNG GIÁO TRÌNH (CHO PHÉP ĐỌC)
CREATE POLICY "Cho phép đọc Units" ON public.units FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Cho phép đọc Vocabulary" ON public.vocabulary FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Cho phép đọc Pronunciation Units" ON public.pronunciation_units FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Cho phép đọc Pronunciation Sounds" ON public.pronunciation_sounds FOR SELECT TO authenticated, anon USING (true);

-- CHÍNH SÁCH BẢO MẬT: LỊCH HỌC VỚI GIÁO VIÊN (2 BẠN CÙNG XEM & CÙNG THÊM/SỬA ĐƯỢC)
CREATE POLICY "Xem lịch học chung" ON public.study_sessions FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Tạo lịch học chung" ON public.study_sessions FOR INSERT TO authenticated, anon WITH CHECK (true);
CREATE POLICY "Cập nhật lịch học chung" ON public.study_sessions FOR UPDATE TO authenticated, anon USING (true);
CREATE POLICY "Xóa lịch học chung" ON public.study_sessions FOR DELETE TO authenticated, anon USING (true);

-- CHÍNH SÁCH BẢO MẬT: TIẾN ĐỘ CÁ NHÂN (CHỈ CHÍNH CHỦ MỚI XEM/SỬA)
CREATE POLICY "Xem tiến độ từ vựng cá nhân" ON public.vocabulary_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Tạo tiến độ từ vựng cá nhân" ON public.vocabulary_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Cập nhật tiến độ từ vựng cá nhân" ON public.vocabulary_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Xem tiến độ bài học cá nhân" ON public.lesson_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Tạo tiến độ bài học cá nhân" ON public.lesson_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Cập nhật tiến độ bài học cá nhân" ON public.lesson_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id);
