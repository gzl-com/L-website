'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 背景视频 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/dfonotyfb/video/upload/v1775585556/dds3_1_rqhg7x.mp4"
          type="video/mp4"
        />
      </video>

      {/* 深色渐变叠加层 - 从上到下，增强电影感 */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* 左侧深色渐变叠加 */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/30" />

      {/* 高级内容容器 */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* 顶部装饰线 */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/80" />
            <span className="text-xs sm:text-sm tracking-widest text-white/70 font-light uppercase">
              Premium Experience
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/80" />
          </div>

          {/* 主标题 - 电影化排版 */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-fade-in-up opacity-0"
            style={{
              animation: 'fadeInUp 1s ease-out 0.2s forwards',
              textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
              letterSpacing: '-0.02em'
            }}
          >
            Cinematic<span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
              Excellence
            </span>
          </h1>

          {/* 副标题 */}
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up opacity-0"
            style={{
              animation: 'fadeInUp 1s ease-out 0.4s forwards',
            }}
          >
            Experience premium craftsmanship with our cinematic dark aesthetic. Designed for impact, built for excellence.
          </p>

          {/* CTA 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up opacity-0"
            style={{
              animation: 'fadeInUp 1s ease-out 0.6s forwards',
            }}
          >
            <button className="px-8 sm:px-12 py-3 sm:py-4 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 text-sm sm:text-base">
              Get Started
            </button>
            <button className="px-8 sm:px-12 py-3 sm:py-4 border-2 border-white/60 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* 底部渐变提示 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-24 sm:h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* 滚动提示 - 可选 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/60 text-xs uppercase tracking-widest font-light">Scroll</span>
          <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* 动画样式 */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
    </div>
  );
}
