import { Link } from 'react-router-dom';
import reclama from '../../assets/images/reclama1.png';

function Hero() {
  return (
    <section
      className="reclama"
      style={{
        backgroundImage: `url(${reclama})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Link to="/shop" id="link1">
        NEW COLLECTION
      </Link>
    </section>
  );
}

export default Hero;
