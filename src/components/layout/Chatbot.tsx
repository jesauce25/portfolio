import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import gsap from 'gsap';
import { projects } from "@/data/projects";

type ChatMessage = {
  sender: 'user' | 'bot';
  text: string;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: 'Hello! I\'m Paulo L. Abaquita from City of Naga, Philippines. How can I help you today? Ask me about my projects or services!' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const chatBubbleRef = useRef<HTMLButtonElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      if (isOpen) {
        gsap.to(chatWindowRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
      } else {
        gsap.to(chatWindowRef.current, { scale: 0.8, opacity: 0, duration: 0.3, ease: 'back.in(1.7)' });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newUserMessage: ChatMessage = { sender: 'user', text: inputMessage.trim() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    
    const lowerCaseMessage = inputMessage.toLowerCase();
    let botResponse = 'I\'m not sure how to answer that. Can you rephrase or ask about my projects or services?';

    // Function to find project by keyword
    const findProject = (query: string) => {
      for (const project of projects) {
        if (project.title.toLowerCase().includes(query) || 
            project.description.toLowerCase().includes(query) ||
            project.tags.some(tag => tag.toLowerCase().includes(query))) {
          return project;
        }
      }
      return null;
    };

    if (lowerCaseMessage.includes('latest project')) {
      // Assuming projects are ordered by recency, pick the first one
      if (projects.length > 0) {
        const latestProject = projects[0];
        botResponse = `My latest project is "${latestProject.title}". It\'s a ${latestProject.description.substring(0, 100)}... It uses technologies like: ${latestProject.tags.join(', ')}.`;
      } else {
        botResponse = 'I don\'t have any projects listed yet, but I\'m always working on something new!';
      }
    } else if (lowerCaseMessage.includes('project') || lowerCaseMessage.includes('work')) {
      const keywords = lowerCaseMessage.split(' ').filter(word => word.length > 2 && word !== 'project' && word !== 'work' && word !== 'about');
      let foundProject = null;
      for (const keyword of keywords) {
        foundProject = findProject(keyword);
        if (foundProject) break;
      }

      if (foundProject) {
        botResponse = `"${foundProject.title}" is a project focused on ${foundProject.description.substring(0, 100)}... Technologies used include: ${foundProject.tags.join(', ')}.`;
      } else {
        const projectTitles = projects.map(p => p.title).join(', ');
        botResponse = `I have worked on several exciting projects, including: ${projectTitles}. Which one would you like to know more about?`;
      }
    } else if (lowerCaseMessage.includes('service') || lowerCaseMessage.includes('offer')) {
      botResponse = 'I offer services in modern frontend development, interactive animations, UI/UX design, and full-stack integration.';
    } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach out')) {
      botResponse = 'You can reach out to me via the Hire Me page, or check my contact details there. I look forward to hearing from you!';
    } else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      botResponse = 'Hello there! How can I assist you today? Feel free to ask about my projects or services.';
    } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
      botResponse = 'You\'re welcome! Is there anything else I can help you with?';
    } else if (lowerCaseMessage.includes('who are you')) {
      // Hardcoded response for personal info
      botResponse = 'I am Paulo L. Abaquita from City of Naga, Philippines. I specialize in building digital marketing-ready websites.';
    } else if (lowerCaseMessage.includes('what can you do')) {
      botResponse = 'I can tell you about Paulo\'s projects, services, and how to get in touch with him. Just ask!';
    }

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 1000);

    setInputMessage('');
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
        style={{ opacity: 0, transform: 'scale(0.8)' }} // Initial hidden state for animation
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
              <div
                className={`max-w-[75%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-r-lg hover:bg-primary/90 transition-colors"
            aria-label="Send Message"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot; 