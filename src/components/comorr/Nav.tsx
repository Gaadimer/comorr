import { useEffect, useState } from "react";
import { ShoppingBag, Menu, Search, User } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Nav({ onCartOpen }: { onCartOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-comorr flex h-16 items-center justify-between">
        <button className="md:hidden -ml-2 p-2" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#shop" className="hover:opacity-60 transition-opacity">Shop</a>
          <a href="#fabric" className="hover:opacity-60 transition-opacity">Fabric</a>
          <a href="#bundles" className="hover:opacity-60 transition-opacity">Bundles</a>
          <a href="#story" className="hover:opacity-60 transition-opacity">Story</a>
        </nav>
        <a
          href="#top"
          className="absolute left-1/2 -translate-x-1/2 font-display text-[1.35rem] tracking-[0.32em] font-medium"
        >
          COMORR
        </a>
        <div className="flex items-center gap-1">
          <button className="p-2 hover:opacity-60 transition" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>
          <Link to="/auth" className="p-2 hover:opacity-60 transition hidden sm:inline-flex" aria-label="Account">
            <User className="h-[18px] w-[18px]" />
          </Link>
          <button
            onClick={onCartOpen}
            className="p-2 hover:opacity-60 transition relative"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
}
