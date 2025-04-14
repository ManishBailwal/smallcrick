'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user role to Firestore (only as user)
      await setDoc(doc(db, 'users', user.uid), {
        email,
        role: 'user',
      });

      router.push('/userDashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#012a3a] via-[#001f2e] to-[#00141b] border border-[#00405e] p-8 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-amber-300 mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-amber-100">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 bg-[#001b29] border border-[#00405e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-100">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 bg-[#001b29] border border-[#00405e] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full bg-amber-500 hover:bg-amber-600 text-[#00141b] font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Back to Login Link */}
        <p className="text-sm text-center text-gray-300 mt-4">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-amber-400 hover:text-amber-300 font-medium transition duration-150"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}