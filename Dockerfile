FROM node:12
WORKDIR /usr/src/app

# Environment variables to pass to node server
ENV PORT=3005
ENV NODE_ENV=development
ENV PGDB_URI=postgresql://postgres:postgres@db:5432/steam_game_descriptions

COPY package*.json ./
RUN npm install
# RUN npm ci --only=production
COPY . .
EXPOSE 3005
RUN npm run build
CMD npm start
