import { useRef, useState, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call edge function to send email
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name,
          email,
          message,
          to: 'pauloabaquita098956@gmail.com'
        }
      });

      if (error) throw error;

      toast.success("Your message has been sent successfully!", {
        description: "Paulo will get back to you as soon as possible.",
        position: "top-center"
      });

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again or contact directly.", {
        position: "top-center"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-section">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10">
              <span className="text-sm font-medium">Get In Touch</span>
            </div>
            
            <h1 className="heading-xl mb-6 gradient-text">
              Let's Create Something Amazing Together
            </h1>
            
            <p className="subheading max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential collaboration? I'd love to hear from you.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea 
                  id="message" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none bg-white/50 backdrop-blur-sm"
                  placeholder="Tell me about your project or inquiry..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full btn-primary h-14 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>

            <div className="mt-12 text-center">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold mb-4">Direct Contact</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Email:</span> pauloabaquita098956@gmail.com
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Response Time:</span> Usually within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;