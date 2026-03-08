import MaterialIcon from "./MaterialIcon";

const WandrLogo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const iconSize = size === "large" ? 32 : size === "small" ? 20 : 24;
  const textClass = size === "large" ? "text-2xl" : size === "small" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-2">
      <MaterialIcon icon="explore" filled className="text-primary" size={iconSize} />
      <span className={`${textClass} font-bold tracking-tight text-foreground`}>Wandrr</span>
    </div>
  );
};

export default WandrLogo;
