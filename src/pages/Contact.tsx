import { useState } from 'react'
import Navigation from '@/components/Navigation'
import CTAFooter from '@/components/CTAFooter'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import confetti from 'canvas-confetti'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import { Mail, User, Building, FileText, Calendar, Globe, Wallet } from 'lucide-react'

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
      .then(() => emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_AUTOREPLY_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      ))
      .then(() => {
        setFormData({ name: '', email: '', company: '', projectType: '', budget: '', timeline: '', message: '' })
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
          {/* Form */}
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
                  <label className="text-white/70 text-sm flex items-center gap-2"><User className="w-4" /> Full Name *</label>
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
                  <label className="text-white/70 text-sm flex items-center gap-2"><Mail className="w-4" /> Email *</label>
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
                <label className="text-white/70 text-sm flex items-center gap-2"><Building className="w-4" /> Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Your Business"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="text-white/70 text-sm flex items-center gap-2"><FileText className="w-4" /> Project Type *</label>
                <select
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="select-field"
                >
                  <option value="">Select a project type</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App</option>
                  <option value="saas-platform">SaaS Platform</option>
                  <option value="branding">Branding & Identity</option>
                  <option value="ui-ux-design">UI/UX Design</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>

              {/* Budget & Timeline */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-white/70 text-sm flex items-center gap-2"><Wallet className="w-4" /> Budget</label>
                  <select name="budget" value={formData.budget} onChange={handleInputChange} className="select-field">
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $1k</option>
                    <option value="10k-25k">$1k - $2.5k</option>
                    <option value="25k-50k">$2.5k - $5k</option>
                    <option value="50k-100k">$5k - $10k</option>
                    <option value="over-100k">$10k+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-white/70 text-sm flex items-center gap-2"><Calendar className="w-4" /> Timeline</label>
                  <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="select-field">
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3">1-3 months</option>
                    <option value="3-6">3-6 months</option>
                    <option value="6+">6+ months</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-white/70 text-sm flex items-center gap-2"><FileText className="w-4" /> Project Details *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInput}
