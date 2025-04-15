'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileCompletion from './ProfileCompletion';

export default function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedMatches, setAppliedMatches] = useState([]);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userInfo = userSnap.data();
          setUserData(userInfo);

          // Fetch applications
          const appsRef = collection(db, 'applications');
          const q = query(appsRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const matches = await Promise.all(
            querySnapshot.docs.map(async (docSnap) => {
              const appData = docSnap.data();
              const matchRef = doc(db, 'matches', appData.matchId);
              const matchSnap = await getDoc(matchRef);
              const matchData = matchSnap.exists() ? matchSnap.data() : {};
              return {
                id: docSnap.id,
                applicationStatus: appData.status,
                matchname: matchData.matchname || 'Unknown Match',
                team1: matchData.team1,
                team2: matchData.team2,
                date: matchData.date,
                venue: matchData.venue,
              };
            })
          );

          setAppliedMatches(matches);
        } else {
          console.error('No user data found.');
        }
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const handleProfileUpdate = (updatedData) => {
    setUserData(updatedData);
    setShowProfileForm(false);
  };

  if (loading) {
    return <div className="text-center mt-20 text-white">Loading your dashboard...</div>;
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b] text-white p-6">
        <div className="max-w-4xl mx-auto bg-[#012a3a] border border-[#00405e] rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              {userData?.profileImage && (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border border-amber-300"
                />
              )}
              <h1 className="text-3xl font-bold text-amber-300">Welcome, {userData?.firstName || userData?.email}</h1>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setShowProfileForm((prev) => !prev)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md"
              >
                {showProfileForm ? 'Close Profile Form' : 'Edit Profile'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>

          {showProfileForm && (
            <div className="my-6">
              <ProfileCompletion userId={auth.currentUser.uid} onProfileUpdate={handleProfileUpdate} />
            </div>
          )}

          <p className="text-amber-100 mb-6">This is your personal user dashboard.</p>

          <h2 className="text-2xl text-amber-300 font-semibold mb-4">Applied Matches</h2>
          {appliedMatches.length === 0 ? (
            <p className="text-gray-300">You have not applied for any matches yet.</p>
          ) : (
            <div className="space-y-4">
              {appliedMatches.map((match) => (
                <div key={match.id} className="bg-[#001f2e] border border-[#00405e] rounded-xl p-4 shadow-md">
                  <h3 className="text-xl font-bold text-amber-200 mb-1">{match.matchname}</h3>
                  <p className="text-gray-300"><span className="font-medium">Teams:</span> {match.team1} vs {match.team2}</p>
                  <p className="text-gray-300"><span className="font-medium">Date:</span> {match.date}</p>
                  <p className="text-gray-300"><span className="font-medium">Venue:</span> {match.venue}</p>
                  <p className="text-sm mt-2">
                    <span className={`font-semibold ${
                      match.applicationStatus === 'Approved'
                        ? 'text-green-400'
                        : match.applicationStatus === 'Rejected'
                        ? 'text-red-400'
                        : 'text-yellow-300'
                    }`}>
                      Status: {match.applicationStatus}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
