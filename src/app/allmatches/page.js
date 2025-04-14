// app/matches/page.jsx
import Footer from '../components/Footer';
import Header from '../components/Header';
import Matches from '../components/Matches';

export default function MatchesPage() {
  return (
    <div className='bg-gradient-to-br from-[#003049] via-[#002635] to-[#00141b]'>
        <Header/>
        <Matches />
        <Footer/>
        
    </div>
  

  );
}
