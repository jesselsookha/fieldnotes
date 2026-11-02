import type { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase): Promise<void> {
  const result = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  const currentVersion = result?.user_version ?? 0;

  if (currentVersion < 1) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL DEFAULT '',
          category TEXT NOT NULL,
          priority TEXT NOT NULL
            CHECK(priority IN ('low', 'medium', 'high')),
          status TEXT NOT NULL
            CHECK(
              status IN (
                'pending',
                'in-progress',
                'completed'
              )
            ),
          due_date TEXT NOT NULL DEFAULT '',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_tasks_status
        ON tasks(status);

        CREATE INDEX IF NOT EXISTS idx_tasks_updated_at
        ON tasks(updated_at);

        PRAGMA user_version = 1;
      `);
    });
  }
}
