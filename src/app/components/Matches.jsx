'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs as getDocsQuery,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const fetchMatches = async () => {
      try {
        const matchesCollection = await getDocs(collection(db, 'matches'));
        const matchesList = matchesCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMatches(matchesList);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
    return () => unsubscribe();
  }, []);

  const handleApply = async (matchId) => {
    if (!user) {
      alert('Please login or create an account to apply for matches.');
      router.push('/login');
      return;
    }

    try {
      // Check if user already applied for this match
      const q = query(
        collection(db, 'applications'),
        where('userId', '==', user.uid),
        where('matchId', '==', matchId)
      );
      const existingApps = await getDocsQuery(q);

      if (!existingApps.empty) {
        alert('You have already applied for this match.');
        return;
      }

      // Add application to Firestore
      await addDoc(collection(db, 'applications'), {
        userId: user.uid,
        matchId: matchId,
        status: 'Pending',
        appliedAt: serverTimestamp(),
      });

      alert('Successfully applied for the match!');
    } catch (error) {
      console.error('Error applying for match:', error);
      alert('Something went wrong while applying.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b] py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-amber-300">Upcoming Matches</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {matches.map(match => (
  <div
    key={match.id}
    className="bg-gradient-to-br from-[#012a3a] via-[#001f2e] to-[#00141b] border border-[#00405e] rounded-2xl p-6 
               shadow-xl hover:shadow-amber-500/30 hover:scale-[1.03] transition-all duration-300 ease-in-out 
               transform text-white"
  >
    <h2 className="text-2xl font-bold text-amber-300 mb-2">{match.matchname}</h2>
    <p className="mb-1"><span className="font-semibold text-amber-200">Teams:</span> {match.team1} vs {match.team2}</p>
    <p className="mb-1"><span className="font-semibold text-amber-200">Date:</span> {match.date}</p>
    <p className="mb-1"><span className="font-semibold text-amber-200">Venue:</span> {match.venue}</p>
    <p className="text-sm text-gray-300 mt-2 mb-4">{match.description}</p>
    <button
      onClick={() => handleApply(match.id)}
      className="w-full bg-amber-500 hover:bg-amber-600 text-[#00141b] font-semibold py-2 px-4 rounded-md transition duration-200"
    >
      Apply
    </button>
  </div>
))}
      </div>

      {!user && (
        <div className="mt-12 text-center text-white">
          <p className="mb-4 text-amber-200 text-lg">Want to apply for a match?</p>
          <p>
            <button
              onClick={() => router.push('/login')}
              className="underline text-amber-400 hover:text-amber-500 transition"
            >
              Login
            </button>{' '}
            or{' '}
            <button
              onClick={() => router.push('/signup')}
              className="underline text-amber-400 hover:text-amber-500 transition"
            >
              Create an account
            </button>{' '}
            to get started.
          </p>
        </div>
      )}
    </div>
  );
}
