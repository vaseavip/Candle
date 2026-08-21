import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getCategories, BASE_URL } from '../../api/apiClient';
import type { Category } from '../../types/Category';

function CategoriesPreview() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
        setError(null);
      } catch {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <>
      <div className="text">
        <h2 id="text1">Best category</h2>
      </div>

      <section className="container my-5">
        {loading && <p>Loading categories...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="row g-4">
            {categories.map((category) => (
              <div key={category.id} className="col-sm-6 col-lg-4">
                <div className="card category-card shadow-sm">
                  <img
                    src={`${BASE_URL}${category.image}`}
                    alt={category.name}
                  />

                  <div className="card-body text-center">
                    <h5>{category.name}</h5>

                    <p className="text-muted">{category.description}</p>

                    <Link
                      to={`/shop?category=${category.id}`}
                      className="btn btn-sm mt-2 button"
                    >
                      View products
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default CategoriesPreview;
