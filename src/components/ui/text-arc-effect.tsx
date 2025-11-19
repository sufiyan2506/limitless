import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

/* -------------------------------------------------------
   Central Limitless Logo (unchanged, only polished)
------------------------------------------------------- */
const CentralLogo = () => (
  <div className="flex flex-col items-center gap-1 select-none">
    <img
      src="/lovable-uploads/c695b3f2-d6e6-4948-ab32-c15cbab07ae7.png"
      alt="Limitless Logo"
      className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow"
    />
    <span className="text-xs md:text-sm font-bold bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent tracking-[0.08em]">
      LIMITLESS
    </span>
  </div>
)

/* -------------------------------------------------------
   Circular Text Arc Renderer
------------------------------------------------------- */
const TextArc = ({ text, diameter = 200 }) => {
  const chars = text.split("")
  const radius = diameter / 2
  const angleStep = 360 / chars.length

  return (
    <div
      className="relative pointer-events-none"
      style={{ width: diameter, height: diameter }}
    >
      {chars.map((char, i) => {
        const angle = angleStep * i

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              marginLeft: "-0.5em",
              height: `${radius}px`,
              transform: `rotate(${angle}deg)`,
              transformOrigin: "bottom center",
            }}
          >
            <span className="text-[10px] md:text-xs font-medium text-white/60 tracking-wide">
              {char}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* -------------------------------------------------------
   Main Component (unchanged behaviour)
------------------------------------------------------- */
export const TextArcEffect = () => {
  const text = " THANK YOU • FOR VISITING •"
  const [diameter, setDiameter] = useState(160)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setDiameter(130)
      else if (window.innerWidth < 768) setDiameter(150)
      else setDiameter(180)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex items-center justify-center py-20 select-none">
      <div className="relative flex items-center justify-center">
        {/* Rotating Text Arc */}
        <motion.div
          className="absolute pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          <TextArc text={text} diameter={diameter} />
        </motion.div>

        {/* Center Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.08 }}
          className="glass p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <CentralLogo />
        </motion.div>
      </div>
    </div>
  )
}
