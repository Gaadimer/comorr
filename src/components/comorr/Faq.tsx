import { useState } from "react";
import { Plus } from "lucide-react";

const items = [
  { q: "How do I find my size?", a: "Our sizes run true to standard fit. Refer to the size guide on each product page; if you're between sizes, we recommend sizing down for a closer fit." },
  { q: "When will my order ship?", a: "Orders placed before 2pm local time ship the same business day. Standard delivery arrives in 2–5 business days." },
  { q: "What is your return policy?", a: "Try them on. If they're not right, return unworn pairs within 30 days for a full refund. Worn pairs from a multi-pack remain yours to keep." },
  { q: "What fabrics do you use?", a: "We use 95% Micromodal with 5% Elastane for stretch and a high-twist combed cotton blend on the Everyday Trunk. Both are OEKO-TEX certified." },
  { q: "How should I care for them?", a: "Machine wash cold with like colors. Tumble dry low or hang to extend fabric life. No bleach, no fabric softener." },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="py-28 sm:py-36">
      <div className="container-comorr grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
        <div>
          <p className="eyebrow">Support</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Frequently asked.</h2>
        </div>
        <div>
          {items.map((it, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className="border-b border-border">
                <button
                  className="w-full flex items-center justify-between py-6 text-left"
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="text-lg sm:text-xl font-display">{it.q}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      open ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted-foreground max-w-prose leading-relaxed">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
