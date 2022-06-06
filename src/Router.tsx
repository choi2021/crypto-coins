import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Chart from './routes/Chart';
import Coins from './routes/Coins';
import Detail from './routes/Detail';
import Price from './routes/Price';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Coins></Coins>}></Route>
        <Route path='/:coinId' element={<Detail></Detail>}>
          <Route path='chart' element={<Chart />}></Route>
          <Route path='price' element={<Price />}></Route>
        </Route>
      </Routes>
    </>
  );
}
