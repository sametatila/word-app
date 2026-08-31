/** Yerel test için node-postgres sürücüsü (yalnızca e2e testinde kullanılır). */
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../src/lib/db/schema";

export const pool = new Pool({ connectionString: process.env.TEST_DATABASE_URL || undefined });
export const db = drizzle(pool, { schema });
