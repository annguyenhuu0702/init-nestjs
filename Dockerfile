# Stage 1: Build stage
FROM node:18.17.1-alpine AS builder

# Đặt thư mục làm việc
WORKDIR /usr/src/app

# Copy các file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies của ứng dụng
RUN npm install

# Copy toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Build ứng dụng
RUN npm run build

# Stage 2: Final stage
FROM node:18.17.1-alpine

# Đặt thư mục làm việc
WORKDIR /usr/src/app

# Copy chỉ các file cần thiết từ build stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/tsconfig.json ./

# Chạy ứng dụng
CMD ["npm", "run", "start:prod"]
