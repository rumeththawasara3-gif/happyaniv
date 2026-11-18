/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Gift, 
  ChevronDown,
  Lock,
  Unlock
} from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [secretError, setSecretError] = useState(false);

  // Falling hearts background animation overlay
  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement('div');
      heart.className = 'fixed pointer-events-none z-20 text-rose-500/40 select-none animate-fall';
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = `-20px`;
      heart.style.fontSize = `${Math.random() * 18 + 12}px`;
      heart.style.animationDuration = `${Math.random() * 6 + 4}s`;
      heart.style.animationTimingFunction = 'linear';
      heart.innerHTML = '❤️';
      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 10000);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const galleryRef = useRef<HTMLDivElement>(null);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const getNextSaturday8AM = () => {
      const now = new Date();
      const result = new Date(now);
      result.setHours(8, 0, 0, 0);
      const dayOfWeek = now.getDay();
      let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
      if (daysUntilSaturday === 0 && now.getHours() >= 8) {
        daysUntilSaturday = 7;
      }
      result.setDate(now.getDate() + daysUntilSaturday);
      return result.getTime();
    };

    const targetTime = getNextSaturday8AM();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const galleryPhotos = [
    "https://res.cloudinary.com/esbq4ewb/image/upload/f_auto,q_auto/IMG-20231219-WA0008",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972624/IMG-20240327-WA0008.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972625/IMG-20240409-WA0003.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972628/IMG-20240614-WA0022.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972633/WhatsApp_Image_2026-11-18_at_8.34.45_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972628/IMG-20240614-WA0022.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972628/IMG-20240411-WA0017.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972627/IMG-20240411-WA0016.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972628/IMG-20240411-WA0020.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972633/WhatsApp_Image_2026-11-18_at_8.34.45_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972632/WhatsApp_Image_2026-11-18_at_8.34.43_AM_2.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972632/WhatsApp_Image_2026-11-18_at_8.34.44_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972632/WhatsApp_Image_2026-11-18_at_8.34.42_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972632/WhatsApp_Image_2026-11-18_at_8.34.44_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972632/WhatsApp_Image_2026-11-18_at_8.34.43_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972631/WhatsApp_Image_2026-11-18_at_8.34.43_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972631/WhatsApp_Image_2026-11-18_at_8.34.42_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972630/WhatsApp_Image_2026-11-18_at_8.34.40_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972631/WhatsApp_Image_2026-11-18_at_8.34.41_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972631/WhatsApp_Image_2026-11-18_at_8.34.41_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972630/WhatsApp_Image_2026-11-18_at_8.34.38_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972630/WhatsApp_Image_2026-11-18_at_8.34.39_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972630/WhatsApp_Image_2026-11-18_at_8.34.40_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972629/WhatsApp_Image_2026-11-18_at_8.34.30_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972629/WhatsApp_Image_2026-11-18_at_8.34.29_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972630/WhatsApp_Image_2026-11-18_at_8.34.39_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972629/WhatsApp_Image_2026-11-18_at_8.34.38_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972629/WhatsApp_Image_2026-11-18_at_8.34.30_AM_2.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972629/WhatsApp_Image_2026-11-18_at_8.34.38_AM_2.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972629/WhatsApp_Image_2026-11-18_at_8.34.30_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972628/WhatsApp_Image_2026-11-18_at_8.34.29_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972627/WhatsApp_Image_2026-11-18_at_8.34.27_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972627/WhatsApp_Image_2026-11-18_at_8.34.27_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972627/WhatsApp_Image_2026-11-18_at_8.34.17_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972627/WhatsApp_Image_2026-11-18_at_8.34.28_AM.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972626/WhatsApp_Image_2026-11-18_at_8.34.18_AM_2.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972626/WhatsApp_Image_2026-11-18_at_8.34.18_AM_1.jpg",
    "https://res.cloudinary.com/esbq4ewb/image/upload/v1794972624/WhatsApp_Image_2026-11-18_at_8.34.17_AM.jpg"
  ];

  const romanticPhrases = [
    "Late night calls 🌙",
    "First smile ✨",
    "Endless talks 💫",
    "Our favorite spot ☕",
    "Unforgettable 🤍",
    "Pure magic ✨",
    "Counting stars 🌟",
    "Forever us 🥂",
    "Sweet glances 👀",
    "Our little secret 🤫",
    "Stolen moments 💕",
    "Always together 🌹",
    "Laughing aloud 😂",
    "Sweetest comfort 🧸",
    "My safe place 🏡",
    "Magical days 🪄",
    "Hand in hand 🤝",
    "Deepest thoughts 💭",
    "Warmest hugs 🤗",
    "Precious times ⏳",
    "Infinite joy ☀️",
    "Best adventure 🗺️",
    "Dreaming of you 💭",
    "Endless warmth 🔥",
    "Simply perfect 🌸",
    "My favorite person 👑",
    "Treasured smiles 😁",
    "Heartfelt whispers 🍃",
    "Unconditional love 💞",
    "A million memories 🎞️"
  ];

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return;
    let animationFrameId: number;
    let scrollSpeed = 0.7;

    const step = () => {
      if (!isGalleryPaused && container) {
        container.scrollLeft += scrollSpeed;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isGalleryPaused]);

  // Audio ref for ambient magical background music
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isAudioRunningRef = useRef(false);

  const startAmbientMusic = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    isAudioRunningRef.current = !isAudioRunningRef.current;
    setIsPlaying(isAudioRunningRef.current);

    if (isAudioRunningRef.current) {
      playMagicChord(ctx);
    }
  };

  const playMagicChord = (ctx: AudioContext) => {
    if (!isAudioRunningRef.current) return;
    const frequencies = [261.63, 329.63, 392.00, 523.25];
    const now = ctx.currentTime;

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.15);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.012, now + 1.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.15);
      osc.stop(now + 7.5);
    });

    setTimeout(() => {
      if (isAudioRunningRef.current) {
        playMagicChord(ctx);
      }
    }, 6500);
  };

  // Sparkles trail on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.3) return;
      const sparkle = document.createElement('div');
      sparkle.className = 'absolute pointer-events-none w-2 h-2 rounded-full z-50';
      sparkle.style.background = 'radial-gradient(circle, #fff 0%, #f43f5e 50%, transparent 100%)';
      sparkle.style.left = `${e.pageX}px`;
      sparkle.style.top = `${e.pageY}px`;
      sparkle.style.transition = 'all 0.8s ease-out';
      document.body.appendChild(sparkle);

      const tx = (Math.random() - 0.5) * 60;
      const ty = (Math.random() - 0.5) * 60;
      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        sparkle.style.opacity = '0';
      });

      setTimeout(() => sparkle.remove(), 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSecretSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode.trim() === '0407') {
      setSecretUnlocked(true);
      setSecretError(false);
    } else {
      setSecretError(true);
    }
  };

  const handleHugClick = () => {
    window.open("https://ig.me/m/rumeth_thawasara", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#05050a] text-neutral-100 font-sans selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden relative">
      
      {/* Background Breathing Nebula Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-950/30 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-rose-950/30 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute top-[35%] right-[25%] w-[500px] h-[500px] bg-cyan-950/20 rounded-full blur-[140px]" />
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#05050a]/75 border-b border-rose-500/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-500/30 animate-pulse">
            <Heart className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="font-['Cinzel'] tracking-wider font-bold text-lg bg-gradient-to-r from-rose-200 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Three Years Strong
            </span>
            <p className="text-xs text-neutral-400 tracking-wide font-light">Pure Magic Anniversary Experience</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={startAmbientMusic}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
              isPlaying 
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-200 shadow-lg shadow-rose-500/25' 
                : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            {isPlaying ? <Volume2 className="w-4 h-4 animate-bounce text-rose-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{isPlaying ? 'Ambience Playing ✨' : 'Play Enchanted Ambience'}</span>
          </button>

          <nav className="hidden md:flex items-center gap-1 bg-neutral-900/60 p-1 rounded-full border border-neutral-800">
            <a
              href="#chapter-1"
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all text-neutral-400 hover:text-white"
            >
              Our Journey
            </a>
            <a
              href="#love-letter"
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all text-neutral-400 hover:text-white"
            >
              Love Letter
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-28">
        
        {/* 1. Welcome / Hero Screen */}
        <section className="min-h-[92vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-[#05050a] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto space-y-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-widest uppercase shadow-lg shadow-rose-500/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> The Enchanted Portal • Anniversary Edition
            </div>

            <h1 className="text-5xl md:text-8xl font-['Cinzel'] font-bold tracking-tight bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent leading-[1.1] drop-shadow-2xl">
              Three Years Strong <br />
              <span className="font-['Sacramento'] text-6xl md:text-9xl text-rose-400 font-normal tracking-normal capitalize block mt-4 drop-shadow-[0_0_35px_rgba(244,63,94,0.4)]">
                Our Magical Story
              </span>
            </h1>

            <p className="text-neutral-300 text-lg md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              Step through the mist of time, from quiet hallway glances to a love written in the stars.
            </p>

            <div className="pt-6">
              <a
                href="#chapter-1"
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 text-white font-medium text-base tracking-wide shadow-2xl shadow-rose-600/40 hover:shadow-rose-600/70 hover:scale-105 transition-all duration-300 border border-white/20"
              >
                <span>Open Our Story</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto pt-16 border-t border-rose-500/15">
              <div className="text-center">
                <span className="block text-3xl font-['Cinzel'] font-bold text-rose-300">2019</span>
                <span className="text-xs text-neutral-400 font-light">Where it began</span>
              </div>
              <div className="text-center border-x border-rose-500/15">
                <span className="block text-3xl font-['Cinzel'] font-bold text-rose-300">3 Years</span>
                <span className="text-xs text-neutral-400 font-light">Strong & Growing</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-['Cinzel'] font-bold text-rose-300">Forever</span>
                <span className="text-xs text-neutral-400 font-light">Our Destiny</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 2. Chronological Story Chapters (Our Journey) */}
        <div className="max-w-6xl mx-auto px-6 space-y-36 pt-20">

          {/* Chapter 1 */}
          <div id="chapter-1" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 to-cyan-500/20 rounded-full blur-3xl opacity-70" />
                <motion.img 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  src="https://res.cloudinary.com/esbq4ewb/image/upload/v1795029393/Gemini_Generated_Image__3_-removebg-preview.png" 
                  alt="Chapter 1 Illustration" 
                  className="relative w-full max-h-[340px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 bg-[#0f0f19]/60 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl hover:border-rose-500/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-rose-500/15 text-rose-300 text-xs font-semibold tracking-wide border border-rose-500/30">
                  2019
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                An Unexpected Rivalry
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed font-light">
                "Remember back in 2019 when we were in Grade 6? We started out as total rivals. You and your friends were always a lively group, and to you, I was just part of the noisy crowd. We would look at each other from a distance, and neither of us ever thought we would become what we are today."
              </p>
            </motion.div>
          </div>

          {/* Chapter 2 */}
          <div id="chapter-2" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 bg-[#0f0f19]/60 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl hover:border-rose-500/50 transition-all order-2 md:order-1"
            >
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-semibold tracking-wide border border-purple-500/30">
                  2020-2021
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                From Distance to Confidantes
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed font-light">
                "Then we slowly became good friends. Through 2020 and 2021, we stayed in touch with long phone calls. The girl who used to keep her distance in the school hallway became my favorite person to talk to every single day."
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 flex justify-center order-1 md:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-rose-500/20 rounded-full blur-3xl opacity-70" />
                <motion.img 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  src="https://res.cloudinary.com/esbq4ewb/image/upload/v1795029394/Gemini_Generated_Image__2_-removebg-preview.png" 
                  alt="Chapter 2 Illustration" 
                  className="relative w-full max-h-[340px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Chapter 3 */}
          <div id="chapter-3" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/20 to-rose-600/20 rounded-full blur-3xl opacity-70" />
                <motion.img 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                  src="https://res.cloudinary.com/esbq4ewb/image/upload/v1795029394/Gemini_Generated_Image__1_-removebg-preview.png" 
                  alt="Chapter 3 Illustration" 
                  className="relative w-full max-h-[340px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 bg-[#0f0f19]/60 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl hover:border-rose-500/50 transition-all"
            >
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold tracking-wide border border-amber-500/30">
                  2022
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                Persistence & A Soft Smile
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed font-light">
                "By 2022, we were more than just friends. I asked you out. The first time, you said you were not ready. The second time, you said yes, but not yet. But I did not give up—and on the third try, with a sweet smile, you finally said yes."
              </p>
            </motion.div>
          </div>

          {/* Chapter 4 */}
          <div id="chapter-4" className="scroll-mt-32 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7 bg-[#0f0f19]/60 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl hover:border-rose-500/50 transition-all order-2 md:order-1"
            >
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-rose-500/15 text-rose-300 text-xs font-semibold tracking-wide border border-rose-500/30">
                  Present Day
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                Every Chapter Is My Greatest Treasure
              </h2>
              <p className="text-neutral-300 text-lg leading-relaxed font-light">
                "Look at us now, three happy years together! Even if strict school rules keep us apart today on our anniversary, nothing can change our love. From Grade 6 hallway glances to a love that started in Grade 9, every moment with you is my greatest treasure."
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-5 flex justify-center order-1 md:order-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 to-pink-500/20 rounded-full blur-3xl opacity-70" />
                <motion.img 
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
                  src="https://res.cloudinary.com/esbq4ewb/image/upload/v1795029394/Gemini_Generated_Image-removebg-preview.png" 
                  alt="Chapter 4 Illustration" 
                  className="relative w-full max-h-[340px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* Sinhala Poem Section Right After Main Story Text */}
        <div className="max-w-2xl mx-auto px-6 mt-20">
          <div className="poem-section text-center italic p-8 rounded-2xl bg-white/[0.03] border border-pink-300/20 backdrop-blur-md shadow-xl">
            <p className="text-2xl md:text-3xl leading-relaxed text-pink-200 mb-6 font-['Great_Vibes'] tracking-wide">
              නුඹ ලගින් සැමදා<br/>
              ඉන්නටම පැතු,
            </p>
            <p className="text-2xl md:text-3xl leading-relaxed text-pink-200 mb-4 font-['Great_Vibes'] tracking-wide">
              නිවෙමි මා නුඹ ගාව<br/>
              ආදරිය "මෙතු"...
            </p>
            <p className="text-sm md:text-base text-slate-300 tracking-[2px] mt-6 font-['Cinzel']">
              ~ තවසර ~
            </p>
          </div>
        </div>

        {/* Dedicated Horizontal Photo Gallery Section */}
        <section className="max-w-7xl mx-auto px-6 mt-28">
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Our Journey in Memories
            </span>
            <h2 className="text-3xl md:text-5xl font-['Cinzel'] font-bold bg-gradient-to-r from-white via-rose-100 to-rose-300 bg-clip-text text-transparent">
              Moments We Cherish Together
            </h2>
            <p className="text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto">
              Swipe or let the magical auto-scroll guide you through every beautiful snapshot of our story.
            </p>
          </div>

          <div 
            className="relative w-full overflow-hidden py-4"
            onMouseEnter={() => setIsGalleryPaused(true)}
            onMouseLeave={() => setIsGalleryPaused(false)}
            onTouchStart={() => setIsGalleryPaused(true)}
            onTouchEnd={() => setIsGalleryPaused(false)}
          >
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#05050a] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#05050a] to-transparent z-10 pointer-events-none" />

            <div 
              ref={galleryRef}
              className="flex gap-6 overflow-x-auto scrollbar-none px-4 py-2 select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[...galleryPhotos, ...galleryPhotos].map((photo, idx) => {
                const phrase = romanticPhrases[(idx * 7) % romanticPhrases.length];
                return (
                  <div 
                    key={idx} 
                    className="flex-shrink-0 w-72 md:w-80 h-[450px] rounded-3xl overflow-hidden bg-neutral-900/90 border border-rose-500/30 shadow-2xl hover:border-rose-500/60 hover:scale-[1.02] transition-all duration-300 relative group flex flex-col"
                  >
                    <div className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-rose-500/40 text-rose-300 text-xs font-semibold tracking-wider shadow-lg">
                      {phrase}
                    </div>
                    <div className="w-full h-full relative overflow-hidden">
                      <img 
                        src={photo} 
                        alt={phrase} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Locked Secret Love Letter Section (Appearing directly after Our Journey / Story) */}
        <div id="love-letter" className="max-w-xl mx-auto px-6 mt-36 scroll-mt-32">
          <div className="bg-[#0f0f19]/80 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 md:p-12 shadow-2xl">
            {!secretUnlocked ? (
              <form onSubmit={handleSecretSubmit} className="space-y-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-['Cinzel'] font-bold text-white">Locked Secret Love Letter</h3>
                  <p className="text-sm font-medium text-neutral-200">Enter the most special four-digit number for Toots.</p>
                </div>
                <input
                  type="password"
                  maxLength={4}
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white text-center text-2xl tracking-widest focus:outline-none focus:border-rose-500 transition-colors"
                />
                {secretError && <p className="text-xs text-rose-400">Incorrect code! Please try again.</p>}
                <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm shadow-lg hover:scale-[1.02] transition-all cursor-pointer">
                  Unlock Secret Letter
                </button>
              </form>
            ) : (
              <div className="space-y-6 font-serif">
                <div className="text-center pb-4 border-b border-rose-500/20">
                  <Unlock className="w-6 h-6 mx-auto text-rose-400 mb-2" />
                  <h3 className="text-2xl font-['Cinzel'] font-bold text-white">My Eternal Love Letter</h3>
                </div>
                <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-light">
                  ඔයාට මතකද grade 9 වල balcony එකේ ඉඳන් මම මුලින්ම කැමතිද අහපු දවස? හරි ලස්සනයි නේ. තුන්වෙනි පාර නෙ මට කැමති කිව්වේ. කෝම හරි මාව රිජෙක්ට් කරලා රිජෙක්ට් කරලම අන්තිමට හා කිව්ව නේ.
                </p>
                <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-light">
                  කොහොම හරි මෙච්චර දුර ආවනේ. කොච්චර ප්රශ්න ආවත්. හැමදාම මාත් එක්ක එකට හිටියට ඔයාට ගොඩක් thank uuu. මම හැමදාම, හැමදාම කියන්නේ මට පුළුවන් තරම් හැමදාම ඔයාගේ පිටි පස්සේ ඔයාට හයියක් වෙලා ඉන්නවා. ඔයාගේ dreams අනිවාර්යයෙන් ඔයාගේ ඉස්සරහටම ගෙනල්ලා දෙනවා. කොහොමහරි ඒකට ගොඩ යමු.
                </p>
                <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-light">
                  Thank uuu මාත් එක්ක මෙච්චර කාලයක් හිටියට. එහෙම කියන්න මට විශේෂ දෙයක් නම් නැහැ. මම ඔයාට ගොඩක් ආදරෙයි. ඉක්මනට හම්බ වෙමු. ඔයාට දෙන්න දෙයක් මේ හදිස්සියේ ගන්න විදික් නැහැ මට. 19 මට හම්බ වෙන්න බැනේ. ඒකයි මම මේක හදන්නේ.
                </p>
                <p className="text-neutral-200 text-base md:text-lg leading-relaxed font-light">
                  මම මේක හදන්න පටන් ගත්තේ anniversary එකට සති තුනක් තියලා. කමක් නැහැ මහන්සියක් නැහැ. මේ ඔක්කම ඔයාට.. මෙක අව්ල් ද දන්නෑ. ඒත් මේකේ මගේ මහන්සිය ගොඩක් තියෙනවා. මම හිතනවා ඔයා happy වෙයි කියලා මේක බලලා. happy anniversary bbuuuu...
                </p>
                <div className="pt-6 space-y-3 text-center">
                  <div className="inline-block px-4 py-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-lg font-bold tracking-wider animate-pulse shadow-lg shadow-rose-500/20">
                    💖💖💖 Lvuuuuuuu 💖💖💖
                  </div>
                  <div className="inline-block px-4 py-2 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-lg font-bold tracking-wider animate-bounce shadow-lg shadow-pink-500/20">
                    😚😚😚 ummmmmmmmhhhhh 😚😚😚
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Closing Enchanted Note (The Finale) */}
        <section className="max-w-4xl mx-auto px-6 mt-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-[#0f0f19]/70 backdrop-blur-2xl border border-rose-500/30 p-12 md:p-16 text-center shadow-2xl shadow-rose-950/50"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-inner animate-pulse">
                <Heart className="w-10 h-10 fill-rose-400" />
              </div>

              <h3 className="text-4xl md:text-6xl font-['Cinzel'] font-bold text-white tracking-wide">
                Happy 3rd Anniversary
              </h3>

              <p className="text-neutral-200 text-xl leading-relaxed font-light max-w-2xl mx-auto">
                Even though strict rules keep us apart today, no distance or barrier can ever diminish what we share. Thank you for being my rock, my joy, and my greatest adventure. I love you more than words can say.
              </p>

              <div className="pt-6">
                <button
                  onClick={handleHugClick}
                  className="px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white font-medium text-base shadow-xl shadow-rose-500/30 hover:scale-105 transition-all duration-300 cursor-pointer border border-white/20 flex items-center gap-2 mx-auto"
                >
                  <Gift className="w-5 h-5" /> Send Virtual Hug & Kiss 💖
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sweet Countdown Timer Section */}
        <section className="max-w-4xl mx-auto px-6 mt-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-[#0f0f19]/80 backdrop-blur-2xl border border-rose-500/30 p-8 md:p-14 text-center shadow-2xl shadow-rose-950/40"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold tracking-widest uppercase">
                ⏳ Until We Meet Again
              </span>
              <h3 className="text-3xl md:text-5xl font-['Cinzel'] font-bold text-white tracking-wide">
                Counting every second until I see you...
              </h3>
              <p className="text-neutral-300 text-base md:text-lg font-light max-w-xl mx-auto italic">
                "No matter how many days or hours pass, my heart is always counting down the moments until I can hold you in my arms again."
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4">
                <div className="bg-black/50 border border-rose-500/30 rounded-2xl p-4 shadow-inner">
                  <span className="block text-4xl md:text-5xl font-['Cinzel'] font-bold text-rose-300">{timeLeft.days}</span>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1 block">Days</span>
                </div>
                <div className="bg-black/50 border border-rose-500/30 rounded-2xl p-4 shadow-inner">
                  <span className="block text-4xl md:text-5xl font-['Cinzel'] font-bold text-rose-300">{timeLeft.hours}</span>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1 block">Hours</span>
                </div>
                <div className="bg-black/50 border border-rose-500/30 rounded-2xl p-4 shadow-inner">
                  <span className="block text-4xl md:text-5xl font-['Cinzel'] font-bold text-rose-300">{timeLeft.minutes}</span>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1 block">Minutes</span>
                </div>
                <div className="bg-black/50 border border-rose-500/30 rounded-2xl p-4 shadow-inner">
                  <span className="block text-4xl md:text-5xl font-['Cinzel'] font-bold text-rose-300">{timeLeft.seconds}</span>
                  <span className="text-xs text-neutral-400 uppercase tracking-widest mt-1 block">Seconds</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      <footer className="border-t border-rose-500/10 py-8 text-center text-xs text-neutral-500">
        <p>© 3 Years Strong • Crafted with pure magic & infinite love for our anniversary.</p>
      </footer>
    </div>
  );
}
