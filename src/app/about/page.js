'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Gallary from '../components/Gallary';

const About = () => {
  return (
    <div>
      <Header />

      <main className="bg-[#00141b] text-white font-sans">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-[#00141b] to-[#002b3a] py-20 px-4">
          <div className="max-w-screen-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-[#F77F00] tracking-wider">
              About SmallCrick
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
              Celebrating the passion for cricket, where tradition meets the spirit of the game.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <Gallary />

        {/* Mission Section */}
        <section className="max-w-screen-lg mx-auto py-16 px-4">
          <h2 className="text-3xl font-serif font-semibold mb-6 border-l-4 border-[#F77F00] pl-4">
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            SmallCrick was born out of the love for cricket, aimed to connect passionate players, organizers, and fans.
            Our goal is to bring local cricket communities together, provide fair match opportunities, and showcase hidden talent.
          </p>
        </section>

        {/* Story / Timeline Section */}
        <section className="bg-[#002b3a] py-16 px-4">
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-3xl font-serif font-semibold mb-10 text-center text-[#F77F00]">
              Our Journey
            </h2>
            <div className="space-y-10">
              <div className="border-l-4 border-[#F77F00] pl-6">
                <h3 className="text-xl font-semibold text-white">🏏 Founded in 2024</h3>
                <p className="text-base mt-2 text-gray-300">
                  A small team of cricket lovers started SmallCrick to organize local tournaments.
                </p>
              </div>
              <div className="border-l-4 border-[#F77F00] pl-6">
                <h3 className="text-xl font-semibold text-white">🌍 Connecting Communities</h3>
                <p className="text-base mt-2 text-gray-300">
                  We partnered with organizations across cities to host fair and fun matches.
                </p>
              </div>
              <div className="border-l-4 border-[#F77F00] pl-6">
                <h3 className="text-xl font-semibold text-white">📈 Machine Learning in Cricket</h3>
                <p className="text-base mt-2 text-gray-300">
                  We integrated ML predictions to bring data-driven insights to the game.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-[#F77F00] text-white py-16 text-center px-4">
          <h2 className="text-3xl font-serif font-bold mb-4">Be a Part of the Legacy</h2>
          <p className="mb-6 text-lg">Whether  you&apos;re a player, an organizer, or a fan — SmallCrick is for you.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-[#F77F00] font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-100 transition"
          >
            Join Now
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
