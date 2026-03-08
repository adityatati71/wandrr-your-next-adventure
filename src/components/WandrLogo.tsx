import MaterialIcon from "./MaterialIcon";

const WandrLogo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const iconSize = size === "large" ? 32 : size === "small" ? 20 : 24;
  const textClass = size === "large" ? "text-2xl" : size === "small" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${size === "large" ? "w-10 h-10" : size === "small" ? "w-7 h-7" : "w-8 h-8"} rounded-xl bg-primary/20 flex items-center justify-center`}>
        <MaterialIcon icon="explore" filled className="text-primary" size={iconSize} />
      </div>
      <span className={`${textClass} font-display font-bold tracking-tight gradient-text`}>Wandrr</span>
    </div>
  );
};

export default WandrLogo;
