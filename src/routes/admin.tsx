import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  errorComponent: ({ error }) => <div className="p-8">{error.message}</div>,
  notFoundComponent: () => <div className="p-8">Not found</div>,
});

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  stock: number;
  active: boolean;
};

type Order = {
  id: string;
  email: string;
  full_name: string;
  address: string;
  items: { name: string; qty: number; price_cents: number }[];
  total_cents: number;
  status: string;
  created_at: string;
};

function AdminPage() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<"products" | "orders">("products");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/auth" });
        return;
      }
      setAuthed(true);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id);
      setIsAdmin(!!roles?.some((r) => r.role === "admin"));
    })();
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (authed === null) return <div className="p-8 text-sm text-muted-foreground">Loading…</div>;
  if (!isAdmin)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">You are not an admin.</p>
        <button onClick={signOut} className="text-sm underline">Sign out</button>
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xs tracking-[0.3em]">COMORR · ADMIN</Link>
          <div className="flex gap-6 items-center text-sm">
            <button
              onClick={() => setTab("products")}
              className={tab === "products" ? "text-foreground" : "text-muted-foreground"}
            >
              Products
            </button>
            <button
              onClick={() => setTab("orders")}
              className={tab === "orders" ? "text-foreground" : "text-muted-foreground"}
            >
              Orders
            </button>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground">
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        {tab === "products" ? <ProductsPanel /> : <OrdersPanel />}
      </main>
    </div>
  );
}

function ProductsPanel() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setItems((data as Product[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save(p: Partial<Product>) {
    const payload = {
      slug: p.slug!,
      name: p.name!,
      description: p.description ?? null,
      price_cents: Number(p.price_cents ?? 0),
      stock: Number(p.stock ?? 0),
      image_url: p.image_url ?? null,
      active: p.active ?? true,
    };
    if (p.id) {
      await supabase.from("products").update(payload).eq("id", p.id);
    } else {
      await supabase.from("products").insert(payload);
    }
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-medium">Products</h1>
        <button
          onClick={() => setEditing({ active: true, price_cents: 0, stock: 0 })}
          className="bg-foreground text-background px-4 py-2 text-sm"
        >
          New product
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
            <tr><th className="py-3">Name</th><th>Slug</th><th>Price</th><th>Stock</th><th>Active</th><th></th></tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b border-border">
                <td className="py-3">{p.name}</td>
                <td className="text-muted-foreground">{p.slug}</td>
                <td>${(p.price_cents / 100).toFixed(2)}</td>
                <td>{p.stock}</td>
                <td>{p.active ? "Yes" : "No"}</td>
                <td className="text-right space-x-3">
                  <button className="underline" onClick={() => setEditing(p)}>Edit</button>
                  <button className="text-red-600" onClick={() => remove(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-6 z-50" onClick={() => setEditing(null)}>
          <div className="bg-background border border-border w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-medium mb-4">{editing.id ? "Edit product" : "New product"}</h2>
            <div className="space-y-3 text-sm">
              <Input label="Name" value={editing.name ?? ""} onChange={(v) => setEditing({ ...editing, name: v })} />
              <Input label="Slug" value={editing.slug ?? ""} onChange={(v) => setEditing({ ...editing, slug: v })} />
              <Input label="Description" value={editing.description ?? ""} onChange={(v) => setEditing({ ...editing, description: v })} />
              <Input label="Image URL" value={editing.image_url ?? ""} onChange={(v) => setEditing({ ...editing, image_url: v })} />
              <Input label="Price (cents)" type="number" value={String(editing.price_cents ?? 0)} onChange={(v) => setEditing({ ...editing, price_cents: Number(v) })} />
              <Input label="Stock" type="number" value={String(editing.stock ?? 0)} onChange={(v) => setEditing({ ...editing, stock: Number(v) })} />
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={editing.active ?? true} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} />
                Active
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm">Cancel</button>
              <button onClick={() => save(editing)} className="bg-foreground text-background px-4 py-2 text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}

function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    load();
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium mb-6">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="border border-border p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium">{o.full_name}</p>
                  <p className="text-sm text-muted-foreground">{o.email}</p>
                  <p className="text-sm text-muted-foreground">{o.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(o.total_cents / 100).toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                </div>
              </div>
              <ul className="text-sm text-muted-foreground mb-3">
                {o.items.map((i, idx) => (
                  <li key={idx}>{i.qty}× {i.name} — ${(i.price_cents / 100).toFixed(2)}</li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Status</span>
                <select
                  value={o.status}
                  onChange={(e) => setStatus(o.id, e.target.value)}
                  className="border border-border bg-background px-2 py-1 text-sm"
                >
                  {["pending","paid","shipped","delivered","cancelled"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
