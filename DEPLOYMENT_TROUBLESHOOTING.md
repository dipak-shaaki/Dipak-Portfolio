# 🔧 Deployment Troubleshooting Guide

## **Fixed Issues**

### ✅ **MongoDB Environment Variable Error**
**Problem:** `Error: Invalid/Missing environment variable: "MONGODB_URI"`

**Solution:** Updated the code to handle missing environment variables gracefully:
- MongoDB connection now uses fallback during build
- API routes work with or without MongoDB
- Contact form works even without database

---

## **Common Deployment Issues & Solutions**

### **1. Build Fails During Deployment**

**Symptoms:**
- Build error in Vercel/Netlify
- Environment variable errors
- TypeScript compilation errors

**Solutions:**
```bash
# Test build locally first
pnpm build

# Check for TypeScript errors
pnpm type-check

# Verify all dependencies are installed
pnpm install
```

### **2. Environment Variables Not Working**

**Symptoms:**
- Contact form doesn't work
- Database connection fails
- Email not sending

**Solutions:**
1. **In Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add all required variables:
   ```
   MONGODB_URI=mongodb+srv://...
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

2. **Redeploy after adding variables:**
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

### **3. Contact Form Not Working**

**Symptoms:**
- Form submits but no email received
- No database entries
- Console errors

**Solutions:**
1. **Check Gmail Setup:**
   - Enable 2FA on Gmail
   - Generate App Password
   - Use App Password (not regular password)

2. **Check MongoDB Setup:**
   - Verify connection string format
   - Ensure IP whitelist includes `0.0.0.0/0`
   - Check database user permissions

3. **Test API directly:**
   ```bash
   curl -X POST https://your-site.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","message":"Test message"}'
   ```

### **4. GitHub Links Not Working**

**Symptoms:**
- Clicking project names doesn't open GitHub
- Links open wrong repositories

**Solutions:**
1. **Update GitHub URLs in `components/work-item.tsx`:**
   ```typescript
   const githubUrls = {
     1: "https://github.com/dipak-shaaki/sama-health-platform",
     2: "https://github.com/dipak-shaaki/bhoomi-pranali",
     3: "https://github.com/dipak-shaaki/forest-fire-detection",
   }
   ```

2. **Verify repository URLs are correct**
3. **Test links in browser console**

### **5. Images Not Loading**

**Symptoms:**
- Profile images don't display
- Broken image links

**Solutions:**
1. **Check image paths:**
   - Verify images are in `public/images/`
   - Use correct paths: `/images/profile.jpg`

2. **Optimize images:**
   - Compress large images
   - Use WebP format if possible

### **6. Performance Issues**

**Symptoms:**
- Slow loading times
- Large bundle size

**Solutions:**
1. **Optimize images:**
   ```bash
   # Install image optimization
   pnpm add sharp
   ```

2. **Check bundle size:**
   ```bash
   pnpm build
   # Look for large chunks in output
   ```

---

## **Deployment Checklist**

### **Before Deploying:**
- [ ] `pnpm build` succeeds locally
- [ ] No TypeScript errors
- [ ] Contact form works locally
- [ ] All images load correctly
- [ ] GitHub links work

### **After Deploying:**
- [ ] Site loads without errors
- [ ] Contact form sends emails
- [ ] Messages saved to database
- [ ] Navigation works
- [ ] Responsive design works
- [ ] Performance is good

---

## **Environment Variables Reference**

### **Required for Full Functionality:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### **Optional (for basic functionality):**
- If MongoDB is not set up, contact form will still work with fallback storage
- If email is not set up, form will still save messages

---

## **Quick Fixes**

### **If Build Still Fails:**
1. **Remove MongoDB dependency temporarily:**
   ```bash
   pnpm remove mongodb mongoose
   ```

2. **Deploy without database:**
   - Contact form will use fallback storage
   - Add MongoDB later

### **If Contact Form Doesn't Work:**
1. **Test without email first:**
   - Remove SMTP variables
   - Test form submission
   - Check browser console for errors

2. **Add email gradually:**
   - Set up Gmail App Password
   - Add SMTP variables one by one

---

## **Support Resources**

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.mongodb.com/atlas](https://docs.mongodb.com/atlas)
- **Gmail App Passwords**: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

## **Emergency Fallback**

If nothing works, you can deploy a simplified version:

1. **Remove database and email temporarily**
2. **Deploy basic portfolio**
3. **Add features back one by one**

The portfolio will still look professional and showcase your work!
