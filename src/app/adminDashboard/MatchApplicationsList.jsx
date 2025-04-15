'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

export default function MatchApplicationsList({ onSelectMatch }) {
  const [matchesWithCounts, setMatchesWithCounts] = useState([]);

  useEffect(() => {
    fetchApplicationsAndMatches();
  }, []);

  const fetchApplicationsAndMatches = async () => {
    try {
      const matchesSnapshot = await getDocs(collection(db, 'matches'));
      const applicationsSnapshot = await getDocs(collection(db, 'applications'));

      const appCountByMatch = {};
      applicationsSnapshot.forEach((doc) => {
        const matchId = doc.data().matchId;
        if (matchId) {
          appCountByMatch[matchId] = (appCountByMatch[matchId] || 0) + 1;
        }
      });

      const matchesWithAppCounts = matchesSnapshot.docs.map((matchDoc) => ({
        id: matchDoc.id,
        ...matchDoc.data(),
        applicationsCount: appCountByMatch[matchDoc.id] || 0,
      }));

      setMatchesWithCounts(matchesWithAppCounts);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDelete = async (matchId) => {
    const confirmed = confirm('Are you sure you want to delete this match? This cannot be undone.');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'matches', matchId));
      setMatchesWithCounts((prev) => prev.filter((match) => match.id !== matchId));
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  return (
    <div className="mt-10 text-white px-4">
      <h2 className="text-3xl font-bold text-center text-amber-400 mb-10 animate-fade-in">
        🏏 All Matches & Applications
      </h2>

      {matchesWithCounts.length === 0 ? (
        <p className="text-center text-gray-300 animate-fade-in">No matches found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {matchesWithCounts.map((match, index) => (
            <div
              key={match.id}
              className={`bg-gradient-to-br from-[#012a3a] to-[#01475f] p-6 rounded-2xl shadow-lg border border-[#03607c]
              hover:scale-[1.03] hover:shadow-amber-500/30 transition-all duration-300 ease-in-out
              animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              <h3 className="text-2xl font-semibold text-amber-300 mb-3">{match.matchname}</h3>
              <p className="text-gray-200 mb-1">
                <span className="font-semibold text-amber-200">Teams:</span> {match.team1} vs {match.team2}
              </p>
              <p className="text-gray-200 mb-1">
                <span className="font-semibold text-amber-200">Date:</span> {match.date}
              </p>
              <p className="text-gray-200 mb-4">
                <span className="font-semibold text-amber-200">Applications:</span> {match.applicationsCount}
              </p>

              <div className="flex gap-3">
                <button
                  className="cursor-pointer bg-amber-400 text-black font-semibold py-2 px-4 rounded-lg hover:bg-amber-500
                  focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200"
                  onClick={() => onSelectMatch(match.id)}
                >
                  View Applications
                </button>

                <button
                  className="cursor-pointer bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700
                  focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200"
                  onClick={() => handleDelete(match.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
