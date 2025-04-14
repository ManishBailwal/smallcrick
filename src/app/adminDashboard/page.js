'use client';

import { useEffect, useState } from 'react';
import { auth } from '../../lib/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MatchForm from './MatchForm';
import MatchApplicationsList from './MatchApplicationsList';
import ApplicationsPanel from './ApplicationsForMatch'; // NEW

export default function AdminDashboard() {
  const [adminEmail, setAdminEmail] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [selectedMatchId, setSelectedMatchId] = useState(null); // NEW
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setAdminEmail(user.email);
    } else {
      router.push('/login');
    }
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/home');
  };

  return (
    <div>
      <Header />
      <div className="w-full mx-auto bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b] p-6 shadow-md min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-amber-300">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
        <p className="text-white mb-4">Welcome, <strong>{adminEmail}</strong></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Post a Match</h2>
            <p className="text-sm text-gray-600">Create and schedule a new cricket match.</p>
            <button
              onClick={() => {
                setShowPostForm(true);
                setShowApplications(false);
                setSelectedMatchId(null); // Clear panel
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Post Match
            </button>
          </div>

          <div className="p-6 bg-green-50 border border-green-200 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">View Player Applications</h2>
            <p className="text-sm text-gray-600">See which users have applied to upcoming matches.</p>
            <button
              onClick={() => {
                setShowApplications(true);
                setShowPostForm(false);
                setSelectedMatchId(null); // Clear panel
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View Applications
            </button>
          </div>
        </div>

        {/* Conditionally render based on state */}
        {showPostForm && <MatchForm onClose={() => setShowPostForm(false)} />}

        {showApplications && !selectedMatchId && (
          <MatchApplicationsList onSelectMatch={setSelectedMatchId} />
        )}

        {selectedMatchId && (
          <ApplicationsPanel
            matchId={selectedMatchId}
            onBack={() => setSelectedMatchId(null)} // Back to match list
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
