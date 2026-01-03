import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Package, 
  LogOut, 
  Search, 
  Filter, 
  Edit2, 
  Trash, 
  Plus, 
  LayoutDashboard,
  CheckCircle2,
  XCircle
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  description?: string;
  image: string;
  in_stock: boolean;
};

export default function AdminDashboard(): JSX.Element {
  const formRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    image: "",
    in_stock: true,
  });
  const [categoryFormData, setCategoryFormData] = useState({ name: "" });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | "all">("all");
  const [loading, setLoading] = useState(false);

  const logo = "/logo.webp";

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  // Fetching
  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchData = async () => {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("categories").select("name").order("name", { ascending: true }),
      ]);

      if (!productsRes.error) setProducts(productsRes.data || []);
      if (!categoriesRes.error) {
        setCategories(categoriesRes.data.map((c) => c.name));
      }
      setLoading(false);
    };
    fetchData();
  }, [isAuthenticated]);

  const productCounts = useMemo(() => {
    const map: Record<string, number> = {};
    categories.forEach((cat) => {
      map[cat] = products.filter((p) => p.category === cat).length;
    });
    return map;
  }, [products, categories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image: formData.image,
        in_stock: formData.in_stock,
      };

      const { error } = editingProductId 
        ? await supabase.from("products").update(payload).eq("id", editingProductId)
        : await supabase.from("products").insert([payload]);

      if (error) throw error;
      
      const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      setProducts(data || []);
      setFormData({ id: "", name: "", category: "", description: "", image: "", in_stock: true });
      setEditingProductId(null);
      window.alert("Success!");
    } catch (err: any) {
      window.alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = categoryFormData.name.trim();
    const { error } = await supabase.from("categories").insert([{ name }]);
    if (!error) {
      setCategories(prev => [...prev, name].sort());
      setCategoryFormData({ name: "" });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategoryFilter === "all" || p.category === selectedCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategoryFilter]);

  if (authLoading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">Loading Access...</div>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden text-slate-100 font-sans">
      
      {/* BACKGROUND ANIMATION - Matches Login Page */}
      <motion.div
        className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-10 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.3, 1], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full bg-slate-900/60 backdrop-blur-xl border-b border-slate-700/50 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full border border-cyan-500/30" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Peroz Corp
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Admin Dashboard</p>
            </div>
          </div>
          <Button 
            onClick={() => supabase.auth.signOut().then(() => navigate("/"))}
            variant="ghost" 
            className="text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-10 space-y-10">
        
        {/* STATS / CATEGORY CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-4 mb-2 flex items-center gap-2 text-cyan-400">
            <LayoutDashboard className="w-5 h-5" />
            <h2 className="font-semibold tracking-tight">Inventory Overview</h2>
          </div>
          {categories.map((cat) => (
            <motion.div
              key={cat}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCategoryFilter(cat)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedCategoryFilter === cat 
                ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                : "bg-slate-900/40 border-slate-700/50 hover:border-slate-500"
              }`}
            >
              <p className="text-xs font-bold text-slate-500 uppercase mb-1">{cat}</p>
              <p className="text-2xl font-bold text-white">{productCounts[cat] || 0}</p>
              <p className="text-[10px] text-slate-400">Total Items</p>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT: FORMS */}
          <div className="lg:col-span-1 space-y-8">
            {/* PRODUCT FORM */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">{editingProductId ? "Update Item" : "New Product"}</h3>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-bold uppercase">Product Name</Label>
                  <Input 
                    name="name" value={formData.name} onChange={handleInputChange} required
                    className="bg-slate-800/50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-bold uppercase">Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData(p => ({...p, category: v}))}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700 text-slate-200">
                      {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-bold uppercase">Image URL</Label>
                  <Input 
                    name="image" value={formData.image} onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-xs font-bold uppercase">Description</Label>
                  <Textarea 
                    name="description" value={formData.description} onChange={handleInputChange}
                    className="bg-slate-800/50 border-slate-700 focus:border-cyan-500 min-h-[100px]"
                  />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50">
                  <input 
                    type="checkbox" name="in_stock" checked={formData.in_stock} onChange={handleInputChange}
                    className="w-4 h-4 rounded border-slate-700 text-cyan-500 focus:ring-cyan-500/20 bg-slate-800"
                  />
                  <Label className="text-sm font-medium">Available in Stock</Label>
                </div>
                <Button 
                  type="submit" disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-cyan-900/20 transition-all"
                >
                  {loading ? "Processing..." : editingProductId ? "Save Changes" : "Publish Product"}
                </Button>
                {editingProductId && (
                   <Button variant="ghost" onClick={() => {setEditingProductId(null); setFormData({id:"", name:"", category:"", description:"", image:"", in_stock: true})}} className="w-full text-slate-500">Cancel Edit</Button>
                )}
              </form>
            </motion.div>

            {/* CATEGORY FORM */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl"
            >
              <h3 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Quick Add Category</h3>
              <form onSubmit={handleCategorySubmit} className="flex gap-2">
                <Input 
                  value={categoryFormData.name} 
                  onChange={(e) => setCategoryFormData({name: e.target.value})}
                  placeholder="e.g. Beverages"
                  className="bg-slate-800/50 border-slate-700"
                />
                <Button type="submit" className="bg-slate-700 hover:bg-cyan-600 transition-colors">
                  <Plus className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>

          {/* RIGHT: LIST */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  placeholder="Search inventory..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900/40 border-slate-700 focus:border-cyan-500 h-12 rounded-xl"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={() => {setSelectedCategoryFilter("all"); setSearchQuery("");}}
                className="border-slate-700 text-slate-400 hover:bg-slate-800 h-12 rounded-xl px-6"
              >
                Reset Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl hover:border-cyan-500/50 transition-all shadow-lg"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">{p.category}</span>
                          {p.in_stock ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                        </div>
                        <h4 className="font-bold text-white truncate text-lg mb-1">{p.name}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{p.description || "No description provided."}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800/50">
                      <Button 
                        size="sm" variant="ghost" 
                        onClick={() => {
                          setEditingProductId(p.id);
                          setFormData({...p, description: p.description || ""});
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="flex-1 text-xs text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Edit2 className="w-3 h-3 mr-2" /> Edit
                      </Button>
                      <Button 
                        size="sm" variant="ghost"
                        onClick={() => handleDelete(p.id)}
                        className="flex-1 text-xs text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                      >
                        <Trash className="w-3 h-3 mr-2" /> Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
                <Package className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No items found in your inventory.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}