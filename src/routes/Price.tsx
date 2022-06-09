import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPriceData } from '../api';
import { IContext, IPrice } from '../interface';

const Container = styled.div`
  background-color: ${(props) => props.theme.detailColor};
  margin-top: 0.5em;
  width: 100%;
  border-radius: 1em;
  padding: 1em 2em;
`;

const Table = styled.table`
  width: 100%;
  height: 100%;
`;

const TableRow = styled.tr`
  display: grid;
  padding: 0.5em;
  margin-bottom: 0.2em;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (max-width: 600px) {
    th,
    td {
      font-size: 0.8rem;
    }
  }
`;

export default function Price() {
  const { id, info } = useOutletContext<IContext>(); //info로 왜 전달안될까?
  const { data, isLoading } = useQuery<IPrice>(
    'priceInfo',
    () => fetchPriceData(id),
    { refetchInterval: 10000 }
  );

  return (
    <Container>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <Table>
          <tbody>
            <TableRow>
              <th> All Time High (ATH)</th>
              <td>{data?.quotes.USD.ath_price.toFixed(3)}</td>
            </TableRow>
            <TableRow>
              <th>Market Capitalization</th>
              <td>{data?.quotes.USD.market_cap}</td>
            </TableRow>
            <TableRow>
              <th>Volume (24H)</th>
              <td>{data?.quotes.USD.volume_24h}</td>
            </TableRow>
            <TableRow>
              <th>Volume (7D)</th>
              <td>{data?.quotes.USD.percent_change_7d}</td>
            </TableRow>
            <TableRow>
              <th>Percent_Change (24H)</th>
              <td>{data?.quotes.USD.percent_change_24h}</td>
            </TableRow>
            <TableRow>
              <th>Percent_Change (7D)</th>
              <td>{data?.quotes.USD.percent_change_7d}</td>
            </TableRow>
          </tbody>
        </Table>
      )}
    </Container>
  );
}
