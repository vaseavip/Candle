import { Link } from 'react-router-dom';

import cub from '../../assets/images/cub.png';
import decor from '../../assets/images/decor.png';
import scoica from '../../assets/images/scoica.png';

function CategoriesPreview() {
  return (
    <>
      <div className="text">
        <h2 id="text1">Best category</h2>
      </div>

      <section className="container my-5">
        <div className="row g-4">
          <div className="col-sm-6 col-lg-4">
            <div className="card category-card shadow-sm">
              <img src={cub} alt="Scented Candles" />

              <div className="card-body text-center">
                <h5>Scented Candles</h5>

                <p className="text-muted">Relaxing & natural aromas</p>

                <Link to="/shop" className="btn btn-sm mt-2 button">
                  View products
                </Link>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-4">
            <div className="card category-card shadow-sm">
              <img src={decor} alt="Decor Candles" />

              <div className="card-body text-center">
                <h5>Decor Candles</h5>

                <p className="text-muted">Minimal & artistic designs</p>

                <Link to="/shop" className="btn btn-sm mt-2 button">
                  View products
                </Link>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-lg-4">
            <div className="card category-card shadow-sm">
              <img src={scoica} alt="Seasonal Candles" />

              <div className="card-body text-center">
                <h5>Seasonal Candles</h5>

                <p className="text-muted">Limited edition collections</p>

                <Link to="/shop" className="btn btn-sm mt-2 button">
                  View products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CategoriesPreview;
