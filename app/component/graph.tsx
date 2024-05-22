// テストの時はコメントアウト

'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

interface PopulationData {
  year: number;
  value: number;
}
type ChartProps = {
  option: string;
  prefecture: string;
};

const Chart: React.FC<ChartProps> = ({ option, prefecture }) => {
  const [data1, setData1] = useState<PopulationData[]>([]);
  const [data2, setData2] = useState<PopulationData[]>([]);
  const [data3, setData3] = useState<PopulationData[]>([]);
  const [data4, setData4] = useState<PopulationData[]>([]);
  useEffect(() => {
    const api = async () => {
      const prefCode = String(prefecture);
      const res1 = await axios.get(`/api/graph?prefCode=${prefCode}`);
      setData1(res1.data.result.data[0].data);
      setData2(res1.data.result.data[1].data);
      setData3(res1.data.result.data[2].data);
      setData4(res1.data.result.data[3].data);
    };
    api();
  }, [prefecture]);
  const optionFunction = () => {
    switch (option) {
      case 'data1':
        return data1;
      case 'data2':
        return data2;
      case 'data3':
        return data3;
      default:
        return data4;
    }
  };
  const ChartWrapper = styled.div`
    position: absolute;
    left: 1wem;
    width: 100%;
    height: 250px;
    bottom: 4em;

    @media (max-width: 768px) {
      position: absolute;
      left: 1em;
      bottom: 0.2em;
    }
  `;

  return (
    <ChartWrapper className="container">
      <ResponsiveContainer width="95%" height="100%">
        <LineChart
          width={700}
          height={300}
          data={optionFunction()}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
          className="chart"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: '西暦（年）', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis
            dataKey="value"
            tick={{
              fontSize: 11,
            }}
            label={{ value: '人口', angle: -90, position: 'insideLeft', dy: -10, dx: -3 }}
          />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default Chart;
