'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebaseConfig';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const role = userSnap.data().role;
        if (role === 'admin') {
          router.push('/adminDashboard');
        } else {
          router.push('/userDashboard');
        }
      } else {
        setError('User role not found. Please contact support.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b] px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-[#012a3a] via-[#001f2e] to-[#00141b] border border-[#00405e] p-8 rounded-2xl shadow-xl text-white">
        <h2 className="text-3xl font-bold text-amber-300 mb-6 text-center">User Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-5">
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
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-sm text-center text-gray-300 mt-4">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="text-amber-400 hover:text-amber-300 font-medium transition duration-150"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
