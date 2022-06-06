import { useQuery } from 'react-query';
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';
import { fetchInfoData, fetchPriceData } from '../api';
import { IInfo, IPrice } from '../interface';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  height: 99vh;
  max-width: 35rem;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.ul`
  padding: 1em;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  border-radius: 1em;
`;

const OverviewItem = styled.li`
  width: 33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  span:first-child {
    font-size: 0.8rem;
  }
`;

const Description = styled.p`
  margin: 1em 0;
`;

const Tabs = styled.div`
  margin-top: 1em;
  padding: 0.5em;
  text-align: center;
  display: grid;
  background-color: rgba(0, 0, 0, 0.5);
  grid-template-columns: repeat(2, 1fr);
  border-radius: 1em;
`;

const Tab = styled.div<{ active: boolean }>`
  color: ${(props) =>
    props.active ? props.theme.accentColor : props.theme.textColor};
`;

const BackBtn = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  right: 0;
  top: 42%;
`;

export default function Detail() {
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as { name: string };
  const chartMatch = useMatch(`/${coinId}/chart`);
  const priceMatch = useMatch(`/${coinId}/price`);
  const { data: Price, isLoading: priceLoading } = useQuery<IPrice>(
    [coinId, 'price'],
    () => fetchPriceData(coinId!)
  );
  const { data: Info, isLoading: infoLoading } = useQuery<IInfo>(
    [coinId, 'info'],
    () => fetchInfoData(coinId!)
  );

  const loading = priceLoading || infoLoading;
  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading' : Info?.name}
        </Title>

        <BackBtn>
          <Link to={'/'}>
            <FaArrowLeft></FaArrowLeft>
          </Link>
        </BackBtn>
      </Header>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span> Rank:</span>
              <span>{Info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL:</span>
              <span>${Info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price: </span>
              <span>{Price?.quotes.KRW.price.toFixed(3)}원</span>
            </OverviewItem>
          </Overview>
          <Description>{Info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total SUPPLY: </span>
              <span>{Price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY</span>
              <span>{Price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab active={chartMatch !== null}>
              <Link to={`chart`}> Chart</Link>
            </Tab>
            <Tab active={priceMatch !== null}>
              <Link to={`price`}> Price</Link>
            </Tab>
          </Tabs>
        </>
      )}
      <Outlet context={{ id: coinId, price: Price }}></Outlet>
    </Container>
  );
}
