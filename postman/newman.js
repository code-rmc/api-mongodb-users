const newman = require("newman");

newman.run(
  {
    collection: require("./Test-Api-MongoDB-User.postman_collection.json"),
    environment: "./postman/Desarrollo.postman_environment.json",
    reporters: ["htmlextra", "csv"],
    reporter: {
      htmlextra: {
        export: "./postman/report.html",
      },
    },
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log("collection run complete!");
  }
);
