# 🚀 Aurora Deployment Guide

คู่มือการ Deploy Aurora Dashboard บน Vercel

## 📋 ข้อกำหนดเบื้องต้น

- บัญชี GitHub
- บัญชี Vercel (สมัครฟรีได้ที่ [vercel.com](https://vercel.com))
- Git ติดตั้งบนเครื่อง

## 🔧 ขั้นตอนการ Deploy

### 1. เตรียม Repository บน GitHub

```bash
# Initialize git (ถ้ายังไม่ได้ทำ)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Aurora Dashboard"

# Create repository on GitHub และ push
git remote add origin https://github.com/YOUR_USERNAME/aurora-dashboard.git
git branch -M main
git push -u origin main
```

### 2. Deploy บน Vercel

#### วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ)

1. เข้า [vercel.com](https://vercel.com) และ Login
2. คลิก "Add New Project"
3. Import repository จาก GitHub
4. เลือก repository `aurora-dashboard`
5. Vercel จะ detect Next.js โดยอัตโนมัติ
6. คลิก "Deploy"

#### วิธีที่ 2: ผ่าน Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### 3. ตั้งค่า Environment Variables (ถ้ามี)

ในอนาคตเมื่อต้องเชื่อมต่อกับ API จริง:

1. ไปที่ Project Settings > Environment Variables
2. เพิ่มตัวแปรที่จำเป็น:
   ```
   NEXT_PUBLIC_API_URL=https://api.example.com
   FACEBOOK_APP_ID=your_app_id
   FACEBOOK_APP_SECRET=your_app_secret
   OPENAI_API_KEY=your_openai_key
   ```

## ✅ ตรวจสอบการ Deploy

หลังจาก Deploy สำเร็จ:

1. Vercel จะให้ URL เช่น `https://aurora-dashboard.vercel.app`
2. เปิด URL และทดสอบ:
   - หน้า Login
   - Dashboard
   - AI Assistant
   - Market Scout

## 🔄 การ Update

เมื่อมีการแก้ไขโค้ด:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

Vercel จะ auto-deploy ทุกครั้งที่ push ไป main branch

## 🌐 Custom Domain (Optional)

1. ไปที่ Project Settings > Domains
2. เพิ่ม domain ของคุณ
3. ตั้งค่า DNS ตามที่ Vercel แนะนำ

## 📊 Performance Optimization

Vercel จัดการให้อัตโนมัติ:
- ✅ CDN Global
- ✅ Image Optimization
- ✅ Automatic HTTPS
- ✅ Edge Functions
- ✅ Analytics

## 🐛 Troubleshooting

### Build Failed

```bash
# ลองรันใน local ก่อน
npm run build

# ถ้ามี error แก้ไขแล้ว push ใหม่
```

### Environment Variables ไม่ทำงาน

- ตรวจสอบว่าขึ้นต้นด้วย `NEXT_PUBLIC_` สำหรับตัวแปรที่ใช้ใน client-side
- Redeploy หลังจากเพิ่ม environment variables

### Page Not Found

- ตรวจสอบ routing structure ใน `app/` directory
- ตรวจสอบว่าไฟล์ `page.tsx` อยู่ในตำแหน่งที่ถูกต้อง

## 📱 Preview Deployments

Vercel สร้าง preview URL สำหรับทุก branch และ PR:
- แต่ละ commit ได้ URL เฉพาะ
- ทดสอบได้ก่อน merge to main

## 💰 Pricing

- **Hobby Plan**: ฟรี
  - Unlimited deployments
  - 100GB bandwidth/month
  - เหมาะสำหรับ personal projects

- **Pro Plan**: $20/month
  - Unlimited bandwidth
  - Advanced analytics
  - Team collaboration

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

Happy Deploying! 🎉
