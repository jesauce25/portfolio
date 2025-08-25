import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { aboutData } from "@/data/about";

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
  buttons?: ButtonOption[];
};

type ButtonOption = {
  id: string;
  text: string;
  action: string;
  data?: any;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Hello! I\'m Paulo from Cebu, Philippines. How can I help you today?',
      buttons: [
        { id: 'projects', text: '🚀 View My Projects', action: 'show_projects' },
        { id: 'services', text: '💼 My Services', action: 'show_services' },
        { id: 'contact', text: '📞 Contact Me', action: 'show_contact' },
        { id: 'about', text: '👨‍💻 About Me', action: 'show_about' }
      ]
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatBubbleRef = useRef<HTMLButtonElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      if (isOpen) {
        // Show the element first
        chatWindowRef.current.style.display = 'flex';
        // Simple scale and opacity animation
        setTimeout(() => {
          if (chatWindowRef.current) {
            chatWindowRef.current.style.transform = 'scale(1)';
            chatWindowRef.current.style.opacity = '1';
          }
        }, 10);
      } else {
        // Hide with animation
        if (chatWindowRef.current) {
          chatWindowRef.current.style.transform = 'scale(0.8)';
          chatWindowRef.current.style.opacity = '0';
          setTimeout(() => {
            if (chatWindowRef.current) {
              chatWindowRef.current.style.display = 'none';
            }
          }, 300);
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const handleButtonClick = (action: string, data?: any, buttonText?: string) => {
    // Add user message showing what button they clicked
    if (buttonText) {
      addMessage({
        sender: 'user',
        text: buttonText
      });
    }

    // Add bot response after a short delay
    setTimeout(() => {
      let botResponse: ChatMessage;

      switch (action) {
        case 'show_projects':
          botResponse = {
            sender: 'bot',
            text: 'Here are some of my featured projects:',
            buttons: [
              ...projects.map(project => ({
                id: project.title.toLowerCase().replace(/\s+/g, '-'),
                text: `🔍 ${project.title}`,
                action: 'project_detail',
                data: project
              })),
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'project_detail':
          const project = data;
          botResponse = {
            sender: 'bot',
            text: `**${project.title}**\n\n${project.description}\n\n**Technologies:** ${project.tags.join(', ')}\n\nThis project showcases my expertise in modern web development and user experience design.`,
            buttons: [
              { id: 'more-projects', text: '🚀 More Projects', action: 'show_projects' },
              { id: 'discuss', text: '💬 Discuss This Project', action: 'show_contact' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'show_services':
          botResponse = {
            sender: 'bot',
            text: 'I offer comprehensive web development services:',
            buttons: [
              ...services.map(service => ({
                id: service.name.toLowerCase().replace(/\s+/g, '-'),
                text: `💼 ${service.name}`,
                action: 'service_detail',
                data: service
              })), // Added service_detail action
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'service_detail': // New case for service details
          const service = data;
          botResponse = {
            sender: 'bot',
            text: `**${service.name}**\n\n${service.description}\n\n**Tags:** ${service.tags.join(', ')}\n\nMy services are tailored to meet your unique business needs.`, // Using tags as a substitute for technologies
            buttons: [
              { id: 'more-services', text: '💼 More Services', action: 'show_services' },
              { id: 'contact-service', text: '📞 Get Quote', action: 'show_contact' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'show_pricing':
          botResponse = {
            sender: 'bot',
            text: '**My Service Pricing:**\n\n💼 **Basic Website** - $500-$1,000\n• 3-5 pages\n• Responsive design\n• Basic SEO setup\n\n🚀 **Advanced Web App** - $1,500-$3,000\n• Custom functionality\n• Database integration\n• Admin dashboard\n\n⭐ **Premium Solution** - $3,000+\n• Full-stack application\n• Advanced features\n• Ongoing maintenance\n\n*Final pricing depends on project complexity and requirements*',
            buttons: [
              { id: 'contact-quote', text: '📞 Get Custom Quote', action: 'show_contact' },
              { id: 'services-back', text: '💼 Back to Services', action: 'show_services' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'show_contact':
          botResponse = {
            sender: 'bot',
            text: '**Let\'s Connect!**\n\n📧 Email: pauloabaquita098956@email.com\n📱 Phone: +63 994 032 9454\n📍 Location: Cebu, Philippines\n💼 LinkedIn: /in/paulo-abaquita\n\n\n**Available for:**\n• Project consultations\n• Freelance work\n• Long-term collaborations\n\nReady to discuss your project? I\'d love to hear from you!',
            buttons: [
              { id: 'schedule', text: '📅 Schedule Meeting', action: 'schedule_meeting' },
              { id: 'hire', text: '🤝 Hire Me Page', action: 'hire_info' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'schedule_meeting':
          botResponse = {
            sender: 'bot',
            text: '**Schedule a Consultation:**\n\nI\'d love to discuss your project! Here\'s how to get started:\n\n✅ **Email me** with your project details\n✅ **Include** your preferred meeting time\n✅ **Mention** your budget range\n✅ **Share** any inspiration or references\n\nI typically respond within 24 hours and offer free initial consultations to understand your needs better.',
            buttons: [
              { id: 'contact-back', text: '📞 Back to Contact', action: 'show_contact' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'hire_info':
          botResponse = {
            sender: 'bot',
            text: '**Ready to Work Together?**\n\nYou can find detailed information about hiring me on the **Hire Me** page of this website.\n\nThere you\'ll find:\n• Detailed service descriptions\n• Portfolio samples\n• Client testimonials\n• Contact form\n• Project inquiry form\n\nI\'m excited to potentially work with you!',
            buttons: [
              { id: 'contact-back', text: '📞 Back to Contact', action: 'show_contact' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'show_about':
          botResponse = {
            sender: 'bot',
            text: `**${aboutData.mainHeading}**\n\n${aboutData.subheading}\n\n**Why Clients Choose Me:**\n${aboutData.whyChooseMe.intro}\n${aboutData.whyChooseMe.details.map(d => `• **${d.title}:** ${d.description}`).join('\n')}\n\n**My Approach (Traits):**\n${aboutData.traits.map(t => `• ${t.emoji} ${t.label}`).join('\n')}`,
            buttons: [
              { id: 'services', text: '🛠️ Services I Offer', action: 'show_services' },
              { id: 'experience', text: '💼 My Experience', action: 'show_experience' },
              { id: 'projects-about', text: '🚀 View Past Work', action: 'show_projects' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'show_skills':
          botResponse = {
            sender: 'bot',
            text: '**Technical Skills & Expertise:**\n\n**Frontend Technologies:**\n• React.js, Next.js, Vue.js\n• JavaScript, TypeScript\n• HTML5, CSS3, Sass\n• Tailwind CSS, Bootstrap\n• GSAP, Framer Motion\n\n**Backend & Database:**\n• Node.js, Express.js\n• MongoDB, PostgreSQL\n• RESTful APIs, GraphQL\n• Firebase, Supabase\n\n**Tools & Platforms:**\n• Git, GitHub, GitLab\n• Docker, AWS, Vercel\n• Figma, Adobe Creative Suite\n• SEO tools & Analytics',
            buttons: [
              { id: 'about-back', text: '👨‍💻 Back to About', action: 'show_about' },
              { id: 'projects-skills', text: '🚀 See Projects', action: 'show_projects' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;

        case 'show_experience':
          botResponse = {
            sender: 'bot',
            text: `**Professional Experience: ${aboutData.identityCard.name}**\n\n` +
              `👋 Hi! I help businesses grow online by creating powerful, high-performing websites that attract customers and boost sales.\n\n` +
              `🎓 **Education:** Bachelor of Science in Information Technology Graduate\n` +
              `⭐ **3+ Years** of professional development\n` +
              `🏆 **${projects.length}+ Projects** successfully delivered\n` +
              `🌟 **Trusted by clients** for delivering results that grow their business\n\n` +
              `**What clients love:** ${aboutData.identityCard.clientLove}\n\n` +
              `**The process that works:** ${aboutData.identityCard.process}\n\n` +
              `**Key Services:**\n` +
              `${services.map(s => `• ${s.name}`).join('\n')}`,
            buttons: [
              { id: 'about-back', text: '👨‍💻 Back to About', action: 'show_about' },
              { id: 'contact-exp', text: '📞 Work With Me', action: 'show_contact' },
              { id: 'back', text: '⬅️ Back to Menu', action: 'main_menu' }
            ]
          };
          break;


        case 'main_menu':
          botResponse = {
            sender: 'bot',
            text: 'What else would you like to know about my work?',
            buttons: [
              { id: 'projects', text: '🚀 View My Projects', action: 'show_projects' },
              { id: 'services', text: '💼 My Services', action: 'show_services' },
              { id: 'contact', text: '📞 Contact Me', action: 'show_contact' },
              { id: 'about', text: '👨‍💻 About Me', action: 'show_about' }
            ]
          };
          break;

        default:
          botResponse = {
            sender: 'bot',
            text: 'I\'m here to help! What would you like to know?',
            buttons: [
              { id: 'projects', text: '🚀 View My Projects', action: 'show_projects' },
              { id: 'services', text: '💼 My Services', action: 'show_services' },
              { id: 'contact', text: '📞 Contact Me', action: 'show_contact' },
              { id: 'about', text: '👨‍💻 About Me', action: 'show_about' }
            ]
          };
      }

      addMessage(botResponse);
    }, 800);
  };

  return (
    <>
      <button
        ref={chatBubbleRef}
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-primary text-white rounded-full p-4 shadow-lg z-[100] transition-all duration-300 hover:scale-110 interactive"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      <div
        ref={chatWindowRef}
        className={`fixed bottom-24 right-8 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col z-[99] border border-gray-200 transform origin-bottom-right ${isOpen ? 'block' : 'hidden'}`}
        style={{ opacity: 0, transform: 'scale(0.8)' }}
      >
        <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
          <h3 className="font-bold">Chat Assistant</h3>
          <button onClick={toggleChat} className="text-white hover:opacity-80" aria-label="Close Chatbot">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[85%]">
                <div
                  className={`p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white text-gray-800 border border-gray-200 shadow-sm'}`}
                >
                  <div className="whitespace-pre-line text-sm">{msg.text}</div>
                </div>

                {/* Render buttons for bot messages */}
                {msg.sender === 'bot' && msg.buttons && (
                  <div className="mt-2 space-y-2">
                    {msg.buttons.map((button) => (
                      <button
                        key={button.id}
                        onClick={() => handleButtonClick(button.action, button.data, button.text)}
                        className="block w-full text-left px-3 py-2 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors border border-primary/20 hover:border-primary/40"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default Chatbot;