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

# Build the frontend production bundle
RUN npm run build

# Documentation of frontend port for humans and docker-compose
EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
