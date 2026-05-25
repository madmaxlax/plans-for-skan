import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: "yellow" | "blue" | "green" | "red" | "none";
}

export default function Card({ children, className = "", accent = "none" }: CardProps) {
  const borderMap = {
    yellow: "border-l-4 border-l-amber-400",
    blue: "border-l-4 border-l-sky-400",
    green: "border-l-4 border-l-emerald-400",
    red: "border-l-4 border-l-rose-400",
    none: "",
  };
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-100 p-4 ${borderMap[accent]} ${className}`}>
      {children}
    </div>
  );
}
