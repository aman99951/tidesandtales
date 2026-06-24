import { useState } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from '../components/Lightbox'

const certImages = [
  { src: '/images/cert-shark-diver.jpg', alt: 'Shark Diver Certificate', caption: 'Meet the Expert — Shark Diver (15 June 2025)' },
  { src: '/images/cert-marine-vet.jpg', alt: 'Marine Vet Certificate', caption: 'Meet the Expert Programme — Marine Vet (14 June 2025)' },
]

export default function About() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="w-full px-6 md:px-12 py-20 md:py-28 text-center bg-hero-ocean">
        <p className="text-xs tracking-widest text-teal-500 font-semibold uppercase mb-4">
          The Mind Beneath The Current
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-sky-900 glow-teal">Behind The Waves</h1>
      </section>

      {/* Profile */}
      <section className="w-full px-6 md:px-12 py-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-200 to-teal-100 mx-auto flex items-center justify-center shadow-xl shadow-sky-100">
            <span className="text-5xl text-sky-500">~</span>
          </div>

          <blockquote className="mt-8 text-slate-500 italic leading-relaxed text-lg max-w-xl mx-auto">
            &ldquo;I write the way the ocean breathes — slowly, and in layers.&rdquo;
          </blockquote>

          <div className="mt-10 text-left space-y-5 text-slate-600 leading-relaxed max-w-2xl mx-auto">
            <p>
              Neha is a marine writer, ocean researcher, and storyteller who writes at the edges of dreams 
              and deep water. Her work blends scientific research, artistic observation, and emotional 
              cartography — a place where dolphins communicate, dugongs graze on seagrass, and every 
              reflection becomes a small constellation.
            </p>
            <p>
              Her journey began at the <strong className="text-sky-700">Atlantis Explorer's Club in Dubai</strong>, 
              where she participated in the <strong className="text-teal-700">Marine Biologist</strong> activity and 
              discovered her passion for dolphins. She went on to earn two certifications from the club:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-sky-500 shrink-0 mt-0.5">►</span>
                <span><strong className="text-sky-800">Meet the Expert — Shark Diver</strong> <span className="text-slate-400">(15 June 2025)</span> — Shark education, fin identification, and marine ecosystem awareness.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-500 shrink-0 mt-0.5">►</span>
                <span><strong className="text-teal-800">Meet the Expert Programme — Marine Vet</strong> <span className="text-slate-400">(14 June 2025)</span> — Marine veterinary science, laboratory work, and species research.</span>
              </li>
            </ul>

            {/* Certificate Images */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certImages.map((img, i) => (
                <button key={i} onClick={() => setLightbox({ images: certImages, currentIndex: i })} className="group text-left cursor-pointer">
                  <div className="rounded-xl overflow-hidden border border-sky-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <img src={img.src} alt={img.alt} className="w-full h-auto max-h-96 object-contain bg-sky-50 p-2" loading="lazy" />
                  </div>
                  <p className="mt-2 text-xs text-slate-400 text-center font-medium">{img.caption}</p>
                </button>
              ))}
            </div>
            <p>
              She has since conducted extensive research on dolphins (8 pages of detailed notes covering 
              anatomy, 35 species, echolocation, signature whistles, and nursing), dugongs (Tamil Nadu's 
              270-strong population and the 448 sq. km conservation reserve in Palk Bay), moray eels 
              (200 species with pharyngeal jaws), and beach pollution (Besant Beach survey with actual 
              data: 37+ microplastics, 7+ glass pieces, 4 bottle caps). Her field notes include bar graphs, 
              species sketches, and comparative beach analyses between Besant and Pattinapakkam.
            </p>
            <p className="text-slate-400 italic">
              This archive grows tide by tide. New stories surface whenever the moon agrees. 
              There is no schedule, only currents. Bring your softest attention and stay as long as you need.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full px-6 md:px-12 py-16 bg-sky-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-sky-100 bg-white p-6 text-center shadow-sm">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Writes</p>
              <p className="mt-2 text-slate-600 font-medium">Marine research &middot; Tales &middot; Field notes &middot; Conservation</p>
            </div>
            <div className="rounded-2xl border border-teal-100 bg-white p-6 text-center shadow-sm">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Certifications</p>
              <p className="mt-2 text-sky-600 font-medium">Shark Diver &middot; Marine Vet &middot; Atlantis Explorers Club</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white p-6 text-center shadow-sm">
              <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Currently</p>
              <p className="mt-2 text-slate-600 font-medium">Researching dolphins &amp; writing new tides</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="w-full px-6 md:px-12 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-teal-500 uppercase mb-3">
              <span className="w-8 h-px bg-teal-300" />
              Timeline
              <span className="w-8 h-px bg-teal-300" />
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-700 via-teal-500 to-amber-500">
              The Journey So Far
            </h2>
            <p className="mt-3 text-slate-400 text-sm">Every tide leaves a trace — here is mine</p>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-300 via-teal-300 to-amber-300 -translate-x-1/2 hidden md:block" />
            
            {[
              {
                num: 1,
                color: 'border-sky-400 bg-sky-100 text-sky-600',
                title: "Atlantis Explorer's Club — Dubai",
                desc: 'Participated in the Marine Biologist activity where she chose dolphins out of sea lions, dolphins, and starfish — sparking her lifelong passion for marine research.'
              },
              {
                num: 2,
                color: 'border-teal-400 bg-teal-100 text-teal-600',
                title: 'Meet the Expert — Shark Diver',
                desc: 'Completed on 15 June 2025. Learned shark anatomy, fin identification (straight trailing edge vs dolphin\'s curved), and ocean conservation.'
              },
              {
                num: 3,
                color: 'border-amber-400 bg-amber-100 text-amber-600',
                title: 'Meet the Expert Programme — Marine Vet',
                desc: 'Completed on 14 June 2025. Advanced certification in marine veterinary science with laboratory work and species research.'
              },
              {
                num: 4,
                color: 'border-purple-400 bg-purple-100 text-purple-600',
                title: 'Dolphin Research — 8 Pages of Notes',
                desc: 'Comprehensive research covering dolphin anatomy, 35 species, echolocation, signature whistles, reproduction, and nursing. Includes 10+ bibliographic sources.'
              },
              {
                num: 5,
                color: 'border-emerald-400 bg-emerald-100 text-emerald-600',
                title: 'Beach Pollution Surveys',
                desc: 'Conducted detailed field surveys of Besant Beach (documenting 37+ microplastics, 7+ glass pieces, 4 bottle caps) and Pattinapakkam Beach (notably clean with zero microplastics).'
              },
              {
                num: 6,
                color: 'border-sky-400 bg-sky-100 text-sky-600',
                title: 'Dugong Conservation Research',
                desc: 'Researched Tamil Nadu\'s 270 dugongs, the 448 sq. km Dugong Conservation Reserve in Palk Bay, and the threats facing these gentle sea cows.'
              },
            ].map((item, idx) => {
              const isLeft = idx % 2 === 0
              return (
                <div key={item.num} className={`relative flex flex-col md:flex-row items-start gap-6 mb-10 md:mb-14 group ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Circle node */}
                  <div className="absolute left-6 md:left-1/2 top-0 md:-translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full border-2 ${item.color} flex items-center justify-center shadow-lg shadow-${item.color.split(' ')[0].replace('border-', '')}/20 transition-all duration-500 group-hover:scale-125 group-hover:shadow-xl`}>
                      <span className="text-base font-black">{item.num}</span>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <span className={`inline-block text-xs font-bold tracking-widest uppercase ${item.color.split(' ')[2]}`}>
                        Step {item.num}
                      </span>
                      <h3 className="text-lg font-black text-sky-900 mt-1 group-hover:text-sky-700 transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-6 md:px-12 py-16 bg-sky-50/50 border-t border-sky-100 text-center">
        <h2 className="text-2xl font-bold text-sky-900 glow-amber">Dive Into the Archive</h2>
        <p className="mt-4 text-slate-500 max-w-md mx-auto">
          22 tales spanning marine research, conservation fieldwork, and personal reflections from the deep.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/blogs"
            className="px-8 py-3 rounded-full bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-200 hover:bg-sky-600 hover:shadow-xl transition-all"
          >
            Explore the archive &rarr;
          </Link>
          <Link
            to="/library"
            className="px-8 py-3 rounded-full border-2 border-sky-200 text-sky-700 text-sm font-semibold hover:border-sky-400 hover:bg-sky-50 transition-all"
          >
            View Research Library
          </Link>
        </div>
      </section>

      <Lightbox
        images={lightbox?.images}
        currentIndex={lightbox?.currentIndex ?? 0}
        onClose={() => setLightbox(null)}
        onPrev={() => setLightbox(prev => prev ? { ...prev, currentIndex: prev.currentIndex - 1 } : prev)}
        onNext={() => setLightbox(prev => prev ? { ...prev, currentIndex: prev.currentIndex + 1 } : prev)}
      />
    </div>
  )
}
