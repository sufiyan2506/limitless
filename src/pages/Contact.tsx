import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import confetti from 'canvas-confetti'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import { Mail, User, Building, FileText, Calendar, Globe, Wallet } from 'lucide-react'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    confetti({ particleCount: 120, spread: 80 })

    emailjs
      .send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(() =>
        emailjs.send(
          import.meta.env.VITE_EMAIL_SERVICE_ID,
          import.meta.env.VITE_EMAIL_AUTOREPLY_TEMPLATE_ID,
          formData,
          import.meta.env.VITE_EMAIL_PUBLIC_KEY
        )
      )
      .then(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        })
      })
  }

  const contactInfo = [
    { icon: <Mail className="w-5 h-5 text-primary" />, label: 'Email', value: 'hello@limitless.studio' },
    { icon: <Globe className="w-5 h-5 text-primary" />, label: 'Location', value: 'San Francisco, CA' },
    { icon: <Calendar className="w-5 h-5 text-primary" />, label: 'Business Hours', value: 'Mon - Fri, 9AM - 6PM PST' }
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WebGLShader />

      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-6 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black tracking-tight mb-6 gradient-text"
          >
            Let’s Build Without Limits
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/70 text-xl max-w-2xl mx-auto"
          >
            Tell us about your vision — we'll turn it into a world-class digital experience.
          </motion.p>
        </section>

        {/* Contact Form Section */}
        <section className="pb-24 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-10 border border-white/10 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Start Your Project</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/70 text-sm flex items-center gap-2">
                    <User className="w-4" /> Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/70 text-sm flex items-center gap-2">
                    <Mail className="w-4" /> Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-white/70 text-sm flex items-center gap-2">
                  <Building className="w-4" /> Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Your Business"
                />
              </div>

              {/* Project Type (shadcn Select) */}
              <div className="space-y-2">
                <label className="text-white/70 text-sm flex items-center gap-2">
                  <FileText className="w-4" /> Project Type *
                </label>

                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, projectType: value })
                  }
                >
                  <SelectTrigger className="w-full bg-white/5 border border-white/20 text-white">
                    <SelectValue placeholder="Select a project type" />
                  </SelectTrigger>

                  <SelectContent className="bg-black/90 border border-white/10 text-white backdrop-blur-xl">
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-app">Mobile App</SelectItem>
                    <SelectItem value="saas-platform">SaaS Platform</SelectItem>
                    <SelectItem value="branding">Branding & Identity</SelectItem>
                    <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget & Timeline */}
              <div className="grid md:grid-cols-2 gap-4">

                {/* Budget Select */}
                <div className="space-y-2">
                  <label className="text-white/70 text-sm flex items-center gap-2">
                    <Wallet className="w-4" /> Budget
                  </label>

                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, budget: value })
                    }
                  >
                    <SelectTrigger className="w-full bg-white/5 border border-white/20 text-white">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>

                    <SelectContent className="bg-black/90 border border-white/10 text-white backdrop-blur-xl">
                      <SelectItem value="under-10k">Under $1k</SelectItem>
                      <SelectItem value="10k-25k">$1k - $2.5k</SelectItem>
                      <SelectItem value="25k-50k">$2.5k - $5k</SelectItem>
                      <SelectItem value="50k-100k">$5k - $10k</SelectItem>
                      <SelectItem value="over-100k">$10k+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timeline Select */}
                <div className="space-y-2">
                  <label className="text-white/70 text-sm flex items-center gap-2">
                    <Calendar className="w-4" /> Timeline
                  </label>

                  <Select
                    onValueChange={(value) =>
                      setFormData({ ...formData, timeline: value })
                    }
                  >
                    <SelectTrigger className="w-full bg-white/5 border border-white/20 text-white">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>

                    <SelectContent className="bg-black/90 border border-white/10 text-white backdrop-blur-xl">
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-3">1–3 months</SelectItem>
                      <SelectItem value="3-6">3–6 months</SelectItem>
                      <SelectItem value="6+">6+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-white/70 text-sm flex items-center gap-2">
                  <FileText className="w-4" /> Project Details *
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <LiquidButton className="mt-4" size="lg">
                Send Message
              </LiquidButton>
            </form>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="glass p-6 rounded-2xl border border-white/10 flex items-start gap-4">
                {item.icon}
                <div>
                  <p className="text-white/70 text-sm">{item.label}</p>
                  <p className="text-white text-lg font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CTAFooter />
      </div>
    </div>
  )
}

export default Contact
