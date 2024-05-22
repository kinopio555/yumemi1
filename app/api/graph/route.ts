// テストの時はコメントアウト

import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params?: {
    prefCode: string;
  };
}
async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: Params = { params: { prefCode: '31' } }
) {
  // const prefCode = params?.prefCode;
  const url = new URL(req.url);
  const prefCode = url.searchParams.get('prefCode') || params?.prefCode;

  const API_KEY = process.env.MY_SECRET_API_KEY;
  const API_URL = `${process.env.API_URL_CHART}${prefCode ?? ''}`;
  const response = await axios.get(API_URL, {
    headers: {
      'x-api-key': `${API_KEY}`,
    },
  });

  return NextResponse.json(response.data, { status: 200 });
}

export { GET };
