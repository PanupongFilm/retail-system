'use client';

import { useState } from 'react';
import { Plus, Filter, ChevronLeft, ChevronRight, Download, Upload } from 'lucide-react';
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
      <main className="max-w-[1600px] mx-auto p-4 space-y-4">

        {/* Platform Section */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8] flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-[#16191f]">Platform</h2>
              <p className="text-xs text-[#545b64]">Sprint รวบรวมข้อมูลจาก Facebook Ads, Line OA, TikTok Shop — เลือก platform เพื่อดูข้อมูลเฉพาะช่องทาง</p>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold bg-[#0073bb] text-white hover:bg-[#005f99] rounded-sm shadow-sm transition">
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
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#545b64] border border-[#aab7b8] hover:bg-[#f2f3f3] rounded-sm transition">
                <Filter className="w-3 h-3" /> Filter
              </button>
              {['Low Stock', 'Top Selling', 'Latest Update'].map(f => (
                <button key={f} className="px-3 py-1.5 text-xs font-medium bg-[#f2f3f3] border border-[#aab7b8] text-[#16191f] hover:bg-[#e9ebed] rounded-sm transition">
                  {f}
                </button>
              ))}
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
