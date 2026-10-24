import { useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Car,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Crown,
  ExternalLink,
  FileText,
  KeyRound,
  LockKeyhole,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

const PHONE = '05309316697';
const WHATSAPP = '905309316697';
const logoImage = '/assets/images/logo-oto-cilingir-numarasi.jpg';
const coverageImage = '/assets/images/cilingir-numarasi.jpg';
const keywords = ['acil çilingir', 'oto çilingir', 'kapı açma', 'nöbetçi çilingir'];

const services = [
  { icon: KeyRound, number: '01', title: 'Kapı Açma', copy: 'Konut, ofis ve iş yerlerinde hasarsız, profesyonel kapı açma çözümleri.' },
  { icon: LockKeyhole, number: '02', title: 'Kilit Değişimi', copy: 'Güvenliğinizi yükselten modern kilit sistemleri ve uzman montaj.' },
  { icon: Car, number: '03', title: 'Oto Çilingir', copy: 'İmmobilizer, transponder ve araç kilit çözümleri için mobil destek.' },
  { icon: ShieldCheck, number: '04', title: 'Çelik Kasa', copy: 'Çelik kasa ve yüksek güvenlikli sistemlerde kontrollü uzman müdahalesi.' },
];

const faqs = [
  ['Acil çilingir hizmeti ne zaman verilir?', 'Çilingir Numarası, günün her saati taleplerinizi karşılamak üzere aktif destek hattı sunar.'],
  ['Fiyat bilgisi nasıl belirlenir?', 'İhtiyacınız, adresiniz ve işlem kapsamınız dinlenir; işlem öncesinde ekonomik ve şeffaf bilgi paylaşılır.'],
  ['Hangi bölgelere hizmet veriyorsunuz?', 'Türkiye genelindeki şehir, ilçe ve mahalle taleplerini yönlendiriyor; konumunuza en yakın ekip ile eşleşmenizi sağlıyoruz.'],
];

function getPathInfo() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  if (parts[0] === 'admin') return { page: 'admin', parts };
  if (parts[0] === 'hakkimizda') return { page: 'about', parts };
  if (parts[0] === 'hizmetlerimiz') return { page: 'services', parts };
  if (parts[0] === 'iletisim') return { page: 'contact', parts };
  if (parts.length >= 3) return { page: 'location', parts };
  if (parts.length === 2) return { page: 'district', parts };
  if (parts.length === 1) return { page: 'city', parts };
  return { page: 'home', parts };
}

function phoneHref(phone: string) { return `tel:${phone}`; }
function whatsappHref(phone: string) { return `https://wa.me/${phone}?text=${encodeURIComponent('Merhaba, konumuma acil çilingir talep ediyorum.')}`; }
function titleCase(value: string) { return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toLocaleUpperCase('tr-TR')); }

function App() {
  const [pathInfo, setPathInfo] = useState(getPathInfo());
  const [phone, setPhone] = useState(() => localStorage.getItem('primary_phone') || PHONE);
  const [menuOpen, setMenuOpen] = useState(false);
  const [arama, setArama] = useState('');
  const [acikMi, setAcikMi] = useState(false);
  const tumIller = ["Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"];
  const filtrelenmisIller = tumIller.filter(il => il.toLowerCase().replace('ı','i').includes(arama.toLowerCase().replace('ı','i')));
  useEffect(() => {
    const syncRoute = () => setPathInfo(getPathInfo());
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    setPathInfo(getPathInfo());
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageTitle = pathInfo.page === 'location' ? `${titleCase(pathInfo.parts[0])} ${titleCase(pathInfo.parts[1])} ${titleCase(pathInfo.parts[2].replace('-cilingir-anahtarci', ''))} Çilingir` : 'Çilingir Numarası | Türkiye Geneli 7/24 Acil Çilingir';

  useEffect(() => {
    document.title = pageTitle;
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', window.location.href);
    document.head.appendChild(canonical);
    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Locksmith', name: 'Çilingir Numarası', url: 'https://cilingirnumarasi.com', telephone: phoneHref(phone).replace('tel:', ''), areaServed: 'Türkiye', priceRange: 'Ekonomik & Şeffaf', serviceType: ['Çilingir', 'Anahtarcı', 'Oto Çilingir', 'Kilit Değişimi'], potentialAction: { '@type': 'CommunicateAction', target: phoneHref(phone) } },
        { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://cilingirnumarasi.com/' }, { '@type': 'ListItem', position: 2, name: pageTitle, item: window.location.href }] },
        { '@type': 'FAQPage', mainEntity: faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) },
      ],
    };
    let schemaScript = document.querySelector('#business-schema') as HTMLScriptElement | null;
    if (!schemaScript) { schemaScript = document.createElement('script'); schemaScript.id = 'business-schema'; schemaScript.type = 'application/ld+json'; document.head.appendChild(schemaScript); }
    schemaScript.textContent = JSON.stringify(schema);
  }, [pageTitle, phone]);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase.from('site_settings').select('key, value').eq('key', 'primary_phone').maybeSingle().then(({ data }) => {
      if (active && data?.value && !localStorage.getItem('primary_phone')) setPhone(data.value);
    });
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-ink text-white selection:bg-gold selection:text-ink">
      <Header phone={phone} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} />
      <main>
        {pathInfo.page === 'home' && <Home phone={phone} navigate={navigate} />}
        {pathInfo.page === 'about' && <About phone={phone} navigate={navigate} />}
        {pathInfo.page === 'services' && <Services phone={phone} navigate={navigate} />}
        {pathInfo.page === 'contact' && <Contact phone={phone} />}
        {pathInfo.page === 'admin' && <Admin phone={phone} setPhone={setPhone} />}
        {(pathInfo.page === 'city' || pathInfo.page === 'district' || pathInfo.page === 'location') && <LocationPage phone={phone} navigate={navigate} info={pathInfo} />}
      </main>
      <Footer navigate={navigate} />
      <GlobalActions phone={phone} />
    </div>
  );
}

function Header({ phone, menuOpen, setMenuOpen, navigate }: { phone: string; menuOpen: boolean; setMenuOpen: (value: boolean) => void; navigate: (href: string) => void }) {
  const links = [['Ana Sayfa', '/'], ['Hakkımızda', '/hakkimizda'], ['Hizmetlerimiz', '/hizmetlerimiz'], ['İletişim', '/iletisim']];
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
      <button onClick={() => navigate('/')} className="group flex items-center gap-3 text-left" aria-label="Çilingir Numarası ana sayfa">
        <div className="h-12 w-12 overflow-hidden rounded-xl border border-gold/40 bg-black shadow-glow"><img src={logoImage} alt="Çilingir Numarası altın aslan kilit logosu" className="h-full w-full object-contain p-1" /></div>
        <div><div className="font-display text-lg font-bold tracking-wide text-gold">ÇİLİNGİR</div><div className="text-[10px] font-semibold tracking-[0.3em] text-white/60">NUMARASI.COM</div></div>
      </button>
      <nav className="hidden items-center gap-7 lg:flex">{links.map(([label, href]) => <button key={href} onClick={() => navigate(href)} className="text-sm font-medium text-white/70 transition hover:text-gold">{label}</button>)}<button onClick={() => navigate('/iletisim')} className="rounded-full border border-gold/50 px-5 py-2.5 text-sm font-bold text-gold transition hover:bg-gold hover:text-ink">Hemen Ulaşın <ArrowRight className="ml-1 inline h-4 w-4" /></button></nav>
      <div className="hidden items-center gap-3 md:flex"><div className="text-right"><div className="text-[10px] uppercase tracking-widest text-white/40">7/24 Acil Hat</div><a href={phoneHref(phone)} className="font-display text-lg font-bold text-white transition hover:text-gold">{phone}</a></div><a href={phoneHref(phone)} className="rounded-full bg-gold p-3 text-ink shadow-glow transition hover:scale-105" aria-label="Çilingir numarasını ara"><Phone className="h-5 w-5" /></a></div>
      <button className="rounded-lg border border-white/15 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menüyü aç">{menuOpen ? <X /> : <Menu />}</button>
    </div>
    {menuOpen && <nav className="border-t border-white/10 bg-panel px-5 py-4 lg:hidden">{links.map(([label, href]) => <button key={href} onClick={() => navigate(href)} className="block w-full border-b border-white/5 py-3 text-left text-sm text-white/80">{label}</button>)}<a href={phoneHref(phone)} className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gold py-3 font-bold text-ink"><Phone className="h-4 w-4" /> Hemen Çilingir Ara</a></nav>}
  </header>;
}

function Home({ phone, navigate }: { phone: string; navigate: (href: string) => void }) {
  const [keyword, setKeyword] = useState(() => new URLSearchParams(window.location.search).get('utm_term') || keywords[0]);
  useEffect(() => { const timer = window.setInterval(() => setKeyword((current) => keywords[(keywords.indexOf(current) + 1) % keywords.length]), 3200); return () => window.clearInterval(timer); }, []);
  return <>
    <section className="relative overflow-hidden border-b border-white/10"><div className="absolute inset-0 circuit opacity-60" /><div className="absolute -right-20 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" /><div className="hero-inner relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
      <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold"><Sparkles className="h-4 w-4" /> Türkiye'nin güven kapısı</div><h1 className="max-w-3xl font-display text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">{keyword}<br /><span className="gold-gradient">ihtiyacınızda</span><br />tek numara.</h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-white/65">Adres ve konumunuza en yakın profesyonel çilingir desteği. Gece açık, hızlı ve güven veren servis ağıyla yanınızdayız.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={phoneHref(phone)} className="button-gold"><Phone className="h-5 w-5" /> Hemen Çilingir Ara</a><a href={whatsappHref(WHATSAPP)} target="_blank" rel="noreferrer" className="button-ghost"><MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp'tan Yaz</a></div><div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55"><span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Hasarsız müdahale</span><span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Şeffaf bilgilendirme</span><span className="flex items-center gap-2"><Check className="h-4 w-4 text-gold" /> Mobil servis</span></div></div>
      <div className="hero-art relative mx-auto flex w-full max-w-md items-center justify-center p-3 sm:p-6"><div className="absolute inset-8 rounded-full bg-gold/15 blur-3xl" /><div className="relative w-full rounded-[2rem] border border-gold/35 bg-black/40 p-3 shadow-glow sm:p-4"><img src="/cilingir-numarasi.jpg" alt="Türkiye genelinde çilingir hizmeti ve güven rozeti" className="w-full h-auto object-contain" /><div className="absolute bottom-7 left-7 right-7 flex items-center justify-between rounded-xl border border-white/15 bg-ink/85 p-4 backdrop-blur"><div><div className="text-[10px] uppercase tracking-widest text-gold">Anında bağlantı</div><div className="font-display text-lg font-bold">Güvenli çözüm, tek arama</div></div><Crown className="h-8 w-8 text-gold" /></div></div></div>
    </div></section>
    <section className="mx-auto grid max-w-7xl gap-4 px-5 py-12 sm:grid-cols-3 lg:px-8"><Stat icon={Clock3} title="7/24 Aktif" copy="Gece açık acil destek" /><Stat icon={Compass} title="81 Şehir" copy="Türkiye genelinde erişim" /><Stat icon={BadgeCheck} title="Usta Ekip" copy="Güvenli ve özenli işlem" /></section>
    <ServicePreview navigate={navigate} />
    <TrustSection />
    <FaqSection />
  </>;
}

function Stat({ icon: Icon, title, copy }: { icon: typeof Clock3; title: string; copy: string }) { return <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-panel/60 p-5"><div className="rounded-xl bg-gold/10 p-3 text-gold"><Icon className="h-6 w-6" /></div><div><div className="font-display text-lg font-bold">{title}</div><div className="text-sm text-white/50">{copy}</div></div></div>; }

function ServicePreview({ navigate }: { navigate: (href: string) => void }) { return <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><div className="eyebrow">Uzmanlık alanlarımız</div><h2 className="section-title">Kilitlenen her durumda<br /><span className="text-gold">doğru çözüm.</span></h2></div><button className="link-gold" onClick={() => navigate('/hizmetlerimiz')}>Tüm hizmetleri gör <ArrowRight className="h-4 w-4" /></button></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map(({ icon: Icon, number, title, copy }) => <div key={title} className="group rounded-2xl border border-white/10 bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-glow"><div className="flex items-start justify-between"><div className="rounded-xl border border-gold/20 bg-gold/10 p-3 text-gold"><Icon className="h-6 w-6" /></div><span className="font-display text-sm text-white/25">{number}</span></div><h3 className="mt-8 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">{copy}</p><div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold opacity-0 transition group-hover:opacity-100">Detayları incele <ArrowRight className="h-3 w-3" /></div></div>)}</div></section>; }

function TrustSection() { return <section className="border-y border-white/10 bg-panel/50"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-gold/30 shadow-glow"><img src={coverageImage} alt="Türkiye genelinde çilingir hizmeti ve güven rozeti" className="aspect-[4/3] w-full bg-black/20 object-contain p-4 sm:p-6" /></div><div><div className="eyebrow">Neden Çilingir Numarası?</div><h2 className="section-title">Güvenliğiniz, <span className="text-gold">bizim itibarımız.</span></h2><p className="mt-5 max-w-xl leading-relaxed text-white/60">Kapı açmadan kilit değişimine, oto çilingir hizmetinden çelik kasa çözümlerine kadar tüm talepleriniz için doğru ustayı doğru zamanda buluşturuyoruz.</p><div className="mt-8 grid gap-4 sm:grid-cols-2">{['Hızlı yönlendirme ağı', 'Özenli ve kontrollü işçilik', 'Ekonomik & şeffaf fiyat garantisi', 'Günün her saati ulaşılabilirlik'].map((item) => <div key={item} className="flex items-center gap-3 text-sm text-white/80"><div className="rounded-full bg-gold/15 p-1 text-gold"><Check className="h-3 w-3" /></div>{item}</div>)}</div></div></div></section>; }

function FaqSection() { return <section className="mx-auto max-w-3xl px-5 py-20 lg:px-8"><div className="text-center"><div className="eyebrow justify-center">Merak edilenler</div><h2 className="section-title">İhtiyacınız olan<br /><span className="text-gold">net cevaplar.</span></h2></div><div className="mt-10 space-y-3">{faqs.map(([question, answer]) => <details key={question} className="group rounded-xl border border-white/10 bg-panel px-5 py-4"><summary className="flex cursor-pointer list-none items-center justify-between font-semibold"><span>{question}</span><ChevronDown className="h-5 w-5 text-gold transition group-open:rotate-180" /></summary><p className="pt-4 text-sm leading-relaxed text-white/55">{answer}</p></details>)}</div></section>; }

function InnerHero({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy: string }) { return <section className="relative overflow-hidden border-b border-white/10"><div className="absolute inset-0 circuit opacity-40" /><div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="max-w-3xl"><div className="eyebrow">{eyebrow}</div><h1 className="mt-4 font-display text-5xl font-black leading-tight sm:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{copy}</p></div></div></section>; }

function About({ phone, navigate }: { phone: string; navigate: (href: string) => void }) { return <><InnerHero eyebrow="Hakkımızda" title={<>Güvenin anahtarı,<br /><span className="text-gold">doğru ekipte.</span></>} copy="Çilingir Numarası; güvenlik, hız ve şeffaf iletişim ilkeleriyle Türkiye genelinde profesyonel çilingir hizmetlerini tek çatı altında buluşturur." /><section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8"><div><div className="eyebrow">Bizim yaklaşımımız</div><h2 className="section-title">Zor anlarda<br /><span className="text-gold">sakin çözüm.</span></h2><p className="mt-6 leading-relaxed text-white/60">Kapınız kilitlendiğinde veya aracınızın anahtarına ulaşamadığınızda ihtiyacınız olan şey yalnızca bir usta değil, güvenebileceğiniz bir yönlendirmedir. Her talebi dikkatle dinler, bulunduğunuz bölgeye en yakın çözümü organize ederiz.</p><a href={phoneHref(phone)} className="button-gold mt-8 inline-flex"><Phone className="h-5 w-5" /> Uzmanla görüşün</a></div><div className="grid gap-4 sm:grid-cols-2">{[['Güvenlik', 'Hasarsız ve kontrollü müdahale'], ['Ulaşılabilirlik', 'Türkiye genelinde aktif destek'], ['Şeffaflık', 'İşlem öncesi açık bilgilendirme'], ['Uzmanlık', 'Konut, oto ve ticari çözümler']].map(([title, copy], index) => <div key={title} className="rounded-2xl border border-white/10 bg-panel p-6"><div className="mb-6 font-display text-4xl text-gold/40">0{index + 1}</div><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm text-white/50">{copy}</p></div>)}</div></section><section className="bg-panel/60"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-gold/20 bg-gold/5 p-8 md:flex-row md:items-center"><div><div className="font-display text-2xl font-bold">Hemen destek almanız mı gerekiyor?</div><p className="mt-2 text-white/55">Konumunuzu paylaşın, en yakın çilingir çözümünü birlikte bulalım.</p></div><button onClick={() => navigate('/iletisim')} className="button-gold whitespace-nowrap">İletişime geçin <ArrowRight className="h-4 w-4" /></button></div></div></section></>; }

function Services({ phone, navigate }: { phone: string; navigate: (href: string) => void }) { return <><InnerHero eyebrow="Hizmetlerimiz" title={<>Her kilit için<br /><span className="text-gold">uzman çözüm.</span></>} copy="Acil çilingir, anahtarcı ve güvenlik ihtiyaçlarınız için deneyimli ekiplerle hızlı yönlendirme. İhtiyacınızı anlatın, çözümü birlikte netleştirelim." /><section className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-5 md:grid-cols-2">{services.map(({ icon: Icon, number, title, copy }) => <div key={title} className="group flex gap-6 rounded-2xl border border-white/10 bg-panel p-7 transition hover:border-gold/40"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold"><Icon className="h-7 w-7" /></div><div><div className="text-xs font-bold tracking-widest text-gold">HİZMET {number}</div><h2 className="mt-2 font-display text-2xl font-bold">{title}</h2><p className="mt-3 leading-relaxed text-white/55">{copy}</p><a href={phoneHref(phone)} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold">Talep oluştur <ArrowRight className="h-4 w-4" /></a></div></div>)}</div></section><div className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="rounded-[2rem] border border-gold/30 bg-gradient-to-r from-gold/10 to-transparent p-8 md:p-12"><div className="max-w-2xl"><div className="eyebrow">Doğru hizmet, doğru zamanda</div><h2 className="section-title">En yakın çilingir<br /><span className="text-gold">bir arama uzağınızda.</span></h2><button onClick={() => navigate('/iletisim')} className="button-gold mt-8">Bölgenizi seçin <MapPin className="h-4 w-4" /></button></div></div></div></>; }

function Contact({ phone }: { phone: string }) { return <><InnerHero eyebrow="İletişim" title={<>Kapınızın çözümü<br /><span className="text-gold">tek arama uzağınızda.</span></>} copy="Acil çilingir talebinizi telefonla veya WhatsApp üzerinden iletin. Konumunuza en yakın ekip için hemen harekete geçelim." /><section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8"><div className="space-y-4"><a href={phoneHref(phone)} className="contact-card"><div className="contact-icon"><Phone /></div><div><div className="text-xs uppercase tracking-widest text-white/40">7/24 Acil Telefon</div><div className="mt-1 font-display text-2xl font-bold text-gold">{phone}</div></div><ArrowRight className="ml-auto text-white/30" /></a><a href={whatsappHref(WHATSAPP)} target="_blank" rel="noreferrer" className="contact-card"><div className="contact-icon text-[#25D366]"><MessageCircle /></div><div><div className="text-xs uppercase tracking-widest text-white/40">WhatsApp Destek</div><div className="mt-1 font-semibold">Konumunuzu mesajla iletin</div></div><ExternalLink className="ml-auto text-white/30" /></a><div className="contact-card"><div className="contact-icon"><Clock3 /></div><div><div className="text-xs uppercase tracking-widest text-white/40">Çalışma saatleri</div><div className="mt-1 font-semibold">Günün her saati aktif</div></div></div></div><div className="rounded-3xl border border-white/10 bg-panel p-8"><div className="eyebrow">Talebinizi iletin</div><h2 className="mt-3 font-display text-3xl font-bold">Size nasıl yardımcı olalım?</h2><div className="mt-8 grid gap-4 sm:grid-cols-2"><a href={phoneHref(phone)} className="button-gold justify-center"><Phone className="h-5 w-5" /> Şimdi ara</a><a href={whatsappHref(WHATSAPP)} target="_blank" rel="noreferrer" className="button-ghost justify-center"><MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp</a></div><div className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/50">İşlem öncesi ihtiyacınızı dinliyor, konumunuza göre en uygun yönlendirmeyi sağlıyoruz. Ekonomik ve şeffaf fiyat garantisi için görüşme sırasında bilgi alabilirsiniz.</div></div></section></>; }

function LocationPage({ phone, navigate, info }: { phone: string; navigate: (href: string) => void; info: { page: string; parts: string[] } }) { const city = titleCase(info.parts[0]); const district = info.parts[1] ? titleCase(info.parts[1]) : ''; const neighborhood = info.parts[2] ? titleCase(info.parts[2].replace('-cilingir-anahtarci', '')) : ''; const label = neighborhood || district || city; const heading = neighborhood ? `${neighborhood} ${district} Çilingir` : district ? `${district} Çilingir` : `${city} Çilingir`; const crumbs = [city, district, neighborhood].filter(Boolean); return <><section className="relative overflow-hidden border-b border-white/10"><div className="absolute inset-0 circuit opacity-40" /><div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40"><button onClick={() => navigate('/')} className="hover:text-gold">Ana Sayfa</button>{crumbs.map((crumb) => <span key={crumb} className="flex items-center gap-2"><span>/</span><span className="text-gold">{crumb}</span></span>)}</div><h1 className="mt-7 max-w-4xl font-display text-5xl font-black leading-tight sm:text-6xl">{heading}<br /><span className="text-gold">7/24 yanınızdayız.</span></h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{label} ve çevresinde acil çilingir, anahtarcı, kilit değişimi ve oto çilingir ihtiyaçlarınız için konumunuza en yakın uzman desteği.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={phoneHref(phone)} className="button-gold"><Phone className="h-5 w-5" /> Hemen Çilingir Ara</a><a href={whatsappHref(WHATSAPP)} target="_blank" rel="noreferrer" className="button-ghost"><MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp'tan konum gönder</a></div></div></section><section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-8"><div><div className="eyebrow">Bölgesel hizmet kapsamı</div><h2 className="section-title">{label} için <span className="text-gold">güvenli çözüm.</span></h2><p className="mt-5 leading-relaxed text-white/60">Kapı açma, kilit değişimi, çelik kasa çilingir, oto çilingir ve gece açık çilingir taleplerinizde sizi doğru ekiple buluşturuyoruz. İhtiyacınızı netleştirin, hızlıca harekete geçelim.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{['Acil çilingir', 'Nöbetçi çilingir', 'En yakın çilingir', 'Adres ve konumunuza en yakın çilingir'].map((item) => <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-panel p-4 text-sm" key={item}><Check className="h-4 w-4 text-gold" />{item}</div>)}</div></div><div className="map-placeholder"><Navigation className="h-10 w-10 text-gold" /><div className="mt-4 font-display text-xl font-bold">{label} servis haritası</div><p className="mt-2 max-w-xs text-center text-sm text-white/45">Konumunuza en yakın ekibi bulmak için arayın veya WhatsApp üzerinden konum paylaşın.</p><a href={phoneHref(phone)} className="mt-6 text-sm font-bold text-gold">Konum desteği al <ArrowRight className="ml-1 inline h-4 w-4" /></a></div></section><FaqSection /></>; }

function Admin({ phone, setPhone }: { phone: string; setPhone: (value: string) => void }) { const [value, setValue] = useState(phone); const [saved, setSaved] = useState(false); const save = () => { localStorage.setItem('primary_phone', value); setPhone(value); setSaved(true); window.setTimeout(() => setSaved(false), 2500); }; return <><InnerHero eyebrow="Yönetim merkezi" title={<>Marka kontrolü,<br /><span className="text-gold">tek panelde.</span></>} copy="Telefon ve dönüşüm iletişiminizi merkezi olarak yönetin. Bu alan, marka ayarlarının hızlıca gözden geçirilmesi için hazırlanmıştır." /><section className="mx-auto max-w-5xl px-5 py-16 lg:px-8"><div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]"><aside className="rounded-2xl border border-white/10 bg-panel p-5"><div className="mb-5 text-xs font-bold uppercase tracking-widest text-white/40">Yönetim menüsü</div>{[['Telefon & WhatsApp', Phone], ['SEO içerik şablonları', FileText], ['Bölge matrisi', MapPin], ['Dönüşüm görünümü', BarChart3]].map(([label, Icon]) => <div key={label as string} className="mb-2 flex items-center gap-3 rounded-xl bg-gold/10 px-4 py-3 text-sm font-semibold text-gold"><Icon className="h-4 w-4" />{label as string}</div>)}</aside><div className="rounded-2xl border border-white/10 bg-panel p-7"><div className="eyebrow">Global iletişim ayarı</div><h2 className="mt-2 font-display text-3xl font-bold">Ana telefon numarası</h2><p className="mt-3 text-sm leading-relaxed text-white/50">Bu numara arama butonlarında ve sitenin dönüşüm alanlarında kullanılır.</p><label className="mt-7 block text-xs font-bold uppercase tracking-widest text-white/50">Telefon</label><div className="mt-2 flex gap-3"><input value={value} onChange={(event) => setValue(event.target.value.replace(/\D/g, '').slice(0, 11))} className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/30 px-4 py-3 font-display text-xl tracking-wider text-white outline-none focus:border-gold" /><button onClick={save} className="button-gold">Kaydet</button></div>{saved && <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400"><Check className="h-4 w-4" /> Ayarlar bu tarayıcı için güncellendi.</div>}<div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/10 p-4"><div className="text-xs text-white/40">WhatsApp bağlantısı</div><div className="mt-1 text-sm font-semibold text-emerald-400">Aktif ve senkronize</div></div><div className="rounded-xl border border-white/10 p-4"><div className="text-xs text-white/40">Fiyat alanları</div><div className="mt-1 text-sm font-semibold text-gold">Kullanılmıyor</div></div></div></div></div></section></>; }

function Footer({ navigate }: { navigate: (href: string) => void }) { return <footer className="border-t border-white/10 bg-black"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8"><div><div className="flex items-center gap-3"><div className="h-12 w-12 overflow-hidden rounded-xl border border-gold/40"><img src={logoImage} alt="Çilingir Numarası logosu" className="h-full w-full object-contain p-1" /></div><div><div className="font-display font-bold text-gold">ÇİLİNGİR NUMARASI</div><div className="text-[10px] tracking-[0.24em] text-white/40">GÜVENLİĞİN ADRESİ</div></div></div><p className="mt-5 max-w-sm text-sm leading-relaxed text-white/45">Türkiye genelinde acil çilingir ve anahtarcı ihtiyaçlarınız için hızlı, güvenli ve şeffaf çözüm.</p></div><div><div className="mb-5 text-xs font-bold uppercase tracking-widest text-gold">Keşfet</div>{[['Hakkımızda', '/hakkimizda'], ['Hizmetlerimiz', '/hizmetlerimiz'], ['İletişim', '/iletisim']].map(([label, href]) => <button key={href} onClick={() => navigate(href)} className="mb-3 block text-sm text-white/50 transition hover:text-gold">{label}</button>)}</div><div><div className="mb-5 text-xs font-bold uppercase tracking-widest text-gold">Hizmet bölgeleri</div>< <div className="relative w-full max-w-md mt-4 text-left mx-auto">
  <input
    type="text"
    placeholder="Hizmet bölgesi seçin veya il ara..."
    value={arama}
    onChange={(e) => { setArama(e.target.value); setAcikMi(true); }}
    onFocus={() => setAcikMi(true)}
    className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-lg px-4 py-3 placeholder-zinc-500 focus:outline-none focus:border-amber-500 text-sm shadow-inner"
  />
  {acikMi && (
    <div className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl text-sm">
      {filtrelenmisIller.length > 0 ? (
        filtrelenmisIller.map((il) => (
          <div
            key={il}
            onClick={() => { setArama(il); setAcikMi(false); }}
            className="px-4 py-3 text-zinc-300 hover:bg-amber-500 hover:text-black cursor-pointer transition-colors border-b border-zinc-800/40 last:border-b-0"
          >
            {il}
          </div>
        ))
      ) : (
        <div className="px-4 py-3 text-zinc-500 text-center">Şehir bulunamadı</div>
      
    
  
  {acikMi && <div className="fixed inset-0 z-40" onClick={() => setAcikMi(false)} />}

function GlobalActions({ phone }: { phone: string }) { return <><a href={whatsappHref(WHATSAPP)} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="WhatsApp üzerinden yaz"><MessageCircle className="h-7 w-7" /></a><a href={phoneHref(phone)} className="mobile-call"><Phone className="h-5 w-5" /> HEMEN ÇİLİNGİR ARA</a></>; }

export default App;
