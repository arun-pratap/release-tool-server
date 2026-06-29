const endPoints = (req, res) => {
  const releaseURL = `https://release-tools-server.netlify.app/api/releases`;
  const endPoints = [
    {
      name: "Create Release",
      method: "POST",
      URL: releaseURL,
      jsonBody: {
        name: "Production Deploy v1.4.0",
        due_date: "2026-07-15T10:00:00.000Z",
        additional_info:
          "This release includes the new payment gateway integration and minor UI hotfixes.",
      },
    },

    {
      name: "Get All Releases",
      method: "GET",
      URL: releaseURL,
      jsonBody: {
        name: "Production Deploy v1.4.0",
        due_date: "2026-07-15T10:00:00.000Z",
        additional_info:
          "This release includes the new payment gateway integration and minor UI hotfixes.",
      },
    },

    {
      name: "Update Ongoing Progress",
      method: "PUT",
      URL: `${releaseURL}/1`,
      jsonBody: {
        additional_info:
          "Payment gateway integration deployed to staging. Core automated test suite completed successfully.",
        completed_steps: ["run_tests", "build_assets"],
      },
    },

    {
      name: "Update Completed Steps",
      method: "PUT",
      URL: `${releaseURL}/1`,
      jsonBody: {
        additional_info:
          "All verification rounds passed. Post-release metrics look stable.",
        completed_steps: [
          "run_tests",
          "build_assets",
          "db_migration",
          "sanity_check",
          "deploy_backend",
          "deploy_frontend",
          "verify_prod",
          "notify_team",
        ],
      },
    },

    {
      method: "DELETE",
      URL: `${releaseURL}/1`,
    },
  ];

  res.send(endPoints);
};

module.exports = endPoints;
