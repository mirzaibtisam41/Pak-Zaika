import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import menuData from '../data/menu.json';

const Home = () => {
  const [featuredDishes, setFeaturedDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and get featured dishes
    setTimeout(() => {
      const featured = menuData.filter((dish) => dish.featured);
      setFeaturedDishes(featured);
      setLoading(false);
    }, 500);
  }, []);

  const stats = [
    {label: 'Happy Customers', value: '2,500+', icon: '😊'},
    {label: 'Dishes Served', value: '50,000+', icon: '🍽️'},
    {label: 'Years Experience', value: '15+', icon: '👨‍🍳'},
    {label: 'Five Star Reviews', value: '1,200+', icon: '⭐'},
  ];

  const features = [
    {
      icon: '🚀',
      title: 'Fast Delivery',
      description:
        'Lightning-fast delivery to your doorstep in 30 minutes or less.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🌱',
      title: 'Fresh Ingredients',
      description:
        'Premium quality, locally sourced ingredients in every single dish.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '❤️',
      title: 'Made with Love',
      description:
        'Every dish crafted with passion by our world-class Pakistani chefs.',
      color: 'from-red-500 to-pink-500',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">
            Loading delicious experiences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 text-6xl animate-bounce opacity-20">
          🍝
        </div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse opacity-20">
          🍕
        </div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce opacity-20 animation-delay-1000">
          🍷
        </div>
        <div className="absolute bottom-20 right-10 text-3xl animate-pulse opacity-20 animation-delay-2000">
          🧄
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
              Welcome to
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Pak Zaika
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-gray-200 leading-relaxed">
              Experience authentic Pakistani cuisine crafted with passion and
              the finest ingredients. From traditional recipes to modern
              interpretations, every dish tells a story of culinary excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/menu"
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 flex items-center space-x-3"
              >
                <span className="text-2xl group-hover:animate-bounce">🍽️</span>
                <span>Explore Menu</span>
                <svg
                  className="h-6 w-6 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3">
                <span className="text-2xl group-hover:animate-pulse">📞</span>
                <span>Make Reservation</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Amazing Journey
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak for our excellence
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-110 transition-transform duration-300"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
              Chef's Special Selection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most beloved dishes, carefully crafted with premium
              ingredients and perfected through years of culinary expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredDishes.map((dish, index) => (
              <div
                key={dish.id}
                className="animate-fade-in-up"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <MenuCard dish={dish} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/menu"
              className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 text-lg"
            >
              <span className="mr-3 text-2xl group-hover:animate-bounce">
                🍽️
              </span>
              View Complete Menu
              <svg
                className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
              Why Choose Pak Zaika?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing an exceptional dining experience with
              every single order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-gray-50 border border-gray-100"
              >
                <div
                  className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl mb-6 text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-10 left-10 text-8xl opacity-10 animate-pulse">
          🍕
        </div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-bounce">
          🍝
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Don't wait any longer! Browse our incredible menu and place your
            order for delivery or pickup today. Your taste buds will thank you!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/menu"
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-10 py-4 rounded-2xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/25 flex items-center justify-center space-x-3 text-lg"
            >
              <span className="text-2xl group-hover:animate-bounce">🛒</span>
              <span>Order Now</span>
              <svg
                className="h-6 w-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <button className="group border-2 border-white text-white px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3 text-lg">
              <span className="text-2xl group-hover:animate-pulse">🎁</span>
              <span>Special Offers</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
