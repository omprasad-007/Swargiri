import { getFirestore, serverTimestamp } from "../config/firebase.js";

const ensureDb = (res) => {
  const db = getFirestore();
  if (!db) {
    res.status(503).json({ message: "Firebase not configured" });
    return null;
  }
  return db;
};

const mapDoc = (doc) => ({ id: doc.id, ...doc.data() });

export function buildCrudController(collectionName) {
  const list = async (req, res, next) => {
    try {
      const db = ensureDb(res);
      if (!db) return;

      const snapshot = await db
        .collection(collectionName)
        .orderBy("updatedAt", "desc")
        .limit(100)
        .get();

      res.json(snapshot.docs.map(mapDoc));
    } catch (error) {
      next(error);
    }
  };

  const getById = async (req, res, next) => {
    try {
      const db = ensureDb(res);
      if (!db) return;

      const docRef = db.collection(collectionName).doc(req.params.id);
      const snap = await docRef.get();
      if (!snap.exists) return res.status(404).json({ message: "Not found" });
      res.json(mapDoc(snap));
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const db = ensureDb(res);
      if (!db) return;

      const docRef = db.collection(collectionName).doc();
      const payload = {
        ...req.body,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await docRef.set(payload, { merge: true });
      const snap = await docRef.get();
      res.status(201).json(mapDoc(snap));
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const db = ensureDb(res);
      if (!db) return;

      const docRef = db.collection(collectionName).doc(req.params.id);
      const existing = await docRef.get();
      if (!existing.exists) return res.status(404).json({ message: "Not found" });

      const payload = {
        ...req.body,
        updatedAt: serverTimestamp(),
      };

      await docRef.set(payload, { merge: true });
      const snap = await docRef.get();
      res.json(mapDoc(snap));
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const db = ensureDb(res);
      if (!db) return;

      const docRef = db.collection(collectionName).doc(req.params.id);
      const existing = await docRef.get();
      if (!existing.exists) return res.status(404).json({ message: "Not found" });

      await docRef.delete();
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  return {
    list,
    getById,
    create,
    update,
    remove,
  };
}
