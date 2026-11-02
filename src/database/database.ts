import { openDatabaseAsync, type SQLiteDatabase } from "expo-sqlite";

import { migrateDbIfNeeded } from "./migrations";

let databasePromise: Promise<SQLiteDatabase> | null = null;

export function getDatabase(): Promise<SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = (async () => {
      const db = await openDatabaseAsync("fieldnotes.db");

      try {
        await db.execAsync("PRAGMA journal_mode = WAL;");

        await migrateDbIfNeeded(db);

        return db;
      } catch (error) {
        await db.closeAsync();
        throw error;
      }
    })().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  return databasePromise;
}
