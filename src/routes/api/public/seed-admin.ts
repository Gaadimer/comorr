import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/seed-admin")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const email = "admin@gmail.com";
        const password = "password!123";

        // Check if user exists
        const { data: list, error: listErr } = await supabaseAdmin.auth.admin.listUsers();
        if (listErr) return Response.json({ ok: false, error: listErr.message }, { status: 500 });

        let user = list.users.find((u) => u.email?.toLowerCase() === email);
        if (!user) {
          const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
          });
          if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
          user = data.user!;
        }

        // Ensure admin role
        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });
        if (roleErr) return Response.json({ ok: false, error: roleErr.message }, { status: 500 });

        return Response.json({ ok: true });
      },
      GET: async () => Response.json({ ok: true, hint: "POST to seed" }),
    },
  },
});
