import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ icon: Icon, title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3 mb-4 ${className}`}>
      <div className="p-2 bg-sky-100 rounded-lg">
        <Icon className="w-5 h-5 text-sky-600" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}
