module.exports = {
    async up(db, client) {
        console.log("➡️  Running migration: normalize workExperience field...");

        // Update documents where workExperience field is missing
        const missingResult = await db
            .collection("applications")
            .updateMany(
                { workExperience: { $exists: false } },
                { $set: { workExperience: [] } }
            );
        console.log(
            `Updated ${missingResult.modifiedCount} documents where workExperience was missing`
        );

        // Update documents where workExperience is null
        const nullResult = await db
            .collection("applications")
            .updateMany(
                { workExperience: null },
                { $set: { workExperience: [] } }
            );
        console.log(
            `Updated ${nullResult.modifiedCount} documents where workExperience was null`
        );

        console.log("✅ Migration complete: workExperience field normalized");
    },

    async down(db, client) {
        console.log(
            "↩️  Rolling back migration: remove empty workExperience arrays..."
        );

        // Remove workExperience field if it’s an empty array
        const unsetResult = await db
            .collection("applications")
            .updateMany(
                { workExperience: { $size: 0 } },
                { $unset: { workExperience: "" } }
            );
        console.log(
            `Removed workExperience field from ${unsetResult.modifiedCount} documents`
        );

        console.log("✅ Rollback complete");
    },
};
