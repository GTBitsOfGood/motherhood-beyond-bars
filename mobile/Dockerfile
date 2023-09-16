# Install dependencies only when needed
FROM --platform=linux/amd64 node:16 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

FROM node:16 AS dev

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm i --save-dev @expo/ngrok@^4.1.0 expo-cli

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002
