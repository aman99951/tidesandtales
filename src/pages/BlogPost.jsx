import { useParams, Link } from 'react-router-dom'
import { tales, categories } from '../data/tales'

export default function BlogPost() {
  const { id } = useParams()
  const tale = tales.find(t => t.id === Number(id))

  if (!tale) {
    return (
      <div className="w-full px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-sky-100 mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-sky-900">Tale not found</h1>
        <p className="mt-4 text-slate-500">This tide may have drifted away.</p>
        <Link to="/blogs" className="inline-block mt-8 px-6 py-3 rounded-full bg-sky-500 text-white text-sm font-semibold shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all">
          Back to All Tales &rarr;
        </Link>
      </div>
    )
  }

  const catColor = categories.find(c => c.name === tale.category)?.color || 'text-slate-400'
  const relatedTales = tales.filter(t => t.category === tale.category && t.id !== tale.id).slice(0, 3)

  return (
    <div className="w-full">
      {/* Header */}
      <section className="w-full px-6 md:px-12 py-16 md:py-20 bg-hero-wave border-b border-sky-100">
        <div className="max-w-3xl mx-auto">
          <Link to="/blogs" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-sky-600 font-medium transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Tales
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className={`text-xs font-semibold uppercase tracking-wide ${catColor} bg-white border border-sky-200 rounded-full px-3 py-1`}>
              {tale.category}
            </span>
            <span className="text-xs text-slate-400">{tale.date}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-xs text-slate-400">{tale.readTime}</span>
          </div>
          <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-black text-sky-900 glow-sky leading-tight">
            {tale.title}
          </h1>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed">
            {tale.excerpt}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-6 md:px-12 py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose-light">
            {tale.content.split('\n\n').map((paragraph, i) => {
              // Heading (ALL CAPS followed by colon)
              if (paragraph.match(/^[A-Z\s]+:/)) {
                const [heading, ...rest] = paragraph.split('\n')
                return (
                  <div key={i} className="mb-6">
                    <h2 className="text-xl font-bold text-sky-800 mt-10 mb-4">{heading.replace(':', '')}</h2>
                    {rest.length > 0 && (
                      <p className="text-slate-600 leading-relaxed mb-4">{rest.join('\n')}</p>
                    )}
                  </div>
                )
              }
              // Bullet list
              if (paragraph.startsWith('- ') || paragraph.startsWith('• ')) {
                const items = paragraph.split('\n').filter(l => l.startsWith('- ') || l.startsWith('• '))
                return (
                  <ul key={i} className="space-y-2 mb-6">
                    {items.map((item, j) => (
                      <li key={j} className="text-slate-600 leading-relaxed pl-4 border-l-2 border-sky-300">
                        {item.replace(/^[-•]\s*/, '')}
                      </li>
                    ))}
                  </ul>
                )
              }
              // Numbered list
              if (paragraph.match(/^\d+\.\s/)) {
                const items = paragraph.split('\n').filter(l => l.match(/^\d+\.\s/))
                return (
                  <ol key={i} className="list-decimal list-inside space-y-2 mb-6">
                    {items.map((item, j) => {
                      const [num, ...rest] = item.split('. ')
                      return (
                        <li key={j} className="text-slate-600 leading-relaxed">
                          <span className="text-sky-600 font-bold">{num}.</span> {rest.join('. ')}
                        </li>
                      )
                    })}
                  </ol>
                )
              }
              // Blockquote
              if (paragraph.startsWith('"') && paragraph.includes('"')) {
                return (
                  <blockquote key={i} className="border-l-4 border-teal-300 pl-6 my-8 text-slate-500 italic leading-relaxed bg-teal-50/50 py-4 pr-4 rounded-r-xl">
                    {paragraph}
                  </blockquote>
                )
              }
              // Regular paragraph
              return (
                <p key={i} className="text-slate-600 leading-relaxed mb-5 text-base md:text-lg">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-sky-100">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Category:</span>
              <Link
                to={`/blogs?category=${encodeURIComponent(tale.category)}`}
                className={`text-xs font-semibold ${catColor} hover:underline`}
              >
                {tale.category}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedTales.length > 0 && (
        <section className="w-full px-6 md:px-12 py-16 bg-sky-50/50 border-t border-sky-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-sky-900 mb-8">More {tale.category} Tales</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTales.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="group rounded-2xl border border-sky-100 bg-white p-5 card-shadow"
                >
                  <h3 className="font-bold text-sky-900 group-hover:text-sky-600 transition text-sm">{related.title}</h3>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">{related.excerpt}</p>
                  <span className="inline-block mt-3 text-xs text-slate-400 font-medium">{related.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
