import { useState } from "react";
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
  { title: "Amalfi Coast Escape", dates: "Nov 12 - Nov 18, 2024", status: "Confirmed", image: amalfiImg },
  { title: "Kyoto Zen Retreat", dates: "Mar 05 - Mar 15, 2025", status: "Planning", image: kyotoImg },
  { title: "Santorini Sunsets", dates: "Jun 20 - Jun 27, 2025", status: "Confirmed", image: santoriniImg },
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

        {/* Upcoming Trips */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Trips</h2>
            <span className="text-xs text-primary cursor-pointer hover:underline">See all</span>
          </div>
          <div className="space-y-3">
            {trips.map((trip) => (
              <div key={trip.title} className="glass rounded-2xl p-3 flex items-center gap-4 hover:bg-card/80 transition-colors cursor-pointer">
                <img src={trip.image} alt={trip.title} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${trip.status === "Confirmed" ? "bg-success/20 text-success" : "bg-accent/20 text-accent"}`}>
                      {trip.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-1 truncate">{trip.title}</p>
                  <p className="text-xs text-muted-foreground">{trip.dates}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expense Splitter */}
        <section className="glass rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <MaterialIcon icon="payments" className="text-primary" size={22} />
            <h3 className="font-semibold text-foreground">Expense Splitter</h3>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-foreground">$3,420.50</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Per person:</p>
              <p className="text-lg font-semibold text-foreground">$855.12</p>
            </div>
          </div>
          <button className="w-full bg-secondary hover:bg-secondary/80 rounded-xl py-2.5 text-sm font-medium text-secondary-foreground transition-colors">
            View Full Breakdown
          </button>
        </section>

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

        {/* Add Custom Trip */}
        <div className="glass rounded-2xl p-5 border-2 border-dashed border-border hover:border-primary/40 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MaterialIcon icon="add" className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Add Custom Trip</p>
              <p className="text-xs text-muted-foreground">Start your next journey from scratch</p>
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { icon: "beach_access", label: "Beach" },
              { icon: "terrain", label: "Mountain" },
              { icon: "apartment", label: "City" },
            ].map((tag) => (
              <span key={tag.label} className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1.5 text-xs text-secondary-foreground">
                <MaterialIcon icon={tag.icon} size={14} />
                {tag.label}
              </span>
            ))}
          </div>
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
