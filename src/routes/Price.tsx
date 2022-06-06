import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchPriceData } from '../api';
import { IContext, IPrice } from '../interface';

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
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
              <th>최고가(KRW)</th>
              <td>{data?.quotes.KRW.ath_price.toFixed(3)}</td>
            </TableRow>
            <TableRow>
              <th>총 시가</th>
              <td>{data?.quotes.KRW.market_cap}</td>
            </TableRow>
            <TableRow>
              <th>거래량(24시간)</th>
              <td>{data?.quotes.KRW.volume_24h}</td>
            </TableRow>
            <TableRow>
              <th>거래량(일주일)</th>
              <td>{data?.quotes.KRW.percent_change_7d}</td>
            </TableRow>
            <TableRow>
              <th>가격변동(24시간)</th>
              <td>{data?.quotes.KRW.percent_change_24h}</td>
            </TableRow>
            <TableRow>
              <th>가격변동(일주일)</th>
              <td>{data?.quotes.KRW.percent_change_7d}</td>
            </TableRow>
          </tbody>
        </Table>
      )}
    </Container>
  );
}
