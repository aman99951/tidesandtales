import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const documents = [
  {
    id: 'doc-0094',
    title: 'Certificate of Completion — Meet the Expert Shark Diver',
    pages: 2,
    date: '15/06/25',
    images: ['/images/cert-shark-diver.jpg', '/images/shark-diver-photo.jpg'],
    ocrText: `Issued by: Atlantis Explorers Club
Presented to: Neha
Program: Meet the Expert — Shark Diver
Date: 15/06/25

Photo page: Scrapbook page featuring two photos of Neha in full snorkeling/diving gear (mask, snorkel, BCD vest), decorated with ocean-themed stickers (starfish, fish, seahorse, anchor).`,
    description: "Neha's certification as a Meet the Expert Shark Diver through the Atlantis Explorers Club program, completed on 15 June 2025.",
  },
  {
    id: 'doc-0095',
    title: 'Certificate of Completion — Meet the Expert Marine Vet',
    pages: 2,
    date: '14/06/25',
    images: ['/images/cert-marine-vet.jpg', '/images/marine-vet-photo.jpg'],
    ocrText: `Issued by: Atlantis Explorers Club
Presented to: Neha
Program: Meet the Expert Programme — Marine Vet
Date: 14/06/25

Photo page: Photo of Neha in a white lab coat, standing next to a microscope in a laboratory setting, surrounded by ocean-themed stickers.`,
    description: "Advanced certification from the Atlantis Explorers Club's Meet the Expert Programme — Marine Vet, completed on 14 June 2025.",
  },
  {
    id: 'doc-0096',
    title: 'Marine Science Notes — Sharks, Dolphins & Sand Dollars',
    pages: 3,
    ocrText: `Page 1 — Sharks and Dolphins
Shark fins: have a straight trailing edge and are more triangle-shaped.
Dolphin fins: have a distinct curved trailing edge.

Page 2 — Sand Dollar
Size: 2-4 inches | Habitat: Sandy and muddy areas of temperate and tropical oceans
Life Span: Typically 6-10 years old
Diet: Planktons, algae, crustaceans, larvae, and detritus
Fun Facts: In most states it's illegal to take a live sand dollar. They use their spins to move across the sand floor.

Page 3 — World Ocean Day Activities
Microplastic research, Visit marine institutes, Conduct activities to understand the ocean, Do marine journaling, Go to a beach and take field notes, Do whatever you can to help save our oceans.`,
    description: 'Marine science notes covering shark vs dolphin fin identification, sand dollar ecology, and World Ocean Day activities.',
  },
  {
    id: 'doc-0097',
    title: 'Marine Animal Sketches — Octopus, Dugong, Parrotfish',
    pages: 4,
    images: ['/images/sketch-octopus.jpg', '/images/sketch-dugong.jpg', '/images/sketch-parrotfish.jpg', '/images/sketch-beach-scene.jpg'],
    ocrText: `Page 1: Detailed pen-and-ink drawing of an Octopus (labelled "OCTOPUS", signed)
Page 2: Detailed pen-and-ink drawing of a Dugong (labelled "DUGONG", signed)
Page 3: Highly detailed, decorative pen-and-ink drawing of a Parrotfish (labelled "PARROTFISH", signed)
Page 4: Double-page spread (dated 27/4/2026 & 24/4/2026) — Left: Ink sketch of a fisherman on a beach with a boat, fish, bucket, and birds. Right: Studies of marine objects — seaweed, conch shells, scallop shell, starfish, and spiral shell.`,
    description: 'Pen-and-ink marine animal sketches by Neha: octopus, dugong, parrotfish, beach scene, and marine objects — dated April 2026.',
  },
  {
    id: 'doc-0098',
    title: 'Dugong Research Notes',
    pages: 5,
    ocrText: `Page 1 — Dugong (Dugong dugon) ... Tamil Nadu ~270 dugongs. 448 sq km reserve in Palk Bay.
Page 2 — Conservation: WII, Tamil Nadu Forest Dept. Threats: habitat loss, bycatch, hunting, pollution.
Page 3 — Low reproduction rate. Cyclones destroy seagrass.
Page 4 — Characteristics: 3m, 900kg, paddle flippers, horizontal tail.
Page 5 — Dugong sketch.`,
    description: "Comprehensive 5-page dugong research notes covering Tamil Nadu's dugong population, the 448 sq. km conservation reserve, threats, and characteristics.",
  },
  {
    id: 'doc-0099',
    title: 'Dolphin Research Notes — Comprehensive Study',
    pages: 8,
    images: ['/images/dolphin-anatomy.jpg'],
    ocrText: `Page 1 — Websites: WDC, NOAA, WWF, Nat Geo Kids, Dolphin Research Center.
Page 2 — Facts: 200 lbs fish/day, echolocation, 30 km/h, 6m jump, 35 species.
Page 3 — River dolphins: South America & Asia. Smooth skin, prominent snout.
Page 4 — Anatomy: 44+ teeth/quadrant, POLYDONTS, HOMODONTS, signature whistle.
Page 5 — Dorsal fin & tail fluke = unique like fingerprints. Shed skin 12x/day.
Page 6 — Anatomy diagram: Median Notch, Flukes, Peduncle, Dorsal Fin, Blowhole.
Page 7 — Unpopular species: Irrawaddy, Franciscana, Rough-toothed, Commerson's, Ganges River Dolphin.
Page 8 — Nursing: within 6 hours, thick paste-like milk, 5-10 sec sessions.`,
    description: 'Comprehensive 8-page dolphin research covering anatomy, communication, echolocation, 35 species, reproduction, and nursing facts.',
  },
  {
    id: 'doc-0100',
    title: 'Dolphins — Why I Chose This Animal + Birth Notes',
    pages: 5,
    ocrText: `Page 1 — "I went to ATLANTIS EXPLORER'S CLUB at Dubai... chose DOLPHINS. That's where my journey started."
Pages 2-4 — Dolphin Birth: Tail-first, echelon position, nursing 5-10 sec/20-30 min.
Page 5 — Platanista Gangetica: Gestation 9-11 months. Chocolate brown at birth.`,
    description: "Neha's personal narrative about choosing dolphins at the Atlantis Explorer's Club in Dubai, plus 4 pages of detailed dolphin birth research.",
  },
  {
    id: 'doc-0101',
    title: 'Moray Eels Research Notes',
    pages: 2,
    ocrText: `Page 1 — ~200 species. Lower Classifications: Giant, Green, Snowflake, Dragon moray...
Page 2 — Pharyngeal jaws [Mehta and Wainwright]. Bite treatment protocols.`,
    description: 'Moray eel research covering 15+ species, pharyngeal jaw feeding mechanics (Mehta & Wainwright study), and medical treatment for bites.',
  },
  {
    id: 'doc-0102',
    title: 'Beach Field Notes — Besant Beach & Pattinapakkam',
    pages: 5,
    images: ['/images/beach-samples.jpg'],
    ocrText: `Page 1 — Besant Beach: 4 bottle caps, 7+ glass pieces, 37+ microplastics.
Pages 2-3 — Bar Graphs data.
Page 4 — Pattinapakkam: Clean! No microplastics!
Page 5 — Photo: Samples in Ziploc bags.`,
    description: 'Beach field notes with actual data: Besant Beach (7+ glass, 4 bottle caps, 37+ microplastics) vs Pattinapakkam Beach (clean, no microplastics).',
  },
  {
    id: 'doc-0103',
    title: 'AQUA-SENSE — Marine Conservation Technology',
    pages: 1,
    ocrText: `AQUA-SENSE: Uses hydrophones + AI to monitor ship noise and protect dugongs in Gulf of Mannar. Sends real-time alerts to ships.`,
    description: 'AQUA-SENSE: An innovative marine conservation concept using hydrophones and AI to monitor underwater noise and protect dugongs.',
  },
]

const gallerySections = [
  {
    id: 'certificates',
    title: 'Certificates & Achievements',
    description: "Neha's official certifications from the Atlantis Explorers Club in Dubai.",
    images: [
      { src: '/images/cert-shark-diver.jpg', alt: 'Shark Diver Certificate', caption: 'Meet the Expert — Shark Diver (15 June 2025)' },
      { src: '/images/shark-diver-photo.jpg', alt: 'Neha in diving gear', caption: 'Scrapbook page — Neha in snorkeling/diving gear' },
      { src: '/images/cert-marine-vet.jpg', alt: 'Marine Vet Certificate', caption: 'Meet the Expert Programme — Marine Vet (14 June 2025)' },
      { src: '/images/marine-vet-photo.jpg', alt: 'Neha in lab coat', caption: 'Scrapbook page — Neha in lab coat at Marine Vet lab' },
    ],
  },
  {
    id: 'sketches',
    title: 'Marine Animal Sketches',
    description: 'Pen-and-ink drawings by Neha, dated April 2026.',
    images: [
      { src: '/images/sketch-octopus.jpg', alt: 'Octopus sketch', caption: 'Octopus — pen-and-ink drawing' },
      { src: '/images/sketch-dugong.jpg', alt: 'Dugong sketch', caption: 'Dugong — pen-and-ink drawing' },
      { src: '/images/sketch-parrotfish.jpg', alt: 'Parrotfish sketch', caption: 'Parrotfish — detailed decorative drawing' },
      { src: '/images/sketch-beach-scene.jpg', alt: 'Beach scene', caption: 'Beach scene with fisherman & marine objects' },
    ],
  },
  {
    id: 'diagrams',
    title: 'Research Diagrams & Field Photos',
    description: "Scientific diagrams and field documentation from Neha's marine research.",
    images: [
      { src: '/images/dolphin-anatomy.jpg', alt: 'Dolphin anatomy', caption: 'Dolphin Anatomy Diagram — labelled' },
      { src: '/images/beach-samples.jpg', alt: 'Beach samples', caption: 'Beach Pollution Survey — samples in Ziploc bags' },
    ],
  },
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

export default function Library() {
  const [lightboxImage, setLightboxImage] = useState(null)

  return (
    <>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
      <div className="w-full">
        {/* Hero */}
        <section className="w-full px-6 md:px-12 py-16 md:py-20 bg-hero-wave text-center border-b border-sky-100">
          <h1 className="text-4xl md:text-5xl font-black text-sky-900 glow-teal">Marine Library</h1>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            Neha's complete marine research archive — certificates, sketches, diagrams, field notes, and educational documents.
          </p>
        </section>

        {/* Stats */}
        <section className="w-full px-6 md:px-12 py-10 bg-white border-b border-sky-100">
          <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div><p className="text-3xl font-black text-sky-600">10</p><p className="text-xs text-slate-400 mt-1 font-medium">Documents</p></div>
            <div><p className="text-3xl font-black text-teal-600">35</p><p className="text-xs text-slate-400 mt-1 font-medium">Total Pages</p></div>
            <div><p className="text-3xl font-black text-amber-500">2</p><p className="text-xs text-slate-400 mt-1 font-medium">Certifications</p></div>
            <div><p className="text-3xl font-black text-emerald-600">10</p><p className="text-xs text-slate-400 mt-1 font-medium">Gallery Images</p></div>
          </div>
        </section>

        {/* Gallery Sections */}
        {gallerySections.map((section) => (
          <section key={section.id} className="w-full px-6 md:px-12 py-16 bg-white border-b border-sky-100">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-sky-900 mb-2">{section.title}</h2>
              <p className="text-slate-500 mb-8 max-w-2xl">{section.description}</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {section.images.map((img, i) => (
                  <div key={i} className="group cursor-pointer" onClick={() => setLightboxImage(img)}>
                    <div className="relative rounded-xl overflow-hidden border border-sky-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <img src={img.src} alt={img.alt} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <span className="text-white text-xs font-semibold tracking-wide bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">Click to view &rarr;</span>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">{img.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Documents */}
        <section className="w-full px-6 md:px-12 py-12 bg-sky-50/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-sky-900 mb-8">Research Documents</h2>
            <div className="space-y-4">
              {documents.map((doc) => (
                <details key={doc.id} className="group rounded-2xl border border-sky-100 bg-white open:shadow-lg open:shadow-sky-100 transition-all card-shadow">
                  <summary className="flex items-center justify-between cursor-pointer list-none p-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg font-bold text-sky-900 group-open:text-sky-600 transition">{doc.title}</h3>
                        <span className="text-xs text-slate-400 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100 font-medium">{doc.pages} pg{doc.pages > 1 ? 's' : ''}</span>
                        {doc.date && <span className="text-xs text-slate-400 font-medium">{doc.date}</span>}
                      </div>
                      <p className="text-sm text-slate-500 mt-1.5">{doc.description}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4 shrink-0">
                      <span className="text-sky-400 text-xs font-medium group-open:hidden">Expand</span>
                      <span className="text-sky-400 group-open:hidden"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></span>
                      <span className="text-sky-400 group-open:flex hidden text-xs font-medium">Close</span>
                      <span className="text-sky-400 hidden group-open:block"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg></span>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <div className="border-t border-sky-100 pt-4">
                      {doc.images && doc.images.length > 0 && (
                        <div className="flex flex-wrap gap-4 mb-4">
                          {doc.images.map((img, i) => (
                            <div key={i} className="rounded-lg overflow-hidden border border-sky-100 shadow-sm w-48 cursor-pointer" onClick={() => setLightboxImage({ src: img, alt: doc.title, caption: `${doc.title} — page ${i + 1}` })}>
                              <img src={img} alt={`${doc.title} page ${i + 1}`} className="w-full h-36 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="whitespace-pre-wrap text-slate-600 leading-relaxed text-sm bg-sky-50/50 rounded-xl p-5 border border-sky-100 font-mono">{doc.ocrText}</div>
                    </div>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link to="/blogs" className="px-6 py-2.5 rounded-full bg-sky-500 text-white text-sm font-semibold shadow-md shadow-sky-200 hover:bg-sky-600 transition-all">Read Marine Tales &rarr;</Link>
              <Link to="/about" className="px-6 py-2.5 rounded-full border-2 border-sky-200 text-sky-700 text-sm font-semibold hover:border-sky-400 hover:bg-sky-50 transition-all">About the Explorer</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
