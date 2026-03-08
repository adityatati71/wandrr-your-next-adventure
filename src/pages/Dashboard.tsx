import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "@/components/MaterialIcon";
import WandrLogo from "@/components/WandrLogo";
import amalfiImg from "@/assets/amalfi.jpg";
import kyotoImg from "@/assets/kyoto.jpg";
import santoriniImg from "@/assets/santorini.jpg";
import memory1 from "@/assets/memory1.jpg";
import memory2 from "@/assets/memory2.jpg";
import memory3 from "@/assets/memory3.jpg";
import memory4 from "@/assets/memory4.jpg";

const trips = [
  { title: "Amalfi Coast Escape", dates: "Nov 12 - Nov 18, 2024", status: "Confirmed", image: amalfiImg, slug: "amalfi-coast-escape", emoji: "🇮🇹" },
  { title: "Kyoto Zen Retreat", dates: "Mar 05 - Mar 15, 2025", status: "Planning", image: kyotoImg, slug: "kyoto-zen-retreat", emoji: "🇯🇵" },
  { title: "Santorini Sunsets", dates: "Jun 20 - Jun 27, 2025", status: "Confirmed", image: santoriniImg, slug: "santorini-sunsets", emoji: "🇬🇷" },
];

const memories = [memory1, memory2, memory3, memory4];

const navItems = [
  { icon: "home", label: "Home" },
  { icon: "map", label: "Trips" },
  { icon: "account_balance_wallet", label: "Split" },
  { icon: "person", label: "Profile" },
];

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-24 grain">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong px-4 py-3 flex items-center justify-between">
        <WandrLogo size="small" />
        <button className="w-10 h-10 rounded-2xl glass flex items-center justify-center hover:glow-primary transition-all">
          <MaterialIcon icon="search" size={20} className="text-foreground" />
        </button>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-8 animate-fade-in">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">hey alex 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">ready for your next adventure?</p>
        </div>

        {/* Weather card */}
        <div className="glass rounded-3xl p-4 flex items-center gap-4 neon-border">
          <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center glow-accent">
            <MaterialIcon icon="wb_sunny" filled className="text-accent" size={28} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-foreground">24°C</p>
            <p className="text-xs text-muted-foreground">London • vibes are immaculate ☀️</p>
          </div>
        </div>

        {/* Upcoming Trips Carousel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">upcoming trips 🗺️</h2>
            <span className="text-xs text-primary cursor-pointer hover:underline font-medium">see all</span>
          </div>

          <div className="relative group">
            <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`} />
            {canScrollLeft && (
              <button onClick={() => scroll("left")} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-2xl glass-strong flex items-center justify-center hover:glow-primary transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                <MaterialIcon icon="chevron_left" size={22} className="text-foreground" />
              </button>
            )}

            <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 py-2">
              {trips.map((trip) => (
                <Link key={trip.slug} to={`/trip/${trip.slug}`} className="snap-start shrink-0 w-[260px] rounded-3xl overflow-hidden glass group/card hover:scale-[1.02] transition-all duration-300 cursor-pointer neon-border">
                  <div className="relative h-40 overflow-hidden">
                    <img src={trip.image} alt={trip.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xl ${
                      trip.status === "Confirmed" ? "bg-success/30 text-success" : "bg-accent/30 text-accent"
                    }`}>
                      {trip.status}
                    </span>
                    <span className="absolute top-3 right-3 text-lg">{trip.emoji}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-display font-semibold text-foreground truncate">{trip.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MaterialIcon icon="calendar_month" size={13} /> {trip.dates}
                    </p>
                  </div>
                </Link>
              ))}

              <div className="snap-start shrink-0 w-[260px] rounded-3xl overflow-hidden border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all flex flex-col items-center justify-center cursor-pointer min-h-[220px] group/add">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 group-hover/add:glow-primary transition-all">
                  <MaterialIcon icon="add" size={28} className="text-primary" />
                </div>
                <p className="text-sm font-display font-semibold text-foreground">new trip</p>
                <p className="text-xs text-muted-foreground mt-1">let's plan something 🔥</p>
              </div>
            </div>

            <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`} />
            {canScrollRight && (
              <button onClick={() => scroll("right")} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-2xl glass-strong flex items-center justify-center hover:glow-primary transition-all opacity-0 group-hover:opacity-100 shadow-lg">
                <MaterialIcon icon="chevron_right" size={22} className="text-foreground" />
              </button>
            )}
          </div>
        </section>

        {/* Expense Splitter */}
        <Link to="/splitter" className="block">
          <section className="glass rounded-3xl p-5 hover:scale-[1.01] transition-all neon-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                <MaterialIcon icon="payments" className="text-primary" size={20} />
              </div>
              <h3 className="font-display font-semibold text-foreground flex-1">expense splitter 💸</h3>
              <MaterialIcon icon="chevron_right" size={18} className="text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">total</p>
                <p className="text-2xl font-display font-bold text-foreground">$2,670.50</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">per person</p>
                <p className="text-xl font-display font-bold text-primary">$667.62</p>
              </div>
            </div>
            <div className="flex -space-x-2">
              {[
                { i: "A", c: "bg-primary" },
                { i: "S", c: "bg-neon-pink" },
                { i: "M", c: "bg-success" },
                { i: "E", c: "bg-accent text-accent-foreground" },
              ].map((m, idx) => (
                <div key={idx} className={`w-8 h-8 rounded-xl border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-foreground ${m.c}`}>
                  {m.i}
                </div>
              ))}
            </div>
          </section>
        </Link>

        {/* Balance */}
        <div className="glass rounded-3xl p-5 flex items-center justify-between neon-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-success/20 flex items-center justify-center">
              <MaterialIcon icon="savings" filled className="text-success" size={22} />
            </div>
            <div>
              <p className="text-sm font-display font-semibold text-foreground">your balance</p>
              <p className="text-xs text-success font-semibold">+$124.00 💰</p>
            </div>
          </div>
          <span className="text-[10px] text-muted-foreground bg-success/10 px-3 py-1 rounded-full">owed to you</span>
        </div>

        {/* Shared Memories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">shared memories 📸</h2>
            <span className="text-xs text-primary cursor-pointer hover:underline font-medium">view all</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {memories.map((mem, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden aspect-square group cursor-pointer">
                <img src={mem} alt="Memory" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <MaterialIcon icon="favorite" filled className="text-neon-pink" size={22} />
                </div>
              </div>
            ))}
            <div className="rounded-2xl glass flex items-center justify-center aspect-square cursor-pointer hover:glow-primary transition-all">
              <MaterialIcon icon="add_photo_alternate" className="text-primary" size={28} />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="glass rounded-3xl p-6 text-center neon-border">
          <h3 className="text-lg font-display font-bold gradient-text mb-2">why wandrr? ✨</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            travel smarter, not harder. we handle the boring stuff so you can focus on vibes.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "auto_awesome", title: "AI Plans", desc: "smart itineraries that actually slap", color: "text-primary" },
              { icon: "splitscreen", title: "Split Bills", desc: "no more awkward money convos", color: "text-neon-pink" },
              { icon: "photo_library", title: "Memories", desc: "one place for all the pics", color: "text-accent" },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <MaterialIcon icon={f.icon} className={`${f.color} mb-2`} size={28} />
                <p className="text-xs font-display font-semibold text-foreground mb-1">{f.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 pb-2">
          <WandrLogo size="small" />
          <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-pointer">Instagram</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Twitter</span>
            <span className="hover:text-primary transition-colors cursor-pointer">TikTok</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">© 2024 Wandrr. made with 💜</p>
        </footer>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-strong border-t border-border/50">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(i)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all ${
                activeNav === i ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MaterialIcon icon={item.icon} filled={activeNav === i} size={24} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
