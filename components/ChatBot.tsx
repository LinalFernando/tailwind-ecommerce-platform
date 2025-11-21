
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minimize2 } from 'lucide-react';
import { createChatSession } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat } from "@google/genai";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! 👋 I am the Heritage AI assistant. How can I help you with our organic products today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session on mount
  useEffect(() => {
    if (!chatSession.current) {
      try {
        chatSession.current = createChatSession();
      } catch (e) {
        console.error("Failed to initialize chat session", e);
      }
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSession.current) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatSession.current.sendMessage({ message: userMessage });
      const text = response.text || "I'm sorry, I didn't understand that.";
      setMessages(prev => [...prev, { role: 'model', text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the server. Please try again in a moment." }]);
      // Re-initialize chat on error just in case
      chatSession.current = createChatSession();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-white ${
          isOpen ? 'bg-red-500 rotate-90 hover:bg-red-600' : 'bg-heritage-green hover:bg-green-800 animate-bounce'
        } text-white`}
        style={{ animationDuration: '3s' }}
        aria-label="Toggle Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="bg-heritage-green p-4 flex items-center justify-between text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
               <div className="w-2 h-2 bg-green-300 rounded-full absolute top-0 right-0 animate-pulse"></div>
               <MessageCircle size={20} />
            </div>
            <h3 className="font-bold font-serif tracking-wide">Heritage Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
            <Minimize2 size={16} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-heritage-green text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fadeIn">
              <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our organic products..."
            className="flex-1 bg-white border border-gray-300 text-sm rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-heritage-green/50 focus:border-heritage-green transition-all shadow-sm placeholder-gray-400 text-gray-900"
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-heritage-green text-white rounded-full hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-90 shadow-sm flex-shrink-0"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;
