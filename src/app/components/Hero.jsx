'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="h-screen bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b] text-white px-6 py-10 flex items-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/pattern.svg')] opacity-5 z-0" />

      <div className="max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between w-full gap-10 z-10">
        
        {/* Text Content */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight mb-4 drop-shadow-md">
            Welcome to <span className="text-[#F77F00]">SmallCrick</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-200">
            A platform where local cricket lives, breathes, and thrives. Join leagues, track matches, and feel the vintage charm of the game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/prediction">
              <span className="bg-[#F77F00] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#f89f35] transition text-center">
                🧠 Make Predictions
              </span>
            </Link>
            <Link href="/allmatches">
              <span className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#003049] transition text-center">
                🏏 Explore Matches
              </span>
            </Link>
          </div>

          {/* Feature Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-300">
            <div>
              <span className="text-2xl font-bold text-[#F77F00]">1.2K+</span>
              <p>Predictions Made</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#F77F00]">300+</span>
              <p>Matches Tracked</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#F77F00]">50+</span>
              <p>Local Teams</p>
            </div>
          </div>
        </motion.div>

        {/* Image / Illustration */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/assets/crick_hero.jpg"
            alt="Cricket Hero"
            width={420}
            height={420}
            className="rounded-lg shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
