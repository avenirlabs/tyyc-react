
# Clothing E-commerce Theme with WooCommerce + Razorpay Integration

This is a headless Next.js e-commerce frontend integrated with WooCommerce for product/order management and Razorpay for payment.

---

## 🚀 Features

- Live products & categories from WooCommerce
- Dynamic cart with React context
- Razorpay-integrated checkout
- Order creation via WooCommerce REST API

---

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root:

```
NEXT_PUBLIC_WC_API_URL=https://yourstore.com
WC_CONSUMER_KEY=ck_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
WC_CONSUMER_SECRET=cs_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

### 3. Add Razorpay Key

In `src/pages/checkout.tsx`, replace:

```ts
key: 'YOUR_RAZORPAY_KEY_ID'
```

with your [Razorpay Test or Live Key](https://dashboard.razorpay.com/).

---

## 💻 Development

```bash
npm run dev
```

Visit: `http://localhost:3000`

- `/` - Homepage with category filtering
- `/checkout` - Checkout with Razorpay and WooCommerce order creation

---

## 🚢 Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com/) and import the project.
3. Add `.env` variables to Vercel dashboard.
4. Deploy!

---

## 📦 API Routes

- `/api/products` - fetch products (supports category filter)
- `/api/categories` - fetch product categories
- `/api/order` - create WooCommerce order post-payment

---

## 🤝 Credits

Built with ❤️ using:
- Next.js
- Tailwind CSS
- WooCommerce REST API
- Razorpay Checkout SDK
