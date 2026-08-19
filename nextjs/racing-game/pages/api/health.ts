import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: string;
  version: string;
  environment: string;
  timestamp: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      status: 'error',
      version: '1.0.0',
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'unknown',
      timestamp: new Date().toISOString(),
    } as any);
  }

  res.status(200).json({
    status: 'ok',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'production',
    timestamp: new Date().toISOString(),
  });
}
