-- Better Auth tabloları — user / session / account / verification.
--
-- NEDEN BU DOSYA VAR: bu dört tablo hiçbir migrasyonda yoktu. Şema
-- `src/lib/db/auth-schema.ts`te tanımlı ve yalnızca `drizzle-kit push` ile
-- oluşuyordu; yani `drizzle-kit migrate` ile kurulan TEMİZ bir veritabanında
-- tablolar hiç açılmıyor ve giriş "relation \"user\" does not exist" ile
-- patlıyordu. Ölçüldü: yerelde sıfırdan kurulan bir kopyada kayıt olmak
-- mümkün değildi.
--
-- Üretimde tablolar ZATEN VAR (push ile açılmışlardı), o yüzden hepsi
-- `IF NOT EXISTS`: bu dosya orada hiçbir şey yapmıyor. Kolon adları Better
-- Auth 1.2 varsayılanlarıyla (camelCase) eşleşiyor ve `auth-schema.ts` ile
-- birebir aynı — biri değişirse diğeri de değişmeli.
CREATE TABLE IF NOT EXISTS "user" (
  "id"            text PRIMARY KEY,
  "name"          text NOT NULL,
  "email"         text NOT NULL UNIQUE,
  "emailVerified" boolean NOT NULL DEFAULT false,
  "image"         text,
  "createdAt"     timestamp NOT NULL DEFAULT now(),
  "updatedAt"     timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "session" (
  "id"        text PRIMARY KEY,
  "expiresAt" timestamp NOT NULL,
  "token"     text NOT NULL UNIQUE,
  "createdAt" timestamp NOT NULL DEFAULT now(),
  "updatedAt" timestamp NOT NULL DEFAULT now(),
  "ipAddress" text,
  "userAgent" text,
  "userId"    text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  "id"                    text PRIMARY KEY,
  "accountId"             text NOT NULL,
  "providerId"            text NOT NULL,
  "userId"                text NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "accessToken"           text,
  "refreshToken"          text,
  "idToken"               text,
  "accessTokenExpiresAt"  timestamp,
  "refreshTokenExpiresAt" timestamp,
  "scope"                 text,
  "password"              text,
  "createdAt"             timestamp NOT NULL DEFAULT now(),
  "updatedAt"             timestamp NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "verification" (
  "id"         text PRIMARY KEY,
  "identifier" text NOT NULL,
  "value"      text NOT NULL,
  "expiresAt"  timestamp NOT NULL,
  "createdAt"  timestamp DEFAULT now(),
  "updatedAt"  timestamp DEFAULT now()
);
