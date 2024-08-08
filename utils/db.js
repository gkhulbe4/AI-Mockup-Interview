import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
});

// for query purposes
const db = drizzle(pool, { schema });
export default db;
