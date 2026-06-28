const releaseRepository = require("../repositories/release.repository");

class ReleaseService {
  constructor() {
    this.TOTAL_STEPS = 8;
  }

  // Pure function helper to derive status based on business criteria
  _calculateStatus(completedStepsCount) {
    if (completedStepsCount === 0) return 'planned';
    if (completedStepsCount === this.TOTAL_STEPS) return 'done';
    return 'ongoing';
  }

  // Formats raw DB rows to include domain-specific fields
  _formatRelease(release) {
    return {
      ...release,
      status: this._calculateStatus(release.completed_steps.length)
    };
  }

  async getAllReleases() {
    const releases = await releaseRepository.findAll();
    return releases.map(r => this._formatRelease(r));
  }

  async createRelease(releaseData) {
    const { name, due_date, additional_info } = releaseData;
    const newRelease = await releaseRepository.create(name, due_date, additional_info);
    return this._formatRelease(newRelease);
  }

  async updateRelease(id, updateData) {
    const { additional_info, completed_steps } = updateData;
    const updated = await releaseRepository.update(id, additional_info, completed_steps);
    if (!updated) return null;
    return this._formatRelease(updated);
  }

  async deleteRelease(id) {
    return await releaseRepository.delete(id);
  }
}

module.exports = new ReleaseService();