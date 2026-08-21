import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="reclama">
      <div className="embers" aria-hidden="true">
        <span style={{ left: '8%', animationDuration: '7s', animationDelay: '0s' }} />
        <span style={{ left: '22%', animationDuration: '9s', animationDelay: '1.2s' }} />
        <span style={{ left: '40%', animationDuration: '6s', animationDelay: '2.4s' }} />
        <span style={{ left: '58%', animationDuration: '8s', animationDelay: '0.6s' }} />
        <span style={{ left: '74%', animationDuration: '10s', animationDelay: '1.8s' }} />
        <span style={{ left: '90%', animationDuration: '7.5s', animationDelay: '3s' }} />
      </div>

      <div className="container">
        <div className="banner-media">
          <Link to="/shop" id="link1">
            NEW COLLECTION
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
