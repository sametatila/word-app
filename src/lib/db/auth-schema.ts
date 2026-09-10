import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

/**
 * Self-hosted Better Auth tabloları. Better Auth bu dört
 * tabloyu bekler: user / session / account / verification. Kolon adları Better
 * Auth 1.2 varsayılanlarıyla (camelCase) eşleşir. drizzle-kit push bunları
 * yerel Postgres'te oluşturur (schema.ts'ten re-export ediliyor).
 */
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  /*
    İki adımlı doğrulama açık mı (better-auth two-factor eklentisi).
    Varsayılan KAPALI ve alan `false` ile dolu: eklenti bunu her girişte
    okuyor, NULL kalsaydı "açık mı" sorusu her mevcut kullanıcı için
    belirsizleşirdi.
  */
  twoFactorEnabled: boolean("twoFactorEnabled").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

/**
 * İki adımlı doğrulama kaydı (better-auth two-factor eklentisi).
 *
 * Kolon adları ve tipleri eklentinin kendi şemasından geliyor
 * (plugins/two-factor/schema.ts); sapma olursa eklenti tabloyu bulamaz ya da
 * yazamaz. `secret` ve `backupCodes` ŞİFRELİ saklanıyor — eklenti
 * BETTER_AUTH_SECRET ile açıp kapıyor, veritabanı dökümünde düz metin yok.
 *
 * Satır yalnız kimlik doğrulayıcı uygulama (TOTP) yolunda yazılıyor. Bizde
 * yalnız e-posta kodu açık, yani tablo şimdilik boş kalır; eklentinin şeması
 * yine de eksiksiz duruyor, aksi hâlde `drizzle-kit push` her deploy'da
 * eksik tabloyu tartışırdı.
 */
export const twoFactor = pgTable("twoFactor", {
  id: text("id").primaryKey(),
  secret: text("secret").notNull(),
  backupCodes: text("backupCodes").notNull(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  verified: boolean("verified").notNull().default(true),
  failedVerificationCount: integer("failedVerificationCount").notNull().default(0),
  lockedUntil: timestamp("lockedUntil"),
});
