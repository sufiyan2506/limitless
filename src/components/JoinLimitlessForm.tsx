import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import confetti from 'canvas-confetti'

interface JoinLimitlessFormProps {
  onClose: () => void
}

const JoinLimitlessForm = ({ onClose }: JoinLimitlessFormProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    type: '',
    workPreference: '',
    department: [] as string[],
    skills: [] as string[],
    certifications: '',
    qualifications: '',
    experience: '',
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    message: ''
  })
  
  const [newSkill, setNewSkill] = useState('')

  const totalSteps = 4

  const departments = [
    'Development',
    'Design',
    'Marketing',
    'Strategy & Business',
    'Operations',
    'Customer Success'
  ]

  const commonSkills = [
    'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design',
    'Figma', 'Adobe Creative Suite', 'Digital Marketing', 'SEO', 'Content Strategy',
    'Project Management', 'Data Analysis', 'AWS', 'DevOps'
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] })
      setNewSkill('')
    }
  }

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    })
  }

  const handleSubmit = () => {
    // Trigger confetti animation
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#F7DC6F']
    });

    // Handle form submission
    console.log('Form submitted:', formData)
    // Trigger success animation and message
    onClose()
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.type !== '' && formData.workPreference !== ''
      case 2:
        return formData.department.length > 0
      case 3:
        return formData.skills.length > 0 || formData.qualifications || formData.experience
      case 4:
        return formData.name && formData.email
      default:
        return false
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/70">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-primary">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">What are you looking for?</h3>
              <p className="text-white/70">Choose the opportunity type that interests you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Internship', 'Part-time Position', 'Full-time Position'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData({ ...formData, type })}
                  className={cn(
                    "p-6 rounded-xl border-2 transition-all duration-300 text-left",
                    formData.type === type
                      ? "border-primary bg-primary/10 text-white"
                      : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                  )}
                >
                  <h4 className="font-semibold text-lg mb-2">{type}</h4>
                  <p className="text-sm text-white/60">
                    {type === 'Internship'
                      ? 'Learn and grow with our team while gaining real-world experience'
                      : type === 'Part-time Position'
                      ? 'Flexible hours while contributing to meaningful projects'
                      : 'Join our team as a permanent member and help shape the future'
                    }
                  </p>
                </button>
              ))}
            </div>

            {/* Work Preference Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h4 className="text-xl font-bold text-white mb-2">Work Preference</h4>
                <p className="text-white/70">How would you prefer to work with us?</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['On-site', 'Remote'].map((preference) => (
                  <button
                    key={preference}
                    onClick={() => setFormData({ ...formData, workPreference: preference })}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all duration-300 text-center",
                      formData.workPreference === preference
                        ? "border-primary bg-primary/10 text-white"
                        : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                    )}
                  >
                    <h5 className="font-semibold text-base mb-1">{preference}</h5>
                    <p className="text-xs text-white/60">
                      {preference === 'On-site'
                        ? 'Work from our office location'
                        : 'Work from anywhere in the world'
                      }
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Which departments interest you?</h3>
              <p className="text-white/70">Select one or more areas where you'd like to contribute</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {departments.map((dept) => {
                const isSelected = formData.department.includes(dept)
                return (
                  <button
                    key={dept}
                    onClick={() => {
                      if (isSelected) {
                        setFormData({ 
                          ...formData, 
                          department: formData.department.filter(d => d !== dept)
                        })
                      } else {
                        setFormData({ 
                          ...formData, 
                          department: [...formData.department, dept]
                        })
                      }
                    }}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all duration-300 text-left relative",
                      isSelected
                        ? "border-primary bg-primary/10 text-white"
                        : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-white/40"
                      )}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">{dept}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Tell us about your expertise</h3>
              <p className="text-white/70">Share your skills, qualifications, and experience</p>
            </div>
            
            <div className="space-y-6">
              {/* Skills */}
              <div>
                <Label htmlFor="skills" className="text-white mb-2 block">Skills</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {commonSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm border transition-all duration-200",
                        formData.skills.includes(skill)
                          ? "bg-primary text-white border-primary"
                          : "bg-white/5 text-white/70 border-white/20 hover:border-primary hover:text-primary"
                      )}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add custom skill"
                    className="bg-white/5 border-white/20 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                  />
                  <Button
                    type="button"
                    onClick={() => addSkill(newSkill)}
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-primary/20 text-white">
                        {skill}
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 hover:text-red-400"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Qualifications */}
              <div>
                <Label htmlFor="qualifications" className="text-white mb-2 block">Education & Qualifications</Label>
                <Textarea
                  id="qualifications"
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  placeholder="Share your educational background, degrees, certifications..."
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience" className="text-white mb-2 block">Experience</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Describe your relevant work experience, projects, achievements..."
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
              <p className="text-white/70">Let us know how to reach you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white mb-2 block">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="portfolio" className="text-white mb-2 block">Portfolio/LinkedIn</Label>
                <Input
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://your-portfolio.com"
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="message" className="text-white mb-2 block">Additional Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us why you want to join Limitless..."
                className="bg-white/5 border-white/20 text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Submit Application
          </Button>
        )}
      </div>
    </div>
  )
}

export default JoinLimitlessForm