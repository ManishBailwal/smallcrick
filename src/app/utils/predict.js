export const fetchPrediction = async (inputData) => {
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });
  
      if (!res.ok) {
        throw new Error('Failed to fetch prediction');
      }
  
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Prediction error:', error);
      return { error: 'Could not fetch prediction' };
    }
  };
  