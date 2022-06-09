import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import { fetchOHLCData } from '../api';
import { IContext, IOhlcvData } from '../interface';

export default function Chart() {
  const { id } = useOutletContext<IContext>();
  const { data, isLoading } = useQuery<IOhlcvData[]>(
    'ohlc',
    () => fetchOHLCData(id),
    { refetchInterval: 50000 }
  );

  return (
    <div>
      {isLoading ? (
        'loading'
      ) : (
        <ReactApexChart
          type='candlestick'
          series={[
            {
              data: data?.map((info: IOhlcvData) => {
                return [
                  info.time_open,
                  info.open,
                  info.high,
                  info.low,
                  info.close,
                ];
              }) as any, //type 수정하기
            },
          ]}
          options={{
            theme: { mode: 'dark' },
            chart: {
              toolbar: { show: false },
              width: 400,
              height: 300,
              background: 'transparent',
            },
            colors: [],
            xaxis: {
              type: 'datetime',
              axisTicks: { show: false },
            },
            yaxis: { show: false },
            tooltip: {
              enabled: false,
              y: {
                formatter: (value) => value.toFixed(2),
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#E50914',
                  downward: '#6CB0F6',
                },
              },
            },
          }}
        ></ReactApexChart>
      )}
    </div>
  );
}
