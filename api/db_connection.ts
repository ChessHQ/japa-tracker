import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const db_url = process.env.EXPO_PUBLIC_DB_URL;
const db_api_key = process.env.EXPO_PUBLIC_DB_API_KEY;

// non-null assertion used as both url and key are guaranteed to be defined at runtime
export const db_client = createClient(db_url!, db_api_key!);
