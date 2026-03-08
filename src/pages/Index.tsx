import { Link } from "react-router-dom";
import MaterialIcon from "@/components/MaterialIcon";
import londonImg from "@/assets/london.jpg";
import baliImg from "@/assets/bali.jpg";
import kyotoImg from "@/assets/kyoto.jpg";

const destinations = [
  { name: "London", label: "next stop 🔥", image: londonImg },
  { name: "Bali", label: "dream szn 🌴", image: baliImg },
  { name: "Kyoto", label: "cultural vibes ⛩️", image: kyotoImg },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden grain">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-neon-pink/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

      {/* Destination cards */}
      <div className="flex gap-4 mb-14 animate-fade-in">
        {destinations.map((dest, i) => (
          <div
            key={dest.name}
            className={`w-36 h-52 md:w-44 md:h-60 rounded-3xl overflow-hidden relative group cursor-pointer neon-border ${
              i === 1 ? "animate-float" : ""
            }`}
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-foreground font-display font-bold text-sm">{dest.name}</p>
              <p className="text-muted-foreground text-[11px]">{dest.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logo and heading */}
      <div className="text-center mb-10 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center glow-primary">
            <MaterialIcon icon="flight_takeoff" className="text-primary" size={32} />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter gradient-text mb-3">
          Wandrr
        </h1>
        <p className="text-lg text-muted-foreground font-light">
          plan trips. split costs. make memories. ✨
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 mb-14 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <Link
          to="/signup"
          className="btn-primary-gradient px-8 py-3.5 rounded-2xl font-semibold text-sm tracking-wide flex items-center gap-2"
        >
          LET'S GO
          <MaterialIcon icon="arrow_forward" size={18} />
        </Link>
        <Link
          to="/signin"
          className="px-8 py-3.5 rounded-2xl font-semibold text-sm tracking-wide glass text-foreground hover:bg-card/80 transition-all"
        >
          SIGN IN
        </Link>
      </div>

      {/* Stats with neon pill badges */}
      <div className="flex gap-6 animate-slide-up" style={{ animationDelay: "500ms" }}>
        <div className="glass rounded-2xl px-6 py-3 text-center">
          <p className="text-xl font-display font-bold text-primary">50k+</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">trips planned</p>
        </div>
        <div className="glass rounded-2xl px-6 py-3 text-center">
          <p className="text-xl font-display font-bold text-accent">120+</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">destinations</p>
        </div>
        <div className="glass rounded-2xl px-6 py-3 text-center">
          <p className="text-xl font-display font-bold text-neon-pink">10k+</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">happy travelers</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
