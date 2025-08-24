import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="glass-card p-8 relative overflow-hidden">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="inline-block w-1.5 h-6 bg-primary rounded-full"></span>
        Contact Details
      </h3>
      
      <div className="space-y-8">
        <div className="flex gap-5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Mail size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Email</h4>
            <a 
              href="mailto:pauloabaquita098956@gmail.com" 
              className="text-muted-foreground hover:text-primary transition-colors group flex items-center gap-1"
            >
              pauloabaquita098956@gmail.com
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
            </a>
          </div>
        </div>
        
        <div className="flex gap-5">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Phone size={20} className="text-secondary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Phone</h4>
            <a 
              href="tel:+1234567890" 
              className="text-muted-foreground hover:text-secondary transition-colors group flex items-center gap-1"
            >
              0992 032 9454
              <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
            </a>
          </div>
        </div>
        
        <div className="flex gap-5">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <MapPin size={20} className="text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-1">Location</h4>
            <p className="text-muted-foreground">
              Cebu, Philippines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo; 