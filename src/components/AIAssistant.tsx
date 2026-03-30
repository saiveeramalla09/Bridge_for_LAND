import { useState } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './AIAssistant.css';

export default function AIAssistant() {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    { role: 'ai', text: language === 'te' ? 'నమస్కారం! నేను ఎలా సహాయపడగలను?' : language === 'hi' ? 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ?' : 'Hello! I am your real estate AI guide. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMsgs = [...messages, { role: 'user' as const, text: input }];
    setMessages(newMsgs);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      let reply = 'I can help you find verified land, explain concepts like Gajam, or guide you through document verification.';
      
      if (input.toLowerCase().includes('gajam')) {
        reply = '1 Gajam is equal to 1 Square Yard. 4840 Gajams make 1 Acre.';
      } else if (input.toLowerCase().includes('buy')) {
        reply = 'To buy land, go to the Browse Map section, find a suitable property, check the verification status, and contact the seller directly!';
      } else if (language === 'te') {
         reply = 'నేను భూమికి సంబంధించిన వివరాలు మరియు పత్రాల గురించి మీకు సహాయం చేయగలను.';
      } else if (language === 'hi') {
         reply = 'मैं आपको जमीन खरीदने और बेचने में मदद कर सकता हूँ।';
      }

      setMessages(m => [...m, { role: 'ai', text: reply }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button className="ai-fab animate-fade-in" onClick={() => setIsOpen(true)}>
          <Bot size={28} />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="ai-widget card animate-fade-in">
          <div className="ai-header">
            <div className="flex items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={20} className="text-primary" />
              <strong>{t('aiAssistant')}</strong>
            </div>
            <button className="btn-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="ai-body">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-bubble ${msg.role}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="ai-footer">
            <input 
              type="text" 
              className="ai-input" 
              placeholder="Ask me anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="ai-send" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
