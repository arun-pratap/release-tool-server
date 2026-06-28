const sql = require("../config/db");

class ReleaseRepository {
  async findAll() {
    return await sql`SELECT * FROM releases ORDER BY due_date ASC`;
  }

  async findById(id) {
    const result = await sql`SELECT * FROM releases WHERE id = ${id}`;
    return result[0] || null;
  }

  async create(name, dueDate, additionalInfo) {
    const result = await sql`
      INSERT INTO releases (name, due_date, additional_info, completed_steps) 
      VALUES (${name}, ${dueDate}, ${additionalInfo || ''}, ${[]}) 
      RETURNING *
    `;
    return result[0];
  }

  async update(id, additionalInfo, completedSteps) {
    const result = await sql`
      UPDATE releases 
      SET additional_info = ${additionalInfo}, completed_steps = ${completedSteps} 
      WHERE id = ${id} 
      RETURNING *
    `;
    return result[0] || null;
  }

  async delete(id) {
    const result = await sql`DELETE FROM releases WHERE id = ${id} RETURNING id`;
    return result.length > 0;
  }
}

module.exports = new ReleaseRepository();