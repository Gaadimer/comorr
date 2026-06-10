import { X } from "lucide-react";
import { useEffect } from "react";

export function Cart({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-dvh w-full sm:w-[440px] bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 h-16 border-b border-border">
            <h2 className="text-sm tracking-[0.22em] uppercase font-medium">Your Bag</h2>
            <button onClick={onClose} aria-label="Close cart" className="p-2 -mr-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
            <p className="font-display text-2xl">Your bag is empty.</p>
            <p className="text-sm text-muted-foreground max-w-[28ch]">
              Start with an Essential Boxer Brief or save with a 3-Pack.
            </p>
            <button onClick={onClose} className="btn-primary mt-4">Continue Shopping</button>
          </div>
          <div className="border-t border-border p-6 text-xs text-muted-foreground space-y-1">
            <p>Free shipping on orders over $60.</p>
            <p>30-day comfort guarantee.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
