'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';

let onAuthStateChangedFunc = null;
let authInstance = null;
let dbInstance = null;

if (typeof window !== 'undefined') {
  const { onAuthStateChanged } = require('firebase/auth');
  const { auth, db } = require('../../lib/firebaseConfig');
  onAuthStateChangedFunc = onAuthStateChanged;
  authInstance = auth;
  dbInstance = db;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (onAuthStateChangedFunc && authInstance) {
      const unsubscribe = onAuthStateChangedFunc(authInstance, async (user) => {
        if (user) {
          setIsLoggedIn(true);
          const userDocRef = doc(dbInstance, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setRole(userDoc.data().role); // 'admin' or 'user'
          }
        } else {
          setIsLoggedIn(false);
          setRole(null);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const dashboardLink = role === 'admin' ? '/adminDashboard' : '/userDashboard';

  return (
    <header className="w-full bg-gradient-to-r from-[#002a3a] to-[#001b29] text-white shadow-md py-4">
      <div className="w-full max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/assets/logo.jpeg"
            alt="SmallCrick Logo"
            className="w-10 h-10 rounded-full shadow-sm"
          />
          <h1 className="text-2xl font-bold tracking-wide font-serif">SmallCrick</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          <Link href="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link href="/allmatches" className="hover:text-yellow-300 transition">Matches</Link>
          <Link href="/prediction" className="hover:text-yellow-300 transition">Predict</Link>
          <Link href="/about" className="hover:text-yellow-300 transition">About</Link>
          {isLoggedIn ? (
            <Link href={dashboardLink} className="hover:text-yellow-300 transition">Dashboard</Link>
          ) : (
            <Link href="/login" className="hover:text-yellow-300 transition">Login</Link>
          )}
        </nav>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-2 px-4">
          <Link href="/" className="block px-4 py-2 rounded hover:bg-blue-800 transition">Home</Link>
          <Link href="/allmatches" className="block px-4 py-2 rounded hover:bg-blue-800 transition">Matches</Link>
          <Link href="/prediction" className="block px-4 py-2 rounded hover:bg-blue-800 transition">Predict</Link>
          <Link href="/about" className="block px-4 py-2 rounded hover:bg-blue-800 transition">About</Link>
          {isLoggedIn ? (
            <Link href={dashboardLink} className="block px-4 py-2 rounded hover:bg-blue-800 transition">Dashboard</Link>
          ) : (
            <Link href="/login" className="block px-4 py-2 rounded hover:bg-blue-800 transition">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
