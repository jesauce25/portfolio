import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Upload, Image as ImageIcon, LogOut, Lock, Calendar, Trash2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

const ADMIN_EMAIL = "pauloabaquita098956@gmail.com";
const ADMIN_PASSWORD = "098956470123paulo";

interface SidelineEntry {
  id: string;
  title: string | null;
  date_uploaded: string;
  image_urls: any; // Will be parsed as JSON
  thumbnail_url: string;
  optimized: boolean;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [batchTitle, setBatchTitle] = useState("");
  const [entries, setEntries] = useState<SidelineEntry[]>([]);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email === ADMIN_EMAIL) {
        setUser(user);
        fetchEntries();
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user && session.user.email === ADMIN_EMAIL) {
        setUser(session.user);
        fetchEntries();
      } else {
        setUser(null);
        setEntries([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('sideline')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      toast.error("Invalid credentials");
      return;
    }

    setLoading(true);
    try {
      // Try to sign in first
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        // If user doesn't exist, create the account
        if (signInError.message.includes('Invalid login credentials')) {
          toast.info("Creating admin account...");
          
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `${window.location.origin}/admin`
            }
          });

          if (signUpError) {
            throw signUpError;
          }

          // If account was created and confirmed, assign admin role
          if (signUpData.user && !signUpData.user.email_confirmed_at) {
            toast.success("Admin account created! Please check your email to confirm your account, then try logging in again.");
            return;
          }
        } else {
          throw signInError;
        }
      }

      // Ensure admin role is assigned
      if (signInData?.user) {
        await ensureAdminRole(signInData.user.id);
      }
      
      toast.success("Login successful");
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const ensureAdminRole = async (userId: string) => {
    try {
      // Check if admin role already exists
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      // If no admin role exists, create one
      if (!existingRole) {
        const { error } = await supabase
          .from('user_roles')
          .insert({
            user_id: userId,
            role: 'admin'
          });

        if (error && !error.message.includes('duplicate key value violates unique constraint')) {
          console.error('Error assigning admin role:', error);
        }
      }
    } catch (error) {
      console.error('Error checking/assigning admin role:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setEmail("");
    setPassword("");
    toast.success("Logged out successfully");
  };

  const handleFileUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    if (!user) {
      toast.error("Please log in first");
      return;
    }

    setUploading(true);
    try {
      const imageUrls: Array<{ url: string; filename: string }> = [];
      let thumbnailUrl = "";

      // Upload each file
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${i}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('sideline')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('sideline')
          .getPublicUrl(filePath);

        imageUrls.push({
          url: publicUrl,
          filename: file.name
        });

        // Use first image as thumbnail
        if (i === 0) {
          thumbnailUrl = publicUrl;
        }
      }

      // Save batch to database
      const { error: dbError } = await supabase
        .from('sideline')
        .insert({
          title: batchTitle || null,
          date_uploaded: new Date().toISOString().split('T')[0],
          image_urls: imageUrls,
          thumbnail_url: thumbnailUrl,
          user_id: user.id
        });

      if (dbError) throw dbError;

      toast.success(`Successfully uploaded ${selectedFiles.length} images`);
      setSelectedFiles(null);
      setBatchTitle("");
      
      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      // Refresh entries
      fetchEntries();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const deleteEntry = async (entry: SidelineEntry) => {
    if (!confirm("Are you sure you want to delete this batch?")) return;

    try {
      // Delete files from storage
      for (const image of entry.image_urls) {
        const fileName = image.url.split('/').pop();
        if (fileName) {
          await supabase.storage.from('sideline').remove([fileName]);
        }
      }

      // Delete from database
      const { error } = await supabase
        .from('sideline')
        .delete()
        .eq('id', entry.id);

      if (error) throw error;

      toast.success("Batch deleted successfully");
      fetchEntries();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast.error("Failed to delete batch");
    }
  };

  // If not logged in, show login form
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container-section">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
                  <Lock size={16} className="text-primary" />
                  <span className="text-sm font-medium">Admin Access</span>
                </div>
                
                <h1 className="heading-lg mb-4">Admin Login</h1>
                <p className="text-muted-foreground">
                  Access restricted to authorized personnel only
                </p>
              </div>

              <form onSubmit={handleLogin} className="glass-card p-8">
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="admin@example.com"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full btn-primary h-12 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Lock size={16} />
                      Login
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-section">
          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
                <ImageIcon size={16} className="text-primary" />
                <span className="text-sm font-medium">Admin Dashboard</span>
              </div>
              
              <h1 className="heading-lg mb-2">Sideline Management</h1>
              <p className="text-muted-foreground">
                Upload and manage image batches for the sideline gallery
              </p>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Upload Section */}
          <div className="mb-12">
            <div className="glass-card p-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Upload size={20} />
                Upload New Batch
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="batch-title" className="block text-sm font-medium mb-2">
                    Batch Title (Optional)
                  </label>
                  <input 
                    type="text" 
                    id="batch-title" 
                    value={batchTitle}
                    onChange={(e) => setBatchTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="e.g., Photo Shoot - January 2025"
                  />
                </div>

                <div>
                  <label htmlFor="file-input" className="block text-sm font-medium mb-2">
                    Select Images
                  </label>
                  <input 
                    type="file" 
                    id="file-input"
                    accept="image/*"
                    multiple
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm"
                  />
                  {selectedFiles && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {selectedFiles.length} file(s) selected
                    </p>
                  )}
                </div>

                <button 
                  onClick={handleFileUpload}
                  disabled={uploading || !selectedFiles}
                  className="btn-primary h-12 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Upload Batch
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Entries List */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Uploaded Batches ({entries.length})</h2>
            
            {entries.length === 0 ? (
              <div className="text-center py-16 glass-card">
                <ImageIcon size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No batches uploaded</h3>
                <p className="text-muted-foreground">Upload your first batch of images to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="glass-card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={entry.thumbnail_url} 
                          alt={entry.title || "Untitled"}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold">
                            {entry.title || "Untitled Collection"}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(entry.date_uploaded).toLocaleDateString()}
                            </span>
                            <span>{entry.image_urls.length} images</span>
                            {entry.optimized && (
                              <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                                Optimized
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => deleteEntry(entry)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                        title="Delete batch"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;