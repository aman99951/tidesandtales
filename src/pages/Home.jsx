import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categories, tales } from '../data/tales'

const sketchImages = [
  { src: '/images/sketch-octopus.jpg', alt: 'Octopus sketch', label: 'Octopus', caption: 'Octopus — pen-and-ink drawing' },
  { src: '/images/sketch-dugong.jpg', alt: 'Dugong sketch', label: 'Dugong', caption: 'Dugong — pen-and-ink drawing' },
  { src: '/images/sketch-parrotfish.jpg', alt: 'Parrotfish sketch', label: 'Parrotfish', caption: 'Parrotfish — detailed decorative drawing' },
  { src: '/images/sketch-beach-scene.jpg', alt: 'Beach scene', label: 'Beach & Marine Objects', caption: 'Beach scene with fisherman & marine object studies' },
]

const certImages = [
  { src: '/images/cert-shark-diver.jpg', alt: 'Shark Diver Certificate', label: 'Shark Diver', caption: 'Shark Diver Certificate — 15 June 2025' },
  { src: '/images/cert-marine-vet.jpg', alt: 'Marine Vet Certificate', label: 'Marine Vet', caption: 'Marine Vet Certificate — 14 June 2025' },
  { src: '/images/shark-diver-photo.jpg', alt: 'Neha in diving gear', label: 'Diving', caption: 'On-site at Atlantis Explorer\'s Club' },
  { src: '/images/marine-vet-photo.jpg', alt: 'Neha in lab coat', label: 'Research', caption: 'Marine biology field research' },
]

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [image, onClose])
  if (!image) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm font-medium transition z-10 flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          Close
        </button>
        <img src={image.src} alt={image.alt} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
        <p className="mt-4 text-white/70 text-sm text-center font-medium max-w-lg">{image.caption}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [lightboxImage, setLightboxImage] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const featured = tales[0]
  const latestTales = tales.slice(1, 7)
  const marineLifeTales = tales.filter(t => t.category === 'Marine Life').slice(0, 3)
  const conservationTales = tales.filter(t => t.category === 'Conservation').slice(0, 2)
  const topCategories = categories.filter(c => c.name !== 'All').slice(0, 5)

  return (
    <>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />

      {/* ===== HERO — Immersive full-screen ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover scale-105 animate-float" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent" />
        </div>

        {/* Animated decorative blobs */}
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-sky-200/30 blur-3xl pointer-events-none animate-float" style={{ animationDuration: '6s' }} />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-teal-200/25 blur-3xl pointer-events-none animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-amber-200/20 blur-2xl pointer-events-none animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }} />

        {/* Hero content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-24 md:py-0">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-sky-200/50 text-xs font-semibold tracking-wider text-sky-600 uppercase shadow-lg shadow-sky-100/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse-soft" />
                  A marine research &amp; story archive
                </span>
              </div>

              <h1 className="animate-fade-up-d1 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.85]">
                <span className="text-sky-900 [text-shadow:0_2px_20px_rgba(12,74,110,0.15)]">Tides</span>
                <br />
                <span className="text-gradient-sky">&amp; Tales</span>
              </h1>

              <p className="animate-fade-up-d2 mt-6 text-slate-500 text-base sm:text-lg leading-relaxed max-w-lg">
                A dreamy underwater sanctuary where marine science meets storytelling.
                Dive into dolphin research, ocean conservation, and the poetry of the deep.
              </p>

              <div className="animate-fade-up-d3 mt-10 flex flex-wrap gap-4">
                <Link
                  to="/blogs"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-900 text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:bg-sky-800 shadow-lg shadow-sky-900/20 hover:shadow-xl hover:shadow-sky-900/30 active:scale-[0.98]"
                >
                  <span className="relative z-10">Explore All Tales</span>
                  <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-sky-200 text-sky-700 text-sm font-semibold transition-all duration-300 hover:border-sky-400 hover:bg-white/80 hover:shadow-lg hover:shadow-sky-100 backdrop-blur-sm bg-white/50"
                >
                  Behind The Waves
                </Link>
              </div>

              <div className="animate-fade-up-d4 mt-8 flex gap-10">
                <div className="group cursor-default">
                  <p className="text-2xl font-black text-sky-900 group-hover:text-sky-600 transition-colors">22</p>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium tracking-wide">Tales</p>
                </div>
                <div className="w-px bg-sky-200/50 group-hover:bg-sky-400 transition-colors" />
                <div className="group cursor-default">
                  <p className="text-2xl font-black text-sky-900 group-hover:text-teal-600 transition-colors">10</p>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium tracking-wide">Documents</p>
                </div>
                <div className="w-px bg-sky-200/50" />
                <div className="group cursor-default">
                  <p className="text-2xl font-black text-sky-900 group-hover:text-amber-600 transition-colors">∞</p>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium tracking-wide">Tides to Explore</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center animate-fade-in">
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-sky-100/60 via-teal-50/40 to-amber-50/60 flex items-center justify-center shadow-2xl shadow-sky-200/30 animate-float" style={{ animationDuration: '5s' }}>
                  <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white/80 to-sky-50/80 backdrop-blur-sm flex items-center justify-center border border-white/60">
                    <div className="text-center">
                      <div className="text-7xl mb-2 opacity-60 animate-pulse-soft">🐬</div>
                      <p className="text-xs text-sky-400 font-semibold tracking-widest uppercase">Dive In</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-amber-200/30 blur-xl animate-float" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-teal-200/30 blur-xl animate-float" style={{ animationDelay: '2s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 z-10 leading-none pointer-events-none">
          <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
            <path d="M0,40 C240,120 480,0 720,40 C960,80 1200,0 1440,40 L1440,120 L0,120 Z" className="fill-white" />
          </svg>
        </div>

        <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-700 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-sky-300 flex justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-sky-400 animate-scroll" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED TALE — Premium bento card ===== */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-sky-500 uppercase mb-2">
                <span className="w-6 h-px bg-sky-300" />
                Featured Tide
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight">
                Top of the Current
              </h2>
            </div>
            <Link to="/blogs" className="hidden lg:inline-flex items-center gap-1.5 text-sm text-sky-600 font-semibold hover:text-sky-700 transition group whitespace-nowrap">
              View all tales
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <Link to={`/blog/${featured.id}`} className="group block card-bento hover:shadow-xl hover:shadow-sky-100/50 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 via-transparent to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-sky-600">{featured.category}</span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 group-hover:text-sky-700 transition-colors leading-tight">
                  {featured.title}
                </h3>
                <p className="mt-4 text-slate-500 leading-relaxed text-base max-w-2xl">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <span className="text-slate-400">{featured.date}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400">{featured.readTime}</span>
                  <span className="text-sky-500 font-semibold group-hover:text-sky-600 transition-colors ml-auto lg:ml-0 inline-flex items-center gap-1">
                    Read full tale
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </div>
              <div className="hidden lg:flex w-28 h-28 rounded-2xl bg-gradient-to-br from-sky-100 to-teal-100 items-center justify-center border border-sky-100 shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                <span className="text-4xl">🌊</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ===== LATEST TALES — Premium grid ===== */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-gradient-to-b from-white to-sky-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                <span className="w-6 h-px bg-amber-300" />
                Latest Tides
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight">
                Recent Reflections
              </h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestTales.map((tale, i) => {
              const cat = categories.find(c => c.name === tale.category)
              const catColor = cat?.color || 'text-slate-400'
              const dotColor = cat?.color?.replace('text-', 'bg-') || 'bg-slate-400'
              return (
                <Link
                  key={tale.id}
                  to={`/blog/${tale.id}`}
                  className={`group card-bento p-6 md:p-8 animate-fade-up relative overflow-hidden`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 ${dotColor} opacity-60`} />
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span className={`text-xs font-semibold uppercase tracking-wide ${catColor}`}>{tale.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-sky-900 group-hover:text-sky-700 transition-colors leading-snug">
                    {tale.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {tale.excerpt}
                  </p>
                  <div className="mt-6 pt-4 border-t border-sky-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{tale.date} · {tale.readTime}</span>
                    <span className="text-xs text-sky-500 font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 inline-flex items-center gap-1">
                      Read <span>&rarr;</span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/blogs"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-900 text-white text-sm font-semibold hover:bg-sky-800 transition-all shadow-lg shadow-sky-900/20 hover:shadow-xl hover:shadow-sky-900/30 active:scale-[0.98]"
            >
              View All Tales
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES — Elegant pills ===== */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-teal-500 uppercase mb-3">
              <span className="w-6 h-px bg-teal-300" />
              Explore The Depths
              <span className="w-6 h-px bg-teal-300" />
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight mb-3">
              Choose Your Current
            </h2>
            <p className="text-slate-500 text-base max-w-md mx-auto">
              Each category glows in a different bioluminescence. Pick a current and let it carry you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {topCategories.map((cat) => (
              <Link
                key={cat.name}
                to={`/blogs?category=${encodeURIComponent(cat.name)}`}
                className="group relative px-6 py-3.5 rounded-xl border border-sky-100 bg-white text-sm font-medium text-slate-600 shadow-sm hover:border-sky-300 hover:text-sky-700 hover:shadow-md hover:shadow-sky-100/50 transition-all duration-300 active:scale-[0.97] overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-sky-50/0 via-sky-50/50 to-sky-50/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-300 group-hover:bg-sky-400 transition-colors" />
                  {cat.name}
                </span>
              </Link>
            ))}
            <Link
              to="/blogs"
              className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-50 to-sky-100 text-sm font-medium text-sky-600 border border-sky-200 hover:from-sky-100 hover:to-sky-200 hover:text-sky-700 hover:shadow-md transition-all duration-300 active:scale-[0.97]"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                All Categories
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MARINE LIFE SPOTLIGHT ===== */}
      {marineLifeTales.length > 0 && (
        <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-gradient-to-b from-sky-50/50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-cyan-500 uppercase mb-3">
                  <span className="w-6 h-px bg-cyan-300" />
                  Marine Life
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight">
                  Creatures of the Deep
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {marineLifeTales.map((tale) => (
                <Link key={tale.id} to={`/blog/${tale.id}`} className="group card-bento p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-lg font-bold text-sky-900 group-hover:text-cyan-700 transition-colors leading-snug">{tale.title}</h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3">{tale.excerpt}</p>
                  <div className="mt-6 pt-4 border-t border-sky-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{tale.readTime}</span>
                    <span className="text-xs text-cyan-500 font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 inline-flex items-center gap-1">
                      Read <span>&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CONSERVATION SPOTLIGHT ===== */}
      {conservationTales.length > 0 && (
        <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-emerald-500 uppercase mb-3">
                  <span className="w-6 h-px bg-emerald-300" />
                  Conservation
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight">
                  Protecting Our Oceans
                </h2>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {conservationTales.map((tale) => (
                <Link key={tale.id} to={`/blog/${tale.id}`} className="group card-bento p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-lg font-bold text-sky-900 group-hover:text-emerald-700 transition-colors leading-snug">{tale.title}</h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3">{tale.excerpt}</p>
                  <div className="mt-6 pt-4 border-t border-emerald-50 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{tale.readTime}</span>
                    <span className="text-xs text-emerald-500 font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 inline-flex items-center gap-1">
                      Read <span>&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== MARINE SKETCHES GALLERY ===== */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-gradient-to-b from-white to-sky-50/50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-purple-500 uppercase mb-3">
                <span className="w-6 h-px bg-purple-300" />
                Art Gallery
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight">
                Marine Sketches
              </h2>
              <p className="mt-2 text-slate-500 text-base max-w-xl">
                Pen-and-ink drawings from Neha's field journal — detailed studies of marine life dated April 2026.
              </p>
            </div>
            <Link to="/library" className="hidden lg:inline-flex items-center gap-1.5 text-sm text-sky-600 font-semibold hover:text-sky-700 transition group whitespace-nowrap">
              View full gallery
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>

          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {sketchImages.map((img, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => setLightboxImage(img)}>
                <div className="relative rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-purple-200 shadow-premium group-hover:shadow-xl group-hover:shadow-purple-100/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100/0 via-transparent to-amber-100/0 group-hover:from-purple-100/30 group-hover:to-amber-100/30 transition-all duration-500 z-10 pointer-events-none" />
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-52 md:h-72 object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-5 z-20">
                    <span className="text-white text-xs font-semibold tracking-wide bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
                      Click to view &rarr;
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500 font-medium text-center group-hover:text-purple-600 transition-colors">{img.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/library"
              className="group inline-flex items-center gap-2 text-sm text-sky-600 font-semibold hover:text-sky-700 transition"
            >
              View full gallery in Marine Library
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATES / ACHIEVEMENTS ===== */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-50/30 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase mb-3">
                <span className="w-6 h-px bg-amber-300" />
                Achievements
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-sky-900 tracking-tight">
                Certifications &amp; Fieldwork
              </h2>
              <p className="mt-2 text-slate-500 text-base max-w-xl">
                From the Atlantis Explorer's Club in Dubai to marine field research — Neha's journey through the waves.
              </p>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {certImages.map((img, i) => (
              <div key={i} className="group cursor-pointer" onClick={() => setLightboxImage(img)}>
                <div className="relative rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-amber-200 shadow-premium group-hover:shadow-xl group-hover:shadow-amber-100/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/0 via-transparent to-sky-100/0 group-hover:from-amber-100/30 group-hover:to-sky-100/30 transition-all duration-500 z-10 pointer-events-none" />
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-52 md:h-72 object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-5 z-20">
                    <span className="text-white text-xs font-semibold tracking-wide bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
                      Click to view &rarr;
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500 font-medium text-center group-hover:text-amber-600 transition-colors">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SNIPPET ===== */}
      <section className="w-full px-6 md:px-16 lg:px-24 py-12 md:py-16 bg-gradient-to-b from-sky-50/50 to-white relative">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-100 via-teal-50 to-amber-50 mx-auto flex items-center justify-center shadow-xl shadow-sky-100/50 border-2 border-white/80 animate-float" style={{ animationDuration: '5s' }}>
            <span className="text-4xl text-sky-500">~</span>
          </div>
          <p className="text-xs font-semibold tracking-widest text-teal-500 uppercase mt-8 mb-3">Beneath The Surface</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-sky-900 tracking-tight glow-teal">
            Hi, I'm Neha.
          </h2>
          <p className="mt-6 text-slate-500 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Marine writer, ocean researcher, and storyteller. Certified Shark Diver &amp; Marine Vet from the Atlantis Explorers Club.
            I write about dolphins, dugongs, and the tides that connect us all.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <div className="bg-white rounded-2xl px-8 py-5 shadow-md border border-sky-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-3xl md:text-4xl font-black text-sky-700">22</p>
              <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">Tales Written</p>
            </div>
            <div className="bg-white rounded-2xl px-8 py-5 shadow-md border border-teal-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-3xl md:text-4xl font-black text-teal-700">10</p>
              <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">Research Docs</p>
            </div>
            <div className="bg-white rounded-2xl px-8 py-5 shadow-md border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <p className="text-3xl md:text-4xl font-black text-amber-700">∞</p>
              <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">Tides to Explore</p>
            </div>
          </div>
          <div className="mt-10">
            <Link
              to="/about"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-sky-900 text-white text-sm font-semibold hover:bg-sky-800 transition-all shadow-lg shadow-sky-900/20 hover:shadow-xl hover:shadow-sky-900/30 active:scale-[0.98]"
            >
              Behind The Waves
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
