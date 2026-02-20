import Database from "better-sqlite3";
import { type UserInput } from "../types/user.types.js";
import bcrypt from "bcrypt";
import {type User} from "../types/user.types.js";

const db = new Database("data.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`);

async function registerUserIndb({ email, password }: UserInput) {
  const existingUser = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const stmt = db
    .prepare("INSERT INTO users (email, password) VALUES (?, ?)")
    .run(email, hashedPassword);
  const newUser = db
    .prepare("SELECT id,email FROM users WHERE id = ?")
    .get(stmt.lastInsertRowid) as User;

  return newUser
    
  } catch (error:any) {
    throw new Error("Error registering user: " + error.message);
  }
}

async function loginUserIndb({ email, password }: UserInput) {
  const user  = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as User | undefined;
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  return {id: user.id, email: user.email};
}

function getUserProfileIndb(userId: number) {
  const user = db
    .prepare("SELECT id, email FROM users WHERE id = ?")
    .get(userId) as User | undefined;
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
export { registerUserIndb, loginUserIndb, getUserProfileIndb };