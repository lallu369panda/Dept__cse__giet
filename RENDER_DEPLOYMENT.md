# 🚀 Deploy CSE Department Website to Render

This guide will help you deploy your Next.js CSE Department website to Render with PostgreSQL.

## ✅ Prerequisites

1. **GitHub Student Pack** - Get free Render credits
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **GitHub Repository** - Your code should be pushed to GitHub

## 🗄️ Database Setup

1. **Create PostgreSQL Database**
   - Go to Render Dashboard
   - Click "New +" → "PostgreSQL"
   - Name: `cse-dept-db`
   - Plan: Free
   - Click "Create Database"

2. **Get Database URL**
   - Copy the "Internal Database URL" (for connecting services)
   - Save it for the web service setup
   - Format: `postgresql://user:pass@host:port/db`

## 🌐 Web Service Setup

1. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose `Dept__cse__giet`

2. **Configure Service**
   ```
   Name: cse-dept-website
   Environment: Node
   Region: Oregon (recommended)
   Branch: main
   Build Command: npm ci && npx prisma generate && npx prisma db push && npx prisma db seed && npm run build
   Start Command: npm start
   ```

3. **Environment Variables**
   Add these in the "Environment" section:
   ```
   DATABASE_URL=<paste-your-database-url>
   NEXTAUTH_URL=https://cse-dept-website.onrender.com
   NEXTAUTH_SECRET=<generate-32-character-secret>
   NODE_ENV=production
   NEXT_PUBLIC_APP_NAME=CSE Department - GIET
   NEXT_PUBLIC_MAX_FILE_SIZE=10485760
   NEXT_PUBLIC_ALLOWED_FILE_TYPES=application/pdf,image/jpeg,image/png
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for build to complete (~5-10 minutes)

## 🔧 Post-Deployment

1. **Initialize Database**
   - Go to your web service dashboard
   - Open "Shell" tab
   - Run: `npx prisma db push`

2. **Create Admin User**
   - Run: `npm run create-admin` (if script exists)
   - Or manually create admin through registration

## 🌐 Custom Domain (Optional)

1. Go to service settings
2. Add custom domain
3. Update `NEXTAUTH_URL` environment variable

## 📊 Monitoring

- **Logs**: Check service logs for errors
- **Metrics**: Monitor performance in dashboard
- **Health**: Service auto-restarts on failures

## 🔗 Useful Links

- **Dashboard**: https://dashboard.render.com
- **Docs**: https://render.com/docs
- **Support**: https://render.com/support

## 🚨 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
npm ci
npx prisma generate
npm run build
```

### Database Connection Issues
- Check DATABASE_URL format
- Ensure database is running
- Verify network connectivity

### Environment Variables
- All required vars are set
- No trailing spaces in values
- Restart service after changes

---

🎉 **Your CSE Department website should now be live!**

Visit: `https://your-app-name.onrender.com`