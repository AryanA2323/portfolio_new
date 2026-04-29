import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis } from '@studio-freight/react-lenis';
import { SpotlightNavbar } from './components/ui/spotlight-navbar';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const hexRows = [
  [
    { name: 'HTML', icon: 'devicon-html5-plain' },
    { name: 'CSS', icon: 'devicon-css3-plain' },
    { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    { name: 'React', icon: 'devicon-react-original' }
  ],
  [
    { name: 'Angular', icon: 'devicon-angularjs-plain' },
    { name: 'Node.js', icon: 'devicon-nodejs-plain' },
    { name: 'Express', icon: 'devicon-express-original' },
    { name: 'Python', icon: 'devicon-python-plain' },
    { name: 'OOPs', icon: 'devicon-cplusplus-plain' }
  ],
  [
    { name: 'C', icon: 'devicon-c-plain' },
    { name: 'C++', icon: 'devicon-cplusplus-plain' },
    { name: 'Java', icon: 'devicon-java-plain' },
    { name: 'Docker', icon: 'devicon-docker-plain' }
  ],
  [
    { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    { name: 'SQL', icon: 'devicon-azuresqldatabase-plain' },
    { name: 'MySQL', icon: 'devicon-mysql-plain' },
    { name: 'Firebase', icon: 'devicon-firebase-plain' },
    { name: 'Git', icon: 'devicon-git-plain' }
  ]
];

const projects = [
  {
    num: '01',
    category: 'AI HEALTHCARE',
    title: 'MEDISENSE AI',
    desc: 'A full-stack AI-powered healthcare platform providing instant symptom analysis, medicine identification, and an intelligent health chatbot using React, Python, FastAPI, and scikit-learn.',
    link: 'https://github.com/AryanA2323/ADBMS-Mini-Project',
    img: 'screen_2.png'
  },
  {
    num: '02',
    category: 'DASHBOARD',
    title: 'KRUSHIMANDI ADMIN PANEL',
    desc: 'Comprehensive administrative dashboard built during my internship. Enables efficient management of an agricultural marketplace with React, Material UI, Node.js, and Firebase.',
    link: 'https://github.com/AryanA2323/ADBMS-Mini-Project',
    img: 'screen_5.png'
  },
  {
    num: '03',
    category: 'EDUCATIONAL AI',
    title: 'VIDEO SUMMARIZER & QUIZ',
    desc: 'An AI-powered platform transforming YouTube lecture videos into concise summaries and interactive quizzes using Gradio, Python, and Gemini AI.',
    link: 'https://github.com/AryanA2323/ADBMS-Mini-Project',
    img: 'screen_2.png'
  },
  {
    num: '04',
    category: 'FULL STACK',
    title: 'LIBRARY MANAGEMENT SYSTEM',
    desc: 'A comprehensive web application streamlining library operations through CRUD functionality and cloud-based MongoDB Atlas integration.',
    link: 'https://github.com/AryanA2323/ADBMS-Mini-Project',
    img: 'screen_5.png'
  }
];

function App() {
  const containerRef = useRef(null);
  const timelineLineRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredHex, setHoveredHex] = useState(null);
  const [activeProject, setActiveProject] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero animations Timeline
      const tl = gsap.timeline();
      tl.fromTo('.hero-bg',
        { opacity: 0, scale: 1.1 },
        { opacity: 0.6, scale: 1, duration: 2, ease: 'power2.out' }
      )
        .fromTo('.hero-image img',
          { scale: 0.8, opacity: 0, y: 100 },
          { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'back.out(1.7)' },
          '-=1'
        )
        .fromTo('.hero-text',
          { opacity: 0, y: 50, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out', stagger: 0.2 },
          '-=1'
        );

      // Fade-in sections
      const sections = gsap.utils.toArray('.fade-in-section');
      sections.forEach(section => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Experience Timeline Animation
      if (timelineLineRef.current) {
        gsap.fromTo(timelineLineRef.current,
          { height: 0 },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: '#experience',
              start: 'top center',
              end: 'bottom center',
              scrub: true
            }
          }
        );

        const timelineItems = gsap.utils.toArray('.timeline-item');
        timelineItems.forEach((item, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(item,
            { opacity: 0, x: isLeft ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div ref={containerRef}>
        {/* Navbar with dynamic background */}
        <div className={`group fixed top-0 w-full z-50 flex justify-between items-center px-8 md:px-16 transition-all duration-500 ease-in-out ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-md shadow-2xl py-2 md:py-3 hover:py-4 md:hover:py-6' : 'bg-transparent py-4 md:py-6'}`}>
          <div className="flex-shrink-0">
            <img src="logo.png" alt="Aryan Adhav Logo" className={`w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-500 ease-in-out ${isScrolled ? 'h-10 md:h-12 group-hover:h-16 group-hover:md:h-24' : 'h-16 md:h-24'}`} />
          </div>

          <div className="hidden md:block">
            <SpotlightNavbar
              items={[
                { label: "WORK", href: "#work" },
                { label: "STORY", href: "#story" },
                { label: "SKILLS", href: "#stack" },
                { label: "EXPERIENCE", href: "#experience" },
                { label: "CONTACT", href: "#contact" },
              ]}
              defaultActiveIndex={
                activeSection === 'work' ? 0 :
                  activeSection === 'story' ? 1 :
                    activeSection === 'stack' ? 2 :
                      activeSection === 'experience' ? 3 :
                        activeSection === 'contact' ? 4 : 0
              }
            />
          </div>

          <div className="flex items-center gap-6">
            <a href="https://github.com/AryanA2323" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0]/80 hover:text-white hover:scale-110 transition-all">
              <i className="devicon-github-original text-2xl md:text-3xl" aria-label="GitHub"></i>
            </a>
            <a href="https://linkedin.com/in/AryanA2323" target="_blank" rel="noopener noreferrer" className="text-[#E0E0E0]/80 hover:text-[#007AFF] hover:scale-110 transition-all">
              <i className="devicon-linkedin-plain text-2xl md:text-3xl" aria-label="LinkedIn"></i>
            </a>
          </div>
        </div>

        <main>
          {/* Hero */}
          <section id="hero" className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden pt-32">
            {/* Background Image: bg.png */}
            <div className="absolute inset-0 z-0 bg-black">
              <img src="bg.png" alt="Background" className="hero-bg w-full h-full object-cover opacity-60" />
              {/* Fade out gradient at the bottom so it seamlessly blends into the next section */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 hero-image h-[70vh] md:h-[90vh] w-full flex justify-center items-end mt-auto">
              <img className="h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,122,255,0.3)] relative z-10" alt="Aryan Adhav" src="myphoto.png" />

              <div className="absolute bottom-6 md:bottom-12 text-center flex flex-col items-center pointer-events-none z-20 px-4">
                <span className="hero-text font-['Inter'] text-[10px] md:text-sm text-[#007AFF] mb-2 tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold drop-shadow-lg text-center">JUNIOR SOFTWARE DEVELOPER</span>
                <h1 className="hero-text font-['Epilogue'] text-4xl sm:text-5xl md:text-7xl text-white font-black tracking-tighter leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] text-center">
                  ARYAN ADHAV
                </h1>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="py-section-gap px-margin-edge bg-[#050505] fade-in-section" id="story">
            <div className="grid grid-cols-12 gap-gutter items-center">
              <div className="col-span-12 md:col-span-6 mb-12 md:mb-0">
                <h2 className="font-label-sm text-label-sm text-primary mb-8 tracking-[0.3em]">THE ARCHIVE</h2>
                <p className="font-headline-lg text-headline-lg text-on-surface mb-12">Building Scalable Digital Experiences.</p>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                  I am Aryan Adhav, a Junior Software Developer currently pursuing a B.E in Information Technology. I specialize in full-stack web development, creating high-performance, user-centric applications using React, Node.js, and modern AI integrations.
                </p>
                <div className="mt-8 flex flex-col gap-2 font-label-sm text-secondary/60">
                  <span>Pune, Maharashtra, India</span>
                  <span>aryanadhav00@gmail.com</span>
                  <span>+91 7972033814</span>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 relative flex justify-center">
                <div className="w-full max-w-sm aspect-square bg-surface-container-high overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl">
                  <img className="project-image w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" alt="Aryan Adhav Workspace Archive" src="screen_5.png" loading="lazy" />
                </div>
                <div className="absolute -bottom-8 left-4 md:left-12 p-6 bg-surface-container w-64 border border-outline-variant/10 shadow-2xl backdrop-blur-md">
                  <h3 className="font-label-sm text-label-sm text-secondary mb-2">PHILOSOPHY</h3>
                  <p className="text-[10px] leading-relaxed text-on-surface-variant uppercase tracking-widest">
                    CRITICAL THINKING &amp; TEAMWORK IS THE FOUNDATION.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Honeycomb Stack */}
          <section className="py-section-gap px-margin-edge relative overflow-hidden bg-[#050505] fade-in-section" id="stack">
            <div className="text-center relative z-10 mb-24">
              <h2 className="font-label-sm text-label-sm text-primary mb-4 tracking-[0.3em]">CORE STACK</h2>
              <div className="font-display-xl text-display-xl text-stroke uppercase">ECOSYSTEM</div>
            </div>

            <div className="flex flex-col items-center gap-2 relative z-10 w-full max-w-4xl mx-auto -mt-16 pb-16 scale-[0.65] sm:scale-75 md:scale-100 origin-top" onMouseLeave={() => setHoveredHex(null)}>
              {hexRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center -mb-[38px]" style={{ gap: '16px' }}>
                  {row.map((skill, skillIndex) => {
                    const hexId = `${rowIndex}-${skillIndex}`;
                    const isHovered = hoveredHex === hexId;
                    const isOtherHovered = hoveredHex !== null && !isHovered;

                    let repelClass = '';
                    if (hoveredHex && isOtherHovered) {
                      const [hR, hC] = hoveredHex.split('-').map(Number);
                      if (rowIndex < hR) repelClass += ' -translate-y-6';
                      else if (rowIndex > hR) repelClass += ' translate-y-6';

                      if (skillIndex < hC) repelClass += ' -translate-x-6';
                      else if (skillIndex > hC) repelClass += ' translate-x-6';
                    }

                    return (
                      <div
                        key={skillIndex}
                        className={`hex-wrapper group cursor-pointer transition-all duration-500 ease-out ${isHovered ? 'scale-110 z-20' : ''} ${isOtherHovered ? `scale-90 opacity-40 ${repelClass}` : 'z-10'}`}
                        onMouseEnter={() => setHoveredHex(hexId)}
                      >
                        <div className="hex-inner relative">
                          <i className={`${skill.icon} text-5xl text-white transition-all duration-300 ${isHovered ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}></i>
                          <span className={`absolute font-label-sm text-center text-sm text-white transition-all duration-300 uppercase tracking-widest px-2 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-150 pointer-events-none'}`}>
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </section>

          {/* Accordion Digital Artifacts */}
          <section className="bg-[#050505] overflow-hidden py-32 fade-in-section" id="work">
            <div className="px-margin-edge mb-12">
              <h2 className="font-label-sm text-label-sm text-[#007AFF] mb-4 tracking-[0.3em] font-bold">SELECTED WORKS</h2>
              <h3 className="font-headline-lg text-4xl md:text-5xl font-bold text-white">Digital Artifacts.</h3>
            </div>

            <div className="w-full flex items-center justify-center">
              <div className="flex h-[450px] md:h-[550px] w-full px-margin-edge justify-center items-center gap-4 flex-col md:flex-row">
                {projects.map((proj, i) => {
                  const isActive = activeProject === i;
                  return (
                    <div
                      key={i}
                      onClick={() => setActiveProject(i)}
                      className={`relative rounded-3xl bg-cover bg-center cursor-pointer overflow-hidden flex items-end transition-all duration-[600ms] ease-[cubic-bezier(0.28,-0.03,0,0.99)] shadow-[0_15px_30px_rgba(0,0,0,0.5)] ${isActive ? 'h-full md:w-[60%] flex-[4]' : 'h-[80px] md:h-full md:w-[13.3%] flex-[1]'}`}
                      style={{ backgroundImage: `url(${proj.img})` }}
                    >
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isActive ? 'bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100' : 'bg-black/60 hover:bg-black/40'}`}></div>

                      <div className="relative z-10 flex flex-col justify-end p-4 md:p-8 text-white w-full h-full">

                        {/* Content text (only shown when active) */}
                        <div className={`flex flex-col justify-end overflow-hidden w-full transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 translate-y-0 h-auto mb-4' : 'opacity-0 translate-y-5 h-0 mb-0 hidden md:flex'}`}>
                          <span className="font-label-sm text-[#007AFF] mb-2 text-[10px] tracking-widest font-bold uppercase">{proj.category}</span>
                          <h4 className="uppercase font-bold text-lg md:text-3xl mb-3">{proj.title}</h4>
                          <p className="text-xs md:text-sm leading-relaxed text-gray-300 line-clamp-2 md:line-clamp-3 mb-4 max-w-lg">
                            {proj.desc}
                          </p>
                          <div>
                            <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs text-white hover:text-[#007AFF] transition-colors tracking-widest uppercase font-bold flex items-center gap-2">VIEW CASE <span className="text-lg leading-none">&rarr;</span></a>
                          </div>
                        </div>

                        {/* Number Circle at the bottom */}
                        <div className={`flex-shrink-0 w-[40px] h-[40px] md:w-[50px] md:h-[50px] bg-black/40 border border-white/10 rounded-full flex justify-center items-center font-headline-md text-sm md:text-lg backdrop-blur-md transition-all ${isActive ? 'ml-0' : 'mx-auto'}`}>
                          {proj.num}
                        </div>

                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Experience */}
          <section className="py-section-gap bg-[#080808] border-y border-outline-variant/10 fade-in-section" id="experience">
            <div className="px-margin-edge">
              <h2 className="font-label-sm text-label-sm text-primary mb-24 tracking-[0.3em] text-center">CHRONICLES</h2>

              <div className="max-w-4xl mx-auto relative py-12">
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-outline-variant/20 -translate-x-1/2"></div>
                <div ref={timelineLineRef} className="absolute left-0 md:left-1/2 top-0 w-[2px] bg-primary shadow-[0_0_15px_#007AFF] -translate-x-1/2 origin-top"></div>

                <div className="space-y-32">
                  <div className="timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="hidden md:block absolute left-1/2 top-0 w-4 h-4 rounded-full bg-[#050505] border-2 border-primary -translate-x-1/2 shadow-[0_0_10px_#007AFF] z-10"></div>
                    <div className="md:text-right md:pr-12">
                      <h4 className="font-headline-md text-headline-md text-on-surface">FULL-STACK DEVELOPER</h4>
                      <span className="font-label-sm text-label-sm text-primary uppercase">SHOVELTECH SOLUTIONS PVT. LTD.</span>
                    </div>
                    <div className="md:pl-12 pt-2 md:pt-0">
                      <span className="font-label-sm text-label-sm text-secondary/60 block mb-4">DEC 2025 - APR 2026</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Working on developing and enhancing web applications by contributing to both frontend and backend development. Implementing responsive UIs and integrating backend APIs.
                      </p>
                    </div>
                  </div>

                  <div className="timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="hidden md:block absolute left-1/2 top-0 w-4 h-4 rounded-full bg-[#050505] border-2 border-primary -translate-x-1/2 shadow-[0_0_10px_#007AFF] z-10"></div>
                    <div className="md:text-right md:pr-12 md:order-2">
                      <span className="font-label-sm text-label-sm text-secondary/60 block mb-4">JUN 2025 - AUG 2025</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Developed mobile application interfaces using React Native. Integrated backend services with Firebase and Node.js for real-time data handling.
                      </p>
                    </div>
                    <div className="md:pl-12 pt-2 md:pt-0 md:order-1 md:text-right">
                      <h4 className="font-headline-md text-headline-md text-on-surface">FRONTEND DEVELOPER INTERN</h4>
                      <span className="font-label-sm text-label-sm text-primary uppercase">KRUSHIMANDI INNOVATIONS PVT. LTD.</span>
                    </div>
                  </div>

                  <div className="timeline-item relative grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="hidden md:block absolute left-1/2 top-0 w-4 h-4 rounded-full bg-[#050505] border-2 border-primary -translate-x-1/2 shadow-[0_0_10px_#007AFF] z-10"></div>
                    <div className="md:text-right md:pr-12">
                      <h4 className="font-headline-md text-headline-md text-on-surface">B.E. INFORMATION TECHNOLOGY</h4>
                      <span className="font-label-sm text-label-sm text-primary uppercase">JSPM'S JSCOE, PUNE</span>
                    </div>
                    <div className="md:pl-12 pt-2 md:pt-0">
                      <span className="font-label-sm text-label-sm text-secondary/60 block mb-4">2024 - PRESENT | CGPA: 8.4</span>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        Following a Diploma in Computer Science (90%) from JSPM's Bhivrabai Sawant Polytechnic (2021-2024). High School at Dr. Mrs. Erin N Nagarwala Day School (83%).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="py-24 px-4 md:px-8 min-h-screen flex items-center justify-center fade-in-section bg-[#050505]" id="contact">
            <div className="max-w-6xl w-full bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#007AFF]/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="text-center mb-16 relative z-10">
                <h2 className="font-label-sm text-[#007AFF] mb-4 tracking-[0.3em] text-xs uppercase font-bold">CONTACT</h2>
                <h3 className="font-headline-lg text-4xl md:text-6xl font-semibold text-white mb-6">Let's <span className="text-white/40">Connect</span></h3>
                <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Left Column */}
                <div className="space-y-8 flex flex-col justify-center">
                  {/* Email */}
                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex justify-center items-center flex-shrink-0 group-hover:bg-[#007AFF]/20 transition-colors border border-white/5">
                      <span className="material-symbols-outlined text-gray-400 group-hover:text-[#007AFF]">mail</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">Email</h4>
                      <p className="text-gray-500 text-xs mb-2">Drop me a line anytime.</p>
                      <p className="text-white text-sm font-medium hover:text-[#007AFF] transition-colors cursor-pointer">aryanadhav00@gmail.com</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex justify-center items-center flex-shrink-0 group-hover:bg-[#007AFF]/20 transition-colors border border-white/5">
                      <span className="material-symbols-outlined text-gray-400 group-hover:text-[#007AFF]">location_on</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">Location</h4>
                      <p className="text-gray-500 text-xs mb-2">Based in Kharadi, Pune.</p>
                      <p className="text-gray-400 text-xs">Available for remote work worldwide.</p>
                    </div>
                  </div>

                  {/* Profiles */}
                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex justify-center items-center flex-shrink-0 group-hover:bg-[#007AFF]/20 transition-colors border border-white/5">
                      <span className="material-symbols-outlined text-gray-400 group-hover:text-[#007AFF]">link</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1 text-lg">Profiles</h4>
                      <p className="text-gray-500 text-xs mb-4">Explore my open-source work and network.</p>
                      <div className="flex gap-6">
                        <a href="https://github.com/AryanA2323" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"><i className="devicon-github-original text-lg"></i> GitHub</a>
                        <a href="https://linkedin.com/in/AryanA2323" className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#007AFF] transition-colors"><i className="devicon-linkedin-plain text-lg"></i> LinkedIn</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 md:p-10 flex flex-col justify-center">
                  <h4 className="text-2xl text-white font-bold mb-4">Looking for a <span className="text-[#007AFF]">Developer?</span></h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    I am open to internships, freelance work, and full-time opportunities where I can contribute across frontend, backend, and AI-powered feature development. Let's build something meaningful together.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <motion.a 
                      href="mailto:aryanadhav00@gmail.com" 
                      className="px-8 py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-gray-200 transition-colors"
                      animate={{ 
                        boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 20px rgba(255,255,255,0.6)", "0px 0px 0px rgba(255,255,255,0)"],
                        y: [0, -3, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send an Email
                    </motion.a>
                    <motion.a 
                      href="#" 
                      className="px-8 py-3 bg-[#1f1f1f] text-white font-bold text-sm rounded-full hover:bg-[#333] transition-colors border border-white/10"
                      animate={{ 
                        boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 15px rgba(255,255,255,0.2)", "0px 0px 0px rgba(255,255,255,0)"],
                        y: [0, -3, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download CV
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full py-8 md:py-12 px-8 md:px-16 bg-[#050505] border-t border-[#E0E0E0]/10 flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-6 text-center md:text-left">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <img src="logo.png" alt="Aryan Adhav Logo" className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" loading="lazy" />
            <p className="font-['Epilogue'] text-[9px] tracking-[0.2em] uppercase font-light text-[#E0E0E0]/40">© 2026 ARYAN ADHAV. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-8 justify-center">
            <a className="font-['Epilogue'] text-[9px] tracking-[0.2em] uppercase font-light text-[#E0E0E0]/40 hover:text-[#007AFF] transition-colors duration-300 opacity-80 hover:opacity-100" href="https://github.com/AryanA2323" target="_blank" rel="noopener noreferrer">GITHUB</a>
            <a className="font-['Epilogue'] text-[9px] tracking-[0.2em] uppercase font-light text-[#E0E0E0]/40 hover:text-[#007AFF] transition-colors duration-300 opacity-80 hover:opacity-100" href="https://linkedin.com/in/AryanA2323" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;
