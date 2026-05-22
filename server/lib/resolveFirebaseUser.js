const { getAuth } = require('firebase-admin/auth');

module.exports = async (uid) => {
  try {
    const user = await getAuth().getUser(uid);
    return { name: user.displayName || "—", photoURL: user.photoURL || null, email: user.email || "—" };
  } catch {
    return { name: "—", photoURL: null, email: "—" };
  }
};