'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

export default function ApplicationsPanel({ matchId, onBack }) {
  const [applications, setApplications] = useState([]);
  const [matchName, setMatchName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationsAndMatch = async () => {
      try {
        const matchDocRef = doc(db, 'matches', matchId);
        const matchSnap = await getDoc(matchDocRef);
        if (matchSnap.exists()) {
          setMatchName(matchSnap.data().matchname || 'Unknown Match');
        }

        const q = query(collection(db, 'applications'), where('matchId', '==', matchId));
        const snapshot = await getDocs(q);

        const apps = await Promise.all(snapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const userDoc = await getDoc(doc(db, 'users', data.userId));
          const userData = userDoc.exists() ? userDoc.data() : {};
          return {
            id: docSnap.id,
            ...data,
            userDetails: userData,
          };
        }));

        setApplications(apps);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationsAndMatch();
  }, [matchId]);

  const handleStatusUpdate = async (appId, newStatus) => {
    try {
      await updateDoc(doc(db, 'applications', appId), { status: newStatus });
      setApplications(prev =>
        prev.map(app => (app.id === appId ? { ...app, status: newStatus } : app))
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const handleDelete = async (appId) => {
    try {
      await deleteDoc(doc(db, 'applications', appId));
      setApplications(prev => prev.filter(app => app.id !== appId));
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (
    <div className="text-white p-6">
      <button
        onClick={onBack}
        className="cursor-pointer mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
      >
        ← Back to Matches
      </button>

      <h2 className="text-3xl font-bold text-amber-400 mb-2">Applications for:</h2>
      <h3 className="text-xl font-semibold text-white mb-6">{matchName}</h3>

      {loading ? (
        <p className="text-amber-300 animate-pulse">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-[#011e2a] border border-[#024c65] rounded-md p-4 shadow-md"
            >
              <p><span className="text-amber-200">User ID:</span> {app.userId}</p>
              <p><span className="text-amber-200">Status:</span> {app.status}</p>
              {app.userDetails && (
                <div className="mt-2 space-y-1 text-sm text-white">
                  <p><span className="text-amber-300">Name:</span> {app.userDetails.firstName} {app.userDetails.lastName}</p>
                  <p><span className="text-amber-300">Phone:</span> {app.userDetails.phone}</p>
                  <p><span className="text-amber-300">Age:</span> {app.userDetails.age}</p>
                  <p><span className="text-amber-300">Role:</span> {app.userDetails.role}</p>
                  <p><span className="text-amber-300">Batting Style:</span> {app.userDetails.battingStyle}</p>
                  <p><span className="text-amber-300">Bowling Style:</span> {app.userDetails.bowlingStyle}</p>
                  <p><span className="text-amber-300">Experience:</span> {app.userDetails.experience}</p>
                  <p><span className="text-amber-300">City:</span> {app.userDetails.city}</p>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleStatusUpdate(app.id, 'Approved')}
                  className="cursor-pointer bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                  className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white py-1 px-3 rounded"
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
