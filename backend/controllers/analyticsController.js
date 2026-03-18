import { getFirestore, serverTimestamp } from "../config/firebase.js";

const ensureDb = (res) => {
  const db = getFirestore();
  if (!db) {
    res.status(503).json({ message: "Firebase not configured" });
    return null;
  }
  return db;
};

export async function trackEvent(req, res, next) {
  try {
    const db = ensureDb(res);
    if (!db) return;

    const payload = {
      ...req.body,
      createdAt: serverTimestamp(),
    };

    const docRef = db.collection("analytics").doc();
    await docRef.set(payload);
    const snap = await docRef.get();
    res.status(201).json({ id: snap.id, ...snap.data() });
  } catch (error) {
    next(error);
  }
}

export async function overview(req, res, next) {
  try {
    const db = ensureDb(res);
    if (!db) return;

    const [songsSnap, coursesSnap, usersSnap, eventsSnap] = await Promise.all([
      db.collection("songs").count().get(),
      db.collection("courses").count().get(),
      db.collection("users").count().get(),
      db.collection("events").count().get(),
    ]);

    res.json({
      totals: {
        songs: songsSnap.data().count,
        courses: coursesSnap.data().count,
        users: usersSnap.data().count,
        events: eventsSnap.data().count,
      },
    });
  } catch (error) {
    next(error);
  }
}
