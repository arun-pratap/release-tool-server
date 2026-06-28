const releaseService = require("../services/release.service");

class ReleaseController {
  async getAll(req, res) {
    try {
      const releases = await releaseService.getAllReleases();
      return res.status(200).json(releases);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req, res) {
    try {
      const { name, due_date } = req.body;
      if (!name || !due_date) {
        return res.status(400).json({ error: "Name and due_date are mandatory fields." });
      }
      
      const newRelease = await releaseService.createRelease(req.body);
      return res.status(201).json(newRelease);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { additional_info, completed_steps } = req.body;
      
      if (!Array.isArray(completed_steps)) {
        return res.status(400).json({ error: "completed_steps must be an array." });
      }

      const updatedRelease = await releaseService.updateRelease(id, { additional_info, completed_steps });
      if (!updatedRelease) {
        return res.status(404).json({ error: "Release not found" });
      }

      return res.status(200).json(updatedRelease);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await releaseService.deleteRelease(id);
      if (!isDeleted) {
        return res.status(404).json({ error: "Release not found" });
      }
      return res.status(200).json({ message: "Release deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new ReleaseController();