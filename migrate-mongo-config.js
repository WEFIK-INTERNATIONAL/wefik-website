require("dotenv").config();

module.exports = {
    mongodb: {
        url: process.env.MONGODB_URI,
        databaseName: process.env.MONGODB_DB_NAME,
        options: {},
    },
    migrationsDir: "migrations",
    changelogCollectionName: "migrations",
    migrationFileExtension: ".js",
};
