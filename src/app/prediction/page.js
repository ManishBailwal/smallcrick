'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PredictionForm from '../components/PredictionForm';

const Prediction = () => {
  return (
    <div>
        <Header/>
        <PredictionForm/>
        
        <Footer/>

    </div>

  )
};

export default Prediction;
