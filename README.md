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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Admin Access Flow

The admin flow uses two stages:

1. First login with one of the access codes from `admin_access_codes`.
2. Inside profile page, create a personal 6-digit PIN for later logins.
3. After activation, the same code cannot be used by another person.
4. Next logins require both access code + 6-digit PIN.

Active first-login access codes:

- `CSNAP-ALFA-7391`
- `CSNAP-MAVI-4826`
- `CSNAP-PRO-9154`
- `CSNAP-NOVA-2673`
- `CSNAP-DELTA-8042`
- `CSNAP-OMEGA-1187`
- `CSNAP-LUNA-2234`
- `CSNAP-PIXEL-3390`
- `CSNAP-TERRA-4412`
- `CSNAP-NEON-5578`
- `CSNAP-CLOUD-6605`
- `CSNAP-RIVER-7721`
- `CSNAP-ASTRA-8849`
- `CSNAP-QUAD-9906`
- `CSNAP-BETA-1048`
- `CSNAP-ION-2165`
- `CSNAP-ORBIT-3281`
- `CSNAP-SOLAR-4307`
- `CSNAP-METRO-5423`
- `CSNAP-VISTA-6540`
- `CSNAP-WAVE-7652`
- `CSNAP-FLUX-8764`
- `CSNAP-CORE-9871`
- `CSNAP-SPARK-1359`
- `CSNAP-PRIME-2468`
