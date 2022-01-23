# [Motherhood Beyond Bars](https://www.motherhoodbeyond.org/)

When babies are born to women in the Georgia prison system, the mother is allotted a 48-hour stay in the hospital. After these 48 hours, the mother is returned to prison and a chosen caretaker will then come to the hospital to pick up the baby and bring it home. The nonprofit works with these caretakers to provide them with resources and supplies, but lacks a platform for the client to interact with. 

**We're building that platform.**
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

## Getting Started: Functions
We're using firebase functions for a couple of small things — mainly custom claims for whitelisted emails as described [here](https://stackoverflow.com/questions/46552886/firebase-authentication-with-whitelisted-email-addresses). Otherwise, we'll be writing to firebase using client-side packages and validating the data with firestore security rules.

You'll need to [install the firebase emulator](https://firebase.google.com/docs/emulator-suite) first. Then, run the following commands:

```bash
firebase login
firebase emulators:start --only functions
```
