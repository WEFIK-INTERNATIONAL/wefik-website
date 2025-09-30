module.exports = {
  async up(db, client) {
    // Rename "description" to "content"
    await db.collection("blogs").updateMany(
      { description: { $exists: true } },
      [
        { $set: { content: "$description" } },
        { $unset: "description" }
      ]
    );
  },

  async down(db, client) {
    // Rollback: rename "content" back to "description"
    await db.collection("blogs").updateMany(
      { content: { $exists: true } },
      [
        { $set: { description: "$content" } },
        { $unset: "content" }
      ]
    );
  }
};
