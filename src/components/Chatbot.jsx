import React, { useState } from 'react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hello! I am Eco Assistant. I can help analyze your Life Cycle Assessment, identify carbon hotspots, or answer queries about circularity metrics.'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    const newMessages = [...messages, { sender: 'user', text: userText }];
    setMessages(newMessages);
    setInput('');

    // Generate dynamic response
    setTimeout(() => {
      let reply = "I've analyzed your current operational data for Plant A-12.";
      const lower = userText.toLowerCase();

      if (lower.includes('hotspot') || lower.includes('metal production') || lower.includes('smelter')) {
        reply = "Metal Production is currently your primary carbon hotspot, responsible for 42% of your overall lifecycle impact (14.2 tCO2e/t). Implementing inert anode technology and renewable power PPAs can reduce this by up to 35%.";
      } else if (lower.includes('upload') || lower.includes('excel') || lower.includes('data')) {
        reply = "You can upload operational sheets under the Data Upload tab (.xlsx, .csv). Standard fields required: Timestamp, Process_ID, Energy_kWh.";
      } else if (lower.includes('circularity') || lower.includes('recycle') || lower.includes('scrap')) {
        reply = "Your Material Circularity Indicator (MCI) score is 0.78. Increasing secondary scrap intake from 34% to 45% would improve your MCI to 0.84 and reduce Scope 3 upstream emissions by 1.8 tCO2e/t.";
      } else if (lower.includes('reduction') || lower.includes('recommend') || lower.includes('save')) {
        reply = "Key recommendation: Transitioning your thermal process heating in refining to green hydrogen could yield a reduction of 1.4 tCO2e/t within 12 months.";
      } else {
        reply = `Regarding "${userText}": Based on ISO 14040/44 standards, your plant shows high efficiency in processing (7% impact) but transport logistics can be optimized by shifting 20% of road freight to electric rail.`;
      }

      setMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
    }, 600);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-on-primary p-4 rounded-full shadow-lg hover:bg-primary-fixed-variant transition-all z-50 flex items-center gap-2 group"
        title="Open Eco Assistant"
      >
        <span className="material-symbols-outlined text-2xl" data-weight="fill">smart_toy</span>
        <span className="font-semibold text-sm pr-1">Eco Assistant</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="bg-surface-container-high px-4 py-3 flex justify-between items-center border-b border-outline-variant">
        <div className="flex items-center gap-2 text-on-surface">
          <span className="material-symbols-outlined text-primary text-xl" data-weight="fill">smart_toy</span>
          <span className="font-label-md text-sm font-bold">Eco Assistant</span>
          <span className="text-[10px] bg-primary-container text-on-primary font-bold px-2 py-0.5 rounded-full uppercase">AI Active</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Chat Messages */}
      <div className="p-4 h-64 overflow-y-auto space-y-3 bg-surface-bright text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-3.5 py-2 rounded-lg text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary text-on-primary rounded-br-none'
                  : 'bg-surface-container-lowest border border-outline-variant text-on-surface rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-2 border-t border-outline-variant bg-surface-container-lowest flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Eco Assistant..."
          className="flex-1 bg-surface border border-outline-variant rounded-md px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary text-on-primary px-3 py-1.5 rounded-md hover:bg-primary-fixed-variant text-xs font-semibold flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </form>
    </div>
  );
}
