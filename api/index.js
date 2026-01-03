import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env only for local development
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// CORS configuration - includes your custom domain
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://perozcorp.vercel.app",
      "https://perozcorp.com",
      "https://www.perozcorp.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// --- ROUTES (All using Supabase for permanent storage) ---

// GET all products
app.get("/api/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET single product
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error: "Product not found" });
  res.json(data);
});

// POST new product
app.post("/api/products", async (req, res) => {
  const { data, error } = await supabase.from("products").insert([req.body]).select();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ success: true, data: data[0] });
});

// PUT update product
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("products").update(req.body).eq("id", id).select();
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true, data: data[0] });
});

// DELETE product
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
});

// Ping endpoint
app.get("/api/ping", async (req, res) => {
  res.json({ status: "pong", message: "API is live!" });
});

// --- VERCEL EXPORT ---
// IMPORTANT: We remove app.listen() for Vercel and use export default
export default app;