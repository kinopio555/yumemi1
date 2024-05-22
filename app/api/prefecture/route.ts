import axios from 'axios';
import { NextResponse } from 'next/server';

async function GET() {
  const API_KEY = process.env.MY_SECRET_API_KEY as string;
  const API_URL = process.env.API_URL_PREFECTURE as string;

  const response = await axios.get(API_URL, {
    headers: {
      'x-api-key': `${API_KEY}`,
    },
  });

  return NextResponse.json(response.data, { status: 200 });
}

export { GET };

// テスト用コード
// import axios from 'axios';
// import { IncomingMessage, ServerResponse } from 'http';

// async function GET(req: IncomingMessage, res: ServerResponse) {
//   const API_KEY = process.env.MY_SECRET_API_KEY as string;
//   const API_URL: string | undefined = process.env.API_URL_PREFECTURE as string;

//   const response = await axios.get(API_URL, {
//     headers: {
//       'x-api-key': `${API_KEY}`,
//     },
//   });

//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify(response.data));
// }

// export { GET };
