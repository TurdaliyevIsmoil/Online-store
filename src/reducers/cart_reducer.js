import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = action.payload;
      return state.cart.find(i => i.id === id + color) ?
        // Updating Item
        {
          ...state, cart: state.cart.map(i => {
            if (i.id === id + color) {
              const newAmount = (i.amount + amount) > product.stock ? product.stock : i.amount + amount;
              return { ...i, amount: newAmount }
            } else { return i };
          })
        }
        :
        // Adding new item
        {
          ...state,
          cart: [
            ...state.cart,
            {
              id: id + color,
              name: product.name,
              color,
              amount,
              price: product.price,
              image: product.images[0].url,
              max: product.stock
            }
          ]
        }
    }
    case REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter(i => i.id !== action.payload)
      return { ...state, cart: tempCart }
    }
    case CLEAR_CART: {
      return { ...state, cart: [] }
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      if (value < 1) { return state }
      const cartItems = state.cart.map(i => i.id === id ? { ...i, amount: value > i.max ? i.max : value } : i)
      return { ...state, cart: cartItems }
    }
    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce((total, item) => {
        total.total_items += item.amount
        total.total_amount += item.price * item.amount;
        return total
      }, { total_amount: 0, total_items: 0 })

      return {...state, total_items, total_amount}

    }
    default: throw new Error(`No Matching "${action.type}" - action type`)
  }

}

export default cart_reducer
