export function login(req, res) {
  res.json({ message: "Use Firebase Authentication on the client." });
}

export function logout(req, res) {
  res.json({ message: "Logout handled on the client." });
}

export function me(req, res) {
  res.json({ user: req.user || null });
}
