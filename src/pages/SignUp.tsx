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
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-8">
          <WandrLogo size="large" />
        </div>

        <div className="glass-strong rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Create Your Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              icon="person"
              placeholder="Full Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <InputField
              icon="mail"
              placeholder="Email Address"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <InputField
              icon="lock"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
            />
            <InputField
              icon="lock_reset"
              placeholder="Confirm"
              type="password"
              value={form.confirm}
              onChange={(v) => setForm({ ...form, confirm: v })}
            />
            <div className="relative">
              <MaterialIcon icon="description" size={20} className="absolute left-3 top-3 text-muted-foreground" />
              <textarea
                placeholder="Bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full bg-input rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none h-20"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary-gradient py-3.5 rounded-xl font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              SAVE PROFILE
            </button>
          </form>
        </div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-primary font-medium hover:underline">
            Sign In
          </Link>
        </p>

        <div className="flex justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Support</span>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="relative">
    <MaterialIcon icon={icon} size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-input rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </div>
);

export default SignUp;
