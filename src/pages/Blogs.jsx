import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categories, tales } from '../data/tales'

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'
  const [searchQuery, setSearchQuery] = useState('')

  const setCategory = (name) => {
    setSearchParams(name === 'All' ? {} : { category: name })
  }

  const filtered = tales.filter((t) => {
    const catMatch = activeCategory === 'All' || t.category === activeCategory
    const searchMatch = !searchQuery || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    return catMatch && searchMatch
  })

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full px-6 md:px-12 py-16 md:py-20 bg-hero-wave text-center">
        <h1 className="text-4xl md:text-5xl font-black text-sky-900 glow-sky">Dive Into Blogs</h1>
        <p className="mt-4 text-slate-500 max-w-lg mx-auto">
          22 tales spanning marine research, ocean facts, conservation fieldwork, and personal reflections from the deep.
        </p>
      </section>

      {/* Filters */}
      <section className="w-full px-6 md:px-12 py-8 bg-white border-b border-sky-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search tales..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-sky-200 bg-white pl-10 pr-4 py-3 text-slate-700 placeholder-slate-400 outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition text-sm"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name
              return (
                <button
                  key={cat.name}
                  onClick={() => setCategory(cat.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-200'
                      : 'bg-white border border-sky-200 text-slate-500 hover:border-sky-400 hover:text-sky-600 hover:shadow-sm'
                  }`}
                >
                  {cat.name}
                </button>
              )
            })}
          </div>
          <p className="text-center text-xs text-slate-400 mt-4">
            {filtered.length} {filtered.length === 1 ? 'tale' : 'tales'} found
          </p>
        </div>
      </section>

      {/* Tales Grid */}
      <section className="w-full px-6 md:px-12 py-12 bg-sky-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tale) => {
              const catColor = categories.find((c) => c.name === tale.category)?.color || 'text-slate-400'
              return (
                <Link
                  key={tale.id}
                  to={`/blog/${tale.id}`}
                  className="group rounded-2xl border border-sky-100 bg-white p-6 card-shadow"
                >
                  <span className={`text-xs font-semibold uppercase tracking-wide ${catColor}`}>
                    {tale.category}
                  </span>
                  <h2 className="mt-2 text-lg font-bold text-sky-900 group-hover:text-sky-600 transition">
                    {tale.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed line-clamp-3">{tale.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-sky-50">
                    <span className="text-xs text-slate-400">
                      {tale.date} &middot; {tale.readTime}
                    </span>
                    <span className="text-xs text-sky-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-sky-100 mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-500 text-lg font-medium">No tales in this current yet.</p>
              <button
                onClick={() => { setSearchQuery(''); setCategory('All') }}
                className="mt-4 text-sm text-sky-600 hover:text-sky-700 font-semibold transition cursor-pointer"
              >
                Clear filters &rarr;
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
