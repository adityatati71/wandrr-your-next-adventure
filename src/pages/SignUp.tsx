import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WandrLogo from "@/components/WandrLogo";
import MaterialIcon from "@/components/MaterialIcon";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", bio: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative overflow-hidden grain">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-primary/8 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md animate-fade-in relative z-10">
        <div className="flex justify-center mb-8">
          <WandrLogo size="large" />
        </div>

        <div className="glass-strong rounded-3xl p-8 neon-border">
          <h2 className="text-2xl font-display font-bold text-foreground text-center mb-1">join the crew 🚀</h2>
          <p className="text-muted-foreground text-sm text-center mb-8">your next adventure starts here</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField icon="person" placeholder="your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <InputField icon="mail" placeholder="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <InputField icon="lock" placeholder="password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
            <InputField icon="lock_reset" placeholder="confirm password" type="password" value={form.confirm} onChange={(v) => setForm({ ...form, confirm: v })} />
            <div className="relative group">
              <MaterialIcon icon="description" size={20} className="absolute left-4 top-3 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <textarea
                placeholder="tell us about yourself ✍️"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full bg-input/80 rounded-2xl pl-12 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none h-20 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary-gradient py-3.5 rounded-2xl font-semibold text-sm tracking-wide"
            >
              CREATE ACCOUNT ✨
            </button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          already exploring?{" "}
          <Link to="/signin" className="text-primary font-semibold hover:underline">
            sign in →
          </Link>
        </p>

        <div className="flex justify-center gap-6 mt-8 text-[11px] text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  icon, placeholder, type = "text", value, onChange,
}: {
  icon: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void;
}) => (
  <div className="relative group">
    <MaterialIcon icon={icon} size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-input/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
    />
  </div>
);

export default SignUp;
