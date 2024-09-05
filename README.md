# [Motherhood Beyond Bars](https://www.motherhoodbeyond.org/)

When babies are born to women in the Georgia prison system, the mother is allotted a 48-hour stay in the hospital. After these 48 hours, the mother is returned to prison and a chosen caretaker will then come to the hospital to pick up the baby and bring it home. The nonprofit works with these caretakers to provide them with resources and supplies, but lacks a platform for the client to interact with.

**We're building that platform.**

## Developers

You'll need:

1. [Figma](https://www.figma.com/design/1eq6iy7h2Cd7rYTxPB4s5P/Motherhood-Beyond-Bars-%2F-Spr2022-(Copy)?node-id=6212-1439&node-type=CANVAS&t=c1VA2QufmU1WeN6E-0)
2. Firebase Access - In Bitwarden, ask Parker if you need help accessing it!

### Making Changes

When you make a change, create a new branch on the repository

## Important Changes for Fall 2024

The project was originally two parts: a web app in React and a mobile app in React Native. We are completely abandoning the React Native portion and recreating all mobile pages for web. This means that all development should be in `/web` and `/mobile` should only be used to backend endpoints and guides to create pages.

## Your development environment

> Node 16.13.1

## Getting Started: Web

```bash
cd web
npm install
npm run dev
```

### Note!

In order for the jszip library to function properly, node version >=18.12.1 must be used

### Firebase

Normally, we'd use Firebase emulator so that way we don't touch the production database. However, this is a brand new project, so for now we'll use the global database.

## Getting Started: Functions

We're using firebase functions for a couple of small things — mainly custom claims for whitelisted emails as described [here](https://stackoverflow.com/questions/46552886/firebase-authentication-with-whitelisted-email-addresses). Otherwise, we'll be writing to firebase using client-side packages and validating the data with firestore security rules.

You'll need to [install the firebase emulator](https://firebase.google.com/docs/emulator-suite) first. Then, run the following commands:

```bash
firebase login
firebase emulators:start --only functions
```

Use another terminal session to make requests, or use Postman.

## Getting Started: Docker

Both the application (web & mobile) can be ran directly in a development environment via `docker-compose`. This may simplify build environment setup as only Docker & Docker-compose need to be installed.

To run both the mobile & web appplications, simply type `docker-compose up` in the root directory.

## Getting Started: Mobile (Caretaker) [OUTDATED]
Note: the mobile repo does not work and will only be met with errors.

```bash
cd mobile
npm install
npm run start
```

You may have to install the `expo-cli` which you can do with the following command:

```bash
npm install -g expo-cli
```

To run only the web application, type `docker-compose up web` in the terminal in the same main directory

To run only the mobile application, type `docker-compose up mobile` in the terminal in the same main directory

Both appplications in the docker environment have support for live-reloading of changes made on the host machine
