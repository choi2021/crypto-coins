import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import Coin from '../components/Coin';
import DarkmodeBtn from '../components/DarkmodeBtn';
import { ICoin } from '../interface';

const Container = styled.div`
  padding: 1em;
  height: 100vh;
  max-width: 35rem;
  margin: 0 auto;
`;

const Header = styled.header`
  position: relative;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.7rem;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;

const CoinList = styled.ul``;

const Loader = styled.div`
  text-align: center;
`;

export default function Coins() {
  const { data: coins, isLoading } = useQuery<ICoin[]>('allCoins', fetchCoins);
  return (
    <Container>
      <Header>
        <Title>Crypto Coins</Title>
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
