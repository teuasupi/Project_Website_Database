const fs = require("fs");
const pool = require("../config/config");

async function seedUser() {
  try {
    let query = "INSERT INTO Users (fullName) VALUES ";
    let dataJson = JSON.parse(fs.readFileSync("../data/user.json"));
    let data = dataJson.map((el) => {
      return `('${el.fullName}')`;
    });

    query += data.join(",");
    await pool.query(query);
    console.log("Seeding Users berhasil!");
  } catch (error) {
    console.error("Seeding Users gagal:", error);
  } finally {
    pool.end();
  }
}

seedUser();
