# A box that already has Node installed. 20-alpine = Node 20 LTS on a
# small, lightweight Linux.
FROM node:20-alpine

# Everything below runs as if you'd cd'd into /app inside the box.
WORKDIR /app

# Copy just package.json first. Docker skips re-running npm install
# on the next build if this file hasn't changed, so rebuilds are faster.
COPY package*.json ./
RUN npm install

# Now copy the rest of the code in.
COPY . .

# Just documentation for humans and docker-compose - doesn't open
# anything by itself.
EXPOSE 3000

CMD ["npm", "start"]
