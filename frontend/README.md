This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Storage Booking Frontend

This is the React (Next.js) frontend for the Storage Booking Web App.

### Prerequisites
- Node.js & npm
- The backend API running at http://localhost:4000 (see backend/README.md)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure API proxy (for local dev):
   Create or edit `next.config.ts` and add:
   ```ts
   // next.config.ts
   const nextConfig = {
     async rewrites() {
       return [
         {
           source: '/api/:path*',
           destination: 'http://localhost:4000/api/:path*',
         },
       ];
     },
   };
   export default nextConfig;
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Pages
- `/units` — View available storage units
- `/book` — Book a unit
- `/bookings` — View your bookings

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
