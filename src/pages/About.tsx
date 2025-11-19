import React, { useState, useCallback, useEffect, useMemo } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import GradientCardShowcase from '@/components/ui/gradient-card-showcase'
import { Awards } from '@/components/ui/award'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { SlideButton } from '@/components/ui/slide-button'
import { GradientText } from '@/components/ui/gradient-text'
import JoinLimitlessForm from '@/components/JoinLimitlessForm'
import { Lightbulb, Target, Users, Rocket, ChevronLeft, ChevronRight } from 'lucide-react'

// Team member images
import safeerImage from '@/assets/team/ceo-safeer.png';
import usamaImage from '@/assets/team/cfo-usama.png';
import michaelImage from '@/assets/team/vp-sales-michael.jpg';
import billyImage from '@/assets/team/ai-architect-billy.jpg';
import duaImage from '@/assets/team/marketing-consultant-dua.png';
import neoImage from '@/assets/team/fullstack-dev-neo.png';
import fahadImage from '@/assets/team/frontend-engineer-fahad.png';
import fateymahImage from '@/assets/team/seo-expert-fateymah.png';
import miaImage from '@/assets/team/outreach-manager-mia.png';

/**
 * Improved About page
 * - Cleaner, more accessible structure
 * - Improved carousel UX (keyboard + better responsive behaviour)
 * - Lazy-loaded images
 * - Clear CTA + success state
 * - Hover cards simplified for better performance
 */

const approach = [
  {
    title: 'Digital Strategy & Discovery',
    desc: 'Comprehensive audits, user research and growth-focused strategy to increase ROI and product market fit.',
    icon: <Lightbulb className="w-7 h-7" aria-hidden />,
    gradientFrom: '#10B981',
    gradientTo: '#3B82F6',
  },
  {
    title: 'Custom UI/UX Design',
    desc: 'Mobile-first, accessible and conversion-focused interfaces backed by design systems and research.',
    icon: <Target className="w-7 h-7" aria-hidden />,
    gradientFrom: '#3B82F6',
    gradientTo: '#8B5CF6',
  },
  {
    title: 'Full-Stack Development',
    desc: 'Scalable web platforms, APIs and cloud architecture using modern tooling and best practices.',
    icon: <Users className="w-7 h-7" aria-hidden />,
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
  },
  {
    title: 'Growth & Optimization',
    desc: 'Data-driven growth, CRO and ongoing optimization to make sure your product keeps improving.',
    icon: <Rocket className="w-7 h-7" aria-hidden />,
    gradientFrom: '#EC4899',
    gradientTo: '#EF4444',
  },
]

const rawTeamMembers = [
  { name: 'Safeer', role: 'CEO', bio: 'Visionary leader driving innovation and strategic growth.', avatar: safeerImage, gradientFrom: '#667eea', gradientTo: '#764ba2' },
  { name: 'Usama', role: 'CFO', bio: 'Financial strategist optimizing operations and growth.', avatar: usamaImage, gradientFrom: '#f093fb', gradientTo: '#f5576c' },
  { name: 'Michael', role: 'VP Sales', bio: 'Building client relationships and revenue channels.', avatar: michaelImage, gradientFrom: '#4facfe', gradientTo: '#00f2fe' },
  { name: 'Billy', role: 'AI Architect', bio: 'Designs AI solutions that deliver measurable impact.', avatar: billyImage, gradientFrom: '#43e97b', gradientTo: '#38f9d7' },
  { name: 'Dua', role: 'Marketing', bio: 'Creative campaigns that move the needle.', avatar: duaImage, gradientFrom: '#fa709a', gradientTo: '#fee140' },
  { name: 'Neo', role: 'Fullstack', bio: 'Builds resilient and testable platforms.', avatar: neoImage, gradientFrom: '#667eea', gradientTo: '#764ba2' },
  { name: 'Fahad', role: 'Frontend', bio: 'Front-end lead focused on performance & accessibility.', avatar: fahadImage, gradientFrom: '#f093fb', gradientTo: '#f5576c' },
  { name: 'Fateymah', role: 'SEO', bio: 'Search strategies that increase sustainable traffic.', avatar: fateymahImage, gradientFrom: '#4facfe', gradientTo: '#00f2fe' },
  { name: 'Mia', role: 'Outreach', bio: 'Expands networks and community relationships.', avatar: miaImage, gradientFrom: '#43e97b', gradientTo: '#38f9d7' },
]

const TeamCard = ({ member }: { member: typeof rawTeamMembers[number] }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <article
          className="group relative bg-gradient-to-br from-black/60 to-black/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-transform duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
          tabIndex={0}
          aria-label={`${member.name}, ${member.role}`}
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={member.avatar}
              alt={`${member.name} — ${member.role}`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />
          </div>

          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-white truncate">{member.name}</h3>
            <p className="text-sm text-white/80 truncate" style={{backgroundImage: `linear-gradient(90deg, ${member.gradientFrom}, ${member.gradientTo})`}}>
              <span className="bg-clip-text text-transparent">{member.role}</span>
            </p>
          </div>
        </article>
      </HoverCardTrigger>

      <HoverCardContent className="w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-4" sideOffset={8}>
        <h4 className="font-semibold text-white">{member.name}</h4>
        <p className="text-sm text-white/80 mb-2">{member.role}</p>
        <p className="text-sm text-white/70">{member.bio}</p>
      </HoverCardContent>
    </HoverCard>
  )
}

const About = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  const teamMembers = useMemo(() => rawTeamMembers, [])

  const getCardsPerView = useCallback(() => {
    const w = window.innerWidth
    if (w < 640) return 1
    if (w < 1024) return 2
    return 3
  }, [])

  useEffect(() => {
    const onResize = () => {
      const per = getCardsPerView()
      setCardsPerView(per)
      const maxIndex = Math.max(0, teamMembers.length - per)
      setCurrentIndex((ci) => Math.min(ci, maxIndex))
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [getCardsPerView, teamMembers.length])

  const maxIndex = Math.max(0, teamMembers.length - cardsPerView)
  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < maxIndex

  const scrollToNext = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex))
  const scrollToPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0))

  // keyboard navigation for carousel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollToPrev()
      if (e.key === 'ArrowRight') scrollToNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [maxIndex])

  const handleFormComplete = () => {
    setShowSuccessMessage(true)
    setTimeout(() => {
      setIsDialogOpen(false)
      setShowSuccessMessage(false)
    }, 2600)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black/60 to-black">
      <WebGLShader />

      <div className="relative z-10">
        <Navigation />

        <main>
          <section className="pt-28 pb-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
                <GradientText>About Limitless</GradientText>
              </h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                We’re a creative studio that reimagines digital experiences — combining design, engineering and strategy to ship products that perform.
              </p>
            </div>
          </section>

          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="glass rounded-3xl p-8 hover:glass-strong transition">
                <h2 className="text-3xl font-bold mb-4 text-white">Our Story</h2>
                <p className="text-white/80 leading-relaxed mb-4">Limitless was founded by a team who wanted to break away from cookie-cutter digital work. Since day one we've focused on measurable results — product thinking, delightful design and engineering that scales.</p>
                <p className="text-white/70 leading-relaxed">We partner with ambitious teams to build impactful digital products and ongoing growth systems.</p>
              </div>

              <div className="glass rounded-3xl p-8 hover:glass-strong transition flex items-center justify-center">
                <Awards variant="award" title="WINNER" subtitle="Excellence in Digital Innovation" recipient="Think Limitless" date="2024" level="gold" className="text-white" />
              </div>
            </div>
          </section>

          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3"><GradientText>Our Approach</GradientText></h2>
              <p className="text-white/70 max-w-2xl mx-auto">A pragmatic process that blends research, design and engineering to deliver dependable outcomes.</p>
            </div>

            <GradientCardShowcase cards={approach} />
          </section>

          <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">Meet the Team <span className="text-white/60">— the people who build Limitless</span></h2>
              </div>

              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex gap-6 transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${(currentIndex * (100 / cardsPerView))}%)` }}
                    aria-live="polite"
                  >
                    {teamMembers.map((member, idx) => (
                      <div key={member.name} className="flex-shrink-0 px-2" style={{ width: `${100 / cardsPerView}%` }}>
                        <TeamCard member={member} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center items-center mt-6 gap-4">
                  <button
                    onClick={scrollToPrev}
                    disabled={!canScrollPrev}
                    aria-disabled={!canScrollPrev}
                    aria-label="Previous team"
                    className={`p-2 rounded-full backdrop-blur-sm border border-white/12 transition ${canScrollPrev ? 'bg-white/8 hover:bg-white/14' : 'opacity-40 cursor-not-allowed'}`}
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  <div className="text-sm text-white/60">{Math.min(currentIndex + cardsPerView, teamMembers.length)} / {teamMembers.length}</div>

                  <button
                    onClick={scrollToNext}
                    disabled={!canScrollNext}
                    aria-disabled={!canScrollNext}
                    aria-label="Next team"
                    className={`p-2 rounded-full backdrop-blur-sm border border-white/12 transition ${canScrollNext ? 'bg-white/8 hover:bg-white/14' : 'opacity-40 cursor-not-allowed'}`}
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="text-center mt-12">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <SlideButton onComplete={() => setIsDialogOpen(true)}>Join Limitless</SlideButton>
                    </DialogTrigger>

                    <DialogContent className="glass border-white/20 p-0 max-w-3xl w-[95vw] max-h-[85vh] overflow-y-auto">
                      <div className="p-6">
                        {showSuccessMessage ? (
                          <div className="text-center py-8">
                            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Application Submitted</h3>
                            <p className="text-white/80">We will review your application and get back within 3 working days.</p>
                          </div>
                        ) : (
                          <JoinLimitlessForm onClose={handleFormComplete} />
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </section>

        </main>

        <CTAFooter />
      </div>
    </div>
  )
}

export default About
