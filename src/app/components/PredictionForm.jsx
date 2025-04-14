'use client';
import { useState } from 'react';

const teams = [
  'India', 'Australia', 'England', 'Pakistan', 'South Africa',
  'New Zealand', 'Sri Lanka', 'Bangladesh', 'West Indies', 'Afghanistan'
];

const venues = [
  'Melbourne Cricket Ground', 'Eden Gardens', 'Lords', 'The Oval', 'Wankhede Stadium',
  'Sydney Cricket Ground', 'Old Trafford', 'Trent Bridge', 'Adelaide Oval', 'Newlands',
  'Edgbaston', 'Gaddafi Stadium', 'Arun Jaitley Stadium', 'M. Chinnaswamy Stadium',
  'MA Chidambaram Stadium', 'Sharjah Cricket Stadium', 'R. Premadasa Stadium',
  'Kensington Oval', 'Wanderers Stadium', 'Sawai Mansingh Stadium', 'Green Park',
  'Vidarbha Cricket Association Stadium', 'Seddon Park',
  'Pallekele International Cricket Stadium', 'Bay Oval', 'SuperSport Park',
  'National Stadium, Karachi', 'Rawalpindi Cricket Stadium',
  'Zahur Ahmed Chowdhury Stadium', 'Shere Bangla National Stadium',
  'Rajiv Gandhi International Cricket Stadium', 'Barsapara Cricket Stadium',
  'Narendra Modi Stadium', 'Queens Sports Club', 'Brian Lara Stadium',
  'Providence Stadium', 'Bellerive Oval', 'Basin Reserve', 'ICC Academy',
  'Sheikh Zayed Stadium', 'Mahinda Rajapaksa International Cricket Stadium',
  'Sabina Park', 'Hazelaarweg', 'Grace Road', 'Manuka Oval', 'The Gabba',
  'Queens Park Oval', 'Perth Stadium', 'Malahide', 'Harare Sports Club'
];

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    team1: '',
    team2: '',
    toss_winner: '',
    toss_decision: '',
    venue: ''
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('https://crick-api-5w31.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('📦 API Response:', data);
      setResult(data);
    } catch (err) {
      console.error('❌ Prediction error:', err);
      alert('Prediction failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#00141b] text-white min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#F77F00] mb-8">
          🏏 Match Winner Predictor(International ODI)
        </h1>

        {result ? (
          <div>
            <div className="bg-green-800 text-white p-4 rounded mb-6">
              🏆 Predicted Winner: <strong>{result.predicted_winner}</strong>
            </div>

            {result.total_matches !== undefined && (
              <div className="bg-[#002b36] p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-2">📊 Global Head-to-Head Stats</h3>
                <p>Total Matches: <strong>{result.total_matches}</strong></p>
                <p>{formData.team1} Wins: <strong>{result.team1_wins}</strong></p>
                <p>{formData.team2} Wins: <strong>{result.team2_wins}</strong></p>
                <p>Win Difference ({formData.team1} - {formData.team2}): <strong>{result.h2h_diff}</strong></p>
              </div>
            )}

            {(result.venue_team1_wins !== undefined && result.venue_team2_wins !== undefined) && (
              <div className="bg-[#003d4c] p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">🏟️ Venue-Specific Head-to-Head</h3>
                <p>Matches at <strong>{formData.venue}</strong>: <strong>{result.venue_team1_wins + result.venue_team2_wins}</strong></p>
                <p>{formData.team1} Wins: <strong>{result.venue_team1_wins}</strong></p>
                <p>{formData.team2} Wins: <strong>{result.venue_team2_wins}</strong></p>
                <p>Venue Win Difference ({formData.team1} - {formData.team2}): <strong>{result.venue_h2h_diff}</strong></p>
              </div>
            )}

            <button
              onClick={() => setResult(null)}
              className="mt-6 bg-gray-200 text-black px-4 py-2 rounded hover:bg-white"
            >
              🔁 Predict Another Match
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <SelectField name="team1" label="Team 1" value={formData.team1} options={teams} onChange={handleChange} />
            <SelectField name="team2" label="Team 2" value={formData.team2} options={teams} onChange={handleChange} />
            <SelectField name="toss_winner" label="Toss Winner" value={formData.toss_winner} options={teams} onChange={handleChange} />
            <SelectField
              name="toss_decision"
              label="Toss Decision"
              value={formData.toss_decision}
              options={['bat', 'field']}
              onChange={handleChange}
            />
            <SelectField name="venue" label="Match Venue" value={formData.venue} options={venues} onChange={handleChange} />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F77F00] text-white py-3 rounded-lg hover:bg-orange-600 transition"
            >
              {loading ? 'Predicting...' : 'Predict'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const SelectField = ({ name, label, value, options, onChange }) => (
  <div>
    <label htmlFor={name} className="block mb-1 font-medium text-[#F77F00]">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-2 rounded bg-[#002b36] text-white border border-[#F77F00] focus:outline-none"
    >
      <option value="">-- Select --</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default PredictionForm;
