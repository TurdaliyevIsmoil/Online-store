import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const max_price = Math.max(...action.payload.map(p => p.price))
      return { ...state, products: [...action.payload], filtered_products: [...action.payload], filters: { ...state.filters, max_price, price: max_price } }
    };
    case SET_GRIDVIEW: return { ...state, grid_view: true }
    case SET_LISTVIEW: return { ...state, grid_view: false }
    case UPDATE_SORT: return { ...state, sort: action.payload }
    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;
      let newProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        newProducts = filtered_products.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-lowest') {
        newProducts = filtered_products.sort((a, b) => a.price - b.price)
      }
      if (sort === "price-highest") {
        newProducts = filtered_products.sort((a, b) => b.price - a.price)
      }
      if (sort === "name-a") {
        newProducts = filtered_products.sort((a, b) => a.name.localeCompare(b.name))
      }
      if (sort === "name-z") {
        newProducts = filtered_products.sort((a, b) => b.name.localeCompare(a.name))
      }
      return { ...state, filtered_products: newProducts };
    }
    case UPDATE_FILTERS: {
      let { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } }
    }
    case FILTER_PRODUCTS: {
      let tempProducts = [...state.products];
      const { text, company, category, color, price, shipping } = state.filters;
      if (text) {
        tempProducts = tempProducts.filter((item) => { return item.name.toLowerCase().startsWith(text) })
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter((item) => item.category === category)
      }
      if (company !== 'all') {
        tempProducts = tempProducts.filter((item) => item.company === company)
      }
      if (color !== 'all') {
        tempProducts = tempProducts.filter((item) => item.colors.find(c => c === color))
      }
      if (price !== state.filters.max_price) {
        tempProducts = tempProducts.filter((item) => item.price < price)
      }
      if (shipping !== false) {
        tempProducts = tempProducts.filter((item) => item.shipping === true)
      }
      return { ...state, filtered_products: tempProducts }
    }
    case CLEAR_FILTERS: return {
      ...state, filters: {
        ...state.filters,
        text: '',
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false
      }
    }
    default: throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default filter_reducer
