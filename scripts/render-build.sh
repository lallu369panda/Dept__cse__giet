#!/bin/bash

# Render deployment script for CSE Department Website
echo "🚀 Starting CSE Department Website deployment on Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma db push --accept-data-loss

# Seed the database (optional)
echo "🌱 Seeding database with initial data..."
if [ -f "prisma/seed.ts" ]; then
    npm run db:seed || echo "⚠️ Seed failed or no seed data needed"
else
    echo "⚠️ No seed file found, skipping..."
fi

# Build the application
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Deployment preparation completed successfully!"
echo "🎉 Your CSE Department website is ready for Render!"