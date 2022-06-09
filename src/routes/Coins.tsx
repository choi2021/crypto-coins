import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import Coin from '../components/Coin';
import DarkmodeBtn from '../components/DarkmodeBtn';
import { ICoin } from '../interface';
import { FaCoins } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Container = styled.div`
  padding: 1em;
  height: 100vh;
  max-width: 35rem;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  align-items: center;
`;

const Icon = styled.button`
  color: ${(props) => props.theme.accentColor};
  width: 3.5rem;
  height: 3.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-weight: 900;
  font-size: 3rem;
  padding: 0.2em;
  margin-right: 0.2em;
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

const CoinList = styled.ul``;

const Loader = styled.div`
  text-align: center;
  color: ${(props) => props.theme.accentColor};
`;

export default function Coins() {
  const { data: coins, isLoading } = useQuery<ICoin[]>('allCoins', fetchCoins);
  return (
    <Container>
      <Helmet>
        <title>Crypto Coins</title>
      </Helmet>
      <Header>
        <Icon>
          <FaCoins />
        </Icon>
        <Title> Crypto Coins</Title>
        <DarkmodeBtn></DarkmodeBtn>
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins?.slice(0, 50).map((coin) => (
            <Coin key={coin.id} {...coin}></Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
