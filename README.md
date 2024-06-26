### init project

```sh
npx create-next-app@latest kat-next

git config --local commit.gpgsign false
git config --local user.email hareeshbabu82ns@gmail.com
```

```sh
npx tailwindcss int -p
npx shadcn-ui@latest init

npx shadcn-ui@latest add -a

```

```sh
npm i prisma -D

npm i next-auth @auth/core @prisma/client @auth/prisma-adapter
npm i @t3-oss/env-nextjs
npm i zod react-hook-form resend
```

- Add Environment Variables to your `.env` can use `.env.sample` for ref
- google auth https://console.cloud.google.com/apis/credentials
- github auth https://github.com/settings/apps

- optional, if running local db

```sh
docker compose up -d
```

```sh
npm run db:gen # generates prisma client
npm run db:migrate # not valid for mongodb
npm run db:studio # opens db explorer

npm run email # email designer

npm run dev
```

- Config Ref: https://github.com/Blazity/next-enterprise

## Icon Generation

- tool: https://icon.kitchen
- source image: `app-icon-original-512x512.png`
- Settings:
  - Icons Set: Web Icons
  - Scaling: Center
  - Mast: True
  - Color: #B4DBD4
  - Effect: Cast shadow
  - Padding: 15%
  - Bg Type: Gradient
  - Gradient: #497A6E, #36574E, 45deg
  - fav icon: Circle
