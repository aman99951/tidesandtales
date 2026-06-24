import { useState, useEffect, useRef } from 'react'
import { tales } from '../data/tales'

const knowledgeBase = tales.map(t => ({
  title: t.title,
  category: t.category,
  excerpt: t.excerpt,
  keywords: [t.category, ...t.title.toLowerCase().split(' '), ...t.excerpt.toLowerCase().split(' ').slice(0, 10)]
}))

function findAnswer(query) {
  const q = query.toLowerCase()
  const words = q.split(' ').filter(w => w.length > 2)

  const scored = knowledgeBase.map(item => {
    let score = 0
    for (const word of words) {
      if (item.keywords.some(k => k.includes(word))) score++
      if (item.title.toLowerCase().includes(word)) score += 3
      if (item.excerpt.toLowerCase().includes(word)) score += 2
    }
    return { ...item, score }
  })

  const best = scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score)

  if (best.length > 0) {
    const top = best[0]
    return `Based on my knowledge, that relates to **${top.title}** (${top.category}). ${top.excerpt}`
  }

  const greetings = ['hi', 'hello', 'hey', 'aquapuff']
  if (greetings.some(g => q.includes(g))) {
    return "Hey there! I'm AquaPuff \u{1F42C} \u{2014} your marine research assistant. Ask me about dolphins, dugongs, ocean conservation, or any tale from this site!"
  }

  if (q.includes('who') && (q.includes('you') || q.includes('are'))) {
    return "I'm AquaPuff \u{1F42C}, an AI assistant for Tides & Tales. I know about all the marine research, tales, and documents on this site. Ask me anything!"
  }

  if (q.includes('neha')) {
    return "Neha is a marine writer and researcher from the Atlantis Explorer's Club in Dubai. She's a certified Shark Diver & Marine Vet who writes about dolphins, dugongs, and ocean conservation. She has 22 tales and 10 research documents on this site!"
  }

  return "Hmm, I don't have a direct answer for that yet. Try asking about dolphins, dugongs, ocean conservation, beach pollution, or specific tales on this site!"
}

const quickPrompts = ['Tell me about dolphins', 'What is AQUA-SENSE?', 'Dugong conservation', 'Beach pollution data', 'Who is Neha?']

export default function AquaPuff() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm AquaPuff \u{1F42C} \u{2014} your marine research guide. What would you like to explore?" }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend(text) {
    const q = text.trim()
    if (!q) return
    setMessages(m => [...m, { role: 'user', text: q }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      const answer = findAnswer(q)
      setMessages(m => [...m, { role: 'bot', text: answer }])
      setThinking(false)
    }, 800)
  }

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-sky-500 to-teal-500 text-white shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:shadow-sky-500/40 hover:scale-110 transition-all duration-300 flex items-center justify-center"
        aria-label="Chat with AquaPuff"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
        )}
      </button>

      {/* Chat window */}
      <div className={`fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sky-100 overflow-hidden transition-all duration-300 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ maxHeight: 'calc(100vh - 160px)' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-teal-500 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">🐬</div>
            <div>
              <p className="font-bold text-sm">AquaPuff</p>
              <p className="text-xs text-white/70">Marine Research Assistant</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 overflow-y-auto space-y-3" style={{ maxHeight: '320px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-sky-500 text-white rounded-br-md'
                  : 'bg-sky-50 text-slate-600 rounded-bl-md border border-sky-100'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="bg-sky-50 text-slate-400 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm border border-sky-100">
                <span className="inline-flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick prompts */}
        {messages.length < 3 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {quickPrompts.map((p, i) => (
              <button key={i} onClick={() => handleSend(p)}
                className="text-xs bg-sky-50 hover:bg-sky-100 text-sky-600 px-2.5 py-1 rounded-full border border-sky-200 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-sky-100 p-3 flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask AquaPuff..."
            className="flex-1 text-sm px-3 py-2 rounded-xl border border-sky-200 bg-sky-50/50 focus:outline-none focus:border-sky-400 focus:bg-white transition-colors text-slate-600 placeholder:text-slate-400"
          />
          <button onClick={() => handleSend(input)}
            className="px-3 py-2 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-colors disabled:opacity-50"
            disabled={!input.trim()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" /></svg>
          </button>
        </div>
      </div>
    </>
  )
}