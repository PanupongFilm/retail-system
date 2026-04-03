'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, Loader } from 'lucide-react';

const pipelineSteps = [
  { step: 1, title: 'Step 1 : Collect Customer Signals', desc: 'รวบรวมสัญญาณจากลูกค้าผ่านทุก platform เช่น Facebook, Line, TikTok เพื่อจับแนวโน้มความต้องการผลไม้และพฤติกรรมการซื้อแบบ real-time', badge: 'Active', badgeColor: 'text-[#1d8102] bg-[#f2f8f0] border border-[#1d8102]', bar: 'bg-[#1d8102]' },
  { step: 2, title: 'Step 2 : Score Product Priority', desc: 'AI จัดลำดับสินค้าผลไม้ที่ควร restock หรือโปรโมทก่อน โดยวิเคราะห์จากยอดขาย สต็อกคงเหลือ และกำไรต่อหน่วยของแต่ละรายการ', badge: 'In Progress', badgeColor: 'text-[#0073bb] bg-[#f0f8ff] border border-[#0073bb]', bar: 'bg-[#0073bb]' },
  { step: 3, title: 'Step 3 : Generate Action Plan', desc: 'สร้างแผน campaign หรือ restock อัตโนมัติ เช่น ออกโปรโมชั่นผลไม้ตาม season, แจ้งเตือนสต็อกต่ำ, หรือปรับราคาตามสภาวะตลาดผลไม้', badge: 'Pending', badgeColor: 'text-[#545b64] bg-[#f2f3f3] border border-[#aab7b8]', bar: 'bg-[#ec7211]' },
  { step: 4, title: 'Step 4 : Approve & Execute', desc: 'ผู้ขาย approve แผนที่ AI สร้างขึ้น แล้วระบบดำเนินการทันที — ตั้งแต่สั่งซื้อสต็อก ไปจนถึงยิง campaign โดยไม่ต้องทำเอง', badge: 'Pending', badgeColor: 'text-[#545b64] bg-[#f2f3f3] border border-[#aab7b8]', bar: 'bg-[#8c4fff]' },
];

const timelineSteps = [
  { label: 'Collect Signals', sublabel: 'รวบรวมสัญญาณลูกค้า', status: 'done' },
  { label: 'Score Priority', sublabel: 'จัดลำดับสินค้าผลไม้', status: 'active' },
  { label: 'Generate Plan', sublabel: 'สร้างแผน campaign/restock', status: 'pending' },
  { label: 'Approve & Execute', sublabel: 'อนุมัติและดำเนินการ', status: 'pending' },
];

const alerts = [
  {
    title: 'สต็อกแอปเปิ้ลฟูจิเหลือน้อย',
    desc: 'สต็อกแอปเปิ้ลฟูจิเหลือน้อยกว่า 10 กล่อง การเติมสต็อก 36 กล่องจะสร้างกำไรเพิ่ม (+15,000 ฿) จากแนวโน้มความต้องการที่สูงขึ้นในช่วงนี้',
    confidence: 87,
    pros: ['ความต้องการแอปเปิ้ลสูงขึ้น 32% ในช่วง 2 สัปดาห์ที่ผ่านมา', 'คู่แข่งในตลาดมีสต็อกต่ำ ทำให้มีโอกาสขายได้ราคาดีกว่าปกติ', 'ลูกค้าประจำ 12 รายสั่งซื้อแอปเปิ้ลเป็นประจำทุกสัปดาห์'],
    cons: ['ราคาต้นทุนแอปเปิ้ลปรับขึ้น 8% จากซัพพลายเออร์', 'อายุการเก็บรักษาสั้น ต้องขายให้หมดภายใน 7 วัน'],
    solution: 'สั่งซื้อแอปเปิ้ล 36 กล่องจากซัพพลายเออร์ A ในราคา 280 ฿/กล่อง และตั้งราคาขาย 700 ฿/กล่อง พร้อมทำโปรโมชั่น "ซื้อ 3 แถม 1" เพื่อระบายสต็อกให้ทันก่อนหมดอายุ',
  },
  {
    title: 'โอกาส Campaign มะม่วงช่วง Peak Season',
    desc: 'เข้าสู่ฤดูมะม่วง ราคาตลาดลดลง 25% เป็นโอกาสดีในการสั่งซื้อจำนวนมากเพื่อเพิ่มกำไร (+22,000 ฿) จากการขายส่ง',
    confidence: 79,
    pros: ['ราคาต้นทุนมะม่วงต่ำที่สุดในรอบปี เหมาะสำหรับการสั่งซื้อจำนวนมาก', 'ลูกค้าใหม่ 8 รายสนใจสั่งมะม่วงผ่าน Line OA', 'ยอดขายมะม่วงเพิ่มขึ้น 45% ในช่วงเดือนเมษายน-พฤษภาคม'],
    cons: ['ต้องการพื้นที่เก็บรักษาเพิ่มเติม ค่าใช้จ่ายเพิ่ม 1,200 ฿/เดือน', 'การแข่งขันสูงในช่วง peak season'],
    solution: 'สั่งมะม่วงน้ำดอกไม้ 50 กล่องและมะม่วงอกร่อง 30 กล่อง ทำ bundle deal กับสินค้าอื่น และโปรโมทผ่าน TikTok Live เพื่อเพิ่มยอดขายออนไลน์',
  },
  {
    title: 'ส้มโอขายดีกว่าคาด ควร Restock ด่วน',
    desc: 'ส้มโอขายดีกว่าคาด สต็อกจะหมดภายใน 3 วัน การเติมสต็อกทันทีจะป้องกันการสูญเสียยอดขาย (-8,500 ฿)',
    confidence: 93,
    pros: ['ส้มโอมีอัตราการขายสูงสุดในสัปดาห์นี้ เฉลี่ย 15 ลูก/วัน', 'ลูกค้าประจำ 5 รายสั่งจองล่วงหน้าแล้ว', 'กำไรต่อหน่วยสูงถึง 35%'],
    cons: ['ซัพพลายเออร์หลักมีสต็อกจำกัด อาจต้องสั่งจากแหล่งสำรอง'],
    solution: 'ติดต่อซัพพลายเออร์สำรอง B เพื่อสั่งส้มโอ 80 ลูกทันที และแจ้งลูกค้าที่สั่งจองไว้ว่าสินค้าจะพร้อมส่งภายใน 2 วัน',
  },
  {
    title: 'Dragon Fruit Bundle Deal กับมะม่วง',
    desc: 'AI แนะนำให้สร้าง bundle deal แก้วมังกร + มะม่วง เพื่อเพิ่ม AOV จาก 150 ฿ เป็น 280 ฿ (+87% per order)',
    confidence: 71,
    pros: ['ลูกค้าที่ซื้อแก้วมังกรมักซื้อมะม่วงด้วย (correlation 68%)', 'Bundle deal ช่วยลดต้นทุนการจัดส่งต่อออเดอร์'],
    cons: ['ต้องปรับระบบ packaging ใหม่ ใช้เวลา 2-3 วัน', 'ราคา bundle อาจสูงเกินไปสำหรับลูกค้าบางกลุ่ม'],
    solution: 'สร้าง bundle "Tropical Duo" แก้วมังกร 2 ลูก + มะม่วง 3 ลูก ราคา 259 ฿ (ปกติ 310 ฿) โปรโมทผ่าน Facebook Ads targeting กลุ่มอายุ 25-40 ปี',
  },
];

export default function AutomationPage() {
  const [currentAlert, setCurrentAlert] = useState(0);
  const alert = alerts[currentAlert];

  return (
    <div className="min-h-screen bg-[#f2f3f3] text-[#16191f] font-sans">
      <main className="max-w-[1400px] mx-auto p-4 space-y-4">

        {/* Hero Banner */}
        <section className="bg-[#232f3e] relative overflow-hidden rounded-sm shadow-sm min-h-[180px] flex items-center px-8">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Sprint Automation</h1>
            <p className="text-[#aab7b8] text-sm max-w-md leading-relaxed">
              ระบบ AI ที่ช่วยปิด Insight → Execution Gap — รู้แล้วลงมือทำได้เลย ไม่ต้องรอ
            </p>
          </div>
          {/* Scene */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
            <Image src="/sprint-automation-2.png" alt="Scene" fill className="object-cover object-left opacity-30" priority />
          </div>
          {/* Character */}
          <div className="absolute right-10 bottom-0 z-10 w-44 h-44">
            <Image src="/sprint-automation-1.png" alt="Robot" width={176} height={176} className="object-contain object-bottom drop-shadow-2xl" priority />
          </div>
        </section>

        {/* Automation Timeline */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-6 py-4 border-b border-[#eaeded] bg-[#f8f8f8]">
            <h2 className="text-lg font-bold text-[#16191f]">Automation</h2>
            <p className="text-xs text-[#545b64] mt-0.5">ติดตามสถานะ Sprint Automation Pipeline — จาก Insight สู่ Execution ในทุกขั้นตอน</p>
          </div>
          <div className="px-8 py-6">
            <div className="flex items-start justify-between relative">
              <div className="absolute top-5 left-[12%] right-[12%] h-px bg-[#eaeded] z-0"></div>
              {timelineSteps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2 z-10 w-1/4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold
                    ${step.status === 'done' ? 'bg-[#1d8102] border-[#1d8102] text-white' :
                      step.status === 'active' ? 'bg-[#0073bb] border-[#0073bb] text-white' :
                      'bg-white border-[#aab7b8] text-[#aab7b8]'}`}>
                    {step.status === 'done' ? <CheckCircle className="w-5 h-5" /> : step.status === 'active' ? <Loader className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-semibold ${step.status === 'pending' ? 'text-[#aab7b8]' : 'text-[#16191f]'}`}>{step.label}</div>
                    <div className="text-[10px] text-[#545b64] mt-0.5">{step.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline Action */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-6 py-4 border-b border-[#eaeded] bg-[#f8f8f8]">
            <h2 className="text-lg font-bold text-[#16191f]">Pipeline Action</h2>
            <p className="text-xs text-[#545b64] mt-0.5">ขั้นตอนการทำงานของ AI Pipeline ที่กำลังดำเนินการอยู่</p>
          </div>
          <div className="p-4 space-y-3">
            {pipelineSteps.map((step) => (
              <div key={step.step} className="flex items-stretch border border-[#eaeded] rounded-sm overflow-hidden bg-[#fafafa] hover:bg-[#f2f3f3] transition">
                <div className={`w-1 flex-shrink-0 ${step.bar}`}></div>
                <div className="px-4 py-3 flex-1 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold text-[#16191f]">{step.title}</div>
                    <div className="text-xs text-[#545b64] mt-1 leading-relaxed">{step.desc}</div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-sm flex-shrink-0 mt-0.5 ${step.badgeColor}`}>
                    {step.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Alert */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-6 py-4 border-b border-[#eaeded] bg-[#f8f8f8] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#16191f]">Product Alert</h2>
              <p className="text-xs text-[#545b64] mt-0.5">การแจ้งเตือนและคำแนะนำจาก AI สำหรับสินค้าที่ต้องดำเนินการ</p>
            </div>
            <span className="text-xs text-[#545b64]">{currentAlert + 1} of {alerts.length}</span>
          </div>
          <div className="p-4">
            <div className="border border-[#eaeded] rounded-sm bg-[#fafafa] p-4 space-y-4">
              {/* Header */}
              <div className="border-b border-[#eaeded] pb-3">
                <h3 className="text-base font-bold text-[#16191f]">{alert.title}</h3>
                <p className="text-sm text-[#545b64] mt-1 leading-relaxed">{alert.desc}</p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#e8f4fd] border border-[#b8d9f0] rounded-sm p-4">
                  <div className="text-xs font-bold text-[#0073bb] mb-2">Pro :</div>
                  <ul className="text-xs text-[#16191f] space-y-1.5">
                    {alert.pros.map((p, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-[#0073bb] flex-shrink-0 mt-0.5">•</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#fde8e8] border border-[#f0b8b8] rounded-sm p-4">
                  <div className="text-xs font-bold text-[#d13212] mb-2">Cons :</div>
                  <ul className="text-xs text-[#16191f] space-y-1.5">
                    {alert.cons.map((c, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className="text-[#d13212] flex-shrink-0 mt-0.5">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Business Solution */}
              <div className="bg-white border border-[#eaeded] rounded-sm p-4">
                <div className="text-xs font-bold text-[#16191f] mb-2 uppercase tracking-wide">Business Solution</div>
                <p className="text-xs text-[#545b64] leading-relaxed">{alert.solution}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[#eaeded]">
                <div className="bg-[#1d8102] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  Confident : {alert.confidence} %
                </div>
                <div className="flex gap-2">
                  <button className="px-5 py-1.5 text-xs font-bold text-white bg-[#d13212] hover:bg-[#b02a0e] rounded-full transition shadow-sm">
                    Reject
                  </button>
                  <button className="px-5 py-1.5 text-xs font-bold text-white bg-[#1d8102] hover:bg-[#1a7302] rounded-full transition shadow-sm">
                    Approve
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#eaeded]">
              <span className="text-xs text-[#545b64]">Showing {currentAlert + 1} of {alerts.length} alerts</span>
              <div className="flex gap-1">
                <button onClick={() => setCurrentAlert((p) => Math.max(0, p - 1))} disabled={currentAlert === 0}
                  className="p-1.5 border border-[#aab7b8] rounded-sm hover:bg-[#f2f3f3] disabled:opacity-30 transition">
                  <ChevronLeft className="w-4 h-4 text-[#545b64]" />
                </button>
                <button onClick={() => setCurrentAlert((p) => Math.min(alerts.length - 1, p + 1))} disabled={currentAlert === alerts.length - 1}
                  className="p-1.5 border border-[#aab7b8] rounded-sm hover:bg-[#f2f3f3] disabled:opacity-30 transition">
                  <ChevronRight className="w-4 h-4 text-[#545b64]" />
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
