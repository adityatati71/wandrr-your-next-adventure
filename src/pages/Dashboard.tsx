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
  { title: "Amalfi Coast Escape", dates: "Nov 12 - Nov 18, 2024", status: "Confirmed", image: amalfiImg, slug: "amalfi-coast-escape" },
  { title: "Kyoto Zen Retreat", dates: "Mar 05 - Mar 15, 2025", status: "Planning", image: kyotoImg, slug: "kyoto-zen-retreat" },
  { title: "Santorini Sunsets", dates: "Jun 20 - Jun 27, 2025", status: "Confirmed", image: santoriniImg, slug: "santorini-sunsets" },
];

const memories = [memory1, memory2, memory3, memory4];

const navItems = [
  { icon: "home", label: "Home", active: true },
  { icon: "map", label: "Trips", active: false },
  { icon: "account_balance_wallet", label: "Splitter", active: false },
  { icon: "person", label: "Profile", active: false },
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
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong px-4 py-3 flex items-center justify-between">
        <WandrLogo size="small" />
        <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
          <MaterialIcon icon="search" size={20} className="text-secondary-foreground" />
        </button>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-8 animate-fade-in">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Hi, Alex 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Let's plan your next trip together.</p>
        </div>

        {/* Weather card */}
        <div className="glass rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <MaterialIcon icon="wb_sunny" filled className="text-accent" size={28} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">24°C</p>
            <p className="text-xs text-muted-foreground">London • Oct 24</p>
          </div>
        </div>

        {/* Upcoming Trips — Premium Horizontal Carousel */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Trips</h2>
            <span className="text-xs text-primary cursor-pointer hover:underline">See all</span>
          </div>

          <div className="relative group">
            {/* Left blur fade + arrow */}
            <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`} />
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass-strong flex items-center justify-center hover:bg-card/90 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <MaterialIcon icon="chevron_left" size={22} className="text-foreground" />
              </button>
            )}

            {/* Scrollable container */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 py-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {trips.map((trip) => (
                <Link
                  key={trip.slug}
                  to={`/trip/${trip.slug}`}
                  className="snap-start shrink-0 w-[260px] rounded-2xl overflow-hidden glass group/card hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={trip.image}
                      alt={trip.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                      trip.status === "Confirmed" ? "bg-success/30 text-success" : "bg-accent/30 text-accent"
                    }`}>
                      {trip.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-foreground truncate">{trip.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MaterialIcon icon="calendar_month" size={13} /> {trip.dates}
                    </p>
                  </div>
                </Link>
              ))}

              {/* Add trip card */}
              <div className="snap-start shrink-0 w-[260px] rounded-2xl overflow-hidden border-2 border-dashed border-border hover:border-primary/40 transition-colors flex flex-col items-center justify-center cursor-pointer min-h-[220px]">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <MaterialIcon icon="add" size={28} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">Add New Trip</p>
                <p className="text-xs text-muted-foreground mt-1">Plan your next adventure</p>
              </div>
            </div>

            {/* Right blur fade + arrow */}
            <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`} />
            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full glass-strong flex items-center justify-center hover:bg-card/90 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
              >
                <MaterialIcon icon="chevron_right" size={22} className="text-foreground" />
              </button>
            )}
          </div>
        </section>

        {/* Expense Splitter */}
        <Link to="/splitter" className="block">
          <section className="glass rounded-2xl p-5 hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <MaterialIcon icon="payments" className="text-primary" size={22} />
              <h3 className="font-semibold text-foreground">Expense Splitter</h3>
              <MaterialIcon icon="chevron_right" size={18} className="text-muted-foreground ml-auto" />
            </div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-foreground">$2,670.50</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Per person:</p>
                <p className="text-lg font-semibold text-primary">$667.62</p>
              </div>
            </div>
            <div className="flex -space-x-2">
              {["A", "S", "M", "E"].map((initial, i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary-foreground ${
                  ["bg-primary", "bg-accent", "bg-success", "bg-destructive"][i]
                }`}>
                  {initial}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-card bg-secondary flex items-center justify-center text-[10px] text-muted-foreground">
                +1
              </div>
            </div>
          </section>
        </Link>

        {/* Balance */}
        <div className="glass rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MaterialIcon icon="savings" filled className="text-success" size={24} />
            <div>
              <p className="text-sm font-semibold text-foreground">Your Balance</p>
              <p className="text-xs text-success font-medium">+$124.00</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">You're owed money!</span>
        </div>

        {/* Shared Memories */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Shared Memories</h2>
            <span className="text-xs text-primary cursor-pointer hover:underline">View Gallery</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {memories.map((mem, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden aspect-square group cursor-pointer">
                <img src={mem} alt="Memory" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <MaterialIcon icon="favorite" filled className="text-destructive" size={20} />
                </div>
              </div>
            ))}
            <div className="rounded-xl bg-secondary flex items-center justify-center aspect-square cursor-pointer hover:bg-secondary/80 transition-colors">
              <MaterialIcon icon="add" className="text-muted-foreground" size={28} />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="glass rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-foreground mb-3">The Wandrr Mission</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            We believe travel should be about the moments, not the management. Wandrr brings AI planning, expense management, and shared memories into one elegant space.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "auto_awesome", title: "AI Planning", desc: "Smart itineraries tailored to your unique travel style." },
              { icon: "splitscreen", title: "Splitter", desc: "Effortless expense sharing for stress-free group travel." },
              { icon: "photo_library", title: "Memories", desc: "A collaborative vault for all your favorite trip photos." },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <MaterialIcon icon={f.icon} className="text-primary mb-2" size={28} />
                <p className="text-xs font-semibold text-foreground mb-1">{f.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 pb-2">
          <WandrLogo size="small" />
          <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
            <span>Instagram</span><span>Twitter</span><span>Facebook</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-3">© 2024 Wandrr Technologies. All rights reserved.</p>
        </footer>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-strong border-t border-border">
        <div className="max-w-lg mx-auto flex items-center justify-around py-2">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(i)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
                activeNav === i ? "text-primary" : "text-muted-foreground hover:text-foreground"
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
