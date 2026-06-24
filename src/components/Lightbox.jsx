import { useState, useEffect } from 'react'

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const image = images?.[currentIndex]
  useEffect(() => {
    if (!images) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [images, currentIndex, onClose, onPrev, onNext])
  if (!images || !image) return null
  const total = images.length
  const isFirst = currentIndex === 0
  const isLast = currentIndex === total - 1
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
        <div className="absolute -top-12 right-0 left-0 flex items-center justify-between">
          <span className="text-white/50 text-sm font-medium">{currentIndex + 1} / {total}</span>
          <button onClick={onClose} className="text-white/70 hover:text-white text-sm font-medium transition flex items-center gap-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            Close
          </button>
        </div>
        {!isFirst && (
          <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center transition z-10 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {!isLast && (
          <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center transition z-10 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
        <img src={image.src} alt={image.alt} className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
        <p className="mt-4 text-white/60 text-sm text-center font-medium">{image.caption}</p>
      </div>
    </div>
  )
}
