import { createPool } from "mysql2";

const pool = createPool({
    host: "localhost",
    user: "root",
    port: 3306,
    database: "play_group_javl",
}).promise();

export { pool };
