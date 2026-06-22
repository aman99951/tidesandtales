import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Tides' },
  { to: '/blogs', label: 'All Tales' },
  { to: '/about', label: 'Behind The Waves' },
  { to: '/library', label: 'Marine Library' },
]

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 md:px-12 py-4 border-b border-sky-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <Link
        to="/"
        className="text-lg font-bold tracking-widest text-sky-900 hover:text-sky-600 transition uppercase"
      >
        <span className="text-sky-500">~</span> Tides And Tales
      </Link>
      <nav className="hidden sm:flex gap-8 md:gap-10 text-sm">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `tracking-wide font-medium transition ${
                isActive
                  ? 'text-sky-600 border-b-2 border-sky-400 -mb-0.5'
                  : 'text-slate-500 hover:text-sky-600'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      {/* Mobile */}
      <div className="sm:hidden flex gap-3 text-xs font-medium">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `tracking-wide transition ${
                isActive ? 'text-sky-600' : 'text-slate-500 hover:text-sky-600'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
