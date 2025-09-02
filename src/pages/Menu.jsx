import React, {useState, useEffect} from 'react';
import {useApp} from '../context/AppContext';
import MenuCard from '../components/MenuCard';
import menuData from '../data/menu.json';

const Menu = () => {
  const {state, actions} = useApp();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDishes, setFilteredDishes] = useState([]);

  const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];
  const sortOptions = [
    {value: 'name', label: 'Name (A-Z)'},
    {value: 'price-low', label: 'Price (Low to High)'},
    {value: 'price-high', label: 'Price (High to Low)'},
    {value: 'rating', label: 'Rating (High to Low)'},
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setDishes(menuData);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let filtered = [...dishes];

    // Apply search filter
    if (state.searchQuery) {
      filtered = filtered.filter(
        (dish) =>
          dish.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          dish.description
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          dish.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
      );
    }

    // Apply category filter
    if (state.selectedCategory !== 'All') {
      filtered = filtered.filter(
        (dish) => dish.category === state.selectedCategory
      );
    }

    // Apply sorting
    switch (state.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredDishes(filtered);
  }, [dishes, state.searchQuery, state.selectedCategory, state.sortBy]);

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
        >
          <div className="h-56 bg-gradient-to-r from-gray-200 to-gray-300"></div>
          <div className="p-6">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-4 w-1/2"></div>
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Our Delicious Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted dishes made with the finest
            ingredients and authentic Pakistani recipes passed down through
            generations.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                <span className="text-lg font-semibold text-gray-700 mb-2 lg:mb-0">
                  Categories:
                </span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => actions.setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                      state.selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-4">
                <label
                  htmlFor="sort"
                  className="text-lg font-semibold text-gray-700"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={state.sortBy}
                  onChange={(e) => actions.setSortBy(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Results Info */}
            {(state.searchQuery || state.selectedCategory !== 'All') && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-800 font-semibold text-lg">
                      {filteredDishes.length === 0 ? (
                        <>🔍 No dishes found</>
                      ) : (
                        <>
                          ✨ Found {filteredDishes.length} delicious dish
                          {filteredDishes.length !== 1 ? 'es' : ''}
                        </>
                      )}
                      {state.searchQuery && (
                        <>
                          {' '}
                          for "
                          <span className="font-bold">{state.searchQuery}</span>
                          "
                        </>
                      )}
                      {state.selectedCategory !== 'All' && (
                        <>
                          {' '}
                          in{' '}
                          <span className="font-bold">
                            {state.selectedCategory}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                  {(state.searchQuery || state.selectedCategory !== 'All') && (
                    <button
                      onClick={() => {
                        actions.setSearchQuery('');
                        actions.setSelectedCategory('All');
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : filteredDishes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🍽️</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              No dishes found
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search or filter criteria to discover our
              amazing dishes.
            </p>
            <button
              onClick={() => {
                actions.setSearchQuery('');
                actions.setSelectedCategory('All');
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 font-semibold shadow-lg"
            >
              View All Dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map((dish, index) => (
              <div
                key={dish.id}
                className="animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <MenuCard dish={dish} />
              </div>
            ))}
          </div>
        )}

        {/* Favorites Section */}
        {state.favorites.length > 0 && (
          <div className="mt-20 pt-16 border-t-2 border-gray-200">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
                ❤️ Your Favorites
              </h2>
              <p className="text-xl text-gray-600">
                Your most loved dishes, saved for easy ordering
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dishes
                .filter((dish) => state.favorites.includes(dish.id))
                .map((dish, index) => (
                  <div
                    key={dish.id}
                    className="animate-fade-in-up"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <MenuCard dish={dish} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
