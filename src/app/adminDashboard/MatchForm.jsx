'use client';

import { useState } from 'react';
import { db } from '../../lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function MatchForm({onClose}) {
  const [matchData, setMatchData] = useState({
    matchname: '',
    team1: '',
    team2: '',
    date: '',
    venue: '',
    description: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setMatchData({ ...matchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'matches'), matchData);
      alert('Match posted successfully!');
      router.push('/adminDashboard');
    } catch (error) {
      console.error('Error posting match:', error);
      alert('Failed to post match');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Post a New Match</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input
          type="text"
          name="matchname"
          placeholder="Match Name"
          className="w-full p-2 border rounded"
          value={matchData.matchname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="team1"
          placeholder="Team 1"
          className="w-full p-2 border rounded"
          value={matchData.team1}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="team2"
          placeholder="Team 2"
          className="w-full p-2 border rounded"
          value={matchData.team2}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 border rounded"
          value={matchData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          className="w-full p-2 border rounded"
          value={matchData.venue}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Match Description"
          className="w-full p-2 border rounded"
          rows="4"
          value={matchData.description}
          onChange={handleChange}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Match
        </button>
      </form>
    </div>
  );
}
