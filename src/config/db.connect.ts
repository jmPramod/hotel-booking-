import { Client,Pool } from "pg";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
let pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "1234",
  database: "roomBooking",
});
const connectDataBase = async () => {
  const localDb = async () => {
    try {
      await pool.connect();
      console.log("Connection to Local PostgreSQL successfull 😊");

      return pool;
    } catch (error) {
      console.error(" Local PostgreSQL error 😓 :", error);
    }
  };
  const cloudDb = async () => {
    try {
      
    const supabaseUrl =  process.env.SUPER_BASE_PROJECT_URL as string;
    const supabaseKey =  process.env.SUPER_BASE_API_KEY as string;
    // const pool =  createClient(supabaseUrl, supabaseKey);
    const pool =  createClient("https://mdgltkozjlmkvwruggln.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZ2x0a296amxta3Z3cnVnZ2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxODUwMDUsImV4cCI6MjA0Mjc2MTAwNX0.8JxjnKEQ7GVi2KR3heQTAncRvm4s7J9esjwroyH1yGY");
    // console.log(await pool.from('demo').select());
    
    // const {data,error}:any=await pool.from('demo').select()
    // console.log("data",data,error);
    async function fetchData() {
      const { data, error } = await pool
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
    return pool;
  
    } catch (error) {
      console.log("Super base Error 😵 :",error);
      
    }};

  if (process.env.ENVIRONMENT === "DEV") {
    localDb();
  } else {
    cloudDb();
  }
};

export { connectDataBase,pool };
