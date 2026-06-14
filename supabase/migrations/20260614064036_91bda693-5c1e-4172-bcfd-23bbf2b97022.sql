
CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

DROP POLICY "Anyone can create order" ON public.orders;
CREATE POLICY "Anyone can create order" ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (
    jsonb_typeof(items) = 'array'
    AND jsonb_array_length(items) > 0
    AND total_cents > 0
    AND length(email) > 3
    AND length(full_name) > 0
    AND length(address) > 0
  );

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
