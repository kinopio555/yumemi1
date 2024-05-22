import React from 'react';
import axios from 'axios';

import { render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

jest.mock('axios');

test('h1とlabelが存在するかどうか', async () => {
  const mockData = {
    data: {
      result: [{ prefCode: 1, prefName: '東京都' }],
    },
  };
  (axios.get as jest.Mock).mockResolvedValue(mockData);
  render(<Home />);
  const h1El = screen.getByText('都道府県別の人口グラフ');
  expect(h1El).toBeInTheDocument();
  await waitFor(async () => {
    const labelElement = screen.getByLabelText('東京都');
    expect(labelElement).toBeInTheDocument();
  });
});
