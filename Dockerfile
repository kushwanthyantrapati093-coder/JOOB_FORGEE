# =============================
#       FRONTEND BUILD
# =============================
FROM node:18 AS frontend-build

WORKDIR /frontend

COPY jobforge-frontend/package*.json ./
RUN npm install

COPY jobforge-frontend/ ./
RUN npm run build



# =============================
#       BACKEND SETUP
# =============================
FROM python:3.10

WORKDIR /app

# Install python dependencies
COPY jobforge-backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY jobforge-backend /app

# Copy frontend build -> serve with backend (Static files)
COPY --from=frontend-build /frontend/dist ./static

ENV PORT=8000

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
