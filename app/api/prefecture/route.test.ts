import axios from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { GET } from './route';

jest.mock('axios');

describe('GET /api/prefecture', () => {
  it('should return data from the API', async () => {
    const mockData = { result: [{ prefCode: 2, prefName: '熊本県' }] };
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const req = new IncomingMessage(null as any) as any;
    const res = new ServerResponse(req) as any;

    res.writeHead = jest.fn();
    res.end = jest.fn((data) => {
      res.data = data;
    });

    await GET(req, res);

    expect(res.writeHead).toHaveBeenCalledWith(200, { 'Content-Type': 'application/json' });
    expect(res.end).toHaveBeenCalledWith(JSON.stringify(mockData));
  });
});
