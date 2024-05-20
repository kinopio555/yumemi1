'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Chart from './components/graph';

interface PrefectureData {
  prefCode: number;
  prefName: string;
}

export default () => {
  const [prefectures, setPrefecture] = useState<PrefectureData[]>([]);
  useEffect(() => {
    const api = async () => {
      const res = await axios.get('/api/prefecture');
      setPrefecture(res.data.result);
    };
    api();
  }, []);
  return (
    <>
      <h1>都道府県別の人口グラフ</h1>
      {prefectures.map((prefecture) => {
        return (
          <div key={prefecture.prefCode} style={{ display: 'inline' }}>
            <input
              type="radio"
              name="prefectures"
              id={`prefecture-${prefecture.prefCode}`}
              value={prefecture.prefCode}
              // onChange={radioFunction}
            />
            <label htmlFor={`prefecture-${prefecture.prefCode}`}>{prefecture.prefName}</label>
          </div>
        );
      })}
    </>
  );
};
