import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import menuData from '../data/menu.json';
import reviewsData from '../data/reviews.json';

const DishDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [dish, setDish] = useState(null);
  const [dishReviews, setDishReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', userName: '' });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isFavorite = dish && state.favorites.includes(dish.id);

  useEffect(() => {
    const dishId = parseInt(id);
    const foundDish = menuData.find(d => d.id === dishId);
    
    if (!foundDish) {
      navigate('/menu');
      return;
    }

    setDish(foundDish);
    
    // Get reviews for this dish (from localStorage + initial data)
    const allReviews = [...reviewsData, ...state.reviews];
    const reviews = allReviews.filter(review => review.dishId === dishId);
    setDishReviews(reviews);
    setLoading(false);
  }, [id, navigate, state.reviews]);

  const handleAddToCart = () => {
    actions.addToCart(dish);
    // Show success feedback
    const button = document.getElementById('add-to-cart-btn');
    button.innerHTML = '✅ Added to Cart!';
    button.classList.add('bg-green-500', 'hover:bg-green-600');
    button.classList.remove('from-blue-600', 'to-indigo-600', 'hover:from-blue-700', 'hover:to-indigo-700');
    setTimeout(() => {
      button.innerHTML = '🛒 Add to Cart';
      button.classList.remove('bg-green-500', 'hover:bg-green-600');
      button.classList.add('from-blue-600', 'to-indigo-600', 'hover:from-blue-700', 'hover:to-indigo-700');
    }, 2000);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      actions.removeFromFavorites(dish.id);
    } else {
      actions.addToFavorites(dish.id);
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.userName.trim() || !newReview.comment.trim()) return;

    const review = {
      id: Date.now(),
      dishId: dish.id,
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };

    actions.addReview(review);
    setDishReviews([...dishReviews, review]);
    setNewReview({ rating: 5, comment: '', userName: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? 'button' : undefined}
          onClick={interactive ? () => onRatingChange(i) : undefined}
          className={`${interactive ? 'cursor-pointer hover:scale-125 transition-transform' : 'cursor-default'} transition-all duration-200`}
        >
          <svg
            className={`h-5 w-5 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} ${interactive && i <= rating ? 'drop-shadow-lg' : ''}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading delicious details...</p>
        </div>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="text-8xl mb-6">🍽️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Dish not found</h2>
          <p className="text-xl text-gray-600 mb-8">The dish you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/menu')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-all duration-200 hover:scale-105 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg"
        >
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold">Back to Menu</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-3xl"></div>
                )}
                <img
                  src={dish.image}
                  alt={dish.name}
                  className={`w-full h-96 object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-105`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400/f3f4f6/9ca3af?text=No+Image';
                    setImageLoaded(true);
                  }}
                />
                {dish.featured && (
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    ⭐ Featured Dish
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{dish.name}</h1>
                  <span className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200">
                    {dish.category}
                  </span>
                </div>
                <div className="text-right ml-6">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                    ${dish.price}
                  </div>
                  <button
                    onClick={handleToggleFavorite}
                    className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110 group"
                  >
                    <svg
                      className={`h-7 w-7 transition-all duration-200 ${isFavorite ? 'text-red-500 fill-current scale-110' : 'text-gray-400 group-hover:text-red-400'}`}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                <div className="flex space-x-1">
                  {renderStars(dish.rating)}
                </div>
                <span className="text-lg font-semibold text-gray-700">
                  {dish.rating} ({dishReviews.length} reviews)
                </span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Description</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{dish.description}</p>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fresh Ingredients</h3>
                <div className="flex flex-wrap gap-3">
                  {dish.ingredients.map((ingredient, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200 hover:scale-105 transition-transform duration-200"
                    >
                      🌿 {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
            >
              ✍️ Write a Review
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8 border border-blue-200">
              <form onSubmit={handleSubmitReview}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={newReview.userName}
                      onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-3">
                      Rating
                    </label>
                    <div className="flex space-x-2">
                      {renderStars(newReview.rating, true, (rating) => 
                        setNewReview({ ...newReview, rating })
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    rows={4}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Share your experience with this amazing dish..."
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-300 text-gray-700 px-8 py-3 rounded-2xl hover:bg-gray-400 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-6">
            {dishReviews.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💭</div>
                <p className="text-xl text-gray-500 mb-4">No reviews yet. Be the first to review this dish!</p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold"
                >
                  Write First Review
                </button>
              </div>
            ) : (
              dishReviews.map((review) => (
                <div key={review.id} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center space-x-3 mt-2">
                        <div className="flex space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;