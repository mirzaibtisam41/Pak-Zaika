import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cart: [],
  favorites: [],
  user: null,
  orders: [],
  reviews: [],
  searchQuery: '',
  selectedCategory: 'All',
  sortBy: 'name'
};

// Action types
const ActionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  ADD_TO_FAVORITES: 'ADD_TO_FAVORITES',
  REMOVE_FROM_FAVORITES: 'REMOVE_FROM_FAVORITES',
  SET_USER: 'SET_USER',
  ADD_ORDER: 'ADD_ORDER',
  ADD_REVIEW: 'ADD_REVIEW',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_SORT_BY: 'SET_SORT_BY',
  LOAD_DATA: 'LOAD_DATA'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };

    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case ActionTypes.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: []
      };

    case ActionTypes.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case ActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload)
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };

    case ActionTypes.ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      };

    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };

    case ActionTypes.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };

    case ActionTypes.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };

    case ActionTypes.LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = {
      cart: JSON.parse(localStorage.getItem('restaurant_cart') || '[]'),
      favorites: JSON.parse(localStorage.getItem('restaurant_favorites') || '[]'),
      user: JSON.parse(localStorage.getItem('restaurant_user') || 'null'),
      orders: JSON.parse(localStorage.getItem('restaurant_orders') || '[]'),
      reviews: JSON.parse(localStorage.getItem('restaurant_reviews') || '[]')
    };
    dispatch({ type: ActionTypes.LOAD_DATA, payload: savedData });
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('restaurant_cart', JSON.stringify(state.cart));
    localStorage.setItem('restaurant_favorites', JSON.stringify(state.favorites));
    localStorage.setItem('restaurant_user', JSON.stringify(state.user));
    localStorage.setItem('restaurant_orders', JSON.stringify(state.orders));
    localStorage.setItem('restaurant_reviews', JSON.stringify(state.reviews));
  }, [state.cart, state.favorites, state.user, state.orders, state.reviews]);

  // Action creators
  const actions = {
    addToCart: (item) => dispatch({ type: ActionTypes.ADD_TO_CART, payload: item }),
    removeFromCart: (id) => dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: id }),
    updateCartQuantity: (id, quantity) => dispatch({ type: ActionTypes.UPDATE_CART_QUANTITY, payload: { id, quantity } }),
    clearCart: () => dispatch({ type: ActionTypes.CLEAR_CART }),
    addToFavorites: (id) => dispatch({ type: ActionTypes.ADD_TO_FAVORITES, payload: id }),
    removeFromFavorites: (id) => dispatch({ type: ActionTypes.REMOVE_FROM_FAVORITES, payload: id }),
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    addOrder: (order) => dispatch({ type: ActionTypes.ADD_ORDER, payload: order }),
    addReview: (review) => dispatch({ type: ActionTypes.ADD_REVIEW, payload: review }),
    setSearchQuery: (query) => dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query }),
    setSelectedCategory: (category) => dispatch({ type: ActionTypes.SET_SELECTED_CATEGORY, payload: category }),
    setSortBy: (sortBy) => dispatch({ type: ActionTypes.SET_SORT_BY, payload: sortBy })
  };

  // Computed values
  const cartTotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      state,
      actions,
      cartTotal,
      cartItemsCount
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};