# 1) Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --production=false

COPY . .
RUN npm run build

# 2) Runtime stage
FROM node:18-alpine AS runtime
WORKDIR /app

# Creamos un usuario sin privilegios
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiamos sólo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Ajustamos permisos
RUN chown -R appuser:appgroup /app

# Cambiamos a usuario no-root
USER appuser

# Puerto que expone NestJS (por defecto 3000)
EXPOSE 3000

# Comando por defecto
CMD ["node", "dist/main.js"]
