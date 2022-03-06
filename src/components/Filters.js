import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const { filters: {
    text,
    company,
    category,
    color,
    min_price,
    max_price,
    price,
    shipping
  },
    updateFilter, clearFilter, products } = useFilterContext();

  const companies = getUniqueValues(products, 'company');
  const categories = getUniqueValues(products, 'category');
  const colors = getUniqueValues(products, 'colors');

  return <Wrapper>
    <div className='content'>
      <form onSubmit={e => e.preventDefault()}>
        <input type='text' name="text" placeholder='Search...' value={text} className="search-input form-control" onChange={updateFilter} />

        {/*  */}
        <div className='form-control'>
          <h5>Category</h5>
          {categories.map((item, i) => <button onClick={updateFilter} key={i} className={category === item.toLowerCase() ? 'active' : ''} name="category" type="button">{item}</button>)}
        </div>
        {/*  */}
        <div className='form-control'>
          <h5>Company</h5>
          <select name="company" className='company' value={company} onChange={updateFilter}>
            {companies.map((c, i) => <option key={i} value={c} >{c}</option>)}
          </select>
        </div>
        {/*  */}
        <div className='form-control'>
          <h5>Colors</h5>
          <div className='colors'>
            {colors.map((c, i) => {
              if (c === 'all') {
                return <button name="color" className={c === color ? 'all-btn  active' : 'all-btn '} data-color={'all'} onClick={updateFilter} >All</button>
              }
              return (
                <button key={i} name="color" style={{ background: c }} className={c === color ? 'color-btn  active' : 'color-btn '} data-color={c} onClick={updateFilter} >{color === c ? <FaCheck /> : ''}</button>
              )
            })}
          </div>
        </div>
        {/*  */}
        <div className='form-control'>
          <h5>Price</h5>
          <p className='price'>{formatPrice(price)}</p>
          <input type='range' name="price" min={min_price} max={max_price} onChange={updateFilter} value={price} />
        </div>
        {/*  */}
        <div className='form-control'>
          <label>
            Free Shipping <input type={'checkbox'} name="shipping" onClick={updateFilter} checked={shipping} />
          </label>
        </div>
        <button type='button' onClick={clearFilter} className="clear-btn">Clear Filter</button>
      </form>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
      overflow-y: auto;
      overflow-x: hidden;
      max-height: 95vh;
    }
  }
`

export default Filters
