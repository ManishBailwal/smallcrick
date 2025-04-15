'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '../../lib/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const ProfileCompletion = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    role: '',
    battingStyle: '',
    bowlingStyle: '',
    experience: '',
    city: '',
  });

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch existing user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFormData({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            phone: data.phone || '',
            age: data.age || '',
            role: data.role || '',
            battingStyle: data.battingStyle || '',
            bowlingStyle: data.bowlingStyle || '',
            experience: data.experience || '',
            city: data.city || '',
          });
        }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        email: user.email,
        ...formData,
      });
      router.push('/userDashboard');
    }
  };

  if (loading) return <div className="text-center mt-20 text-white">Loading profile...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b] p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-[#012a3a] p-8 rounded-xl shadow-lg max-w-md w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-amber-300">Complete / Edit Your Profile</h2>

        <input name="firstName" value={formData.firstName} placeholder="First Name" onChange={handleChange} required className="input-style" />
        <input name="lastName" value={formData.lastName} placeholder="Last Name" onChange={handleChange} required className="input-style" />
        <input name="phone" value={formData.phone} placeholder="Phone Number" type="tel" onChange={handleChange} required className="input-style" />
        <input name="age" value={formData.age} placeholder="Age" type="number" onChange={handleChange} required className="input-style" />

        <select name="role" value={formData.role} onChange={handleChange} required className="input-style">
          <option value="">Select Role</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="Allrounder">Allrounder</option>
        </select>

        <input name="battingStyle" value={formData.battingStyle} placeholder="Batting Style" onChange={handleChange} required className="input-style" />
        <input name="bowlingStyle" value={formData.bowlingStyle} placeholder="Bowling Style" onChange={handleChange} required className="input-style" />
        <input name="experience" value={formData.experience} placeholder="Experience" onChange={handleChange} required className="input-style" />
        <input name="city" value={formData.city} placeholder="City" onChange={handleChange} required className="input-style" />

        <button type="submit" className="w-full bg-[#F77F00] hover:bg-[#f89f35] py-2 rounded font-semibold text-white">
          Save Changes
        </button>
      </form>

      <style jsx>{`
        .input-style {
          width: 100%;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          background-color: #001f2e;
          color: white;
          border: 1px solid #00405e;
        }
      `}</style>
    </div>
  );
};

export default ProfileCompletion;
