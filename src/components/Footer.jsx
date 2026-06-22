import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full border-t border-sky-100 bg-sky-50/50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-sm font-bold text-sky-900 tracking-widest uppercase">
            <span className="text-sky-500">~</span> Tides and Tales
          </h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            A dreamy ocean sanctuary of stories, research, and digital tides. Drifting since 2026.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold text-sky-900 tracking-widest uppercase">Navigate</h3>
          <div className="mt-2 flex flex-col gap-1.5">
            {[
              { to: '/', label: 'Tides' },
              { to: '/blogs', label: 'All Tales' },
              { to: '/about', label: 'Behind The Waves' },
              { to: '/library', label: 'Marine Library' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-xs text-slate-400 hover:text-sky-600 transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold text-sky-900 tracking-widest uppercase">Connect</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Neha &middot; Marine writer &amp; researcher<br />
            Atlantis Explorers Club &middot; Dubai
          </p>
          <Link
            to="/blogs"
            className="inline-block mt-3 text-xs text-sky-500 hover:text-sky-600 font-medium transition"
          >
            Here Comes The Next Wave &rarr;
          </Link>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-sky-100 text-center">
        <p className="text-xs text-slate-400">&copy; 2026 Tides and Tales. All rights reserved.</p>
      </div>
    </footer>
  )
}
