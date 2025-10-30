# Step 1: Base image
FROM node:18-alpine

# Step 2: Create app directory
WORKDIR /usr/src/app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install ALL deps (including dev, needed for prisma + build)
RUN npm install

# Step 5: Copy everything else
COPY . .

# Step 6: Generate Prisma Client
RUN npx prisma generate

# Step 7: Build the NestJS app
RUN npm run build

# Step 8: Start app
CMD ["npm", "run", "start:prod"]
