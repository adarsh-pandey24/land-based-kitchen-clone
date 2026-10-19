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

## Admin CMS

The site includes a database-backed admin panel at `/admin` for catering services, chef menus, gallery images, testimonials and chef profiles. Data lives in PostgreSQL (NeonDB) via Prisma.

### Setup

1. Copy `.env.example` to `.env` and fill in:
   - `DATABASE_URL`: the Neon connection string (keep `?sslmode=require`).
   - `SESSION_SECRET`: 32+ random characters. Generate one with
     `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` (12+ characters): only used by the create-admin script.
2. Install dependencies (this also generates the Prisma client): `npm install`
3. Apply migrations: `npm run db:migrate`
4. Create the first admin: `npm run create-admin`, then delete `ADMIN_PASSWORD` from `.env`.
   Running the script again with the same email resets that account's password.
5. Start the app: `npm run dev`, then sign in at http://localhost:3000/admin/login

For production, set `DATABASE_URL` and `SESSION_SECRET` in the hosting provider's environment settings, then run `npm run db:migrate` and `npm run build`.

### How content reaches the public site

- Only published records are shown. New records are drafts unless "Published" is ticked.
- While a module has no records at all, its section keeps showing the original placeholder content from `src/lib/site.ts`.
- Saving, publishing, reordering or deleting refreshes the affected public pages on the next request.
- Images are entered as URLs (https or a site path such as `/images/dish.jpg`). There is no file upload.

### Roles

- `ADMIN`: manages all content and admin accounts (`/admin/users`).
- `EDITOR`: manages content only.

There is no public sign-up. New accounts are created by an admin, or with the create-admin script.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
