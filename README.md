# Motherhood Beyond Bars

## What developers need to get started
1. Figma access (can be found on [notion page](https://www.notion.so/gtbitsofgood/Motherhood-Beyond-Bars-2c8b73628cda49b090319de9d61f0f0b))
2. Firebase access (ask [@phultquist](https://github.com/phultquist))

## Monorepo
This project is organized as a monorepo. This means that while there are essentially two parts — the web app and the mobile app — they are under the same repository. Each has its own folder `/web` and `/mobile`, respectively. There are few shared components between these two apps, which is why a monorepo mananger like turborepo was not used. 

## Your development environment
> Node 16.13.1, Expo 44
### Firebase
Normally, we'd use Firebase emulator so that way we don't touch the production database. However, this is a brand new project, so for now we'll use the global database.
## Getting Started: Web
```bash
cd web
npm install
npm run dev
```

## Getting Started: Mobile
```bash
cd mobile
npm install
npm run dev
```