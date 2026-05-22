import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingProps {
  isLoading: boolean;
}

export function Loading({ isLoading }: LoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isLoading) {
      // 显示加载屏幕
      gsap.to(container, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });

      // 动画加载条
      gsap.to(progressBarRef.current, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
      });
    } else {
      // 隐藏加载屏幕
      gsap.to(container, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
      });

      gsap.to(progressBarRef.current, {
        width: '100%',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isLoading]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[999] flex flex-col items-center justify-center opacity-100 pointer-events-auto transition-opacity"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo animation */}
        <div className="relative">
          <svg
            viewBox="0 0 44 26"
            width={60}
            height={36}
            fill="none"
            className="animate-pulse"
          >
            <rect
              x="0"
              y="3"
              width="14"
              height="20"
              rx="3"
              fill="white"
              className="origin-center"
              style={{
                animation: 'float 2s ease-in-out infinite',
              }}
            />
            <rect
              x="16"
              y="3"
              width="12"
              height="20"
              rx="3"
              fill="white"
              className="origin-center"
              style={{
                animation: 'float 2s ease-in-out infinite 0.2s',
              }}
            />
            <rect
              x="30"
              y="3"
              width="14"
              height="20"
              rx="3"
              fill="white"
              className="origin-center"
              style={{
                animation: 'float 2s ease-in-out infinite 0.4s',
              }}
            />
          </svg>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-white/60 text-sm font-light tracking-widest">
            加载中
            <span
              className="inline-block w-4 text-left"
              style={{
                animation: 'dots 1.5s steps(4, end) infinite',
              }}
            >
              .
            </span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden mt-4">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-white/0 via-white to-white/0 rounded-full"
            style={{
              width: '0%',
              boxShadow: '0 0 20px rgba(255,255,255,0.5)',
            }}
          />
        </div>

        {/* Motivational text */}
        <p className="text-white/40 text-xs font-light mt-8 max-w-xs text-center leading-relaxed">
          像溪流学习吧，终将奔赴属于自己的海洋
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-8px);
            opacity: 0.6;
          }
        }

        @keyframes dots {
          0%, 20% {
            content: '';
          }
          40% {
            content: '.';
          }
          60% {
            content: '..';
          }
          80%, 100% {
            content: '...';
          }
        }
      `}</style>
    </div>
  );
}
