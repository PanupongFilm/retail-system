'use client';

import { useState } from 'react';
import { Plus, Filter, ChevronLeft, ChevronRight, Download, Upload, X, ShieldCheck, Loader2, CheckCircle2, ChevronRight as Arrow } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData: Record<string, { month: string; revenue: number; customers: number }[]> = {
  ALL: [
    { month: 'Mar', revenue: 18400, customers: 42 },
    { month: 'Apr', revenue: 22100, customers: 58 },
    { month: 'May', revenue: 19800, customers: 51 },
    { month: 'Jun', revenue: 31200, customers: 74 },
    { month: 'Jul', revenue: 28500, customers: 69 },
    { month: 'Aug', revenue: 35600, customers: 88 },
    { month: 'Sep', revenue: 41200, customers: 102 },
  ],
  FB: [
    { month: 'Mar', revenue: 8200, customers: 18 },
    { month: 'Apr', revenue: 10500, customers: 26 },
    { month: 'May', revenue: 9100, customers: 22 },
    { month: 'Jun', revenue: 14800, customers: 35 },
    { month: 'Jul', revenue: 12300, customers: 30 },
    { month: 'Aug', revenue: 16200, customers: 41 },
    { month: 'Sep', revenue: 19400, customers: 48 },
  ],
  Line: [
    { month: 'Mar', revenue: 5600, customers: 14 },
    { month: 'Apr', revenue: 6800, customers: 18 },
    { month: 'May', revenue: 6200, customers: 16 },
    { month: 'Jun', revenue: 9100, customers: 22 },
    { month: 'Jul', revenue: 8400, customers: 20 },
    { month: 'Aug', revenue: 10800, customers: 27 },
    { month: 'Sep', revenue: 12600, customers: 31 },
  ],
  TikTok: [
    { month: 'Mar', revenue: 4600, customers: 10 },
    { month: 'Apr', revenue: 4800, customers: 14 },
    { month: 'May', revenue: 4500, customers: 13 },
    { month: 'Jun', revenue: 7300, customers: 17 },
    { month: 'Jul', revenue: 7800, customers: 19 },
    { month: 'Aug', revenue: 8600, customers: 20 },
    { month: 'Sep', revenue: 9200, customers: 23 },
  ],
};

const platformData = {
  ALL: {
    metrics: [
      { title: "Total Revenue Today", subtitle: "ยอดขายรวมวันนี้", value: "฿4,850" },
      { title: "Profit", subtitle: "รายได้สุทธิ", value: "฿1,920" },
      { title: "Total Order", subtitle: "จำนวนคำสั่งซื้อ", value: "38" },
      { title: "AOV", subtitle: "ราคาเฉลี่ยต่อคำสั่งซื้อ", value: "฿127" },
      { title: "Conversion Rate", subtitle: "อัตราการเปลี่ยนมาเป็นผู้ซื้อ", value: "18%" },
      { title: "ROAS", subtitle: "รายได้ที่มาต่อค่าโฆษณา", value: "12x" },
    ],
    sideMetrics: [
      { title: "Total Revenue", subtitle: "ยอดขายรวม", value: "฿84,200" },
      { title: "Inventory Turnover Rate", subtitle: "ความเร็วในการขายสินค้า", value: "3.2", extra: "(times / month)" },
      { title: "COGS", subtitle: "ต้นทุนสินค้าที่ขายไป", value: "฿31,500" },
    ],
    products: [
      { name: "Organic Fresh Pomegranate Pack Of 3", emoji: "🍎", price: 120, stock: 12, update: "12/01/2569 12:00", status: "Active", cost: 45 },
      { name: "Fresh Mango Nam Dok Mai Grade A", emoji: "🥭", price: 35, stock: 4, update: "11/01/2569 09:30", status: "Low Stock", cost: 12 },
      { name: "Sweet Watermelon Seedless 5kg", emoji: "🍉", price: 80, stock: 20, update: "10/01/2569 14:00", status: "Active", cost: 30 },
      { name: "Dragon Fruit Red Flesh Premium", emoji: "🐉", price: 45, stock: 2, update: "09/01/2569 11:00", status: "Low Stock", cost: 18 },
      { name: "Pomelo Honey Sweet Large Size", emoji: "🍊", price: 60, stock: 15, update: "08/01/2569 16:45", status: "Active", cost: 22 },
    ],
  },
  FB: {
    metrics: [
      { title: "Total Revenue Today", subtitle: "ยอดขายรวมวันนี้", value: "฿2,100" },
      { title: "Profit", subtitle: "รายได้สุทธิ", value: "฿840" },
      { title: "Total Order", subtitle: "จำนวนคำสั่งซื้อ", value: "17" },
      { title: "AOV", subtitle: "ราคาเฉลี่ยต่อคำสั่งซื้อ", value: "฿123" },
      { title: "Conversion Rate", subtitle: "อัตราการเปลี่ยนมาเป็นผู้ซื้อ", value: "22%" },
      { title: "ROAS", subtitle: "รายได้ที่มาต่อค่าโฆษณา", value: "15x" },
    ],
    sideMetrics: [
      { title: "Total Revenue", subtitle: "ยอดขายรวม", value: "฿38,500" },
      { title: "Inventory Turnover Rate", subtitle: "ความเร็วในการขายสินค้า", value: "4.1", extra: "(times / month)" },
      { title: "COGS", subtitle: "ต้นทุนสินค้าที่ขายไป", value: "฿14,200" },
    ],
    products: [
      { name: "Organic Fresh Pomegranate Pack Of 3", emoji: "🍎", price: 120, stock: 8, update: "12/01/2569 10:00", status: "Active", cost: 45 },
      { name: "Fresh Mango Nam Dok Mai Grade A", emoji: "🥭", price: 35, stock: 3, update: "11/01/2569 08:00", status: "Low Stock", cost: 12 },
      { name: "Sweet Watermelon Seedless 5kg", emoji: "🍉", price: 80, stock: 11, update: "10/01/2569 13:00", status: "Active", cost: 30 },
      { name: "Apple Fuji Japan Premium Box", emoji: "🍏", price: 250, stock: 6, update: "09/01/2569 09:00", status: "Active", cost: 110 },
      { name: "Strawberry Fresh Korea Grade A", emoji: "🍓", price: 180, stock: 1, update: "08/01/2569 15:00", status: "Low Stock", cost: 80 },
    ],
  },
  Line: {
    metrics: [
      { title: "Total Revenue Today", subtitle: "ยอดขายรวมวันนี้", value: "฿1,450" },
      { title: "Profit", subtitle: "รายได้สุทธิ", value: "฿620" },
      { title: "Total Order", subtitle: "จำนวนคำสั่งซื้อ", value: "12" },
      { title: "AOV", subtitle: "ราคาเฉลี่ยต่อคำสั่งซื้อ", value: "฿120" },
      { title: "Conversion Rate", subtitle: "อัตราการเปลี่ยนมาเป็นผู้ซื้อ", value: "31%" },
      { title: "ROAS", subtitle: "รายได้ที่มาต่อค่าโฆษณา", value: "9x" },
    ],
    sideMetrics: [
      { title: "Total Revenue", subtitle: "ยอดขายรวม", value: "฿27,800" },
      { title: "Inventory Turnover Rate", subtitle: "ความเร็วในการขายสินค้า", value: "2.8", extra: "(times / month)" },
      { title: "COGS", subtitle: "ต้นทุนสินค้าที่ขายไป", value: "฿10,400" },
    ],
    products: [
      { name: "Pomelo Honey Sweet Large Size", emoji: "🍊", price: 60, stock: 18, update: "12/01/2569 11:30", status: "Active", cost: 22 },
      { name: "Dragon Fruit Red Flesh Premium", emoji: "🐉", price: 45, stock: 2, update: "11/01/2569 10:00", status: "Low Stock", cost: 18 },
      { name: "Banana Hom Thong Organic Bunch", emoji: "🍌", price: 55, stock: 25, update: "10/01/2569 09:00", status: "Active", cost: 20 },
      { name: "Longan Doh Maisaen Premium", emoji: "🍇", price: 90, stock: 9, update: "09/01/2569 14:00", status: "Active", cost: 35 },
      { name: "Rambutan Rong Rian Sweet", emoji: "🍒", price: 70, stock: 0, update: "08/01/2569 12:00", status: "Out of Stock", cost: 28 },
    ],
  },
  TikTok: {
    metrics: [
      { title: "Total Revenue Today", subtitle: "ยอดขายรวมวันนี้", value: "฿1,300" },
      { title: "Profit", subtitle: "รายได้สุทธิ", value: "฿460" },
      { title: "Total Order", subtitle: "จำนวนคำสั่งซื้อ", value: "9" },
      { title: "AOV", subtitle: "ราคาเฉลี่ยต่อคำสั่งซื้อ", value: "฿144" },
      { title: "Conversion Rate", subtitle: "อัตราการเปลี่ยนมาเป็นผู้ซื้อ", value: "8%" },
      { title: "ROAS", subtitle: "รายได้ที่มาต่อค่าโฆษณา", value: "7x" },
    ],
    sideMetrics: [
      { title: "Total Revenue", subtitle: "ยอดขายรวม", value: "฿17,900" },
      { title: "Inventory Turnover Rate", subtitle: "ความเร็วในการขายสินค้า", value: "1.9", extra: "(times / month)" },
      { title: "COGS", subtitle: "ต้นทุนสินค้าที่ขายไป", value: "฿6,900" },
    ],
    products: [
      { name: "Sweet Watermelon Seedless 5kg", emoji: "🍉", price: 80, stock: 9, update: "12/01/2569 13:00", status: "Active", cost: 30 },
      { name: "Dragon Fruit Red Flesh Premium", emoji: "🐉", price: 45, stock: 0, update: "11/01/2569 11:00", status: "Out of Stock", cost: 18 },
      { name: "Durian Monthong Grade A 2kg", emoji: "🌵", price: 450, stock: 5, update: "10/01/2569 10:00", status: "Active", cost: 200 },
      { name: "Mango Sticky Rice Bundle Set", emoji: "🥭", price: 95, stock: 14, update: "09/01/2569 16:00", status: "Active", cost: 40 },
      { name: "Coconut Fresh Young Drink", emoji: "🥥", price: 35, stock: 3, update: "08/01/2569 14:30", status: "Low Stock", cost: 12 },
    ],
  },
} as const;

type Platform = keyof typeof platformData;

type OAuthStep = 'select' | 'permission' | 'connecting' | 'success';

const platformOptions = [
  {
    id: 'meta',
    name: 'Meta (Facebook & Instagram)',
    icon: '/meta-icon.png',
    color: '#1877F2',
    bg: '#e7f0fd',
    border: '#b8d0f7',
    perms: ['จัดการโฆษณา Facebook Ads', 'อ่านข้อมูล Page Insights', 'เข้าถึง Instagram Business', 'ดูรายงานยอดขาย Marketplace'],
  },
  {
    id: 'line',
    name: 'Line OA',
    icon: '/line-icon.png',
    color: '#06C755',
    bg: '#e6f9ed',
    border: '#b2ecc8',
    perms: ['อ่านข้อมูลผู้ติดตาม', 'ส่ง/รับข้อความ', 'ดูสถิติ Broadcast', 'เข้าถึง Line Shopping'],
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    icon: '/tiktok-icon.png',
    color: '#010101',
    bg: '#f0f0f0',
    border: '#d0d0d0',
    perms: ['จัดการสินค้าใน TikTok Shop', 'ดูสถิติ Live & Video', 'เข้าถึงข้อมูลคำสั่งซื้อ', 'รายงาน Affiliate'],
  },
];

function AddPlatformModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<OAuthStep>('select');
  const [selected, setSelected] = useState<typeof platformOptions[0] | null>(null);

  const handleConnect = () => {
    setStep('connecting');
    setTimeout(() => setStep('success'), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-sm shadow-xl w-full max-w-md overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="px-5 py-4 border-b border-[#eaeded] bg-[#f8f8f8] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#16191f]">เชื่อมต่อ Platform</h2>
            <p className="text-[10px] text-[#545b64] mt-0.5">
              {step === 'select' && 'เลือก platform ที่ต้องการเชื่อมต่อ'}
              {step === 'permission' && `ตรวจสอบสิทธิ์การเข้าถึง — ${selected?.name}`}
              {step === 'connecting' && 'กำลังเชื่อมต่อผ่าน OAuth...'}
              {step === 'success' && 'เชื่อมต่อสำเร็จแล้ว'}
            </p>
          </div>
          <button onClick={onClose} className="text-[#aab7b8] hover:text-[#16191f] transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step: select */}
        {step === 'select' && (
          <div className="p-5 space-y-2">
            {platformOptions.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelected(p); setStep('permission'); }}
                className="w-full flex items-center gap-3 px-4 py-3 border border-[#eaeded] rounded-sm hover:border-[#0073bb] hover:bg-[#f0f8ff] transition group text-left"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ backgroundColor: p.color }}>
                  {p.name[0]}
                </div>
                <span className="text-sm font-semibold text-[#16191f] flex-1">{p.name}</span>
                <Arrow className="w-4 h-4 text-[#aab7b8] group-hover:text-[#0073bb] transition" />
              </button>
            ))}
            <p className="text-[10px] text-[#aab7b8] text-center pt-2">ระบบจะนำคุณไปยังหน้า OAuth ของแต่ละ platform เพื่อยืนยันสิทธิ์</p>
          </div>
        )}

        {/* Step: permission */}
        {step === 'permission' && selected && (
          <div className="p-5 space-y-4">
            {/* Fake browser bar */}
            <div className="border border-[#eaeded] rounded-sm overflow-hidden">
              <div className="bg-[#f2f3f3] px-3 py-2 flex items-center gap-2 border-b border-[#eaeded]">
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#d13212]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#e8a838]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1d8102]" />
                </div>
                <div className="flex-1 bg-white border border-[#eaeded] rounded-sm px-2 py-1 text-[10px] text-[#545b64] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#1d8102]" />
                  <span>https://www.{selected.id === 'meta' ? 'facebook' : selected.id}.com/oauth/authorize?client_id=...</span>
                </div>
              </div>

              <div className="p-4 space-y-3" style={{ backgroundColor: selected.bg }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: selected.color }}>
                    {selected.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#16191f]">{selected.name}</div>
                    <div className="text-[10px] text-[#545b64]">ขอสิทธิ์เข้าถึงแอป <span className="font-semibold text-[#16191f]">SprintRetail</span></div>
                  </div>
                </div>

                <div className="bg-white rounded-sm border p-3 space-y-2" style={{ borderColor: selected.border }}>
                  <p className="text-[10px] font-bold text-[#16191f] uppercase tracking-wide">SprintRetail จะได้รับสิทธิ์ :</p>
                  {selected.perms.map((perm, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#16191f]">
                      <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selected.color }} />
                      {perm}
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-[#545b64] leading-relaxed">
                  การอนุญาตนี้จะช่วยให้ SprintRetail ดึงข้อมูลยอดขาย โฆษณา และรายงานจาก {selected.name} โดยอัตโนมัติ
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep('select')} className="flex-1 py-2 text-xs font-bold border border-[#aab7b8] text-[#545b64] hover:bg-[#f2f3f3] rounded-sm transition">
                ยกเลิก
              </button>
              <button
                onClick={handleConnect}
                className="flex-1 py-2 text-xs font-bold text-white rounded-sm transition"
                style={{ backgroundColor: selected.color }}
              >
                อนุญาตและเชื่อมต่อ
              </button>
            </div>
          </div>
        )}

        {/* Step: connecting */}
        {step === 'connecting' && (
          <div className="p-10 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-[#0073bb] animate-spin" />
            <div className="text-center">
              <p className="text-sm font-bold text-[#16191f]">กำลังเชื่อมต่อกับ {selected?.name}</p>
              <p className="text-xs text-[#545b64] mt-1">ยืนยัน token และตั้งค่า webhook...</p>
            </div>
            <div className="w-full bg-[#eaeded] rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-[#0073bb] rounded-full animate-[progress_2.2s_ease-in-out_forwards]" style={{ width: '80%' }} />
            </div>
          </div>
        )}

        {/* Step: success */}
        {step === 'success' && selected && (
          <div className="p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-[#e8f5e9] border-2 border-[#1d8102] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-[#1d8102]" />
            </div>
            <div>
              <p className="text-base font-bold text-[#16191f]">เชื่อมต่อสำเร็จ!</p>
              <p className="text-xs text-[#545b64] mt-1">{selected.name} ถูกเพิ่มเข้าระบบแล้ว<br/>ข้อมูลจะซิงค์ภายใน 5–10 นาที</p>
            </div>
            <div className="w-full bg-[#f0faf0] border border-[#b2ecc8] rounded-sm p-3 text-left space-y-1">
              {['ยืนยัน Access Token', 'ลงทะเบียน Webhook', 'ดึงข้อมูลย้อนหลัง 30 วัน'].map((t, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-[#1d8102]">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> {t}
                </div>
              ))}
            </div>
            <button onClick={onClose} className="mt-1 w-full py-2 text-xs font-bold text-white bg-[#1d8102] hover:bg-[#1a7302] rounded-sm transition">
              เสร็จสิ้น
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const statusStyle: Record<string, string> = {
  Active: 'text-[#1d8102]',
  'Low Stock': 'text-[#d13212]',
  'Out of Stock': 'text-[#545b64]',
};
const statusDot: Record<string, string> = {
  Active: 'bg-[#1d8102]',
  'Low Stock': 'bg-[#d13212]',
  'Out of Stock': 'bg-[#aab7b8]',
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Platform>('ALL');
  const [showAddPlatform, setShowAddPlatform] = useState(false);
  const data = platformData[activeTab];

  const exportCSV = () => {
    const headers = ['Product Name', 'Price (฿)', 'Stock', 'Last Update', 'Status', 'Cost (฿)'];
    const rows = data.products.map(p => [
      `"${p.name}"`, p.price, p.stock, p.update, p.status, p.cost
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-list-${activeTab}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f2f3f3] text-[#16191f] font-sans">
      {showAddPlatform && <AddPlatformModal onClose={() => setShowAddPlatform(false)} />}
      <main className="max-w-[1600px] mx-auto p-4 space-y-4">

        {/* Platform Section */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8] flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-[#16191f]">Platform</h2>
              <p className="text-xs text-[#545b64]">Sprint รวบรวมข้อมูลจาก Facebook Ads, Line OA, TikTok Shop — เลือก platform เพื่อดูข้อมูลเฉพาะช่องทาง</p>
            </div>
            <button
              onClick={() => setShowAddPlatform(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-[#0073bb] text-white hover:bg-[#005f99] rounded-sm shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Platform
            </button>
          </div>
          <div className="px-4 pt-2 pb-0 flex gap-0">
            {(Object.keys(platformData) as Platform[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#ec7211] text-[#ec7211]'
                    : 'border-transparent text-[#545b64] hover:text-[#16191f] hover:border-[#aab7b8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Top Metrics */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {data.metrics.map((metric, idx) => (
            <div key={idx} className="bg-white border border-[#eaeded] rounded-sm shadow-sm flex flex-col justify-between">
              <div className="px-4 pt-3 pb-1 border-b border-[#eaeded]">
                <h3 className="text-xs font-bold text-[#16191f] leading-tight">{metric.title}</h3>
                <p className="text-[10px] text-[#545b64] mt-0.5">{metric.subtitle}</p>
              </div>
              <div className="px-4 py-3 text-2xl font-light text-right text-[#16191f]">{metric.value}</div>
            </div>
          ))}
        </section>

        {/* Analytics */}
        <section className="flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-60 space-y-3 flex-shrink-0">
            {data.sideMetrics.map((metric, idx) => (
              <div key={idx} className="bg-white border border-[#eaeded] rounded-sm shadow-sm">
                <div className="px-4 pt-3 pb-1 border-b border-[#eaeded]">
                  <h3 className="text-xs font-bold text-[#16191f]">{metric.title}</h3>
                  <p className="text-[10px] text-[#545b64] leading-tight mt-0.5">{metric.subtitle}</p>
                  {'extra' in metric && metric.extra && <p className="text-[10px] text-[#545b64]">{metric.extra}</p>}
                </div>
                <div className="px-4 py-3 text-2xl font-light text-right text-[#16191f]">{metric.value}</div>
              </div>
            ))}
          </div>

          <div className="flex-1 bg-white border border-[#eaeded] rounded-sm shadow-sm flex flex-col">
            <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8] flex justify-between items-center">
              <div>
                <span className="text-sm font-bold text-[#16191f]">Revenue Trend</span>
                <p className="text-[10px] text-[#545b64] mt-0.5">แนวโน้มรายได้และลูกค้าใหม่รายเดือน</p>
              </div>
              <div className="flex bg-white border border-[#eaeded] rounded-sm overflow-hidden">
                {['7 Week', '6 Month', '3 Years'].map((time, i) => (
                  <button key={time} className={`px-3 py-1 text-xs font-medium transition ${i === 1 ? 'bg-[#0073bb] text-white' : 'text-[#545b64] hover:bg-[#f2f3f3]'}`}>
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 p-4 min-h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData[activeTab]} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#0073bb" />
                      <stop offset="100%" stopColor="#00a8e8" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#eaeded" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#545b64' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#545b64' }} axisLine={false} tickLine={false} width={48} tickFormatter={(v) => `฿${(v/1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ fontSize: 12, border: '1px solid #d1e8f5', borderRadius: 4, backgroundColor: '#f0f8ff' }}
                    labelStyle={{ color: '#0073bb', fontWeight: 700 }}
                    formatter={(value, name) => [
                      name === 'revenue' ? `฿${Number(value).toLocaleString()}` : value,
                      name === 'revenue' ? 'Revenue' : 'New Customers'
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} formatter={(v) => v === 'revenue' ? 'Revenue' : 'New Customers'} />
                  <Line type="monotone" dataKey="revenue" stroke="url(#lineGlow)" strokeWidth={2.5} dot={{ r: 4, fill: '#0073bb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6, fill: '#0073bb' }} />
                  <Line type="monotone" dataKey="customers" stroke="#7ec8e3" strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: '#7ec8e3', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 5, fill: '#7ec8e3' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Product List */}
        <section className="bg-white border border-[#eaeded] rounded-sm shadow-sm">
          <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8] flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-[#16191f]">Product List</h2>
              <p className="text-xs text-[#545b64]">รายการสินค้าใน {activeTab === 'ALL' ? 'ทุก Platform' : activeTab}</p>
            </div>
            <div className="flex gap-2 items-center">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#545b64] border border-[#aab7b8] hover:bg-[#f2f3f3] rounded-sm transition">
                <Filter className="w-3 h-3" /> Filter
              </button>
              {['Low Stock', 'Top Selling', 'Latest Update'].map(f => (
                <button key={f} className="px-3 py-1.5 text-xs font-medium bg-[#f2f3f3] border border-[#aab7b8] text-[#16191f] hover:bg-[#e9ebed] rounded-sm transition">
                  {f}
                </button>
              ))}
              <div className="w-px h-5 bg-[#eaeded] mx-1"></div>
              <label className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0073bb] border border-[#0073bb] hover:bg-[#f0f8ff] rounded-sm transition cursor-pointer">
                <Upload className="w-3 h-3" /> Import CSV
                <input type="file" accept=".csv" className="hidden" onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) alert(`นำเข้าไฟล์: ${file.name}\n(Demo mode — ข้อมูลจะถูก process ในระบบจริง)`);
                  e.target.value = '';
                }} />
              </label>
              <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#1d8102] hover:bg-[#1a7302] border border-[#1d8102] rounded-sm transition">
                <Download className="w-3 h-3" /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#fafafa] border-b border-[#eaeded] text-[#545b64] text-xs font-bold uppercase">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Price (฿)</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Last Update</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Cost (฿)</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeded]">
                {data.products.map((product, idx) => (
                  <tr key={idx} className="hover:bg-[#f9f9f9] transition">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#f2f3f3] border border-[#eaeded] rounded-sm flex items-center justify-center text-base">
                        {product.emoji}
                      </div>
                      <span className="font-medium text-[#0073bb] hover:underline cursor-pointer text-sm">{product.name}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.price}</td>
                    <td className="px-4 py-3 text-sm">{product.stock}</td>
                    <td className="px-4 py-3 text-xs text-[#545b64]">{product.update}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold ${statusStyle[product.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[product.status]}`}></span>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.cost}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="px-3 py-1.5 text-xs font-bold text-white bg-[#0073bb] hover:bg-[#005f99] rounded-sm transition shadow-sm">
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t border-[#eaeded] bg-[#fafafa] flex justify-between items-center">
            <span className="text-xs text-[#545b64]">Showing 5 of 10 products</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 border border-[#aab7b8] rounded-sm hover:bg-[#f2f3f3] transition">
                <ChevronLeft className="w-4 h-4 text-[#545b64]" />
              </button>
              {[1, 2, 3].map(n => (
                <button key={n} className={`w-7 h-7 text-xs font-medium border rounded-sm transition ${n === 1 ? 'bg-[#0073bb] text-white border-[#0073bb]' : 'border-[#aab7b8] text-[#545b64] hover:bg-[#f2f3f3]'}`}>
                  {n}
                </button>
              ))}
              <button className="p-1.5 border border-[#aab7b8] rounded-sm hover:bg-[#f2f3f3] transition">
                <ChevronRight className="w-4 h-4 text-[#545b64]" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
