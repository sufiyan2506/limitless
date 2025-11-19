import { useState, useMemo } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { ExpandableCard } from '@/components/ui/expandable-card'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [email, setEmail] = useState('')

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#06B6D4', '#F97316', '#10B981']
    })

    // placeholder for subscription logic
    console.log('Subscribed:', email)
    setEmail('')
  }

  const categories = useMemo(() => ['All', 'Design', 'Development', 'Future Trends', 'Strategy'], [])

  const posts = useMemo(() => [
    {
      id: 'p1',
      title: "The Future of Web Design: Beyond Traditional Interfaces",
      excerpt: "How AR, VR and AI are redefining digital interfaces and interaction patterns.",
      category: 'Design',
      readTime: '8 min',
      date: 'Dec 15, 2024',
      author: 'Sarah Chen',
      src: '🌐',
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">The Evolution of Digital Interfaces</h4>
          <p className="mb-6 text-white/80 leading-relaxed">The digital landscape is shifting from flat, static layouts to immersive, spatial experiences...</p>
        </>
      )
    },
    {
      id: 'p2',
      title: 'Building Scalable SaaS Applications: Lessons from the Field',
      excerpt: 'Architecture patterns, multi-tenancy and observability for scalable SaaS platforms.',
      category: 'Development',
      readTime: '12 min',
      date: 'Dec 10, 2024',
      author: 'Alex Rodriguez',
      src: '⚡',
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">Architecture Fundamentals for Scale</h4>
          <p className="mb-6 text-white/80 leading-relaxed">Start with a resilient foundation, then scale with microservices, caching and smart observability...</p>
        </>
      )
    },
    {
      id: 'p3',
      title: 'AI-Powered Design Systems: The Next Evolution',
      excerpt: 'Dynamic, adaptive systems that evolve with user behaviour and brand rules.',
      category: 'Future Trends',
      readTime: '6 min',
      date: 'Dec 5, 2024',
      author: 'Maya Patel',
      src: '🤖',
      content: (
        <>
          <h4 className="text-white font-semibold text-xl mb-3">The Intelligence Revolution in Design</h4>
          <p className="mb-6 text-white/80 leading-relaxed">AI helps design systems remain consistent, accessible, and adaptive at scale...</p>
        </>
      )
    },
    // more posts can be added here
  ], [])

  const filteredPosts = selectedCategory === 'All' ? posts : posts.filter(p => p.category === selectedCategory)
  const featured = posts[0]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black to-black/95">
      <WebGLShader />

      <div className="relative z-10">
        <Navigation />

        {/* Hero */}
        <header className="pt-28 pb-12 px-6 md:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent gradient-text leading-tight"
            >
              Insights & Ideas — <span className="text-primary">Thoughtfully Curated</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-6 text-lg text-white/75 max-w-2xl mx-auto"
            >
              Deep-dive articles, practical engineering guides, and forward-thinking essays on design, development, and AI-driven product strategy.
            </motion.p>
          </div>
        </header>

        {/* Featured */}
        <section className="px-6 md:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-3xl overflow-hidden grid md:grid-cols-2 gap-6 p-6 md:p-8 items-center"
            >
              <div>
                <span className="text-sm text-primary font-medium">Featured</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{featured.title}</h2>
                <p className="text-white/75 mt-4">{featured.excerpt}</p>

                <div className="flex items-center gap-4 mt-6">
                  <div className="text-sm text-white/60">{featured.author}</div>
                  <div className="text-sm text-white/60">•</div>
                  <div className="text-sm text-white/60">{featured.date}</div>
                  <div className="text-sm text-white/60">•</div>
                  <div className="text-sm text-white/60">{featured.readTime}</div>
                </div>

                <div className="mt-6">
                  <LiquidButton
                    variant="hero"
                    size="lg"
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' })}
                  >
                    Read Featured
                  </LiquidButton>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-black/55 to-black/70 p-8 flex items-center justify-center">
                <div className="text-8xl select-none" aria-hidden>{featured.src}</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="px-6 md:px-8 pb-8">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-5 py-2 rounded-full font-medium transition-all text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                  selectedCategory === cat ? 'glass-strong text-white shadow-md' : 'glass text-white/70 hover:glass-strong'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <main className="px-6 md:px-8 pb-20">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className=""
              >
                <ExpandableCard title={post.title} src={post.src} description={post.excerpt} className="h-full">
                  <div className="mb-4 text-sm text-white/60">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="prose prose-invert max-w-none text-white/90">
                    {post.content}
                  </div>
                </ExpandableCard>
              </motion.article>
            ))}
          </div>
        </main>

        {/* Newsletter */}
        <section className="px-6 md:px-8 py-16">
          <div className="max-w-4xl mx-auto glass rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">Stay in the loop</h3>
              <p className="text-white/70 mt-2">Short, practical insights — delivered monthly. No spam. Easy unsubscribe.</p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex gap-3">
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 md:flex-none min-w-[220px] glass rounded-full px-5 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary border-0 bg-white/5"
                required
              />
              <LiquidButton type="submit" variant="hero">Subscribe</LiquidButton>
            </form>
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  )
}

export default Insights
