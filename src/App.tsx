
import { ArrowRight, Award, Brain, Briefcase, BookOpen, Calendar, ChevronDown, Cloud, Code, CreditCard, Cpu, Database, ExternalLink, Eye, Github, GitBranch, Linkedin, Mail, MapPin, MessageCircle, Phone, Rocket, Smartphone, Sparkles, Star, TestTube, Users, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
  Brain,
  Code,
  Calendar,
  Award,
  Cloud,
  Cpu,
  Database,
  Smartphone,
  CreditCard,
  GitBranch,
  TestTube,
  Github,
  Briefcase,
  BookOpen
};

const Portfolio = () => {
  const heroRef = useRef();
const [mousePosition, setMousePosition] = useState<{ x: number; y: number; timestamp: number }>({
  x: 0,
  y: 0,
  timestamp: Date.now()
});

  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [particleCount, setParticleCount] = useState(100);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const typewriterText = "AI Engineer + Full Stack Developer";

  useEffect(() => {
    setIsLoaded(true);
    
 let rafId: number;

    const handleMouseMove = (e:MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ 
          x: e.clientX, 
          y: e.clientY,
          timestamp: Date.now()
        });
        rafId = 0;
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      // Close mobile menu when screen is resized to desktop (md breakpoint is 768px)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

  let typeTimer: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    setIsTyping(true);

    const typeWriter = () => {
      if (currentIndex < typewriterText.length) {
        setDisplayText(typewriterText.slice(0, currentIndex + 1));
        currentIndex++;
        typeTimer = setTimeout(typeWriter, 100 + Math.random() * 50);
      } else {
        setIsTyping(false);
      }
    };

    setTimeout(typeWriter, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(typeTimer);
    };
  }, []);



 


  const ParticleField = () => {
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 2 + 1,
      direction: Math.random() * 360
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${6 + particle.speed}s ease-in-out infinite, twinkle ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    );
  };

  const FloatingOrb = ({
  className,
  delay = 0,
  parallax = false,
}: {
  className?: string;
  delay?: number;
  parallax?: boolean;
}) => (
    <div 
      className={`absolute rounded-full blur-2xl ${className}`}
      style={{
        animation: `float ${8 + Math.random() * 4}s ease-in-out infinite ${delay}s, pulse ${4 + Math.random() * 2}s ease-in-out infinite`,
        transform: parallax ? `translateY(${scrollY * 0.1}px)` : 'none'
      }}
    />
  );

  const scrollToSection = (sectionId:any) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
 const [profileData, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/resume.json') // no need for relative paths, just start from public root
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(json => setData(json))
      .catch(error => console.error('Error loading JSON:', error));
  }, []);

  return (
   profileData&& <div className="min-h-screen bg-black text-white overflow-hidden relative">
       
      <style>{`
        @keyframes scale-in {
      0% {
        transform: scaleX(0);
      }
      100% {
        transform: scaleX(1);
      }
    }
    
    .animate-scale-in {
      animation: scale-in 1.5s ease-out forwards;
      animation-delay: 0.5s;
    }
    
    .text-hologram {
      background: linear-gradient(45deg, #3b82f6, #06b6d4, #60a5fa, #3b82f6);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: hologram 3s ease-in-out infinite;
    }
    
    @keyframes hologram {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-30px) translateX(15px) rotate(90deg); }
          50% { transform: translateY(-10px) translateX(-20px) rotate(180deg); }
          75% { transform: translateY(15px) translateX(10px) rotate(270deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; filter: blur(20px); }
          50% { opacity: 0.3; filter: blur(10px); }
        }
        
        @keyframes glow {
          0%, 100% { filter: brightness(1) saturate(1) hue-rotate(0deg); }
          33% { filter: brightness(1.3) saturate(1.5) hue-rotate(120deg); }
          66% { filter: brightness(1.1) saturate(1.3) hue-rotate(240deg); }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .cyber-grid {
          background-image: 
            linear-gradient(rgba(59, 130, 246, 0.08) 2px, transparent 2px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.08) 2px, transparent 2px),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
          background-size: 60px 60px, 60px 60px, 30px 30px;
          animation: gridMove 20s linear infinite;
        }
        
        @keyframes gridMove {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 60px 60px, 60px 60px, 30px 30px; }
        }
        
        
        .text-neon {
          text-shadow: 
            0 0 5px currentColor,
            0 0 10px currentColor,
            0 0 15px currentColor,
            0 0 20px currentColor;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
        }
        
        .typewriter::after {
          content: '|';
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <ParticleField />
      
      <FloatingOrb className="w-96 h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 -top-64 -left-64" delay={0} parallax />
      <FloatingOrb className="w-80 h-80 lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-blue-500 to-cyan-500 opacity-15 top-1/4 -right-48" delay={2} parallax />
      <FloatingOrb className="w-72 h-72 lg:w-[350px] lg:h-[350px] bg-gradient-to-r from-green-500 to-teal-500 opacity-10 bottom-32 left-1/3" delay={4} parallax />
      <FloatingOrb className="w-64 h-64 lg:w-[300px] lg:h-[300px] bg-gradient-to-r from-yellow-500 to-orange-500 opacity-12 top-2/3 right-1/4" delay={1} parallax />
      
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-screen transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(6, 182, 212, 0.6) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(1px)'
        }}
      />
      
      <div 
        className="fixed w-12 h-12 pointer-events-none z-40 mix-blend-screen transition-all duration-300 ease-out opacity-30"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(2px)'
        }}
      />

      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="glass-card border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">

            <div className="flex justify-between items-center">
              <div className="text-xl sm:text-2xl font-black cursor-pointer" onClick={() => scrollToSection('home')}>
                <span className="text-hologram">DS</span>
                <span className="text-white/60">.AI</span>
                <div className="w-6 h-0.5 sm:w-8 sm:h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mt-1"></div>
              </div>
              <div className="hidden md:flex space-x-8 text-sm">
                {[
                  { name: 'Home', id: 'home' },
                  { name: 'About', id: 'about' },
                  { name: 'Skills', id: 'skills' },
                  { name: 'Projects', id: 'projects' },
                  { name: 'Experience', id: 'experience' },
                  { name: 'Contact', id: 'contact' }
                ].map((item, i) => (
                  <button key={item.name} 
                     onClick={() => scrollToSection(item.id)}
                     className={`hover:text-purple-400 transition-all duration-500 relative group ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                     style={{ 
                       transitionDelay: `${i * 100}ms`,
                       transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)'
                     }}>
                    {item.name}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300"></div>
                  </button>
                ))}
              </div>
              <button onClick={toggleMobileMenu} className="md:hidden text-white relative z-50 p-2">
                <div className="w-6 h-5 flex flex-col justify-center items-center">
                  <div className={`w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`}></div>
                  <div className={`w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                  <div className={`w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-1.5'}`}></div>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden glass-card border-t border-white/10 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-120 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-6 space-y-4">
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Skills', id: 'skills' },
              { name: 'Projects', id: 'projects' },
              { name: 'Experience', id: 'experience' },
              { name: 'Contact', id: 'contact' }
            ].map((item, i) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-4 py-3 glass-card rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 text-white font-semibold"
                style={{
                  animation: isMobileMenuOpen ? `slideInLeft 0.3s ease-out ${i * 0.05}s both` : 'none'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={toggleMobileMenu}
          style={{ top: '80px' }}
        ></div>
      )}

      <section id="home" className="min-h-screen flex items-center justify-center relative cyber-grid">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 relative z-10">
          
          <div className={`transition-all duration-1500 mt-16 lg:pt-8 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-200 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-5 sm:py-2.5 glass-card rounded-full text-xs mb-6 sm:mb-10 hover-lift transition-all duration-300">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <Sparkles className="w-3 h-3 text-blue-400" />
            <span>{profileData?.personalInfo?.tagline}</span>
              <div className="w-8 h-0.5 sm:w-14 sm:h-0.5 bg-gradient-to-r from-green-400 to-blue-400"></div>
            </div>
          </div>
          
        <div className="space-y-2 md:space-y-4">
          <div className="relative overflow-hidden">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-none">
              <div className="relative inline-block">
                <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                  {profileData?.personalInfo?.name}
                </span>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-sky-400/30 bg-clip-text text-transparent blur-sm">
                  {profileData?.personalInfo?.name}
                </div>
                {/* Modern accent line */}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-400 rounded-full transform origin-left scale-x-0 animate-scale-in"></div>
              </div>
            </h1>
            
            <h2 className="text-base sm:text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.2em] text-white/70 mt-3 sm:mt-5">
              {profileData?.personalInfo?.lastName}
            </h2>
          </div>
        </div>
          
          <div className={`transition-all duration-2000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="text-base sm:text-xl md:text-3xl text-white/90 mb-8 sm:mb-12 h-10 sm:h-14 flex items-center justify-center">
              <span className={`typewriter ${isTyping ? '' : 'text-hologram'} font-semibold`}>
                {displayText}
              </span>
            </div>
            
            <div className="text-sm sm:text-base md:text-lg text-white/70 mb-10 sm:mb-14 max-w-3xl mx-auto leading-relaxed px-4">
              {profileData?.personalInfo?.description}
              <br className="hidden md:block" />
              <span className="text-blue-400 font-semibold">{profileData?.personalInfo?.subtitle}</span>
            </div>
          </div>

          <div className={`flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center mb-10 sm:mb-16 transition-all duration-2000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <button onClick={() => scrollToSection('projects')} className="group relative px-4 py-2 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-xl font-bold text-sm sm:text-base hover:scale-105 transition-all duration-300 transform shadow-2xl hover:shadow-blue-500/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                Explore AI Projects
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
            <a href={profileData?.personalInfo?.resumedownload} download className="group px-4 py-2 sm:px-8 sm:py-4 glass-card rounded-xl font-bold text-sm sm:text-base hover:bg-white/15 transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-purple-400/50 relative overflow-hidden inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                Download Resume
              </span>
            </a>
          </div>

          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 max-w-2xl mx-auto mb-12 sm:mb-20 transition-all duration-2000 delay-1200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {profileData?.stats?.map((stat: any, i: number)=> {
              const IconComponent = iconMap[stat.icon] || Brain;
              return (
                <div key={i} className="text-center glass-card p-3 sm:p-6 rounded-xl sm:rounded-2xl hover-lift transition-all duration-300 group">
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl sm:text-3xl font-black text-hologram mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
                </div>
              );
            })}
          </div>
{/* 
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center gap-2 animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
              <div className="text-xs text-white/60 font-semibold tracking-wider">SCROLL TO EXPLORE</div>
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              <div className="w-0.5 h-6 sm:h-8 bg-gradient-to-b from-purple-400 to-transparent"></div>
            </div>
          </div> */}
        </div>
      </section>

      <section id="about" className="py-12 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black mb-5 sm:mb-6">
                <span className="text-hologram">{profileData.about.title}</span>
              </h2>
              <div className="space-y-3 sm:space-y-5 text-sm sm:text-base text-white/80 leading-relaxed">
                <p>
                  I'm a passionate <span className="text-blue-400 font-semibold">AI Engineer</span> and 
                  <span className="text-blue-400 font-semibold"> Full Stack Developer</span> with over 5 years of experience 
                  building intelligent solutions that make a real impact.
                </p>
                <p>
                  My journey spans from developing cutting-edge machine learning models to crafting beautiful, 
                  responsive web applications. I specialize in transforming complex AI concepts into 
                  user-friendly products that solve real-world problems.
                </p>
                <p>
                  Currently based in <span className="text-blue-400 font-semibold">Dublin, Ireland</span>, 
                  I work with global clients to bring their AI visions to life.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mt-6 sm:mt-10">
                <div className="glass-card p-4 sm:p-5 rounded-xl">
                  <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 mb-2" />
                  <div className="text-xs sm:text-sm text-white/60">Location</div>
                  <div className="font-semibold text-sm">Dublin, Ireland</div>
                </div>
                <div className="glass-card p-4 sm:p-5 rounded-xl">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-blue-400 mb-2" />
                  <div className="text-xs sm:text-sm text-white/60">Clients Served</div>
                  <div className="font-semibold text-sm">{profileData.personalInfo.clientsServed}</div>
                </div>
                <div className="glass-card p-4 sm:p-5 rounded-xl">
                  <Award className="w-6 h-6 sm:w-7 sm:h-7 text-green-400 mb-2" />
                  <div className="text-xs sm:text-sm text-white/60">Visa Status</div>
                  <div className="font-semibold text-sm">{profileData.personalInfo.visaStatus}</div>
                </div>
              </div>
            </div>
            
            <div className="relative mt-6 lg:mt-0">
              <div className="glass-card p-5 sm:p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-sky-400/10"></div>
                <div className="relative z-10">
                  <div className="text-center mb-5 sm:mb-6">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mx-auto mb-3 sm:mb-5 flex items-center justify-center text-3xl sm:text-5xl">
                      🧠
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-hologram mb-2">AI Innovation Expert</h3>
                    <p className="text-white/70 text-xs sm:text-sm">Turning complex algorithms into simple solutions</p>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {profileData.about.highlights.map((skill:any, i:any) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 glass-card rounded-lg">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/90 text-xs sm:text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-5">
              <span className="text-hologram">Education</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/70 max-w-3xl mx-auto">
              Academic foundation in Computer Science and Artificial Intelligence
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-600 transform sm:-translate-x-1/2"></div>
            
            <div className="space-y-8 sm:space-y-12">
              {profileData?.education?.map((edu: any, index: number) => (
                <div key={index} className={`relative flex gap-6 sm:gap-8 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full transform sm:-translate-x-1/2 ring-4 ring-black z-10"></div>
                  
                  {/* Content card */}
                  <div className={`flex-1 ml-12 sm:ml-0 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left'}`}>
                    <div className="glass-card p-5 sm:p-7 rounded-2xl hover-lift transition-all duration-500 border-2 border-transparent hover:border-blue-500/30 group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      
                      <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full text-xs font-bold mb-3">
                          {edu.graduated}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-hologram mb-2">
                          {edu.degree}
                        </h3>
                        <p className="text-white/80 font-semibold mb-2 text-sm sm:text-base">
                          {edu.school}
                        </p>
                        <p className="text-white/60 text-xs sm:text-sm">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-12 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-5">
              <span className="text-hologram">Core Expertise</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/70 max-w-3xl mx-auto">
              Mastering the art of AI and web development with cutting-edge technologies and frameworks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {profileData?.skills?.map((skillCategory:any, index:any) => {
              const IconComponent = iconMap[skillCategory.icon] || Code;
              return (
                <div key={index} className="glass-card rounded-2xl p-5 sm:p-7 hover-lift transition-all duration-500 border-2 border-transparent hover:border-purple-500/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${skillCategory.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {skillCategory.category}
                      </h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {skillCategory.skills.map((skill: string, idx: number) => (
                        <span 
                          key={idx} 
                          className={`px-3 py-1.5 text-xs sm:text-sm rounded-lg glass-card border bg-gradient-to-r ${skillCategory.color} bg-opacity-10 hover:bg-white/10 transition-all duration-300 cursor-default hover:scale-105`}
                          style={{
                            borderColor: 'rgba(139, 92, 246, 0.3)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
<section id="projects" className="py-12 md:py-24 px-4 md:px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-5">
          <span className="text-hologram">Featured AI Projects</span>
        </h2>
        <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto px-2">
          Showcasing innovative AI solutions that are transforming industries and solving real-world challenges
        </p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6 md:gap-10">
        {profileData?.projects?.map((project:any, index:any) => (
          <div key={index} className="group relative">
            <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden hover-lift transition-all duration-500 border-2 border-transparent hover:border-purple-500/30 h-full">
              <div className="flex flex-col h-full">
                
                {/* Visual Section */}
                {/* <div className="relative overflow-hidden h-32 sm:h-56">
                  <div className={`h-full bg-gradient-to-br ${project.gradient} relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <div className="text-4xl sm:text-6xl opacity-80 group-hover:rotate-12 transition-transform duration-500">
                      {project.icon}
                    </div>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                </div> */}
                
                {/* Content Section */}
                <div className="p-3 sm:p-8 flex flex-col flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-4">
                    <span className="text-2xl sm:text-3xl">{project.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1 sm:mb-2">
                        <h3 className="text-xl sm:text-2xl font-black group-hover:text-hologram transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <div className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-black w-fit">
                            FEATURED
                          </div>
                        )}
                      </div>
                      <p className="text-purple-400 font-semibold text-sm">{project.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-base flex-1 hidden md:block">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="hidden md:flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech:any, i:any) => (
                      <span key={i} className="px-3 py-1.5 glass-card rounded-lg text-xs border border-purple-500/30 hover:border-purple-400 transition-colors duration-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Stats */}
                  <div className="hidden md:grid grid-cols-3 gap-2 mb-6">
                    {Object.entries(project.stats).map(([key, value], i) => (
                      <div key={i} className="text-center glass-card p-2 md:p-3 rounded-lg">
              <div className="text-sm md:text-base font-bold text-hologram">{String(value)}</div>

                        <div className="text-xs text-white/60 capitalize leading-tight">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <a href={project.url} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-3 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 font-bold text-xs sm:text-sm shadow-2xl hover:shadow-purple-500/50 w-full justify-center mt-auto">
                    <span><span className="md:hidden">View</span><span className="hidden md:inline">View Live Project</span></span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View More Projects Button */}
      <div className="text-center mt-12 md:mt-16 px-2">
        <a href="https://github.com/ai-engineer-devansh-singh?tab=repositories" target="_blank" rel="noopener noreferrer" className="group px-6 md:px-10 py-4 md:py-5 glass-card rounded-xl md:rounded-2xl font-bold text-sm md:text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 border-2 border-purple-500/30 hover:border-purple-400 w-full sm:w-auto inline-block">
          <span className="flex items-center justify-center gap-2 md:gap-3">
            <Github className="w-4 h-4 md:w-5 md:h-5" />
            <span className="truncate">View All Projects on GitHub</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
          </span>
        </a>
      </div>
    </div>
  </section>

      {/* New Experience Section */}
    <section id="experience" className="py-12 md:py-24 px-4 md:px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-5">
          <span className="text-hologram">Professional Journey</span>
        </h2>
        <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto px-4">
          A timeline of innovation, growth, and impactful contributions to the AI and tech industry
        </p>
      </div>
      
      <div className="relative">
        {/* Timeline Line - Desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 rounded-full"></div>
        
        {/* Timeline Line - Mobile */}
        <div className="md:hidden absolute left-6 top-0 w-1 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-pink-500 rounded-full"></div>
        
        <div className="space-y-8 md:space-y-16">
          {profileData?.experience.map((exp:any, index:any) => (
            <div key={index} className={`flex items-start md:items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Mobile Layout - Always left aligned */}
              <div className="md:hidden flex items-start w-full">
                {/* Timeline Node - Mobile */}
                <div className="relative z-10 mr-6 mt-2">
                  <div className="w-8 h-8 bg-gradient-to-br ml-2 from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-black">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Content - Mobile */}
                <div className="flex-1">
                  <div className="glass-card p-6 rounded-2xl hover-lift transition-all duration-500">
                    <h3 className="text-xl font-bold mb-2 text-hologram">{exp.role}</h3>
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">{exp.company}</h4>
                    <p className="text-white/60 mb-4 text-sm">{exp.duration}</p>
                    <p className="text-white/80 mb-4 leading-relaxed text-sm">{exp.description}</p>
                    
                    <div className="space-y-2">
                      {exp.achievements.map((achievement:any, i:any) => (
                        <div key={i} className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-white/80">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className="glass-card p-8 rounded-3xl hover-lift transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-2 text-hologram">{exp.role}</h3>
                  <h4 className="text-xl font-semibold text-purple-400 mb-3">{exp.company}</h4>
                  <p className="text-white/60 mb-4">{exp.duration}</p>
                  <p className="text-white/80 mb-6 leading-relaxed">{exp.description}</p>
                  
                  <div className={`space-y-2 ${index % 2 === 0 ? 'flex flex-col items-end' : ''}`}>
                    {exp.achievements.map((achievement:any, i:any) => (
                      <div key={i} className={`flex items-center gap-2 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white/80">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Timeline Node - Desktop */}
              <div className="hidden md:block relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center border-4 border-black">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="hidden md:block w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-12 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-5">
              <span className="text-hologram">Achievements & Contributions</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/70 max-w-3xl mx-auto">
              Milestones in my journey as a developer and contributor to the tech community
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {profileData?.achievements?.map((achievement: any, index: number) => {
              const IconComponent = iconMap[achievement.icon] || Star;
              return (
                <div key={index} className="glass-card p-6 sm:p-8 rounded-2xl hover-lift transition-all duration-500 border-2 border-transparent hover:border-purple-500/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${achievement.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-hologram transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LinkedIn Recommendations Section */}
      <section id="recommendations" className="py-12 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black mb-4 sm:mb-5">
              <span className="text-hologram">LinkedIn Recommendations</span>
            </h2>
            <p className="text-sm sm:text-lg text-white/70 max-w-3xl mx-auto">
              What colleagues and clients say about working with me
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-10">
            {profileData?.recommendations?.map((rec: any, index: number) => (
              <div key={index} className="glass-card p-4 sm:p-5 rounded-xl hover-lift transition-all duration-500 border-2 border-transparent hover:border-blue-500/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <Quote className="w-6 h-6 text-blue-400 mb-3 opacity-50" />
                  
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-6 group-hover:line-clamp-none transition-all duration-300">
                    "{rec.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                      {rec.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-xs sm:text-sm">{rec.name}</h4>
                      <p className="text-white/60 text-[10px] sm:text-xs">{rec.title}</p>
                      <p className="text-white/50 text-[10px]">{rec.company} • {rec.date}</p>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-[10px] sm:text-xs text-blue-400">
                    {rec.relationship}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center px-4">
            <a 
              href="https://linkedin.com/in/iamdevanshsingh/details/recommendations/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 md:gap-3 px-4 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg md:rounded-xl hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 font-semibold md:font-bold text-sm md:text-base shadow-2xl hover:shadow-blue-500/50 w-full sm:w-auto max-w-full"
            >
              <Linkedin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="truncate">View All Recommendations on LinkedIn</span>
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
     <section id="contact" className="py-12 md:py-24 px-4 md:px-6 relative">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-black mb-4 md:mb-5">
          <span className="text-hologram">Let's Build the Future Together</span>
        </h2>
        <p className="text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed px-2">
          Ready to transform your ideas into intelligent solutions? Let's connect and create something extraordinary that will shape tomorrow's world.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start lg:items-center">
        <div className="space-y-6 md:space-y-8">
          <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl hover-lift transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-hologram">Get in Touch</h3>
            <div className="space-y-4 md:space-y-6">
              <a href={`mailto:${profileData?.personalInfo?.email}`} 
                 className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 glass-card rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm md:text-base">Email</div>
                  <div className="text-white/70 text-xs md:text-sm truncate">{profileData?.personalInfo?.email}</div>
                </div>
              </a>
              
              <a href={`tel:${profileData?.personalInfo?.phone?.replace(/\s/g, '')}`} 
                 className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 glass-card rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">Phone</div>
                  <div className="text-white/70 text-xs md:text-sm">{profileData?.personalInfo?.phone}</div>
                </div>
              </a>
              
              <a href={`https://wa.me/${profileData?.personalInfo?.phone?.replace(/[^0-9]/g, '')}?text=Hi%20Devansh`} 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="group flex items-center gap-3 md:gap-4 p-3 md:p-4 glass-card rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg md:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm md:text-base">WhatsApp</div>
                  <div className="text-white/70 text-xs md:text-sm truncate">Message me instantly</div>
                </div>
              </a>
              
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 glass-card rounded-lg md:rounded-xl">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg md:rounded-xl flex items-center justify-center">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm md:text-base">Location</div>
                  <div className="text-white/70 text-xs md:text-sm">Dublin, Ireland</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Social Links */}
          <div className="flex gap-3 md:gap-4">
            <a href={profileData?.socialLinks?.github} target="_blank" rel="noopener noreferrer"
               className="group flex-1 flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 glass-card rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <Github className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold text-sm md:text-base">GitHub</span>
            </a>
            <a href={profileData?.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer"
               className="group flex-1 flex items-center justify-center gap-2 md:gap-3 p-3 md:p-4 glass-card rounded-lg md:rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <Linkedin className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold text-sm md:text-base">LinkedIn</span>
            </a>
          </div>
        </div>
        
        {/* CTA Card */}
        <div className="glass-card p-6 md:p-10 rounded-2xl md:rounded-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10"></div>
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 md:mb-8 flex items-center justify-center text-2xl md:text-4xl">
              🚀
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 text-hologram">Ready to Start?</h3>
            <p className="text-white/70 mb-6 md:mb-8 leading-relaxed text-sm md:text-base px-2">
              Whether it's an AI project, web development, or consultation, 
              I'm here to help bring your vision to life with cutting-edge technology.
            </p>
            
            <a href={`mailto:${profileData?.personalInfo?.email}`} 
               className="inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl md:rounded-2xl hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 font-bold text-base md:text-lg shadow-2xl hover:shadow-purple-500/50">
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            
            <div className="mt-4 md:mt-6 text-xs md:text-sm text-white/60">
              Response within 24 hours ⚡
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Enhanced Footer */}
      <footer className="py-12 px-6 border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-black mb-2">
                <span className="text-hologram">{profileData.footer.brandMain}</span>
                <span className="text-white/60">{profileData.footer.brandSub}</span>
              </div>
              <p className="text-white/60 text-sm">
                {profileData.footer.description}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-white/60 text-sm mb-2">
                          {profileData.footer.copyright}

              </p>
              <p className="text-white/40 text-xs">
                                         {profileData.footer.buildNote}

              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/60">{profileData.footer.status}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;