import React from 'react';
import axios from 'axios';

import { render, screen, waitFor } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

jest.mock('axios');

test('labelが存在するかどうか', async () => {
  const mockData = {
    data: {
      result: [{ prefCode: 1, prefName: '東京都' }],
    },
  };
  (axios.get as jest.Mock).mockResolvedValue(mockData);
  render(<Home />);
  await waitFor(async () => {
    const labelElement = screen.getByLabelText('東京都');
    expect(labelElement).toBeInTheDocument();
  });
});
