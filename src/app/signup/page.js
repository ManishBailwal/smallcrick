'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Signup from '../components/Signup';



const SignUp = () => {
  return (
    <div className='bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b]'>
        <Header/>
        <Signup/>
        
        <Footer/>

    </div>

  )
};

export default SignUp;
