import { db_client as db } from "./db_connection";

type UserRecord = String[];

/**
 * Here's my understanding of how these work. So when you query supabase, it will return
 * a PostGreSQL response containing the following: count, data, error, etc.
 * The @data itself will be in the form of an array, containing objects which represent
 * the rows in the SQL table. So to access the first row, for example, we can use data[0].
 *
 * @returns the data array of all the rows.
 */
export async function getUserData(): Promise<string> {
  const { data, error } = await db.from("Users").select();
  if (error) throw error;
  console.log(data[0].id);
  return data[0].id;
}

export async function createUserAccount(
  username: string,
  password: string
): Promise<void> {
  const { error } = await db.from("Users").insert({
    username: username,
    password: password,
  });
}

export async function userLogin(
  username: string,
  password: string
): Promise<void> {
  const { data, error } = await db
    .from("Users")
    .select("id, username")
    .match({ username, password })
    .maybeSingle();
  if (error) throw error;
  console.log(data);
}

// Usage example:
// import { getUserData } from './api/db_queries';
// const users = await getUserData();
