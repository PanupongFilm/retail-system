# Quick Start Guide - BizIntel Pro

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Open Application
Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Try the Demo Features

### 1. AI Assistant Demo Flow
1. Navigate to the home page (AI Assistant)
2. Type: **"I want to create an apple campaign on facebook"**
3. Watch the AI:
   - Ask clarifying questions
   - Pull and analyze data
   - Calculate business metrics (ROAS, Conversion Rate, LTV, CAC)
   - Provide recommendations with pros/cons
   - Request confirmation before execution

### 2. Explore the Dashboard
1. Click "Dashboard" in the sidebar
2. View:
   - Total revenue, profit, and units sold
   - Business metrics overview
   - Platform performance (Facebook, Shopee, Lazada)
   - Product-level analytics

### 3. Market Scout
1. Click "Market Scout" in the sidebar
2. **Trend Discovery Mode**:
   - Browse trending products
   - See search volumes and growth rates
   - Check estimated profit margins
3. **Value Validation Mode**:
   - Enter a product name (e.g., "Wireless Bluetooth Speaker")
   - Click "Validate"
   - Get market acceptance score and insights

### 4. Automation Center
1. Click "Automation" in the sidebar
2. Review pending AI-detected tasks
3. Approve or reject recommendations
4. Watch tasks execute automatically

## 🎯 Key Features to Demonstrate

### AI Business Assistant
- **Natural Language Processing**: Chat naturally about your business
- **Data Analysis**: Simulates pulling data from multiple sources
- **Business Metrics**: Calculates ROAS, Conversion Rate, LTV, CAC
- **Recommendations**: Provides actionable insights with pros/cons
- **Explanations**: Explains the reasoning behind every recommendation

### Dashboard Analytics
- **Multi-Platform Tracking**: Facebook, Shopee, Lazada
- **Product Performance**: Individual product analytics
- **Profit Margins**: Real-time profit calculations
- **Growth Indicators**: Track performance trends

### Market Intelligence
- **Trend Discovery**: Find trending products before competitors
- **Market Validation**: Validate product ideas with AI
- **Risk Assessment**: Understand potential risks and opportunities
- **Margin Estimation**: Get profit margin estimates

### Smart Automation
- **AI Detection**: System identifies actions needed
- **Approval Workflow**: You stay in control
- **Priority Management**: High/Medium/Low priority tasks
- **Impact Analysis**: See expected results before execution

## 💡 Demo Scenarios

### Scenario 1: Campaign Planning
```
You: "I want to create an apple campaign on facebook"
AI: Asks questions → Analyzes data → Provides recommendation
Result: Complete campaign strategy with budget, targeting, and expected ROI
```

### Scenario 2: Product Validation
```
Navigate to Market Scout → Value Validation
Enter: "Smart Watch"
Result: Market acceptance score, competition analysis, risk assessment
```

### Scenario 3: Automation Approval
```
Navigate to Automation Center
Review: "Low Stock Alert - Apple AirPods Pro"
Action: Approve reorder → System executes automatically
```

## 🏗️ Application Structure

```
/ (Home)              → AI Business Assistant
/dashboard            → Business Analytics Dashboard
/market-scout         → Market Trend Discovery & Validation
/automation           → AI-Powered Task Automation
```

## 📊 Mocked Data Overview

The demo uses realistic mocked data:
- **Sales Data**: 5 sample transactions across platforms
- **Business Metrics**: ROAS 3.2x, Conversion 4.5%, LTV ฿2,500
- **Trending Products**: 3 products with growth metrics
- **Automation Tasks**: 4 pending action items

## 🚢 Deploy to Vercel

### Quick Deploy (3 steps):
1. Push to GitHub
2. Import in Vercel
3. Deploy (automatic)

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔧 Customization

### Change Mocked Data
Edit `lib/mockData.ts` to customize:
- Sales data
- Business metrics
- Trending products
- Automation tasks

### Add New Pages
Create new files in `app/` directory:
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page Content</div>
}
```

### Modify Sidebar
Edit `components/Sidebar.tsx` to add/remove navigation items.

## 🎨 Styling

The application uses Tailwind CSS. Customize colors and styles in:
- `app/globals.css` - Global styles
- Component files - Component-specific styles

## 📝 Next Steps

1. **Test the Demo**: Try all features to understand the flow
2. **Review Code**: Examine component structure and logic
3. **Deploy**: Follow deployment guide to publish online
4. **Customize**: Modify mocked data and styling
5. **Integrate**: Connect real data sources when ready

## ⚡ Performance Tips

- The app is optimized for fast loading
- All data is mocked (no API calls)
- Client-side rendering for interactive features
- Responsive design works on all devices

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### TypeScript Errors
```bash
# Check for type errors
npm run build
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

---

**Ready to explore? Start with the AI Assistant and type your first query!** 🚀
