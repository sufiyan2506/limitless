// limitless-frontend-main\src\components\FAQChatbot.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  MessageCircle,
  Send,
  RotateCcw,
  User,
  Zap,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
  metadata?: { confidence?: number; matched?: string };
};

const STORAGE_KEY = "limitless:faqchat:conversation:v1";

const FAQ_DATA: Record<string, string> = {
  services:
    "We offer end-to-end product design & engineering: UI/UX, frontend, backend, mobile apps, branding, and growth strategy. Tell me what you want to build and I’ll recommend a stack + timeline.",
  pricing:
    "Pricing depends on scope — prototype, MVP, or full platform. Typical ranges: small projects $5k–$25k, medium $25k–$100k, enterprise varies. Ask for a tailored estimate and we'll propose options.",
  timeline:
    "Timelines depend on complexity. Typical ranges: prototypes 1–3 weeks, MVPs 6–12 weeks, full platforms 3–9+ months. We provide a clear schedule in the discovery phase.",
  portfolio:
    "Check our Work section for case studies. We build across web, mobile, and AI products with a focus on measurable outcomes and polished UX.",
  contact:
    "You can email hello@limitless.studio or use the Contact page. We typically respond within 24 hours on business days.",
  technologies:
    "We work with React / Next.js, TypeScript, TailwindCSS, Node.js, Supabase, PostgreSQL, Three.js for visuals, and deploy on Vercel or AWS depending on needs.",
  support:
    "We offer post-launch maintenance, SLA support, and iterative product development. Support plans are flexible depending on your needs.",
  process:
    "Discovery → Design → Build → QA → Launch → Iterate. We emphasize frequent demos, transparent deliverables, and testing before release.",
};

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "How much does it cost?",
  "What is the timeline?",
  "Can I see your portfolio?",
  "How can I contact you?",
  "What technologies do you use?",
];

// smarter keywords & synonyms (small lookup to improve matching)
const INTENT_KEYWORDS: Record<string, string[]> = {
  services: ["service", "offer", "do you", "develop", "build", "create"],
  pricing: ["price", "cost", "budget", "how much", "rate", "fee"],
  timeline: ["time", "timeline", "how long", "when", "duration"],
  portfolio: ["portfolio", "work", "case study", "examples", "show"],
  contact: ["contact", "reach", "email", "phone", "talk", "speak"],
  technologies: ["tech", "stack", "tools", "react", "node", "typescript"],
  support: ["support", "maintain", "maintenance", "help after", "updates"],
  process: ["process", "how", "approach", "method", "workflow"],
};

function nowISO() {
  return new Date().toISOString();
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Very small fuzzy score for intent matching (no external libs)
function scoreIntent(query: string) {
  const q = query.toLowerCase();
  const scores: { key: string; score: number; matched?: string }[] = [];

  for (const [key, synonyms] of Object.entries(INTENT_KEYWORDS)) {
    let s = 0;
    for (const syn of synonyms) {
      if (q.includes(syn)) s += syn.length / 6; // weighted by length
    }
    // exact keyword presence in FAQ_DATA key boosts score
    if (q.includes(key)) s += 1;
    if (s > 0) scores.push({ key, score: s, matched: synonyms.join(", ") });
  }

  // fallback: try to match single words against FAQ_DATA keys
  if (scores.length === 0) {
    for (const key of Object.keys(FAQ_DATA)) {
      if (q.includes(key)) scores.push({ key, score: 0.7, matched: key });
    }
  }

  scores.sort((a, b) => b.score - a.score);
  return scores;
}

function saveConversation(messages: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore
  }
}
function loadConversation(): Message[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Message[];
  } catch {
    return null;
  }
}

export default function FAQChatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // load previous conversation if any
  useEffect(() => {
    const saved = loadConversation();
    if (saved && saved.length) {
      setMessages(saved);
    }
  }, []);

  // popup promo after 25s if not opened
  useEffect(() => {
    const t = setTimeout(() => {
      if (!isOpen) setShowPopup(true);
    }, 25000);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    saveConversation(messages);
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  // smart responder: finds best answer & simulates typing
  const generateBotResponse = async (text: string) => {
    const intentScores = scoreIntent(text);
    // confidence normalized
    const top = intentScores[0];
    let response = "";
    let confidence = top ? Math.min(1, top.score / (intentScores.length ? intentScores[0].score : 1)) : 0;

    if (top && FAQ_DATA[top.key]) {
      response = FAQ_DATA[top.key];
    } else {
      // fallback: attempt to include keywords from user
      response =
        "Thanks — I didn't find an exact match. Could you rephrase, or would you like to contact us directly for a tailored response?";
    }

    // simulate typing delay proportional to message length (but capped)
    const typingDelay = Math.min(1200 + response.length * 8, 1800);

    setIsTyping(true);
    await new Promise((res) => setTimeout(res, Math.max(500, typingDelay * 0.5)));

    // show smaller 'thinking' period with animated dots
    await new Promise((res) => setTimeout(res, Math.min(typingDelay, 900)));
    setIsTyping(false);

    // add bot message
    pushMessage({
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: nowISO(),
      metadata: { confidence: top ? top.score : 0, matched: top?.key },
    });

    // small celebratory confetti for high-confidence answers
    if (top && top.score >= 2.0) {
      try {
        confetti({ particleCount: 18, spread: 60, origin: { y: 0.7 } });
      } catch {}
    }
  };

  function pushMessage(msg: Message) {
    setMessages((m) => {
      const next = [...m, msg];
      return next;
    });
  }

  const handleSend = async (text?: string) => {
    const messageText = (text ?? inputValue).trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString() + "-u",
      text: messageText,
      isUser: true,
      timestamp: nowISO(),
    };
    pushMessage(userMsg);
    setInputValue("");

    // small delay before bot reply to feel natural
    setTimeout(() => generateBotResponse(messageText), 250);
  };

  const handleQuickQuestion = (q: string) => {
    handleSend(q);
  };

  const handleReset = () => {
    const welcome: Message = {
      id: "welcome-bot",
      text: "Hello! I'm your Limitless assistant. Ask me about services, pricing, timelines, or just say hi 👋",
      isUser: false,
      timestamp: nowISO(),
    };
    setMessages([welcome]);
    setShowPopup(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const openChat = () => {
    setIsOpen(true);
    setShowPopup(false);
    if (messages.length === 0) {
      const welcome: Message = {
        id: "welcome-bot",
        text: "Hello! I'm your Limitless assistant. Ask me about services, pricing, timelines, or just say hi 👋",
        isUser: false,
        timestamp: nowISO(),
      };
      setMessages([welcome]);
    }
  };

  // navigate to Contact page
  const gotoContact = () => {
    setIsOpen(false);
    navigate("/contact");
  };

  // small helper to render message bubbles
  const MessageBubble: React.FC<{ m: Message }> = ({ m }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={cn("flex items-end", m.isUser ? "justify-end" : "justify-start")}
      >
        {!m.isUser && (
          <div className="mr-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-secondary border border-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}

        <div
          className={cn(
            "max-w-[84%] sm:max-w-[72%] px-4 py-2 rounded-2xl break-words",
            m.isUser
              ? "bg-white/10 text-white self-end rounded-br-[6px] rounded-tl-2xl rounded-tr-2xl"
              : "bg-white/5 border border-white/6 text-white/90 rounded-bl-[6px] rounded-tl-2xl rounded-tr-2xl"
          )}
        >
          <div className="text-sm leading-relaxed">{m.text}</div>
          <div className="text-[10px] text-white/40 mt-1 flex items-center gap-2">
            <span>{formatTime(m.timestamp)}</span>
            {m.metadata?.confidence !== undefined && (
              <span className="ml-1 inline-flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-300" />
                <span>score {Number(m.metadata.confidence).toFixed(2)}</span>
              </span>
            )}
          </div>
        </div>

        {m.isUser && (
          <div className="ml-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <img
                src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png"
                alt="L"
                className="w-5 h-5 object-contain"
              />
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      {/* Floating popup teaser */}
      {showPopup && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="glass-strong rounded-xl p-4 shadow-2xl w-72"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">Need help?</p>
                <p className="text-xs text-white/70">Ask me anything or start a chat — I'm quick.</p>
              </div>
              <button
                aria-label="close"
                onClick={() => setShowPopup(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex gap-2">
              <Button className="flex-1 bg-primary text-black" onClick={openChat}>
                Start Chat
              </Button>
              <Button variant="ghost" onClick={() => gotoContact()}>
                Contact
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Chat toggle when closed */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={openChat}
            aria-label="Open chat"
            className="relative w-14 h-14 sm:w-16 sm:h-16 bg-secondary border border-white/10 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          >
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="sr-only">Open chat</span>

            {/* Live badge */}
            <div className="absolute -top-1 -right-1 bg-red-500/80 text-white text-[11px] px-2 py-[2px] rounded-full animate-pulse">
              Live
            </div>
          </button>
        </div>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            className="fixed inset-4 sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto z-50 w-full sm:w-[420px] h-auto sm:h-[640px] bg-black/95 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary border border-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Limitless Assistant</div>
                  <div className="text-xs text-white/60">AI helper · quick answers</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  title="Reset conversation"
                  className="text-white/60 hover:text-white p-1"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="text-white/60 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              <div className="flex flex-col gap-3">
                {messages.map((m) => (
                  <MessageBubble key={m.id} m={m} />
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start justify-start"
                  >
                    <div className="mr-3">
                      <div className="w-8 h-8 rounded-full bg-white/6 flex items-center justify-center">
                        <User className="w-4 h-4 text-white/40" />
                      </div>
                    </div>
                    <div className="bg-white/6 rounded-2xl px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white/70">Thinking</span>
                        <div className="flex items-center gap-1">
                          <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 h-1 rounded-full bg-white/70 inline-block" />
                          <motion.span animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.75, delay: 0.08 }} className="w-1 h-1 rounded-full bg-white/70 inline-block" />
                          <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.72, delay: 0.16 }} className="w-1 h-1 rounded-full bg-white/70 inline-block" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Suggested quick questions */}
            <div className="p-3 border-t border-white/6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-white/60">Quick questions</div>
                <div className="text-xs text-white/40">{messages.length} messages</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickQuestion(q)}
                    className="text-xs px-3 py-2 bg-white/5 hover:bg-white/8 border border-white/6 rounded-md text-white/80 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input + actions */}
              <div className="flex gap-2 items-center">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  placeholder="Type your question..."
                  className="flex-1 bg-white/5 placeholder:text-white/40 text-white text-sm px-4 py-2 rounded-xl border border-white/6 focus:outline-none"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!inputValue.trim()) return;
                      handleSend();
                    }}
                    disabled={!inputValue.trim()}
                    className="bg-primary px-3 py-2 rounded-xl text-black disabled:opacity-50 transition"
                    title="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => gotoContact()}
                    className="bg-white/6 px-3 py-2 rounded-xl text-white/80 hover:bg-white/10 transition"
                    title="Contact us"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer watermark */}
            <div className="px-4 py-2 border-t border-white/6 flex items-center justify-center gap-2 text-[11px] text-white/30">
              <span>powered by</span>
              <img src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png" alt="Limitless" className="w-4 h-4" />
              <span className="text-white/40">Limitless AI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
