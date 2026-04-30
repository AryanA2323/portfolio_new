import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export default function ProjectsShowcase({ projects = [] }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!projects.length) return;
    const newIndex = Math.min(projects.length - 1, Math.floor(latest * projects.length));
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  });

  if (!projects.length) return null;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#050505] text-white" 
      style={{ height: `${projects.length * 100}vh` }}
    >
      {/* Background with vignette */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-between px-6 md:px-16">
        
        {/* DESKTOP LAYOUT - Left Side Image Container */}
        <div className="hidden md:block relative w-[55vw] h-[75vh] perspective-[1000px] z-10">
          
          {/* Ambient Blue Glow under the card */}
          <motion.div 
            className="absolute inset-0 bg-[#007AFF]/10 rounded-full blur-[100px] pointer-events-none -z-10"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-white/[0.06] bg-[#0a0a0a] relative">
            <AnimatePresence >
              <motion.div
                key={activeIndex}
                initial={{ scale: 0.85, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.05, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease }}
                className="absolute inset-0"
              >
                <img src={projects[activeIndex]?.img} className="w-full h-full object-cover" alt={projects[activeIndex]?.title} />
                
                {/* Overlay Description */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease }}
                  className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/50 to-transparent flex flex-col justify-end p-12"
                >
                  <motion.span 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="text-[#007AFF] text-xs font-bold uppercase tracking-[0.3em] mb-4"
                  >
                    {projects[activeIndex]?.category}
                  </motion.span>
                  <h3 className="text-5xl lg:text-6xl font-bold text-white mb-4 uppercase tracking-tighter drop-shadow-lg">
                    {projects[activeIndex]?.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl font-light">
                    {projects[activeIndex]?.desc}
                  </p>
                  <div className="flex gap-4 items-center">
                    <a 
                      href={projects[activeIndex]?.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      View Project
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Vertical Nav */}
        <div className="hidden md:flex flex-col items-end space-y-8 z-10 w-[35vw]">
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-8 bg-white/30"></div>
             <span className="text-[10px] tracking-[0.4em] text-white/50 font-semibold uppercase">My Projects</span>
          </div>
          
          {projects.map((p, i) => {
            const isActive = activeIndex === i;
            return (
              <div key={p.num} className="relative group cursor-pointer" onClick={() => {
                window.scrollTo({ top: (i * window.innerHeight) + containerRef.current.offsetTop, behavior: 'smooth' });
              }}>
                <motion.h4 
                  className="text-3xl lg:text-5xl font-light tracking-tight text-right uppercase"
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    scale: isActive ? 1.05 : 1,
                    x: isActive ? -16 : 0,
                    color: isActive ? "#FFFFFF" : "#A0A0A0"
                  }}
                  whileHover={{ opacity: 0.8, x: -16 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {p.title}
                </motion.h4>
                <motion.div 
                  className="absolute right-0 -bottom-3 h-[1px] bg-[#007AFF] origin-right"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4, ease }}
                />
              </div>
            );
          })}
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden w-full h-full flex flex-col justify-center relative z-10 pt-16">
           <div className="flex items-center justify-center gap-4 mb-8">
               <div className="h-[1px] w-8 bg-white/30"></div>
               <span className="text-[10px] tracking-[0.4em] text-white/50 font-semibold uppercase">My Projects</span>
               <div className="h-[1px] w-8 bg-white/30"></div>
           </div>

           <div className="flex-1 w-full relative rounded-[32px] overflow-hidden shadow-2xl mb-8 border border-white/[0.06]">
              <AnimatePresence>
                 <motion.div
                   key={activeIndex}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.1 }}
                   transition={{ duration: 0.6, ease }}
                   className="absolute inset-0"
                 >
                   <img src={projects[activeIndex]?.img} className="w-full h-full object-cover" alt={projects[activeIndex]?.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent flex flex-col justify-end p-6">
                     <span className="text-[#007AFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{projects[activeIndex]?.category}</span>
                     <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter leading-tight">{projects[activeIndex]?.title}</h3>
                     <p className="text-xs text-gray-300 line-clamp-3 mb-6 font-light">{projects[activeIndex]?.desc}</p>
                     <a 
                       href={projects[activeIndex]?.link} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="bg-white text-black px-6 py-3 w-max rounded-full font-bold uppercase tracking-widest text-[10px]"
                     >
                       View Project
                     </a>
                   </div>
                 </motion.div>
              </AnimatePresence>
           </div>

           {/* Mobile Nav Overlay / Pips */}
           <div className="flex justify-center gap-4 pb-8">
              {projects.map((p, i) => (
                <div 
                  key={p.num} 
                  onClick={() => window.scrollTo({ top: (i * window.innerHeight) + containerRef.current.offsetTop, behavior: 'smooth' })}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === i ? 'bg-white scale-[1.7]' : 'bg-white/30'}`}
                />
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
