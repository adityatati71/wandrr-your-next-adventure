import { Link } from "react-router-dom";
import MaterialIcon from "@/components/MaterialIcon";
import londonImg from "@/assets/london.jpg";
import baliImg from "@/assets/bali.jpg";
import kyotoImg from "@/assets/kyoto.jpg";

const destinations = [
  { name: "London", label: "Upcoming trip", image: londonImg },
  { name: "Bali", label: "Dream destination", image: baliImg },
  { name: "Kyoto", label: "Cultural exploration", image: kyotoImg },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Destination cards */}
      <div className="flex gap-4 mb-12 animate-fade-in">
        {destinations.map((dest, i) => (
          <div
            key={dest.name}
            className="w-36 h-48 md:w-44 md:h-56 rounded-2xl overflow-hidden relative group cursor-pointer"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-foreground font-semibold text-sm">{dest.name}</p>
              <p className="text-muted-foreground text-xs">{dest.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Logo and heading */}
      <div className="text-center mb-10 animate-slide-up" style={{ animationDelay: "200ms" }}>
        <div className="flex items-center justify-center gap-3 mb-4">
          <MaterialIcon icon="flight_takeoff" className="text-primary" size={36} />
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-foreground mb-2">Wandrr</h1>
        <p className="text-xl text-muted-foreground font-light">Your Next Trip Planner</p>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 mb-12 animate-slide-up" style={{ animationDelay: "400ms" }}>
        <Link
          to="/signup"
          className="btn-primary-gradient px-8 py-3 rounded-full font-semibold text-sm tracking-wide flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          GET STARTED
          <MaterialIcon icon="arrow_forward" size={18} />
        </Link>
        <Link
          to="/signin"
          className="px-8 py-3 rounded-full font-semibold text-sm tracking-wide border border-border text-foreground hover:bg-secondary transition-colors"
        >
          SIGN IN
        </Link>
      </div>

      {/* Explore text + stats */}
      <div className="text-center animate-slide-up" style={{ animationDelay: "500ms" }}>
        <p className="text-muted-foreground text-sm mb-6">Explore the world</p>
        <div className="flex gap-10">
          <div>
            <p className="text-2xl font-bold text-foreground">50k+</p>
            <p className="text-xs text-muted-foreground">Planned Trips</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">120+</p>
            <p className="text-xs text-muted-foreground">Destinations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
