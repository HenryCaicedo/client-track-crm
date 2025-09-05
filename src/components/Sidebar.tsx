"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { label: "Client list", href: "/clients" },
  { label: "Product list", href: "/products" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-72 bg-gray-900 text-white flex flex-col p-6">
      <h1 className="text-xl font-bold mb-8">Menu</h1>
      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`transition-colors ${
              pathname.includes(item.href)
                ? "text-blue-400 font-semibold"
                : "hover:text-blue-300"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
