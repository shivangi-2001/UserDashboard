import { openDB } from "idb";

const DB_NAME = "contribution-db";
const STORE_NAME = "contribution-draft";

export async function contributionDraft(data) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
  await db.put(STORE_NAME, data, "draft");
}

export async function getDraft() {
  const db = await openDB(DB_NAME, 1);
  return await db.get(STORE_NAME, "draft");
}

export async function clearDraft() {
  const db = await openDB(DB_NAME, 1);
  await db.delete(STORE_NAME, "draft");
}
