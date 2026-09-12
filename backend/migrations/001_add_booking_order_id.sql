-- The booking flow creates a Cashfree order before inserting a booking.
-- Keep this nullable for bookings that existed before this migration.
ALTER TABLE public.bookings
    ADD COLUMN IF NOT EXISTS order_id TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS bookings_order_id_unique
    ON public.bookings (order_id)
    WHERE order_id IS NOT NULL;
