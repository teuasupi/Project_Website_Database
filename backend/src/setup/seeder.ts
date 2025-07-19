import * as fs from "fs";
import pool from "../config/config";

interface UserData {
  fullName: string;
}

async function seedUser(): Promise<void> {
  try {
    let query: string = "INSERT INTO Users (fullName) VALUES ";
    const dataJson: UserData[] = JSON.parse(fs.readFileSync("../data/user.json", "utf-8"));
    const data: string[] = dataJson.map((el: UserData) => {
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