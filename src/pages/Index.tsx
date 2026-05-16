import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const STATS = [
  { value: "2026", label: "Год выхода" },
  { value: "100M+", label: "Игроков в мире" },
  { value: "4K", label: "Разрешение" },
];

const FEATURES = [
  {
    icon: "Sword",
    title: "Боевая система",
    desc: "Уникальная система рукопашного боя основана на реальном кунг-фу. Каждый удар имеет значение — комбо, уклонения и мастерство решают исход битвы.",
  },
  {
    icon: "Globe",
    title: "Открытый мир",
    desc: "Огромный открытый мир с тысячами живых игроков. Исследуй, сражайся и строй своё приключение вместе с сообществом.",
  },
  {
    icon: "Sparkles",
    title: "Графика нового уровня",
    desc: "Визуальный стиль в реальном времени. Поддержка разрешений до 4K и высокая частота кадров.",
  },
  {
    icon: "MessageCircle",
    title: "Русское сообщество",
    desc: "Тысячи активных игроков в России и СНГ. Гайды на русском языке, Discord, турниры и совместные рейды для всех уровней.",
  },
];

const NAV_LINKS = [
  { label: "Главная", section: "home" },
  { label: "О игре", section: "about" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "about"];
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="scanline min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00ff88 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #00e5ff 0%, transparent 70%)" }}
        />
      </div>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
            <div
              className="w-9 h-9 rounded-md flex items-center justify-center animate-pulse-glow"
              style={{ background: "linear-gradient(135deg, #00ff88, #00c8ff)" }}
            >
              <Icon name="Sword" size={18} className="text-[#050c14]" />
            </div>
            <span
              className="text-xl font-bold tracking-widest uppercase"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              Blade <span className="neon-text">Russia</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.section}
                onClick={() => scrollTo(l.section)}
                className={`text-sm font-medium tracking-wider uppercase transition-all duration-200 relative pb-1 ${
                  activeSection === l.section
                    ? "neon-text"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.12em" }}
              >
                {l.label}
                {activeSection === l.section && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px"
                    style={{
                      background: "var(--neon-green)",
                      boxShadow: "0 0 8px var(--neon-green)",
                    }}
                  />
                )}
              </button>
            ))}
            <a href="https://t.me/Bladerussiaoffical" target="_blank" rel="noopener noreferrer" className="glow-btn px-5 py-2 rounded-md text-sm inline-flex items-center gap-2">
              Играть в Telegram
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.section}
                onClick={() => scrollTo(l.section)}
                className="text-left text-base font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-all"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                {l.label}
              </button>
            ))}
            <a href="https://t.me/Bladerussiaoffical" target="_blank" rel="noopener noreferrer" className="glow-btn px-5 py-2.5 rounded-md text-sm w-full text-center">
              Играть в Telegram
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://cdn.poehali.dev/projects/bdb31413-e1d2-433d-9797-4baba23731f8/bucket/15a68929-bd0c-4ee8-8101-1950b66db1b7.jpg"
            alt="Blade Hero"
            className="w-full h-full object-cover opacity-25"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(7,11,17,0.6) 60%, #070b11 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
          <div
            className="animate-fade-up stagger-1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 neon-border text-xs font-medium tracking-widest uppercase"
            style={{ fontFamily: "Oswald, sans-serif", color: "var(--neon-cyan)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Русскоязычное сообщество
          </div>

          <h1 className="animate-fade-up stagger-2 text-6xl md:text-8xl font-bold uppercase tracking-tight leading-none mb-6">
            <span className="text-white">BLADE</span>
            <br />
            <span className="neon-text">RUSSIA</span>
          </h1>

          <p className="animate-fade-up stagger-3 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Центр русскоязычного сообщества Blade — гайды, новости, турниры и живое общение тысяч игроков
          </p>

          <div className="animate-fade-up stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://t.me/Bladerussiaoffical" target="_blank" rel="noopener noreferrer" className="glow-btn px-8 py-3.5 rounded-md text-base w-full sm:w-auto text-center">
              Играть в Telegram
            </a>
            <button
              onClick={() => scrollTo("about")}
              className="px-8 py-3.5 rounded-md text-base font-semibold uppercase tracking-wider w-full sm:w-auto transition-all duration-200 hover:text-white neon-border text-muted-foreground"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              Об игре
            </button>
          </div>

          {/* Stats */}
          <div className="animate-fade-up stagger-5 grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {STATS.map((s) => (
              <div key={s.label} className="glass-card rounded-lg p-5 text-center neon-border">
                <div
                  className="text-3xl font-bold neon-text mb-1"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float opacity-60">
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Скролл</span>
          <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="mb-20 text-center">
            <div
              className="inline-block px-3 py-1 rounded text-xs uppercase tracking-widest mb-4 neon-border-cyan"
              style={{ color: "var(--neon-cyan)", fontFamily: "Oswald, sans-serif" }}
            >
              Об игре
            </div>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">
              Что такое <span className="neon-cyan">Blade?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Blade Russia — это открытый мир с кучей игроков. Присоединяйся и ты!
            </p>
          </div>

          {/* Image + cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
            <div
              className="relative rounded-xl overflow-hidden neon-border-cyan"
              style={{ minHeight: "420px" }}
            >
              <img
                src="https://cdn.poehali.dev/projects/bdb31413-e1d2-433d-9797-4baba23731f8/bucket/15a68929-bd0c-4ee8-8101-1950b66db1b7.jpg"
                alt="Blade Character"
                className="w-full h-full object-cover"
                style={{ minHeight: "420px" }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,229,255,0.08) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-4 left-4 glass-card rounded-lg px-4 py-3 neon-border-cyan">
                <div className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">
                  Жанр
                </div>
                <div
                  className="font-bold neon-cyan text-sm"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  MMORPG / Fighting
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              {[

              ].map((item) => (
                <div
                  key={item.title}
                  className={`glass-card rounded-xl p-6 ${
                    item.cyan ? "neon-border-cyan" : "neon-border"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: item.cyan
                          ? "rgba(0,229,255,0.12)"
                          : "rgba(0,255,136,0.12)",
                        border: item.cyan
                          ? "1px solid rgba(0,229,255,0.3)"
                          : "1px solid rgba(0,255,136,0.3)",
                      }}
                    >
                      <Icon
                        name={item.icon}
                        fallback="CircleAlert"
                        size={20}
                        className={item.cyan ? "neon-cyan" : "neon-text"}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-white mb-2 uppercase tracking-wider text-sm"
                        style={{ fontFamily: "Oswald, sans-serif" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 group cursor-default"
                style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      i % 2 === 0 ? "rgba(0,255,136,0.1)" : "rgba(0,229,255,0.1)",
                    border: `1px solid ${
                      i % 2 === 0 ? "rgba(0,255,136,0.25)" : "rgba(0,229,255,0.25)"
                    }`,
                  }}
                >
                  <Icon
                    name={f.icon}
                    fallback="CircleAlert"
                    size={22}
                    className={i % 2 === 0 ? "neon-text" : "neon-cyan"}
                  />
                </div>
                <h3
                  className="font-bold text-white mb-2 uppercase tracking-wider text-sm"
                  style={{ fontFamily: "Oswald, sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,255,136,0.06) 0%, rgba(0,229,255,0.04) 50%, transparent 100%)",
          }}
        />
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight mb-6">
            Присоединяйся к <span className="neon-text">нам</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Тысячи игроков уже здесь. Гайды, турниры, Discord и живое общение — всё в одном месте
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://t.me/Bladerussiaoffical" target="_blank" rel="noopener noreferrer" className="glow-btn px-10 py-4 rounded-md text-base inline-flex items-center justify-center gap-2">
              <Icon name="Send" size={18} />
              Наш Telegram
            </a>
            <a href="https://t.me/hoppying" target="_blank" rel="noopener noreferrer"
              className="glass-card px-10 py-4 rounded-md text-base font-semibold uppercase tracking-wider transition-all hover:border-white/20 neon-border-cyan inline-flex items-center justify-center gap-2"
              style={{ fontFamily: "Oswald, sans-serif", color: "var(--neon-cyan)" }}
            >
              <Icon name="MessageCircle" size={18} />
              Связь с владельцем
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00ff88, #00c8ff)" }}
            >
              <Icon name="Sword" size={14} className="text-[#050c14]" />
            </div>
            <span
              className="font-bold tracking-widest uppercase text-sm"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              Blade <span className="neon-text">Russia</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground tracking-wider">
            © 2024 Blade Russia — Неофициальное фан-сообщество
          </p>
          <div className="flex items-center gap-5">
            <a href="https://t.me/hoppying" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all">
              <Icon name="MessageCircle" size={18} />
            </a>
            <a href="https://t.me/Bladerussiaoffical" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-all">
              <Icon name="Send" size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}