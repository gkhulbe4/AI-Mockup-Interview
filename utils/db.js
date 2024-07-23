import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// for migrations
const migrationClient = postgres(process.env.NEXT_PUBLIC_DATABASE_URL, {
  max: 1,
});
migrate(drizzle(migrationClient), {
  migrationsFolder: "./drizzle/migrations",
});

// for query purposes
const queryClient = postgres(process.env.NEXT_PUBLIC_DATABASE_URL);
const db = drizzle(queryClient);
export default db;
