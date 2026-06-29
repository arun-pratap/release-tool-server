- **FRONTEND LIVE URL** : https://my-trip-static.netlify.app/
- **API ENDPOINTS** : https://release-tools-server.netlify.app/api/


## 1. POST: Create a New Release (Planned)

- **Method:** `POST`
- **URL:** `https://release-tools-server.netlify.app/api/releases`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**

```json
{
  "name": "Production Deploy v1.4.0",
  "due_date": "2026-07-15T10:00:00.000Z",
  "additional_info": "This release includes the new payment gateway integration and minor UI hotfixes."
}
```

- **Expected Response (Status: `201 Created`):**

```json
{
  "id": 1,
  "name": "Production Deploy v1.4.0",
  "due_date": "2026-07-15T10:00:00.000Z",
  "additional_info": "This release includes the new payment gateway integration and minor UI hotfixes.",
  "completed_steps": [],
  "status": "planned"
}
```

---

## 2. PUT: Update Progress (Ongoing State)

Some (but not all) steps are provided, the status dynamically switch to `ongoing`.

- **Method:** `PUT`
- **URL:** `https://release-tools-server.netlify.app/api/releases/1` _(Replace `1` with your actual generated ID)_
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**

```json
{
  "additional_info": "Payment gateway integration deployed to staging. Core automated test suite completed successfully.",
  "completed_steps": ["run_tests", "build_assets"]
}
```

- **Expected Response (Status: `200 OK`):**

```json
{
  "id": 1,
  "name": "Production Deploy v1.4.0",
  "due_date": "2026-07-15T10:00:00.000Z",
  "additional_info": "Payment gateway integration deployed to staging. Core automated test suite completed successfully.",
  "completed_steps": ["run_tests", "build_assets"],
  "status": "ongoing"
}
```

---

## 3. PUT: Complete All Steps (Done State)

Passing all 8 steps should instantly transition the status logic to `done`.

- **Method:** `PUT`
- **URL:** `https://release-tools-server.netlify.app/api/releases/1`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**

```json
{
  "additional_info": "All verification rounds passed. Post-release metrics look stable.",
  "completed_steps": [
    "run_tests",
    "build_assets",
    "db_migration",
    "sanity_check",
    "deploy_backend",
    "deploy_frontend",
    "verify_prod",
    "notify_team"
  ]
}
```

- **Expected Response (Status: `200 OK`):**

```json
{
  "id": 1,
  "name": "Production Deploy v1.4.0",
  "due_date": "2026-07-15T10:00:00.000Z",
  "additional_info": "All verification rounds passed. Post-release metrics look stable.",
  "completed_steps": [
    "run_tests",
    "build_assets",
    "db_migration",
    "sanity_check",
    "deploy_backend",
    "deploy_frontend",
    "verify_prod",
    "notify_team"
  ],
  "status": "done"
}
```

---

## 4. GET: Fetch All Active Releases

- **Method:** `GET`
- **URL:** `https://release-tools-server.netlify.app/api/releases`

- **Expected Response (Status: `200 OK`):** An array containing all of your created datasets mapped with their calculated parameters.

---

## 5. DELETE: Remove a Specific Release

- **Method:** `DELETE`
- **URL:** `https://release-tools-server.netlify.app/api/releases/1`
- **Expected Response (Status: `200 OK`):**

```json
{
  "message": "Release deleted successfully"
}
```
