import { useState } from "react";
import { Link } from "react-router-dom";
import MaterialIcon from "@/components/MaterialIcon";

const expenses = [
  { id: 1, title: "Hotel Villa Franca", amount: 1200, paidBy: "Alex", category: "hotel", date: "Nov 12" },
  { id: 2, title: "La Sponda Dinner", amount: 320, paidBy: "Sarah", category: "food", date: "Nov 12" },
  { id: 3, title: "Ferry to Capri", amount: 180, paidBy: "Alex", category: "transport", date: "Nov 14" },
  { id: 4, title: "Blue Grotto Tour", amount: 240, paidBy: "Mike", category: "activity", date: "Nov 14" },
  { id: 5, title: "Cooking Class", amount: 400, paidBy: "Sarah", category: "activity", date: "Nov 15" },
  { id: 6, title: "Grocery Run", amount: 85.50, paidBy: "Emma", category: "food", date: "Nov 15" },
  { id: 7, title: "Taxi to Airport", amount: 95, paidBy: "Mike", category: "transport", date: "Nov 16" },
  { id: 8, title: "Souvenir Shopping", amount: 150, paidBy: "Alex", category: "shopping", date: "Nov 17" },
];

const members = [
  { name: "Alex", avatar: "A", color: "bg-primary", owes: -124, paid: 1625 },
  { name: "Sarah", avatar: "S", color: "bg-accent", owes: 47.62, paid: 720 },
  { name: "Mike", avatar: "M", color: "bg-success", owes: 332.38, paid: 335 },
  { name: "Emma", avatar: "E", color: "bg-destructive", owes: -255.50, paid: 85.50 },
];

const categoryIcons: Record<string, string> = {
  hotel: "hotel", food: "restaurant", transport: "directions_car",
  activity: "confirmation_number", shopping: "shopping_bag",
};

const settlements = [
  { from: "Mike", to: "Alex", amount: 124 },
  { from: "Mike", to: "Emma", amount: 208.38 },
  { from: "Sarah", to: "Emma", amount: 47.12 },
];

const ExpenseSplitter = () => {
  const [activeTab, setActiveTab] = useState<"expenses" | "balances" | "settle">("expenses");
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPerson = total / members.length;

  return (
    <div className="min-h-screen bg-background pb-8 grain">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-strong px-4 py-3 flex items-center gap-3">
        <Link to="/dashboard" className="w-10 h-10 rounded-2xl glass flex items-center justify-center">
          <MaterialIcon icon="arrow_back" size={20} className="text-foreground" />
        </Link>
        <div className="flex-1">
          <h1 className="text-base font-display font-semibold text-foreground">expense splitter 💸</h1>
          <p className="text-xs text-muted-foreground">amalfi coast escape</p>
        </div>
        <button className="w-10 h-10 rounded-2xl bg-primary/15 flex items-center justify-center hover:glow-primary transition-all">
          <MaterialIcon icon="add" size={20} className="text-primary" />
        </button>
      </header>

      <main className="px-4 py-6 max-w-lg mx-auto space-y-6 animate-fade-in">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-3xl p-4 neon-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">total expenses</p>
            <p className="text-2xl font-display font-bold text-foreground">${total.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{expenses.length} transactions</p>
          </div>
          <div className="glass rounded-3xl p-4 neon-border">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">per person</p>
            <p className="text-2xl font-display font-bold text-primary">${perPerson.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground mt-1">{members.length} members</p>
          </div>
        </div>

        {/* Members Row */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {members.map((m) => (
            <div key={m.name} className="glass rounded-2xl p-3 min-w-[120px] text-center shrink-0">
              <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center text-sm font-bold text-primary-foreground mx-auto mb-2`}>
                {m.avatar}
              </div>
              <p className="text-xs font-semibold text-foreground">{m.name}</p>
              <p className={`text-xs font-medium mt-0.5 ${m.owes > 0 ? "text-destructive" : "text-success"}`}>
                {m.owes > 0 ? `Owes $${m.owes.toFixed(2)}` : `Gets $${Math.abs(m.owes).toFixed(2)}`}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-secondary rounded-xl p-1">
          {(["expenses", "balances", "settle"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "expenses" && (
          <div className="space-y-2 animate-fade-in">
            {expenses.map((expense) => (
              <div key={expense.id} className="glass rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <MaterialIcon icon={categoryIcons[expense.category] || "receipt"} size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{expense.title}</p>
                  <p className="text-[10px] text-muted-foreground">Paid by {expense.paidBy} • {expense.date}</p>
                </div>
                <p className="text-sm font-bold text-foreground">${expense.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "balances" && (
          <div className="space-y-3 animate-fade-in">
            {members.map((m) => (
              <div key={m.name} className="glass rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full ${m.color} flex items-center justify-center text-xs font-bold text-primary-foreground`}>
                    {m.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{m.name}</p>
                    <p className="text-[10px] text-muted-foreground">Paid ${m.paid.toFixed(2)} total</p>
                  </div>
                  <p className={`text-sm font-bold ${m.owes > 0 ? "text-destructive" : "text-success"}`}>
                    {m.owes > 0 ? `-$${m.owes.toFixed(2)}` : `+$${Math.abs(m.owes).toFixed(2)}`}
                  </p>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${m.owes > 0 ? "bg-destructive" : "bg-success"}`}
                    style={{ width: `${Math.min((m.paid / total) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "settle" && (
          <div className="space-y-3 animate-fade-in">
            <p className="text-xs text-muted-foreground">Simplified settlements to minimize transactions:</p>
            {settlements.map((s, i) => (
              <div key={i} className="glass rounded-2xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-xs font-bold text-destructive">
                  {s.from[0]}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{s.from}</span>
                  <MaterialIcon icon="arrow_forward" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">{s.to}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">${s.amount.toFixed(2)}</p>
                  <button className="text-[10px] text-primary font-medium mt-0.5">Remind</button>
                </div>
              </div>
            ))}
            <button className="w-full btn-primary-gradient rounded-2xl py-3 text-sm font-semibold flex items-center justify-center gap-2 mt-4">
              <MaterialIcon icon="check_circle" size={18} /> Settle All
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExpenseSplitter;
