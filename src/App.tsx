import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = ['关于我', '爱好', '工作', '展望'];
const VIDEO_SRC = '/hero-video.mp4';
const LANDING_BG_VIDEO = '/landing-bg.mp4';

const FEATURES = [
  {
    title: 'AI基础掌握',
    desc: '深入学习人工智能理论与应用',
  },
  {
    title: '训练师认证',
    desc: '成为专业的AI训练师和提示词工程师',
  },
  {
    title: '实战应用',
    desc: '将AI技术应用于实际项目和场景',
  },
  {
    title: '行业前沿',
    desc: '紧跟AI发展趋势，不断创新进步',
  },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 44 26" width={44} height={26} fill="none">
      <rect x="0" y="3" width="14" height="20" rx="3" fill="white" />
      <rect x="16" y="3" width="12" height="20" rx="3" fill="white" />
      <rect x="30" y="3" width="14" height="20" rx="3" fill="white" />
    </svg>
  );
}

function LandingVideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full pointer-events-none object-cover"
      style={{
        zIndex: 0,
      }}
    >
      <source src={LANDING_BG_VIDEO} type="video/mp4" />
    </video>
  );
}

function ParticleBackground({ heroHeight }: { heroHeight: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Array<{x: number; y: number; radius: number; opacity: number; vx: number; vy: number}>>([]);
  const offsetRef = useRef(heroHeight || window.innerHeight);

  useEffect(() => {
    if (heroHeight > 0) {
      offsetRef.current = heroHeight;
    }
  }, [heroHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();

    // Initialize particles
    const particleCount = 80;
    const particles: Array<{x: number; y: number; radius: number; opacity: number; vx: number; vy: number}> = [];
    const offset = offsetRef.current;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: offset + Math.random() * (canvas.height - offset),
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 1 + 0.5,
      });
    }
    particlesRef.current = particles;

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const offset = offsetRef.current;

      particles.forEach((particle) => {
        particle.y += particle.vy;
        particle.x += particle.vx;

        // Wrap around from bottom to top
        if (particle.y > canvas.height) {
          particle.y = offset - 10;
          particle.x = Math.random() * canvas.width;
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;

        // Draw particles
        ctx.fillStyle = `rgba(100, 180, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
}

function FeatureCard({ feature, index }: { feature: typeof FEATURES[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const positions = [
    { x: -120, y: 0 },
    { x: -40, y: 100 },
    { x: 80, y: 100 },
    { x: 160, y: 0 },
  ];

  const pos = positions[index];

  return (
    <div
      className="absolute transition-all duration-300"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) ${isHovered ? 'translateY(-20px)' : ''}`,
        zIndex: isHovered ? 40 : 20 + index,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="liquid-glass w-48 h-48 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-[0_0_32px_4px_rgba(255,255,255,0.15)]">
        <h3 className="text-white font-body font-medium mb-3 text-base">{feature.title}</h3>
        <p className="text-white/60 font-body font-light text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const videoBgRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(heroRef.current.offsetHeight);
      const handleResize = () => {
        setHeroHeight(heroRef.current?.offsetHeight || 0);
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);


  // 首屏缩小滚动效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeightValue = heroRef.current?.offsetHeight || window.innerHeight;

      // 计算滚动进度 (0 到 1)
      const progress = Math.min(scrollY / (heroHeightValue * 0.5), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroHeight]);

  return (
    <div className="bg-black text-white font-body overflow-x-hidden relative">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col" style={{ cursor: 'default' }}>
        {/* Video background layer - Hero only */}
        <div
          ref={videoBgRef}
          className="absolute top-0 left-0 w-full h-full z-0 scale-[1.08] origin-center"
        >
          <video
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hero Video Overlay - scales down on scroll */}
        <div
          className="absolute top-0 left-0 w-full h-full z-[35] pointer-events-none"
          style={{
            transform: `scale(${1 - scrollProgress * 0.5})`,
            opacity: 1 - scrollProgress * 0.7,
            transformOrigin: 'center top',
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <video
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation */}
        <nav
          className="absolute left-1/2 z-[60] whitespace-nowrap"
          style={{
            top: '20px',
            transform: `translateX(-50%) scale(${1 - scrollProgress * 0.5})`,
            opacity: 1 - scrollProgress * 0.7,
            transformOrigin: 'center top',
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <div className="liquid-glass flex items-center gap-6 rounded px-4 py-2.5">
            <LogoMark />
            <div className="flex items-center gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 ml-4">
              <a
                href="#"
                className="text-sm font-body font-light text-white/70 hover:text-white transition-colors duration-200"
              >
                联系方式
              </a>
            </div>
          </div>
        </nav>

        {/* Hero title */}
        <div
          className="absolute left-0 right-0 z-[40] w-full px-4"
          style={{
            top: '126px',
            transform: `scale(${1 - scrollProgress * 0.5})`,
            opacity: 1 - scrollProgress * 0.7,
            transformOrigin: 'center top',
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <h1
            className={`hero-title select-none text-[clamp(44px,9vw,120px)] ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Welcome My Website
          </h1>
        </div>

        {/* Bottom row */}
        <div
          className={`absolute bottom-12 left-0 right-0 px-10 flex items-end justify-between z-[40] w-full ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: `scale(${1 - scrollProgress * 0.5})`,
            opacity: (mounted ? 1 : 0) * (1 - scrollProgress * 0.7),
            transformOrigin: 'center bottom',
            transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          }}
        >
          <p className="text-sm font-body font-light text-white/75 max-w-[220px] leading-relaxed">
            像溪流学习吧，他从不执着于形状，遇石则绕，遇崖则跃，终将奔赴属于自己的海洋。
          </p>

          <div className="flex items-center gap-3">
            <button className="group relative bg-white text-black text-sm font-body font-medium rounded px-6 py-3 overflow-hidden active:scale-[0.97] transition-all duration-200 shadow-[0_0_0_0_rgba(255,255,255,0)] hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03]">
              <span className="relative z-10">展示</span>
              <span className="absolute inset-0 bg-gradient-to-b from-white to-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>

            <button className="liquid-glass group text-white text-sm font-body font-medium rounded px-6 py-3 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_2px_rgba(255,255,255,0.07)]">
              开始
            </button>
          </div>

          <p className="text-sm font-body font-light text-white/75 text-right max-w-[220px] leading-relaxed">
            人生没有白走的路，每一步都算数，或铺成坦途，或垒成眺望的高台
          </p>
        </div>
      </section>

      {/* Landing Video Background for all content sections */}
      <LandingVideoBackground />

      {/* Particle Background for non-hero sections */}
      <ParticleBackground heroHeight={heroHeight} />

      {/* About & Hobbies Section */}
      <section className="content-section relative py-24 px-10" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Photo Left */}
            <div className="flex justify-center">
              <div className="liquid-glass w-80 h-80 rounded-3xl overflow-hidden flex items-center justify-center">
                <img src="/6cc9ab4c84a286d6631e82f2824be2cf.jpg" alt="头像" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Content Right */}
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6 text-white">关于我</h2>
              <p className="text-white/75 font-body font-light leading-relaxed mb-6">
                大家好，我叫郭子亮，来自河北邯郸。2025年毕业于土木工程专业，希望能跟大家好好相处。
              </p>
              <p className="text-white/75 font-body font-light leading-relaxed mb-8">
                关于爱好方面，我喜欢打游戏，看动漫，和旅游。这些兴趣让我能够开阔视野，丰富生活经验。
              </p>
              <button className="group relative bg-white text-black text-sm font-body font-medium rounded px-8 py-3 overflow-hidden active:scale-[0.97] transition-all duration-200 hover:shadow-[0_0_24px_4px_rgba(255,255,255,0.25)] hover:scale-[1.03]">
                <span className="relative z-10">了解更多</span>
                <span className="absolute inset-0 bg-gradient-to-b from-white to-white/85 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section className="content-section relative py-24 px-10" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Content Left */}
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6 text-white">工作经历</h2>
              <p className="text-white/75 font-body font-light leading-relaxed mb-6">
                我之前任职于中咨工程咨询管理有限公司，参与了北京平谷线（22号线）轨道交通项目的相关工作。这是一条连接北京市区与平谷区的城际铁路项目，工程规模大。
              </p>
              <p className="text-white/75 font-body font-light leading-relaxed mb-8">
                在此项目中，我深入学习了土木工程的实际应用，积累了丰富的项目经验，为未来的职业发展打下了坚实的基础。
              </p>
              <button className="liquid-glass group text-white text-sm font-body font-medium rounded px-8 py-3 active:scale-[0.97] transition-all duration-200 hover:scale-[1.03] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_2px_rgba(255,255,255,0.07)]">
                查看作品
              </button>
            </div>

            {/* Photo Right */}
            <div className="flex justify-center">
              <div className="liquid-glass w-80 h-80 rounded-3xl overflow-hidden flex items-center justify-center">
                <img src="/67f91b5874e059514bfdea554b15a595.jpg" alt="工作亮点" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="content-section relative py-32 px-10" style={{ zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-4 text-white text-center">计划目标</h2>
          <p className="text-white/60 font-body font-light text-center mb-24 max-w-2xl mx-auto">
            不断提升自我，为行业贡献力量
          </p>

          <div className="relative h-96 flex items-center justify-center">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="content-section relative min-h-screen flex flex-col items-center justify-center px-10 py-24" style={{ zIndex: 10 }}>
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-white">联系方式</h2>
          <p className="text-white/75 font-body font-light mb-12 text-lg">
            欢迎通过以下方式与我取得联系，期待与你的交流和合作。
          </p>

          <div className="flex flex-col gap-6 items-center">
            <div className="liquid-glass w-full max-w-2xl rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-8 items-center">
                {/* Contact Info */}
                <div className="text-left">
                  <p className="text-white/70 font-body font-light mb-6 text-lg">
                    联系信息
                  </p>
                  <div className="space-y-6">
                    <div>
                      <p className="text-white/60 font-body font-light text-sm mb-2">微信</p>
                      <p className="text-white text-base font-body font-medium">gzl121000</p>
                    </div>
                    <div>
                      <p className="text-white/60 font-body font-light text-sm mb-2">电话</p>
                      <p className="text-white text-base font-body font-medium">19809744082</p>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <img src="/fe0b8906d00c647c6122f362f87a866c.jpg" alt="微信二维码" className="w-56 h-56 rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <p className="text-white/40 font-body font-light text-sm">
            © 2024 Your Name. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
