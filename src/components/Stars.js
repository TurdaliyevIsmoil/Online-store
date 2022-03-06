import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ reviews, stars }) => {
  let star = [];
  if (stars) {
    for (let i = 1; i < 6; i++) {
      star.push(
        <span key={i}>
          {stars >= i ? (
            <BsStarFill />
          ) : stars >= i - 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      );
    }
  }
  return (
    <Wrapper>
      {star.map(data=>data)}
      <p>({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
