import { useState, useRef, FormEvent } from "react";
import { toast } from "sonner";
import gsap from "gsap";
import { Send } from "lucide-react";

type ContactFormProps = {
  showHeading?: boolean;
};

const ContactForm: React.FC<ContactFormProps> = ({ showHeading = true }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        toast.success("Your message has been sent successfully!", {
          description: "I'll get back to you as soon as possible.",
          position: "top-center",
        });
        // Animate form submission success
        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { y: 0 },
            {
              y: -20,
              opacity: 0,
              duration: 0.5,
              ease: "power3.in",
              onComplete: () => {
                setName("");
                setEmail("");
                setMessage("");
                setIsSubmitting(false);
                // Reset and show form again
                gsap.fromTo(
                  formRef.current!,
                  { y: 20, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    delay: 0.2,
                  }
                );
              },
            }
          );
        }
      } else {
        // Check if the response has content before parsing as JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          toast.error("Failed to send your message.", {
            description: errorData.error || "Please try again later.",
            position: "top-center",
          });
        } else {
          // Handle cases where response is not JSON or is empty
          toast.error("Failed to send your message.", {
            description: `Server responded with status ${response.status} but no valid JSON. Please try again.`, 
            position: "top-center",
          });
        }
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred.", {
        description: "Please check your network connection and try again.",
        position: "top-center",
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit} 
      className="glass-card p-8 relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute w-32 h-32 rounded-full bg-primary/5 -top-16 -left-16"></div>
      <div className="absolute w-24 h-24 rounded-full bg-secondary/5 -bottom-12 -right-12"></div>
      
      <div className="mb-6 relative form-element">
        <label 
          htmlFor="name" 
          className={`block text-sm font-medium mb-2 transition-all duration-300 ${
            focusedInput === 'name' ? 'text-primary' : 'text-foreground'
          }`}
        >
          Your Name
        </label>
        <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
          focusedInput === 'name' ? 'ring-2 ring-primary/20' : ''
        }`}>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
            placeholder="John Doe"
          />
          <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
            focusedInput === 'name' ? 'scale-x-100' : 'scale-x-0'
          }`}></span>
        </div>
      </div>
      
      <div className="mb-6 relative form-element">
        <label 
          htmlFor="email" 
          className={`block text-sm font-medium mb-2 transition-all duration-300 ${
            focusedInput === 'email' ? 'text-primary' : 'text-foreground'
          }`}
        >
          Email Address
        </label>
        <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
          focusedInput === 'email' ? 'ring-2 ring-primary/20' : ''
        }`}>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
            required
            className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all bg-white/50 backdrop-blur-sm"
            placeholder="john@example.com"
          />
          <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
            focusedInput === 'email' ? 'scale-x-100' : 'scale-x-0'
          }`}></span>
        </div>
      </div>
      
      <div className="mb-8 relative form-element">
        <label 
          htmlFor="message" 
          className={`block text-sm font-medium mb-2 transition-all duration-300 ${
            focusedInput === 'message' ? 'text-primary' : 'text-foreground'
          }`}
        >
          Your Message
        </label>
        <div className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
          focusedInput === 'message' ? 'ring-2 ring-primary/20' : ''
        }`}>
          <textarea 
            id="message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocusedInput('message')}
            onBlur={() => setFocusedInput(null)}
            required
            rows={6}
            className="w-full px-4 py-3 rounded-lg border focus:outline-none transition-all resize-none bg-white/50 backdrop-blur-sm"
            placeholder="Tell me about your project or inquiry..."
          ></textarea>
          <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-300 ${
            focusedInput === 'message' ? 'scale-x-100' : 'scale-x-0'
          }`}></span>
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full relative overflow-hidden group h-14 rounded-full bg-gradient-to-r from-primary via-purple-500 to-secondary text-white font-medium flex items-center justify-center gap-2 transition-all duration-300 interactive"
        disabled={isSubmitting}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Send Message <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      </button>
    </form>
  );
};

export default ContactForm; 