
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonials';

// Curated testimonials for Limitless brand
const testimonials = [
  {
    name: 'Sarah Chen',
    username: '@sarahchen',
    body: 'Limitless transformed our digital presence completely. Their innovative approach exceeded all expectations.',
    img: 'https://randomuser.me/api/portraits/women/32.jpg',
    country: '🇺🇸 USA',
    company: 'TechFlow Inc'
  },
  {
    name: 'Marcus Rodriguez',
    username: '@marcusr',
    body: 'The team at Limitless created a stunning brand identity that perfectly captures our vision.',
    img: 'https://randomuser.me/api/portraits/men/68.jpg',
    country: '🇪🇸 Spain',
    company: 'Creative Studios'
  },
  {
    name: 'Aisha Patel',
    username: '@aishap',
    body: 'Outstanding mobile app development. The user experience is flawless and engaging.',
    img: 'https://randomuser.me/api/portraits/women/51.jpg',
    country: '🇮🇳 India',
    company: 'EcoTech Solutions'
  },
  {
    name: 'David Kim',
    username: '@davidkim',
    body: 'Their AI-powered dashboard revolutionized our financial analytics. Incredible work!',
    img: 'https://randomuser.me/api/portraits/men/53.jpg',
    country: '🇰🇷 Korea',
    company: 'FinanceAI Corp'
  },
  {
    name: 'Emma Thompson',
    username: '@emmat',
    body: 'Limitless delivered a premium SaaS platform that streamlined our entire workflow.',
    img: 'https://randomuser.me/api/portraits/women/33.jpg',
    country: '🇬🇧 UK',
    company: 'Productivity Pro'
  },
  {
    name: 'Jean-Luc Dubois',
    username: '@jeanluc',
    body: 'Exceptional attention to detail and creative vision. A truly professional experience.',
    img: 'https://randomuser.me/api/portraits/men/22.jpg',
    country: '🇫🇷 France',
    company: 'Minimal Studio'
  },
  {
    name: 'Yuki Tanaka',
    username: '@yukitan',
    body: 'The immersive digital experience they created is cutting-edge and beautifully designed.',
    img: 'https://randomuser.me/api/portraits/women/85.jpg',
    country: '🇯🇵 Japan',
    company: 'Digital Innovations'
  },
  {
    name: 'Alex Mitchell',
    username: '@alexm',
    body: 'Working with Limitless was seamless. They brought our complex vision to life perfectly.',
    img: 'https://randomuser.me/api/portraits/men/45.jpg',
    country: '🇨🇦 Canada',
    company: 'NextGen Tech'
  },
  {
    name: 'Isabella Santos',
    username: '@isabellas',
    body: 'Their sustainable tech solutions perfectly aligned with our eco-conscious mission.',
    img: 'https://randomuser.me/api/portraits/women/61.jpg',
    country: '🇧🇷 Brazil',
    company: 'Green Future'
  },
];

function TestimonialCard({ img, name, username, body, country, company }: (typeof testimonials)[number]) {
  return (
    <Card className="w-80 glass border-white/10 hover:glass-strong transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold text-white flex items-center gap-2">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs text-primary font-medium">{company}</p>
            <p className="text-xs text-white/60">{username}</p>
          </div>
        </div>
        <blockquote className="text-sm text-white/80 leading-relaxed">
          "{body}"
        </blockquote>
      </CardContent>
    </Card>
  );
}

const ClientTestimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-display mb-6 gradient-text">
            Client Success Stories
          </h2>
          <p className="text-body-large text-white/70 max-w-2xl mx-auto">
            Discover how we've helped businesses transform their digital presence and achieve remarkable results.
          </p>
        </div>

        {/* 3D Testimonials Marquee */}
        <div className="relative flex h-[500px] w-full max-w-[1200px] mx-auto flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px]">
          <div
            className="flex flex-row items-center gap-6"
            style={{
              transform:
                'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
            }}
          >
            {/* Vertical Marquee Column 1 */}
            <Marquee vertical pauseOnHover repeat={2} className="[--duration:35s]">
              {testimonials.slice(0, 3).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            
            {/* Vertical Marquee Column 2 (Reverse) */}
            <Marquee vertical pauseOnHover reverse repeat={2} className="[--duration:40s]">
              {testimonials.slice(3, 6).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            
            {/* Vertical Marquee Column 3 */}
            <Marquee vertical pauseOnHover repeat={2} className="[--duration:45s]">
              {testimonials.slice(6, 9).map((review) => (
                <TestimonialCard key={review.username} {...review} />
              ))}
            </Marquee>
            
            {/* Vertical Marquee Column 4 (Reverse) */}
            <Marquee vertical pauseOnHover reverse repeat={2} className="[--duration:38s]">
              {testimonials.slice(0, 3).map((review) => (
                <TestimonialCard key={`${review.username}-2`} {...review} />
              ))}
            </Marquee>
          </div>
          
          {/* Gradient overlays for smooth edges */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background via-background/80 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background via-background/60 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background via-background/60 to-transparent z-10"></div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            {/* 4.5 Star Rating Display */}
            <div className="flex items-center gap-1">
              {/* 4 Full Stars */}
              {[1, 2, 3, 4].map((star) => (
                <svg
                  key={star}
                  className="w-5 h-5 text-yellow-400 fill-current animate-fade-in"
                  style={{ animationDelay: `${star * 100}ms` }}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              
              {/* Half Star (5th star) */}
              <div className="relative">
                <svg
                  className="w-5 h-5 text-gray-600 fill-current animate-fade-in"
                  style={{ animationDelay: '500ms' }}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  className="w-5 h-5 text-yellow-400 fill-current absolute top-0 left-0 animate-fade-in overflow-hidden"
                  style={{ animationDelay: '500ms', clipPath: 'inset(0 50% 0 0)' }}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            <span className="text-yellow-400 font-semibold text-sm ml-1 animate-fade-in" style={{ animationDelay: '600ms' }}>
              4.5
            </span>
          </div>
          
          <p className="text-white/70 mb-4 animate-fade-in" style={{ animationDelay: '700ms' }}>
            Join hundreds of satisfied clients
          </p>
        </div>
      </div>
    </section>
  )
}

export default ClientTestimonials
