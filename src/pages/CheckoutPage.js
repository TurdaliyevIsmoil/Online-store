import React from 'react'
import styled from 'styled-components'
import { CartContent, PageHero, StripeCheckout } from '../components'
// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

const CheckoutPage = () => {
  return <main>
    <PageHero title="checkout" />
    <CartContent />
  </main>
}
const Wrapper = styled.div``
export default CheckoutPage
