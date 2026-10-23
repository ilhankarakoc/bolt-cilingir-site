/*
# Create locksmith site content tables

1. New tables
- `site_settings`: public brand and conversion settings used across the website.
- `locations`: seed city, district, and neighborhood records for programmatic location pages.

2. Columns
- `site_settings.key`: stable setting identifier.
- `site_settings.value`: setting value as text.
- `locations.city`: Turkish city name.
- `locations.district`: optional district name.
- `locations.neighborhood`: optional neighborhood name.
- `locations.latitude`, `locations.longitude`: optional map coordinates.
- `locations.slug`: canonical URL segment.

3. Security
- Row level security is enabled on both tables.
- Anonymous and signed-in visitors may read public content.
- No anonymous write access is granted; future admin writes must use an authenticated, ownership-checked workflow.
*/

CREATE TABLE IF NOT EXISTS public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city text NOT NULL,
  district text,
  neighborhood text,
  latitude double precision,
  longitude double precision,
  slug text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT SELECT ON public.locations TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "Public can read locations" ON public.locations;
CREATE POLICY "Public can read locations" ON public.locations FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.site_settings (key, value)
VALUES
  ('primary_phone', '05309316697'),
  ('whatsapp_phone', '905309316697'),
  ('brand_name', 'Çilingir Numarası')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.locations (city, district, neighborhood, latitude, longitude, slug)
VALUES
  ('İstanbul', 'Kadıköy', 'Caferağa', 40.9907, 29.0285, 'istanbul/kadikoy/caferaga-cilingir-anahtarci'),
  ('İstanbul', 'Kadıköy', 'Moda', 40.9818, 29.0270, 'istanbul/kadikoy/moda-cilingir-anahtarci'),
  ('İstanbul', 'Kadıköy', 'Rasimpaşa', 40.9912, 29.0322, 'istanbul/kadikoy/rasimpasa-cilingir-anahtarci')
ON CONFLICT (slug) DO NOTHING;