
import type { NextApiRequest, NextApiResponse } from 'next';
import api from '@/lib/woocommerce';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const params: any = {};
    if (req.query.category) {
      params.category = req.query.category;
    }
    const response = await api.get('products', { params });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
