"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  MapPin,
  User,
  HelpCircle,
  Wheat,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/formulaires", label: "Formulaires PAC", icon: FileText },
  { href: "/calendrier", label: "Calendrier", icon: Calendar },
  { href: "/parcellaire", label: "Parcellaire", icon: MapPin },
  { href: "/exploitation", label: "Mon exploitation", icon: User },
  { href: "/aide", label: "Aide & FAQ", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[var(--color-border)] h-screen">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--color-border)]">
        <div className="w-10 h-10 bg-[var(--color-primary)] rounded-xl flex items-center justify-center">
          <Wheat className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-[var(--color-text)] leading-tight">
            PAC Assist
          </h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            Campagne 2026
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary-dark)]"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[var(--color-border)]">
        <div className="bg-[#fffbeb] rounded-lg p-3">
          <p className="text-xs font-medium text-[var(--color-accent-dark)]">
            Date limite PAC
          </p>
          <p className="text-sm font-bold text-[var(--color-accent-dark)]">
            15 mai 2026
          </p>
          <p className="text-xs text-[var(--color-accent-dark)] opacity-75 mt-1">
            Déclaration de surfaces
          </p>
        </div>
      </div>
    </aside>
  );
}
