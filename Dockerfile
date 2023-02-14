FROM node:18-alpine
WORKDIR /app
COPY package*.json tsconfig.json ./
#COPY .env.example .env
RUN npm install && npm cache clean --force
COPY . .
EXPOSE 4000
RUN npm run prebuild
RUN npm run build
CMD [  "npm", "run", "start:dev" ]