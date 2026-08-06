FROM node:22-alpine
WORKDIR /opt/app
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
RUN npm run build
EXPOSE 1337
CMD ["npm", "run", "start"]
