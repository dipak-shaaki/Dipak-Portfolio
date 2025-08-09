# 🌐 Custom Domain Setup Guide

## **Free Domain Options**

### **Option 1: Freenom (Free)**
1. Go to [freenom.com](https://freenom.com)
2. Search for available domains (`.tk`, `.ml`, `.ga`, `.cf`, `.gq`)
3. Register for free (12 months, renewable)
4. Example: `dipak.tk` or `dipak.ml`

**Pros:** Completely free
**Cons:** Less professional, some networks block them

### **Option 2: GitHub Pages (Free)**
1. Deploy to GitHub Pages instead of Vercel
2. Use custom domain: `dipak.github.io`
3. Add CNAME record for custom domain

**Pros:** Free hosting + domain
**Cons:** Limited to static sites

---

## **Affordable Professional Domains**

### **Option 3: Cheap .com Domains**
1. **Namecheap**: $8-12/year
   - Go to [namecheap.com](https://namecheap.com)
   - Search for `dipak.com`
   - Purchase domain

2. **GoDaddy**: $10-15/year
   - Go to [godaddy.com](https://godaddy.com)
   - Search for available domains
   - Purchase domain

3. **Google Domains**: $12/year
   - Go to [domains.google](https://domains.google)
   - Search and purchase

### **Option 4: Nepal-Specific Domains**
1. **Mercantile**: `.com.np` for $15-20/year
   - Go to [mercantile.com.np](https://mercantile.com.np)
   - Search for `dipak.com.np`

2. **Websoft**: `.com.np` for $15-25/year
   - Go to [websoft.com.np](https://websoft.com.np)
   - Search for available domains

---

## **Setting Up Custom Domain with Vercel**

### **Step 1: Purchase Domain**
1. Choose your domain provider
2. Purchase the domain
3. Note down the domain registrar's DNS settings

### **Step 2: Add Domain to Vercel**
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Settings" → "Domains"
4. Add your domain (e.g., `dipak.com` or `dipak.com.np`)
5. Vercel will provide DNS records

### **Step 3: Update DNS Records**
1. Go to your domain registrar's DNS settings
2. Add the DNS records provided by Vercel:

**For Vercel, you'll need:**
```
Type: A
Name: @
Value: 76.76.19.34
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### **Step 4: Wait for Propagation**
- DNS changes take 24-48 hours to propagate
- Your site will be available at your custom domain

---

## **Free Domain Providers Comparison**

| Provider | Free Domains | Cost | Professional Look |
|----------|--------------|------|-------------------|
| **Freenom** | `.tk`, `.ml`, `.ga`, `.cf`, `.gq` | Free | ⭐⭐ |
| **GitHub Pages** | Custom subdomain | Free | ⭐⭐⭐ |
| **Namecheap** | `.com` | $8-12/year | ⭐⭐⭐⭐⭐ |
| **GoDaddy** | `.com` | $10-15/year | ⭐⭐⭐⭐⭐ |
| **Mercantile** | `.com.np` | $15-20/year | ⭐⭐⭐⭐⭐ |

---

## **Recommended Approach**

### **For Professional Portfolio:**
1. **Buy a cheap .com domain** ($8-12/year)
   - Example: `dipak.dev` or `dipak-portfolio.com`
   - Most professional option
   - Widely recognized

2. **Set up with Vercel** (as shown above)
3. **Total cost**: ~$10-15/year

### **For Budget Option:**
1. **Use Freenom** for free domain
   - Example: `dipak.tk`
   - Completely free
   - Less professional but functional

### **For Nepal-Specific:**
1. **Buy .com.np domain** ($15-25/year)
   - Example: `dipak.com.np`
   - Shows local presence
   - Professional for Nepal market

---

## **Quick Setup Commands**

### **If using Freenom (Free):**
1. Register at [freenom.com](https://freenom.com)
2. Get free domain (e.g., `dipak.tk`)
3. Add to Vercel as shown above

### **If buying .com domain:**
1. Go to [namecheap.com](https://namecheap.com)
2. Search for `dipak.com` or similar
3. Purchase for ~$10/year
4. Add to Vercel

---

## **Cost Comparison**

| Option | Domain | Cost/Year | Professional |
|--------|--------|-----------|-------------|
| **Freenom** | `dipak.tk` | Free | ⭐⭐ |
| **Namecheap** | `dipak.com` | $10 | ⭐⭐⭐⭐⭐ |
| **Mercantile** | `dipak.com.np` | $20 | ⭐⭐⭐⭐⭐ |

---

## **Final Recommendation**

**For a professional portfolio, I recommend:**

1. **Buy a .com domain** from Namecheap (~$10/year)
2. **Set it up with Vercel** (free hosting)
3. **Total cost**: ~$10/year for professional domain

**This gives you:**
- ✅ Professional domain name
- ✅ Free hosting with Vercel
- ✅ SSL certificate included
- ✅ Global CDN
- ✅ Professional email forwarding

**Alternative:** If you want to start free, use Freenom for now and upgrade later!

