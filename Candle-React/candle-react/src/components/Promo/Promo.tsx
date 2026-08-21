import { Link } from 'react-router-dom';

function Promo() {
  return (
    <section className="reclama2">
      <div className="embers" aria-hidden="true">
        <span style={{ left: '12%', animationDuration: '8s', animationDelay: '0.5s' }} />
        <span style={{ left: '28%', animationDuration: '6.5s', animationDelay: '2s' }} />
        <span style={{ left: '46%', animationDuration: '9s', animationDelay: '0s' }} />
        <span style={{ left: '64%', animationDuration: '7s', animationDelay: '1.5s' }} />
        <span style={{ left: '82%', animationDuration: '10s', animationDelay: '3.2s' }} />
      </div>

      <div className="banner-media">
        <h2>Enjoy 20% Off This Season's Styles</h2>
        <Link to="/shop">Show All</Link>
      </div>
    </section>
  );
}

export default Promo;
