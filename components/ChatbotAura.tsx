import React, { useState, useRef, useEffect } from 'react';
import { SOCIAL_LINKS, CHATBOT_KNOWLEDGE_BASE } from '../constants';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transform rotate-45">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
  </svg>
);


const ChatbotAura: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '¡Hola! Soy Aura, tu asistente virtual. ¿En qué puedo ayudarte?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    for (const entry of CHATBOT_KNOWLEDGE_BASE) {
      for (const keyword of entry.keywords) {
        if (lowerInput.includes(keyword)) {
          return entry.answer;
        }
      }
    }

    // Default response if no keyword is matched
    return 'Entendido. Para una atención más personalizada, te invito a continuar la conversación con uno de nuestros asesores por WhatsApp.';
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const userMessage: Message = { id: Date.now().toString(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = { id: (Date.now() + 1).toString(), text: generateResponse(inputValue), isBot: true };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setInputValue('');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 focus:outline-none"
          aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[32rem] flex flex-col overflow-hidden rounded-2xl"
          style={{
            background: 'rgba(230, 230, 230, 0.5)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          {/* Header */}
          <header className="p-3 flex items-center justify-between bg-white/20 border-b border-white/30 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-[#153B67] text-white flex items-center justify-center font-bold text-xl">A</div>
                <div>
                    <h3 className="font-bold text-gray-800">Aura</h3>
                    <p className="text-xs text-green-700 font-semibold">● En línea</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-600 hover:text-gray-900">&times;</button>
          </header>
          
          {/* Messages */}
          <div 
            className="flex-1 p-4 overflow-y-auto"
            style={{ backgroundImage: `url('https://www.toptal.com/designers/subtlepatterns/uploads/light-sketch.png')` }}
          >
            <div className="space-y-3">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] px-3 py-2 rounded-lg shadow-md text-sm text-gray-800 ${msg.isBot ? 'bg-white/90 rounded-bl-none' : 'bg-[#dcf8c6]/90 rounded-br-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
          </div>
          
          {/* Input */}
          <footer className="p-2 border-t border-white/30 bg-white/20 flex-shrink-0">
              <div className="flex items-center gap-2">
                  <input 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 bg-white/80 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#153B67]/50"
                  />
                  <button onClick={handleSendMessage} className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 hover:bg-green-600 transition-colors">
                    <SendIcon />
                  </button>
              </div>
               <a href={SOCIAL_LINKS.whatsapp1} target="_blank" rel="noopener noreferrer" className="block w-full mt-2 text-center bg-green-500/90 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors px-4 py-2 text-sm">
                Continuar en WhatsApp
            </a>
          </footer>
        </div>
      )}
    </>
  );
};

export default ChatbotAura;