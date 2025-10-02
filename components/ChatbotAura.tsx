import React, { useState, useRef, useEffect } from 'react';
import { SOCIAL_LINKS } from '../constants';
import { useI18n } from '../i18n';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

interface ChatbotAuraProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
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


const ChatbotAura: React.FC<ChatbotAuraProps> = ({ isOpen, setIsOpen }) => {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Effect to set the initial message when the chat opens for the first time or language changes
  useEffect(() => {
    if (isOpen) {
      setMessages([{ id: '1', text: t('chatbot.greeting'), isBot: true }]);
    }
  }, [t, isOpen]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    const knowledgeBase = [
        // General Info
        { keywords: ['hola', 'buenos', 'buenas', 'hello', 'good morning', 'hi'], answerKey: 'chatbot.answers.greeting' },
        { keywords: ['quiénes son', 'que es', 'a qué se dedican', 'about', 'who are you', 'what is'], answerKey: 'chatbot.answers.whoAreYou' },
        { keywords: ['servicios', 'ayudan', 'hacen', 'services', 'what do you do'], answerKey: 'chatbot.answers.servicesOffered' },
        { keywords: ['ciudades', 'operan', 'dónde', 'cities', 'where', 'operate'], answerKey: 'chatbot.answers.operatingCities' },
        { keywords: ['contacto', 'teléfono', 'llamar', 'dirección', 'email', 'contact', 'phone', 'address'], answerKey: 'chatbot.answers.contactInfo' },
        { keywords: ['lema', 'slogan'], answerKey: 'chatbot.answers.slogan' },
        { keywords: ['horario', 'atienden', 'abren', 'hours', 'open'], answerKey: 'chatbot.answers.hours' },
        { keywords: ['misión', 'visión', 'valores', 'mission', 'vision', 'values'], answerKey: 'chatbot.answers.missionVision' },
        
        // Property Management
        { keywords: ['administración', 'incluye', 'management', 'includes'], answerKey: 'chatbot.answers.adminServiceIncludes' },
        { keywords: ['reparaciones', 'locativas', 'repairs'], answerKey: 'chatbot.answers.locativeRepairs' },
        { keywords: ['cuota de administración', 'pago de cuota', 'admin fee payment'], answerKey: 'chatbot.answers.adminFeePayment' },

        // Costs and Payments
        { keywords: ['honorarios', 'costo', 'tarifa', 'fees', 'cost', 'rate'], answerKey: 'chatbot.answers.adminServiceFee' },
        { keywords: ['afianza', 'costo afianza', 'guarantee fee'], answerKey: 'chatbot.answers.guaranteeFee' },
        { keywords: ['cuándo pagan', 'pago del canon', 'cuando me pagan', 'payment schedule', 'when do i get paid'], answerKey: 'chatbot.answers.paymentSchedule' },
        { keywords: ['débitos', 'descuentan', 'debits', 'deductions'], answerKey: 'chatbot.answers.monthlyDebits' },
        { keywords: ['iva', 'retenciones', 'impuestos', 'vat', 'retentions', 'taxes'], answerKey: 'chatbot.answers.vatAndRetentions' },
        
        // Documentation
        { keywords: ['documentos persona natural', 'docs natural person'], answerKey: 'chatbot.answers.docsNaturalPerson' },
        { keywords: ['documentos persona jurídica', 'docs legal entity'], answerKey: 'chatbot.answers.docsLegalEntity' },
        { keywords: ['líneas telefónicas', 'phone lines'], answerKey: 'chatbot.answers.phoneLinesPolicy' },
        { keywords: ['estudio', 'afianzadora', 'datafianza', 'guarantee study'], answerKey: 'chatbot.answers.guaranteeStudyPayer' },

        // Rent Increases
        { keywords: ['incremento vivienda', 'aumento canon', 'rent increase housing'], answerKey: 'chatbot.answers.rentIncreaseHousing' },
        { keywords: ['incremento comercial', 'increase commercial'], answerKey: 'chatbot.answers.rentIncreaseCommercial' },
        { keywords: ['incremento cuota de administración', 'increase admin fee'], answerKey: 'chatbot.answers.adminFeeIncrease' },
        
        // Other Processes
        { keywords: ['rut', 'cambios tributarios', 'tax changes'], answerKey: 'chatbot.answers.taxInfoUpdate' },
        { keywords: ['fallece', 'fallecimiento', 'muerte arrendatario', 'tenant death'], answerKey: 'chatbot.answers.tenantDeath' },
        { keywords: ['pautar', 'publicar para venta', 'list for sale'], answerKey: 'chatbot.answers.infoForSaleListing' },
        { keywords: ['comisión', 'comision por venta', 'sales commission'], answerKey: 'chatbot.answers.saleCommission' },

        // Fallback / General
        { keywords: ['vender', 'venda', 'propiedad', 'sell', 'property'], answerKey: 'chatbot.answers.sell' },
        { keywords: ['arrendar', 'arriendo', 'alquilar', 'rent', 'lease'], answerKey: 'chatbot.answers.rent' },
        { keywords: ['gracias', 'ok', 'listo', 'thanks', 'thank you'], answerKey: 'chatbot.answers.thanks' }
    ];

    for (const entry of knowledgeBase) {
      for (const keyword of entry.keywords) {
        if (lowerInput.includes(keyword)) {
          return t(entry.answerKey);
        }
      }
    }
    
    return t('chatbot.answers.default');
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
          aria-label={t(isOpen ? 'chatbot.closeAria' : 'chatbot.openAria')}
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
                    <p className="text-xs text-green-700 font-semibold">● {t('chatbot.statusOnline')}</p>
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
                    placeholder={t('chatbot.inputPlaceholder')}
                    className="flex-1 bg-white/80 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#153B67]/50"
                  />
                  <button onClick={handleSendMessage} className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 hover:bg-green-600 transition-colors">
                    <SendIcon />
                  </button>
              </div>
               <a href={SOCIAL_LINKS.whatsapp1} target="_blank" rel="noopener noreferrer" className="block w-full mt-2 text-center bg-green-500/90 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors px-4 py-2 text-sm">
                {t('chatbot.whatsappButton')}
            </a>
          </footer>
        </div>
      )}
    </>
  );
};

export default ChatbotAura;