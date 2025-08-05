import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, Download, Eye, Filter, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

interface SidelineEntry {
  id: string;
  title: string | null;
  date_uploaded: string;
  image_urls: any; // Will be parsed as JSON
  thumbnail_url: string;
  optimized: boolean;
  created_at: string;
}

const Sideline = () => {
  const [entries, setEntries] = useState<SidelineEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<SidelineEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<SidelineEntry | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entries.filter(entry => entry.date_uploaded === selectedDate);
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }
  }, [selectedDate, entries]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('sideline')
        .select('*')
        .order('date_uploaded', { ascending: false });

      if (error) throw error;
      
      setEntries(data || []);
      setFilteredEntries(data || []);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast.error("Failed to load sideline entries");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      toast.success(`Downloaded ${filename}`);
    } catch (error) {
      console.error('Download error:', error);
      toast.error("Failed to download image");
    }
  };

  const downloadAllImages = async (entry: SidelineEntry) => {
    for (const image of entry.image_urls) {
      await downloadImage(image.url, image.filename);
    }
  };

  const openLightbox = (entry: SidelineEntry, imageIndex: number = 0) => {
    setSelectedEntry(entry);
    setLightboxImageIndex(imageIndex);
  };

  const closeLightbox = () => {
    setSelectedEntry(null);
    setLightboxImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEntry && lightboxImageIndex < selectedEntry.image_urls.length - 1) {
      setLightboxImageIndex(lightboxImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (lightboxImageIndex > 0) {
      setLightboxImageIndex(lightboxImageIndex - 1);
    }
  };

  // Get unique dates for filter
  const uniqueDates = [...new Set(entries.map(entry => entry.date_uploaded))].sort().reverse();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="container-section">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-section">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
              <ImageIcon size={16} className="text-primary" />
              <span className="text-sm font-medium">Image Gallery</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Sideline Collection
            </h1>
            
            <p className="subheading max-w-2xl mx-auto">
              Explore curated image collections organized by upload date. Click on any batch to view the full gallery.
            </p>
          </div>

          {/* Date Filter */}
          <div className="mb-12 flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">Filter by date:</span>
            </div>
            
            <select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 rounded-lg border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Dates</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </option>
              ))}
            </select>
          </div>

          {/* Grid */}
          {filteredEntries.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No images found</h3>
              <p className="text-muted-foreground">
                {selectedDate ? "No images uploaded on the selected date." : "No images have been uploaded yet."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="glass-card overflow-hidden group hover:shadow-xl transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={entry.thumbnail_url} 
                      alt={entry.title || "Untitled"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => openLightbox(entry)}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
                      >
                        <Eye size={24} className="text-white" />
                      </button>
                    </div>

                    {/* Image count badge */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {entry.image_urls.length} images
                    </div>

                    {/* Optimized badge */}
                    {entry.optimized && (
                      <div className="absolute top-2 left-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded-full">
                        Optimized
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 truncate">
                      {entry.title || "Untitled Collection"}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar size={14} />
                      {new Date(entry.date_uploaded).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => openLightbox(entry)}
                        className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye size={14} />
                        View
                      </button>
                      <button 
                        onClick={() => downloadAllImages(entry)}
                        className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                      >
                        <Download size={14} />
                        All
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedEntry && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full">
            {/* Close button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors text-white"
            >
              ✕
            </button>

            {/* Image */}
            <div className="relative">
              <img 
                src={selectedEntry.image_urls[lightboxImageIndex]?.url} 
                alt={selectedEntry.image_urls[lightboxImageIndex]?.filename}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Navigation */}
              {selectedEntry.image_urls.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    disabled={lightboxImageIndex === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ←
                  </button>
                  <button 
                    onClick={nextImage}
                    disabled={lightboxImageIndex === selectedEntry.image_urls.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Info bar */}
            <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{selectedEntry.title || "Untitled Collection"}</h3>
                  <p className="text-sm opacity-80">
                    Image {lightboxImageIndex + 1} of {selectedEntry.image_urls.length} • 
                    {selectedEntry.image_urls[lightboxImageIndex]?.filename}
                  </p>
                </div>
                <button 
                  onClick={() => downloadImage(
                    selectedEntry.image_urls[lightboxImageIndex].url, 
                    selectedEntry.image_urls[lightboxImageIndex].filename
                  )}
                  className="bg-primary hover:bg-primary/80 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Sideline;