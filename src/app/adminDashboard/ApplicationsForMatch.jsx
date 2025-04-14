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
        // Get match info
        const matchDocRef = doc(db, 'matches', matchId);
        const matchSnap = await getDoc(matchDocRef);
        if (matchSnap.exists()) {
          setMatchName(matchSnap.data().matchname || 'Unknown Match');
        }

        // Get applications
        const q = query(collection(db, 'applications'), where('matchId', '==', matchId));
        const snapshot = await getDocs(q);

        const apps = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data(),
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
        className="mb-6 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
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

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleStatusUpdate(app.id, 'Approved')}
                  className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusUpdate(app.id, 'Rejected')}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="bg-gray-700 hover:bg-gray-800 text-white py-1 px-3 rounded"
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
