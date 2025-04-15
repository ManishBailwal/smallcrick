import { Github, Mail, Twitter, Instagram } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#002a3a] to-[#001b29] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Section 1 - Logo & Intro */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Image src="/assets/logo.jpeg" alt="SmallCrick Logo" width={90} height={90} />
            
          </div>
          <p className="text-sm text-gray-300">
            SmallCrick helps cricket enthusiasts predict match winners with the power of AI.
            Dive into match stats, historical data, and more.
          </p>
        </div>

        {/* Section 2 - Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold text-[#F77F00] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">🏠 Home</Link>
            </li>
            <li>
              <Link href="/prediction" className="hover:text-yellow-400 transition">🎯 Predictor</Link>
            </li>
            <li>
              <Link href="/allmatches" className="hover:text-yellow-400 transition">📅 Upcoming Matches</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition">ℹ️ About Us</Link>
            </li>
            
          </ul>
        </div>

        {/* Section 3 - Socials & Contact */}
        <div>
          <h3 className="text-xl font-semibold text-[#F77F00] mb-4">Connect With Us</h3>
          <p className="text-sm text-gray-300 mb-3">support@smallcrick.com</p>
          <div className="flex space-x-4">
            <a href="mailto:support@smallcrick.com" className="hover:text-yellow-400 transition">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://github.com/your-github" target="_blank" className="hover:text-yellow-400 transition">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/your-twitter" target="_blank" className="hover:text-yellow-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/your-insta" target="_blank" className="hover:text-yellow-400 transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-xs text-gray-500 mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} SmallCrick. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
