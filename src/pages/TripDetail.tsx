import { useParams, Link } from "react-router-dom";
import MaterialIcon from "@/components/MaterialIcon";
import amalfiImg from "@/assets/amalfi.jpg";
import kyotoImg from "@/assets/kyoto.jpg";
import santoriniImg from "@/assets/santorini.jpg";

const tripsData: Record<string, {
  title: string; dates: string; status: string; image: string; location: string;
  budget: string; travelers: number; description: string;
  itinerary: { day: number; title: string; activities: string[] }[];
  packingList: string[];
}> = {
  "amalfi-coast-escape": {
    title: "Amalfi Coast Escape", dates: "Nov 12 - Nov 18, 2024", status: "Confirmed",
    image: amalfiImg, location: "Amalfi Coast, Italy", budget: "$4,200",
    travelers: 4, description: "A week-long adventure along Italy's stunning coastline with breathtaking views, local cuisine, and unforgettable sunsets.",
    itinerary: [
      { day: 1, title: "Arrival & Positano", activities: ["Check into Hotel Villa Franca", "Walk through Positano streets", "Sunset dinner at La Sponda"] },
      { day: 2, title: "Amalfi Town", activities: ["Visit Duomo di Amalfi", "Explore paper museums", "Lunch at Marina Grande beach"] },
      { day: 3, title: "Ravello & Gardens", activities: ["Villa Rufolo gardens tour", "Concert at Ravello Festival", "Aperitivo with a view"] },
      { day: 4, title: "Capri Day Trip", activities: ["Ferry to Capri", "Blue Grotto visit", "Shopping in Anacapri"] },
      { day: 5, title: "Beach & Relax", activities: ["Fornillo Beach morning", "Cooking class — pasta making", "Free evening exploration"] },
    ],
    packingList: ["Sunscreen SPF50+", "Comfortable walking shoes", "Swimwear", "Light linen clothes", "Camera", "Power adapter (EU)"],
  },
  "kyoto-zen-retreat": {
    title: "Kyoto Zen Retreat", dates: "Mar 05 - Mar 15, 2025", status: "Planning",
    image: kyotoImg, location: "Kyoto, Japan", budget: "$5,800",
    travelers: 2, description: "Immerse yourself in ancient temples, cherry blossoms, and the serene beauty of Japan's cultural capital.",
    itinerary: [
      { day: 1, title: "Arrival & Gion", activities: ["Check into traditional Ryokan", "Walk through Gion district", "Kaiseki dinner experience"] },
      { day: 2, title: "Temples & Shrines", activities: ["Fushimi Inari Shrine (early)", "Kinkaku-ji Golden Temple", "Tea ceremony in Higashiyama"] },
      { day: 3, title: "Arashiyama", activities: ["Bamboo grove walk", "Monkey park visit", "Togetsu Bridge area"] },
    ],
    packingList: ["Comfortable walking shoes", "Layers for spring weather", "Japan Rail Pass", "Pocket WiFi", "Respectful temple attire"],
  },
  "santorini-sunsets": {
    title: "Santorini Sunsets", dates: "Jun 20 - Jun 27, 2025", status: "Confirmed",
    image: santoriniImg, location: "Santorini, Greece", budget: "$3,600",
    travelers: 2, description: "Iconic white-washed villages, volcanic beaches, and the most spectacular sunsets in the Mediterranean.",
    itinerary: [
      { day: 1, title: "Oia Welcome", activities: ["Arrive at Santorini airport", "Check into cave hotel", "Sunset at Oia Castle"] },
      { day: 2, title: "Caldera Cruise", activities: ["Catamaran sailing tour", "Hot springs swim", "BBQ lunch on board"] },
      { day: 3, title: "Wine & Beaches", activities: ["Santo Wines tasting", "Red Beach exploration", "Dinner in Fira"] },
    ],
    packingList: ["Sunscreen", "Hat and sunglasses", "Swimwear", "White outfit for photos", "Waterproof phone case"],
  },
};

const TripDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const trip = slug ? tripsData[slug] : null;

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <MaterialIcon icon="explore_off" size={48} className="text-muted-foreground mb-4" />
          <p className="text-foreground font-semibold">Trip not found</p>
          <Link to="/dashboard" className="text-primary text-sm mt-2 inline-block">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-72 overflow-hidden">
        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Link to="/dashboard" className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center">
          <MaterialIcon icon="arrow_back" size={20} className="text-foreground" />
        </Link>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center">
          <MaterialIcon icon="more_horiz" size={20} className="text-foreground" />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${trip.status === "Confirmed" ? "bg-success/20 text-success" : "bg-accent/20 text-accent"}`}>
            {trip.status}
          </span>
          <h1 className="text-2xl font-bold text-foreground mt-2">{trip.title}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <MaterialIcon icon="location_on" size={14} /> {trip.location}
          </p>
        </div>
      </div>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6 animate-fade-in">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "calendar_month", label: "Dates", value: trip.dates.split(",")[0] },
            { icon: "groups", label: "Travelers", value: `${trip.travelers} people` },
            { icon: "account_balance_wallet", label: "Budget", value: trip.budget },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-3 text-center">
              <MaterialIcon icon={stat.icon} size={20} className="text-primary mb-1" />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* About */}
        <section className="glass rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <MaterialIcon icon="info" size={18} className="text-primary" /> About this trip
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{trip.description}</p>
        </section>

        {/* Itinerary */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MaterialIcon icon="route" size={22} className="text-primary" /> Itinerary
          </h2>
          <div className="space-y-3">
            {trip.itinerary.map((day) => (
              <div key={day.day} className="glass rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {day.day}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{day.title}</h3>
                </div>
                <div className="pl-11 space-y-2">
                  {day.activities.map((activity, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                      <p className="text-xs text-muted-foreground">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Packing List */}
        <section className="glass rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <MaterialIcon icon="luggage" size={18} className="text-accent" /> Packing List
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {trip.packingList.map((item) => (
              <label key={item} className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer group">
                <div className="w-4 h-4 rounded border border-border group-hover:border-primary transition-colors flex items-center justify-center">
                  <MaterialIcon icon="check" size={12} className="text-transparent group-hover:text-primary transition-colors" />
                </div>
                {item}
              </label>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pb-8">
          <button className="btn-primary-gradient rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2">
            <MaterialIcon icon="edit" size={18} /> Edit Trip
          </button>
          <button className="glass rounded-2xl py-3 text-sm font-semibold text-foreground flex items-center justify-center gap-2 hover:bg-card/80 transition-colors">
            <MaterialIcon icon="share" size={18} /> Share
          </button>
        </div>
      </main>
    </div>
  );
};

export default TripDetail;
