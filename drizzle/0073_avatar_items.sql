-- Nomi avatar parçaları: kimin hangi parçaya sahip olduğu (bkz. schema.ts avatarItems).
CREATE TABLE IF NOT EXISTS "avatar_items" (
  "user_id" text NOT NULL,
  "item_id" text NOT NULL,
  "source" text NOT NULL,
  "acquired_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "avatar_items_user_id_item_id_pk" PRIMARY KEY("user_id","item_id")
);
