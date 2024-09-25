import { Client } from "pg";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
let sqlClient = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "1234",
  database: "db1",
});
const connectDataBase = async () => {
  const localDb = async () => {
    try {
      await sqlClient.connect();
      console.log("Connection to Local PostgreSQL successfull 😊");

      return sqlClient;
    } catch (error) {
      console.error(" Local PostgreSQL error 😓 :", error);
    } finally {
      await sqlClient.end();
    }
  };
  const cloudDb = async () => {
    try {
      
    const supabaseUrl =  process.env.SUPER_BASE_PROJECT_URL as string;
    const supabaseKey =  process.env.SUPER_BASE_API_KEY as string;
    // const sqlClient =  createClient(supabaseUrl, supabaseKey);
    const sqlClient =  createClient("https://mdgltkozjlmkvwruggln.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZ2x0a296amxta3Z3cnVnZ2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxODUwMDUsImV4cCI6MjA0Mjc2MTAwNX0.8JxjnKEQ7GVi2KR3heQTAncRvm4s7J9esjwroyH1yGY");
    // console.log(await sqlClient.from('demo').select());
    
    // const {data,error}:any=await sqlClient.from('demo').select()
    // console.log("data",data,error);
    async function fetchData() {
      const { data, error } = await sqlClient
          .from('demo')
          .select('*');
  
      if (error) {
          console.error('Error fetching data:', error);
      } else {
          console.log('Data:', data);
      }
  }
  
  // Call the function
  fetchData()
    return sqlClient;
  
    } catch (error) {
      console.log("Super base Error 😵 :",error);
      
    }};

  if (process.env.ENVIRONMENT === "DEV") {
    localDb();
  } else {
    cloudDb();
  }
};

export { connectDataBase,sqlClient };
