import { Link } from 'react-router-dom';

import promoImage from '../../assets/images/reclama2.png';

function Promo() {
  return (
    <section
      className="reclama2"
      style={{ backgroundImage: `url(${promoImage})` }}
    >
      <h2>Enjoy 20% Off This Season's Styles</h2>

      <Link to="/shop">Show All</Link>
    </section>
  );
}

export default Promo;
