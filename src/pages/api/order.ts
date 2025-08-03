
import type { NextApiRequest, NextApiResponse } from 'next';
import api from '@/lib/woocommerce';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { billing, line_items } = req.body;
    const order = {
      payment_method: 'razorpay',
      payment_method_title: 'Paid via Razorpay',
      set_paid: true,
      billing,
      line_items
    };

    const response = await api.post('orders', order);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Order creation failed' });
  }
}
