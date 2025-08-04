
import { useState, useEffect } from 'react';


const [products, setProducts] = useState([]);



export default function HomePage() {
  const [_, setLoading] = useState(true);

  const fetchProducts = async (categoryId?: number) => {
    setLoading(true);
const url = categoryId ? `/api/products?category=${categoryId}` : '/api/products';
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
    fetchProducts();
  }, []);

  const handleCategoryChange = (id: number | null) => {
    setSelectedCategory(id);
    fetchProducts(id ?? undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shop Products</h1>

      <div className="mb-6">
        <select
          value={selectedCategory ?? ''}
          onChange={(e) => handleCategoryChange(e.target.value ? parseInt(e.target.value) : null)}
          className="border rounded p-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product.id) => (
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <img
                src={product.images[0]?.src || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <div
                className="text-green-600"
                dangerouslySetInnerHTML={{ __html: product.price_html }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
