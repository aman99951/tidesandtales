export default function Contact() {
  return (
    <div className="w-full">
      <section className="w-full px-6 md:px-12 py-16 md:py-20 bg-hero-wave text-center border-b border-sky-100">
        <h1 className="text-4xl md:text-5xl font-black text-sky-900 glow-sky">Drop a Line</h1>
        <p className="mt-4 text-slate-500 max-w-md mx-auto">
          A message in a bottle, straight to us.
        </p>
      </section>
      <section className="w-full px-6 md:px-12 py-12 bg-white">
        <div className="max-w-lg mx-auto">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm text-slate-600 font-medium mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                className="w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-slate-600 font-medium mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                className="w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-slate-600 font-medium mb-1.5">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full rounded-xl border border-sky-200 bg-white px-4 py-3 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-sky-500 px-6 py-3.5 text-white font-semibold shadow-lg shadow-sky-200 hover:bg-sky-600 hover:shadow-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              Send Message &rarr;
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
