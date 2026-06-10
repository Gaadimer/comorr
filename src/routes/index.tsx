import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Plus, Check, Minus } from "lucide-react";
import heroModel from "@/assets/hero-model.jpg";
import fabricImg from "@/assets/fabric.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import { Nav } from "@/components/comorr/Nav";
import { Cart } from "@/components/comorr/Cart";
import { Faq } from "@/components/comorr/Faq";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "COMORR — Comfort, Refined." },
      { name: "description", content: "Premium men's underwear engineered for everyday comfort, movement, and confidence." },
      { property: "og:title", content: "COMORR — Comfort, Refined." },
      { property: "og:description", content: "Premium men's underwear engineered for everyday comfort, movement, and confidence." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const products = [
  { name: "Essential Boxer Brief", color: "Black", price: 28, img: product1 },
  { name: "Everyday Trunk", color: "Charcoal", price: 28, img: product2 },
  { name: "Core Collection 3-Pack", color: "Mixed Neutrals", price: 72, img: product3, badge: "Save $12" },
  { name: "Weekly Collection 7-Pack", color: "Mixed Neutrals", price: 156, img: product4, badge: "Save $40" },
];

function Home() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div id="top" className="min-h-dvh bg-background">
      <Nav onCartOpen={() => setCartOpen(true)} />
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* ANNOUNCEMENT */}
      <div className="bg-primary text-primary-foreground text-[11px] tracking-[0.22em] uppercase text-center py-2.5">
        Free shipping over $60 · 30-day comfort guarantee
      </div>

      <main>
        {/* HERO */}
        <section className="relative pt-16">
          <div className="grid lg:grid-cols-2 min-h-[88vh]">
            <div className="flex items-center px-6 sm:px-12 lg:px-20 py-16 lg:py-0 order-2 lg:order-1">
              <div className="max-w-xl fade-up">
                <p className="eyebrow">New · Essentials Collection</p>
                <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
                  Comfort,<br />Refined.
                </h1>
                <p className="mt-7 text-lg text-muted-foreground max-w-md leading-relaxed">
                  Premium underwear engineered for everyday comfort, movement, and quiet confidence.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a href="#shop" className="btn-primary">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#fabric" className="btn-ghost">Explore Collection</a>
                </div>
              </div>
            </div>
            <div className="relative order-1 lg:order-2 bg-secondary">
              <img
                src={heroModel}
                alt="Man wearing COMORR boxer briefs in a clean studio"
                className="h-[60vh] lg:h-full w-full object-cover object-top"
                width={1536}
                height={1920}
              />
            </div>
          </div>

          {/* Trust pillars */}
          <div className="hairline">
            <div className="container-comorr grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {[
                ["Premium Fabric", "Micromodal & combed cotton"],
                ["Engineered Fit", "No rolling, no digging"],
                ["Built For Everyday", "Soft, breathable, durable"],
              ].map(([t, s]) => (
                <div key={t} className="py-7 sm:py-8 px-2 sm:px-8 text-center">
                  <p className="text-sm font-medium">{t}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-28 sm:py-36">
          <div className="container-comorr">
            <div className="max-w-2xl">
              <p className="eyebrow">The COMORR Standard</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Engineered around your day.</h2>
            </div>
            <div className="mt-16 grid md:grid-cols-3 gap-10 lg:gap-16">
              {[
                {
                  n: "01",
                  title: "Premium Fabrics",
                  body: "95% Micromodal with elastane stretch and a combed-cotton blend that stays soft wash after wash.",
                },
                {
                  n: "02",
                  title: "Engineered Waistband",
                  body: "A wide, woven waistband that holds its shape. No rolling, no digging, no readjusting.",
                },
                {
                  n: "03",
                  title: "All-Day Performance",
                  body: "Breathable, supportive, and quietly confident from a desk to the gym to a long flight.",
                },
              ].map((f) => (
                <div key={f.n}>
                  <p className="text-xs tracking-[0.22em] text-muted-foreground">{f.n}</p>
                  <h3 className="mt-6 text-2xl">{f.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="shop" className="pb-28 sm:pb-36">
          <div className="container-comorr">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="eyebrow">The Collection</p>
                <h2 className="mt-4 text-4xl sm:text-5xl">Refined essentials.</h2>
              </div>
              <a href="#bundles" className="hidden sm:inline-flex items-center text-sm gap-1 hover:gap-2 transition-all">
                View all <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
              {products.map((p) => (
                <article key={p.name} className="group">
                  <div className="relative overflow-hidden bg-secondary aspect-[4/5]">
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 text-[10px] tracking-[0.18em] uppercase bg-background px-2.5 py-1 font-medium">
                        {p.badge}
                      </span>
                    )}
                    <button
                      onClick={() => setCartOpen(true)}
                      className="absolute inset-x-3 bottom-3 sm:bottom-3 bg-primary text-primary-foreground py-3 text-xs tracking-[0.18em] uppercase font-medium translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center gap-2"
                      aria-label={`Quick add ${p.name}`}
                    >
                      <Plus className="h-3.5 w-3.5" /> Quick Add
                    </button>
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-medium">{p.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{p.color}</p>
                    </div>
                    <p className="text-sm">${p.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FABRIC STORY */}
        <section id="fabric" className="bg-secondary">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[5/4] lg:aspect-auto lg:min-h-[640px]">
              <img
                src={fabricImg}
                alt="Macro photograph of premium Micromodal fabric"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center px-6 sm:px-12 lg:px-20 py-20 lg:py-32">
              <div className="max-w-md">
                <p className="eyebrow">Material Study</p>
                <h2 className="mt-4 text-4xl sm:text-5xl leading-[1.05]">
                  The difference is in the fabric.
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  Beechwood-derived Micromodal is twice as soft as cotton and holds its shape through hundreds of wears. We weave it for breathability, stretch, and the kind of softness you only notice once.
                </p>
                <dl className="mt-10 grid grid-cols-2 gap-y-6 text-sm">
                  {[
                    ["Softness", "2× cotton"],
                    ["Breathability", "Mesh-knit zones"],
                    ["Stretch", "4-way recovery"],
                    ["Durability", "200+ wash cycles"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted-foreground text-xs tracking-[0.18em] uppercase">{k}</dt>
                      <dd className="mt-1.5 font-display text-lg">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* WHY COMORR — comparison */}
        <section className="py-28 sm:py-36">
          <div className="container-comorr">
            <div className="max-w-2xl mb-16">
              <p className="eyebrow">Why COMORR</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">A quiet upgrade.</h2>
            </div>
            <div className="overflow-hidden border-y border-border">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm">
                    <th className="py-6 pl-2 font-normal text-muted-foreground"></th>
                    <th className="py-6 font-display text-xl">COMORR</th>
                    <th className="py-6 font-normal text-muted-foreground">Generic Underwear</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    "Comfort", "Fit", "Waistband Quality", "Durability", "Fabric Quality", "Breathability",
                  ].map((row, i) => (
                    <tr key={row} className={i !== 0 ? "border-t border-border" : "border-t border-border"}>
                      <td className="py-5 pl-2 font-medium">{row}</td>
                      <td className="py-5">
                        <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-success" /> Engineered</span>
                      </td>
                      <td className="py-5 text-muted-foreground">
                        <span className="inline-flex items-center gap-2"><Minus className="h-4 w-4" /> Standard</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="bg-secondary py-28 sm:py-36">
          <div className="container-comorr">
            <div className="max-w-2xl mb-16">
              <p className="eyebrow">Worn Daily</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Notes from the field.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Daniel R.",
                  loc: "Brooklyn, NY",
                  body: "Honestly the most comfortable underwear I've owned. The waistband doesn't move and the fabric feels like nothing.",
                },
                {
                  name: "Marcus L.",
                  loc: "Austin, TX",
                  body: "Bought the 3-pack to try and ordered the 7-pack two weeks later. They've replaced everything else in my drawer.",
                },
                {
                  name: "Theo K.",
                  loc: "London, UK",
                  body: "Wear them to work, to the gym, on flights. The fit is consistent and they've held up beautifully after months of wash cycles.",
                },
              ].map((r) => (
                <figure key={r.name} className="bg-background p-8 sm:p-10">
                  <blockquote className="font-display text-lg leading-relaxed">"{r.body}"</blockquote>
                  <figcaption className="mt-8 text-sm">
                    <p className="font-medium">{r.name}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{r.loc}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* BUNDLES */}
        <section id="bundles" className="py-28 sm:py-36">
          <div className="container-comorr">
            <div className="max-w-2xl mb-16">
              <p className="eyebrow">Bundles</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Stock the drawer.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "Core 3-Pack", count: "3 pairs", price: 72, save: 12, img: product3, popular: true },
                { name: "Weekly 7-Pack", count: "7 pairs", price: 156, save: 40, img: product4 },
              ].map((b) => (
                <article key={b.name} className="relative bg-secondary p-6 sm:p-10 flex flex-col sm:flex-row gap-8 items-center group">
                  {b.popular && (
                    <span className="absolute top-5 right-5 text-[10px] tracking-[0.2em] uppercase bg-primary text-primary-foreground px-3 py-1 font-medium">
                      Most Popular
                    </span>
                  )}
                  <div className="w-40 sm:w-48 shrink-0 aspect-square bg-background overflow-hidden">
                    <img src={b.img} alt={b.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-display text-2xl">{b.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{b.count} · Mixed neutrals</p>
                    <div className="mt-5 flex items-baseline gap-3 justify-center sm:justify-start">
                      <p className="text-2xl font-display">${b.price}</p>
                      <p className="text-sm text-success">Save ${b.save}</p>
                    </div>
                    <button onClick={() => setCartOpen(true)} className="btn-primary mt-6">Add to Bag</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="bg-primary text-primary-foreground py-28 sm:py-36">
          <div className="container-comorr grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24">
            <div>
              <p className="eyebrow" style={{ color: "color-mix(in oklab, white 60%, transparent)" }}>Our Story</p>
              <h2 className="mt-4 text-4xl sm:text-5xl">Built for better days.</h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed" style={{ color: "color-mix(in oklab, white 78%, transparent)" }}>
              <p>
                COMORR was created to improve one of the most overlooked essentials in a man's wardrobe — the pair you reach for every morning without thinking.
              </p>
              <p>
                Every detail, from fabric selection to the construction of the waistband, was designed around three principles: comfort, movement, and quiet confidence.
              </p>
              <p>
                No logos shouting from the waistband. No technology theatrics. Just essentials, refined.
              </p>
            </div>
          </div>
        </section>

        <Faq />

        {/* NEWSLETTER */}
        <section className="border-t border-border">
          <div className="container-comorr py-24 sm:py-28 text-center max-w-2xl">
            <p className="eyebrow">Newsletter</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Join COMORR.</h2>
            <p className="mt-5 text-muted-foreground">
              Get early access to launches and exclusive offers.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex items-center max-w-md mx-auto border-b border-foreground/80 focus-within:border-foreground transition-colors"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="flex-1 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" className="text-sm font-medium py-3 px-1 inline-flex items-center gap-1.5 hover:gap-2.5 transition-all">
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container-comorr py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2 md:col-span-1">
              <p className="font-display text-xl tracking-[0.32em]">COMORR</p>
              <p className="text-sm mt-4 max-w-xs" style={{ color: "color-mix(in oklab, white 65%, transparent)" }}>
                Refined essentials for everyday confidence.
              </p>
            </div>
            {[
              { title: "Shop", links: ["Boxer Briefs", "Trunks", "Bundles", "Gift Cards"] },
              { title: "Company", links: ["About", "Contact", "Journal", "Careers"] },
              { title: "Support", links: ["FAQs", "Shipping", "Returns", "Size Guide"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs tracking-[0.22em] uppercase font-medium">{col.title}</p>
                <ul className="mt-5 space-y-3 text-sm" style={{ color: "color-mix(in oklab, white 70%, transparent)" }}>
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="hover:text-primary-foreground transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row justify-between gap-4 text-xs" style={{ borderColor: "color-mix(in oklab, white 12%, transparent)", color: "color-mix(in oklab, white 55%, transparent)" }}>
            <p>© {new Date().getFullYear()} COMORR. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
