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
  const [activeTab, setActiveTab] = useState<'story' | 'vault' | 'letter'>('story');
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [secretError, setSecretError] = useState(false);

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
            <button
              onClick={() => setActiveTab('story')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'story' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Our Journey
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'vault' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              References
            </button>
            <button
              onClick={() => setActiveTab('letter')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'letter' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Love Letter
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Router */}
      <main className="relative z-10 pb-28">
        {activeTab === 'story' && (
          <div>
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

            {/* 2. Chronological Story Chapters (Pure Magic Flow & Floating PNGs) */}
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
                      src="/public/assets/aistudio/Gemini_Generated_Image__3_-removebg-preview_48486ef1.png" 
                      alt="image-grade6.png" 
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
                      2019 • Grade 6
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">image-grade6.png</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                    An Unexpected Rivalry
                  </h2>
                  <p className="text-neutral-300 text-lg leading-relaxed font-light">
                    "Back in 2019, during Grade 6, our story began with an unexpected rivalry. You and your friends were the lively group, and to you, I was just part of a boisterous crowd. The school corridors were filled with distant glances and mutual hesitation, and neither of us could have ever imagined what would blossom from such frosty beginnings."
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
                      2020-2021 • COVID Lockdown
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">image-grade8.png</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                    From Distance to Confidantes
                  </h2>
                  <p className="text-neutral-300 text-lg leading-relaxed font-light">
                    "As time progressed, our dynamic naturally shifted into a meaningful friendship. Then came the challenges of the COVID-19 pandemic during 2020 and 2021. Amidst the global isolation, endless phone calls became our sanctuary. The girl who once kept her distance in the hallways became my closest confidante, and our bond grew profoundly stronger through those quiet, uncertain days."
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
                      src="/public/assets/aistudio/Gemini_Generated_Image__2_-removebg-preview_307a7f6b.png" 
                      alt="image-grade8.png" 
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
                      src="/public/assets/aistudio/Gemini_Generated_Image__1_-removebg-preview_aa3bde19.png" 
                      alt="image-grade9.png" 
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
                      2022 • Grade 9
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">image-grade9.png</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                    Persistence & A Soft Smile
                  </h2>
                  <p className="text-neutral-300 text-lg leading-relaxed font-light">
                    "By 2022, as we entered Grade 9, our connection had deepened far beyond friendship. Wanting to take that next step, I asked you out. The first time, you told me you weren't ready; the second time, you said yes, but not yet. Yet, I persisted, and on the third attempt, with a soft smile, you conceded that you could no longer pretend we were anything more than meant to be."
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
                      Present Day • 3 Years Strong
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">image-present.png</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold text-white tracking-wide">
                    Every Chapter Is My Greatest Treasure
                  </h2>
                  <p className="text-neutral-300 text-lg leading-relaxed font-light">
                    "Those hurdles and milestones have brought us gracefully to three wonderful years together. Even though strict school rules keep us apart today on our anniversary, our bond remains unshakable. From a quiet rivalry in Grade 6 to a deep friendship through lockdown, and a love that blossomed in Grade 9, every single chapter of our journey remains my greatest treasure."
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
                      src="/public/assets/aistudio/Gemini_Generated_Image-removebg-preview_8ca95b7e.png" 
                      alt="image-present.png" 
                      className="relative w-full max-h-[340px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </motion.div>
              </div>

            </div>

            {/* 3. Closing Enchanted Note (The Finale) */}
            <section className="max-w-4xl mx-auto px-6 mt-45">
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
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-['Cinzel'] font-bold text-white">Illustration References</h2>
              <p className="text-neutral-400">Exact filenames for swapping custom generated files:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'image-grade6.png', img: '/public/assets/aistudio/Gemini_Generated_Image__3_-removebg-preview_48486ef1.png', prompt: 'An anime-style character design of a young boy and a young girl standing back-to-back in school uniforms, both with crossed arms and cold, stubborn expressions. Clean linework, soft cel-shading, transparent or clean background.' },
                { name: 'image-grade8.png', img: '/public/assets/aistudio/Gemini_Generated_Image__2_-removebg-preview_307a7f6b.png', prompt: 'An anime-style character design of the same boy and girl sitting close side-by-side at a desk, looking at each other with soft, warm smiles and holding open notebooks. Clean linework, gentle lighting, transparent or clean background.' },
                { name: 'image-grade9.png', img: '/public/assets/aistudio/Gemini_Generated_Image__1_-removebg-preview_aa3bde19.png', prompt: 'An anime-style character design of the same boy and girl together. The boy is blushing deeply, looking nervous, and holding up three small cards numbered 1, 2, and 3. The girl beside him is smiling happily with an amused expression. Clean linework, transparent or clean background.' },
                { name: 'image-present.png', img: '/public/assets/aistudio/Gemini_Generated_Image-removebg-preview_8ca95b7e.png', prompt: 'An anime-style character design of the same couple as older teens walking side-by-side, holding hands happily and gazing warmly at each other. Cozy and romantic poses, clean linework, soft shading, transparent or clean background.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-4">
                  <div className="h-48 flex items-center justify-center bg-neutral-950/40 rounded-xl p-2">
                    <img src={item.img} alt={item.name} className="max-h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full">{item.name}</span>
                    <p className="text-xs text-neutral-400 mt-2 font-mono">{item.prompt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'letter' && (
          <div className="max-w-xl mx-auto px-6 py-16 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-['Cinzel'] font-bold text-white">Locked Secret Love Letter</h2>
              <p className="text-neutral-400">Enter the most special four-digit number for Toots.</p>
            </div>

            {!secretUnlocked ? (
              <form onSubmit={handleSecretSubmit} className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-8 space-y-6 text-center">
                <Lock className="w-8 h-8 mx-auto text-rose-400" />
                <p className="text-sm font-medium text-neutral-200">Enter the most special four-digit number for Toots.</p>
                <input
                  type="password"
                  maxLength={4}
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  placeholder="••••"
                  className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-center text-xl tracking-widest"
                />
                {secretError && <p className="text-xs text-rose-400">Incorrect code! Please try again.</p>}
                <button type="submit" className="w-full py-3.5 rounded-xl bg-rose-600 text-white font-medium text-sm hover:bg-rose-500 transition-colors cursor-pointer">Unlock Letter</button>
              </form>
            ) : (
              <div className="bg-neutral-900 border border-rose-500/30 rounded-3xl p-8 space-y-6 font-serif shadow-2xl">
                <div className="text-center pb-4 border-b border-rose-500/20">
                  <Unlock className="w-6 h-6 mx-auto text-rose-400 mb-2" />
                  <h3 className="text-2xl font-['Cinzel'] font-bold text-white">My Eternal Promise</h3>
                </div>
                <p className="text-neutral-200 text-base italic leading-relaxed">
                  "My dearest love, looking back at where we started—two stubborn kids in Grade 6 crossing arms across the hallway—to the endless lockdown phone calls, and finally asking you three times until you said yes... I realize every single moment was leading us right here. Happy 3rd Anniversary!"
                </p>
                <div className="text-right font-['Sacramento'] text-3xl text-rose-400">Forever Yours ❤️</div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-rose-500/10 py-8 text-center text-xs text-neutral-500">
        <p>© 3 Years Strong • Crafted with pure magic & infinite love for our anniversary.</p>
      </footer>
    </div>
  );
}
