This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Environment variables (Supabase)

This project uses Prisma with PostgreSQL (recommended: Supabase) for persistent admin/CRUD data.

1) Create a Supabase project
2) Copy a Postgres connection string from Supabase (Settings  Database  Connection string)
3) In Vercel: Project  Settings  Environment Variables, add:

- `DATABASE_URL`  Supabase Postgres URL (prefer pooled/transaction URL for serverless)
- `DIRECT_URL`  Supabase direct URL (recommended for `prisma migrate deploy`)
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET` (long random string)
- `NEXT_PUBLIC_SITE_URL` (your Vercel URL, e.g. `https://your-app.vercel.app`)

After saving env vars, redeploy the latest deployment.

For local development, copy `.env.example`  `.env.local` and fill values.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
