'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// テストの時はChartコンポーネントをimportしない。
import Chart from './component/graph';

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
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedPrefecture, setSelectedPrefecture] = useState(10);
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  const radioFunction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPrefecture(Number(event.target.value));
  };
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
              onChange={radioFunction}
            />
            <label htmlFor={`prefecture-${prefecture.prefCode}`}>{prefecture.prefName}</label>
          </div>
        );
      })}
      <label htmlFor="総人口">
        <input
          type="radio"
          name="option"
          value="data1"
          id="総人口"
          onChange={handleOptionChange}
          checked={selectedOption === 'data1'}
        />
        総人口
      </label>
      <label htmlFor="年少人口">
        <input
          type="radio"
          name="option"
          id="年少人口"
          value="data2"
          onChange={handleOptionChange}
          checked={selectedOption === 'data2'}
        />
        年少人口
      </label>
      <label htmlFor="生産年齢人口">
        <input
          type="radio"
          name="option"
          value="data3"
          id="生産年齢人口"
          onChange={handleOptionChange}
          checked={selectedOption === 'data3'}
        />
        生産年齢人口
      </label>
      <label htmlFor="老年人口">
        <input
          type="radio"
          name="option"
          value="data4"
          id="老年人口"
          onChange={handleOptionChange}
          checked={selectedOption === 'data4'}
        />
        老年人口
      </label>
      {/* テストの時はChartコンポーネントをコメントアウト */}
      <Chart option={selectedOption} prefecture={String(selectedPrefecture)} />
    </>
  );
};
