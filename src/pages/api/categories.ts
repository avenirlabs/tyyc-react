
import type { NextApiRequest, NextApiResponse } from 'next';
import api from '@/lib/woocommerce';

export default async function handler(_, res: NextApiResponse) {
  try {
    const response = await api.get('products/categories');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
