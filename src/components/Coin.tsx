import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ICoin } from '../interface';

const CoinImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1em;
`;

const Wrapper = styled.li`
  background-color: white;
  width: 100%;
  padding: 1em 2em;
  color: ${(props) => props.theme.bgColor};
  border-radius: 1em;
  margin-bottom: 1em;
  a {
    display: flex;
    align-items: center;
  }
`;

export default function Coin({ id, name, symbol }: ICoin) {
  return (
    <Wrapper>
      <Link to={`/${id}`} state={{ name: name }}>
        <CoinImg
          src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`}
          alt=''
        />
        <span>{name} &rarr; </span>
      </Link>
    </Wrapper>
  );
}
