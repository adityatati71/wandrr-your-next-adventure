interface MaterialIconProps {
  icon: string;
  filled?: boolean;
  className?: string;
  size?: number;
}

const MaterialIcon = ({ icon, filled = false, className = "", size = 24 }: MaterialIconProps) => (
  <span
    className={`${filled ? "material-icon-filled" : "material-icon"} select-none ${className}`}
    style={{ fontSize: size }}
  >
    {icon}
  </span>
);

export default MaterialIcon;
