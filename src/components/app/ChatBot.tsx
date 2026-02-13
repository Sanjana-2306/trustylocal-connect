import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  text: string;
  from: "user" | "bot";
}

const faqResponses: Record<string, string> = {
  complaint: "Please describe your complaint and we'll escalate it to an admin for review.",
  refund: "Refunds are processed after admin review. Typically within 48 hours.",
  payment: "Payments are held in escrow until job completion. Once confirmed, funds are released to the worker.",
  trust: "Trust scores are calculated based on completed jobs, ratings, and complaint history. Score ≥70 is required for search visibility.",
  book: "To book a worker, browse the Workers page, find a verified worker, and click 'Book Now'.",
  help: "I can help with: complaints, refunds, payments, trust scores, and booking. Just ask!",
  cancel: "To cancel a job, go to My Jobs and select the job you want to cancel. Cancellation before worker acceptance is free.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(faqResponses)) {
    if (lower.includes(key)) return value;
  }
  return "I'm not sure I understand. Try asking about complaints, refunds, payments, trust scores, or booking. Or type 'help' for options.";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm your VerifiedHelp assistant. How can I help you today?", from: "bot" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { text: input, from: "user" };
    const botMsg: Message = { text: getResponse(input), from: "bot" };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-5 z-50 w-80 glass-card flex flex-col overflow-hidden"
            style={{ height: 420 }}
          >
            <div className="flex items-center justify-between p-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <MessageCircle className="h-3 w-3 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground">Support</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs ${
                    msg.from === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-secondary text-foreground text-xs rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
              <button onClick={handleSend} className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90">
                <Send className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all glow-primary"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </>
  );
}
