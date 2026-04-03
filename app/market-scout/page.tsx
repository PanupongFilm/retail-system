'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, ExternalLink, Upload, CheckCircle } from 'lucide-react';

const trendingProducts = [
  { name: 'ส้มนำเข้าจากจีน', category: 'ผลไม้นำเข้า', trend: '+32%', volume: 89, score: 96, risk: 25, reward: 82, desc: 'ตลาด social commerce ฮิตติดเทรนด์และมีผู้แข่งขันกำลังเบาบาง', source: 'Google Trends + Shopee', detail: 'ความต้องการสูงขึ้นต่อเนื่อง 3 เดือน มีการค้นหาเพิ่มขึ้น 32% ใน Google Trends ราคาต้นทุนต่ำ margin สูงถึง 45%' },
  { name: 'แอปเปิ้ลฟูจิญี่ปุ่น', category: 'ผลไม้พรีเมียม', trend: '+18%', volume: 74, score: 81, risk: 40, reward: 75, desc: 'กลุ่มลูกค้า premium กำลังซื้อสูง แต่มีคู่แข่งรายใหญ่อยู่แล้ว', source: 'Google Trends + Lazada', detail: 'ยอดขายใน Lazada เพิ่ม 18% QoQ กลุ่มเป้าหมายอายุ 28-45 ปี รายได้ปานกลาง-สูง' },
  { name: 'มะม่วงน้ำดอกไม้ออร์แกนิค', category: 'ผลไม้ไทย', trend: '+45%', volume: 92, score: 88, risk: 20, reward: 88, desc: 'กระแส healthy eating ดันยอดขายพุ่ง เหมาะกับ TikTok Live', source: 'TikTok Trends + Shopee', detail: 'Hashtag #มะม่วงออร์แกนิค มียอดวิว 12M ใน TikTok ราคาขายได้สูงกว่าปกติ 60%' },
  { name: 'ทุเรียนมันทองแช่แข็ง', category: 'ผลไม้แปรรูป', trend: '+28%', volume: 67, score: 72, risk: 55, reward: 70, desc: 'ตลาดส่งออกจีนโต แต่ต้นทุนสูงและต้องการ cold chain', source: 'Google Trends', detail: 'ความต้องการจากลูกค้าจีนในไทยสูง แต่ต้องลงทุน cold storage เพิ่มเติม' },
  { name: 'สตรอว์เบอร์รีเกาหลี', category: 'ผลไม้นำเข้า', trend: '+61%', volume: 95, score: 91, risk: 35, reward: 90, desc: 'viral ใน TikTok ราคาพรีเมียม margin สูง แต่อายุสั้น', source: 'TikTok Trends + Google', detail: 'Viral content ทำให้ demand พุ่ง 61% ใน 2 สัปดาห์ ราคาขายได้ 180-250 บาท/กล่อง' },
];

const validateMockResult = {
  name: 'ส้มสายน้ำผึ้งเชียงใหม่',
  score: 84,
  risk: 30,
  reward: 78,
  marketSize: '฿2.4M/เดือน',
  competition: 'ปานกลาง',
  marginEst: '38-45%',
  desc: 'ตลาดไทยรับได้ดี มีฐานลูกค้าประจำ เหมาะกับช่องทาง Line OA และ Facebook',
  pros: ['ความต้องการในตลาดสูงต่อเนื่อง', 'Margin ดี 38-45%', 'ลูกค้าซื้อซ้ำสูง (retention 68%)'],
  cons: ['มีคู่แข่งในตลาดอยู่แล้ว 12 ราย', 'ฤดูกาลมีผลต่อราคาต้นทุน'],
  recommendation: 'แนะนำให้เริ่มด้วย batch เล็ก 20-30 กล่อง ทดสอบตลาดผ่าน Line OA ก่อน แล้วค่อยขยายไป Facebook Ads',
};

function ProgressBar({ value, color }: { value: number; color: string }) {
  const styles: Record<string, { track: string; fill: string }> = {
    'bg-[#d13212]': {
      track: 'bg-[#fbc8be]',
      fill: 'bg-gradient-to-r from-[#e8796a] to-[#c0392b]',
    },
    'bg-[#1d8102]': {
      track: 'bg-[#b8e6b4]',
      fill: 'bg-gradient-to-r from-[#5cb85c] to-[#2e7d32]',
    },
    'bg-[#0073bb]': {
      track: 'bg-[#b8d9f0]',
      fill: 'bg-gradient-to-r from-[#5aaad4] to-[#0073bb]',
    },
  };
  const s = styles[color] ?? { track: 'bg-[#eaeded]', fill: 'bg-gray-400' };
  return (
    <div className={`flex-1 h-2.5 ${s.track} rounded-full overflow-hidden`}>
      <div
        className={`h-full ${s.fill} rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default function MarketScoutPage() {
  const [selected, setSelected] = useState(trendingProducts[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [validateInput, setValidateInput] = useState('');
  const [validateResult, setValidateResult] = useState<typeof validateMockResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleValidate = () => {
    if (!validateInput.trim()) return;
    setIsValidating(true);
    setTimeout(() => { setValidateResult(validateMockResult); setIsValidating(false); }, 1500);
  };

  const filtered = trendingProducts.filter(p =>
    !searchQuery || p.name.includes(searchQuery) || p.category.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#f2f3f3] text-[#16191f] font-sans">
      <main className="max-w-[1400px] mx-auto p-4 space-y-4">

        {/* Hero */}
        <section className="bg-[#232f3e] relative overflow-hidden rounded-sm min-h-[160px] flex items-center px-8">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold text-white mb-2">Market Scout</h1>
            <p className="text-[#aab7b8] text-sm max-w-sm leading-relaxed">สำรวจเทรนด์สินค้าและวิเคราะห์โอกาสผ่าน risk/reward อย่างชัดเจน</p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
            <Image src="/Market-scout-2.png" alt="Scene" fill className="object-cover object-left opacity-20" />
          </div>
          <div className="absolute right-10 bottom-0 z-10 w-36 h-36">
            <Image src="/Market-scout-1.png" alt="robot" width={144} height={144} className="object-contain object-bottom" />
          </div>
        </section>

        {/* Market Pulse */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8]">
            <h2 className="text-lg font-bold text-[#16191f]">Market Pulse</h2>
            <p className="text-xs text-[#545b64]">ภาพรวมตลาดสินค้าที่กำลัง trending ในขณะนี้</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#eaeded]">
            {[
              { label: 'สินค้า Trending', value: '24', sub: 'รายการในสัปดาห์นี้' },
              { label: 'โอกาสสูง (Score >80)', value: '9', sub: 'รายการแนะนำ' },
              { label: 'หมวดยอดนิยม', value: 'ผลไม้นำเข้า', sub: 'Google Trends TH' },
              { label: 'อัปเดตล่าสุด', value: 'วันนี้ 09:00', sub: 'ข้อมูลล่าสุด' },
            ].map((item, i) => (
              <div key={i} className="px-4 py-4 flex flex-col justify-between">
                <div className="text-xs font-bold text-[#16191f] uppercase tracking-wide">{item.label}</div>
                <div className="text-2xl font-light text-[#16191f] mt-2">{item.value}</div>
                <div className="text-[10px] text-[#545b64] mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mode I */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#16191f]">Market Scout : Mode I</h2>
              <p className="text-xs text-[#545b64]">ค้นพบสินค้า trending จาก Google Trends, Shopee, Lazada และ TikTok</p>
            </div>
            <div className="flex items-center border border-[#aab7b8] rounded-sm bg-white overflow-hidden">
              <Search className="w-3.5 h-3.5 text-[#545b64] ml-2 flex-shrink-0" />
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="px-2 py-1.5 text-xs outline-none w-44 bg-transparent"
              />
            </div>
          </div>

          <div className="flex divide-x divide-[#eaeded]">
            {/* Left: product list as table rows */}
            <div className="w-72 flex-shrink-0">
              <div className="px-3 py-2 bg-[#fafafa] border-b border-[#eaeded] text-[10px] font-bold text-[#545b64] uppercase tracking-wide">
                สินค้า ({filtered.length})
              </div>
              {filtered.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(p)}
                  className={`w-full text-left px-3 py-3 border-b border-[#eaeded] transition ${
                    selected.name === p.name ? 'bg-[#f0f8ff] border-l-2 border-l-[#0073bb]' : 'hover:bg-[#fafafa]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold ${selected.name === p.name ? 'text-[#0073bb]' : 'text-[#16191f]'}`}>{p.name}</span>
                    <span className={`text-[10px] font-bold flex items-center gap-0.5 ${p.trend.startsWith('+') ? 'text-[#1d8102]' : 'text-[#d13212]'}`}>
                      {p.trend.startsWith('+') ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {p.trend}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#545b64] mt-0.5">{p.category}</div>
                  <div className="text-[10px] text-[#aab7b8] mt-1 line-clamp-1">{p.desc}</div>
                </button>
              ))}
            </div>

            {/* Right: detail panel */}
            <div className="flex-1 p-4 space-y-3 bg-[#fafafa]">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#16191f]">{selected.name}</h3>
                  <p className="text-xs text-[#545b64] mt-1">{selected.desc}</p>
                </div>
                <span className="flex-shrink-0 text-xs font-bold text-white bg-[#0073bb] px-3 py-1 rounded-sm ml-4">
                  Score : {selected.score}
                </span>
              </div>

              <div className="bg-white border border-[#eaeded] rounded-sm p-3 text-xs text-[#545b64] leading-relaxed">
                {selected.detail}
                <button className="mt-2 flex items-center gap-1 text-[#0073bb] hover:underline font-semibold">
                  <ExternalLink className="w-3 h-3" /> ดูข้อมูลเพิ่มเติม
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#545b64]">แหล่งข้อมูล :</span>
                <span className="text-[10px] font-semibold text-[#0073bb] bg-[#f0f8ff] border border-[#b8d9f0] px-2 py-0.5 rounded-sm">{selected.source}</span>
              </div>

              <div className="bg-white border border-[#eaeded] rounded-sm p-3 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#545b64] w-20 flex-shrink-0">Risk : {selected.risk < 40 ? 'ต่ำ' : selected.risk < 70 ? 'ปานกลาง' : 'สูง'}</span>
                  <ProgressBar value={selected.risk} color="bg-[#d13212]" />
                  <span className="text-[10px] text-[#545b64] w-8 text-right">{selected.risk}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#545b64] w-20 flex-shrink-0">Reward : {selected.reward < 40 ? 'ต่ำ' : selected.reward < 70 ? 'ปานกลาง' : 'สูง'}</span>
                  <ProgressBar value={selected.reward} color="bg-[#1d8102]" />
                  <span className="text-[10px] text-[#545b64] w-8 text-right">{selected.reward}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#545b64] w-20 flex-shrink-0">Search Vol.</span>
                  <ProgressBar value={selected.volume} color="bg-[#0073bb]" />
                  <span className="text-[10px] text-[#545b64] w-8 text-right">{selected.volume}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mode II */}
        <section className="bg-white border border-[#eaeded] shadow-sm rounded-sm">
          <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8]">
            <h2 className="text-lg font-bold text-[#16191f]">Market Scout : Mode II</h2>
            <p className="text-xs text-[#545b64]">ตรวจสอบความคุ้มค่าของสินค้าที่คุณพบมา — AI จะ validate ว่าตลาดไทยรับได้จริงไหม</p>
          </div>
          <div className="p-4">
            <div className="flex gap-4">

              {/* Left: input form */}
              <div className="w-80 flex-shrink-0 space-y-3">
                {/* Step indicators */}
                <div className="flex items-center gap-2 text-[10px] text-[#545b64]">
                  <span className="w-4 h-4 rounded-full bg-[#0073bb] text-white flex items-center justify-center font-bold text-[9px]">1</span>
                  กรอกข้อมูลสินค้า
                  <span className="flex-1 h-px bg-[#eaeded]"></span>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${validateInput ? 'bg-[#0073bb] text-white' : 'bg-[#eaeded] text-[#aab7b8]'}`}>2</span>
                  อัพโหลดรูป
                  <span className="flex-1 h-px bg-[#eaeded]"></span>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${validateResult ? 'bg-[#1d8102] text-white' : 'bg-[#eaeded] text-[#aab7b8]'}`}>3</span>
                  ผลลัพธ์
                </div>

                {/* Product name */}
                <div>
                  <label className="text-xs font-bold text-[#16191f] mb-1 block">ชื่อสินค้า <span className="text-[#d13212]">*</span></label>
                  <input
                    type="text"
                    placeholder="เช่น ส้มสายน้ำผึ้งเชียงใหม่"
                    value={validateInput}
                    onChange={e => setValidateInput(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-[#aab7b8] rounded-sm outline-none focus:border-[#0073bb] focus:ring-1 focus:ring-[#0073bb]/20 bg-white transition"
                  />
                </div>

                {/* Price inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-[#16191f] mb-1 block">ราคาต้นทุน (฿)</label>
                    <input type="number" placeholder="0" className="w-full px-3 py-2 text-sm border border-[#aab7b8] rounded-sm outline-none focus:border-[#0073bb] bg-white" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#16191f] mb-1 block">ราคาขาย (฿)</label>
                    <input type="number" placeholder="0" className="w-full px-3 py-2 text-sm border border-[#aab7b8] rounded-sm outline-none focus:border-[#0073bb] bg-white" />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-bold text-[#16191f] mb-1 block">รายละเอียดเพิ่มเติม</label>
                  <textarea
                    placeholder="เช่น แหล่งที่มา, ปริมาณที่ต้องการสั่ง, กลุ่มเป้าหมาย..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-[#aab7b8] rounded-sm outline-none focus:border-[#0073bb] bg-white resize-none"
                  />
                </div>

                {/* Upload */}
                <div>
                  <label className="text-xs font-bold text-[#16191f] mb-1 block">รูปภาพสินค้า</label>
                  <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-sm cursor-pointer transition min-h-[100px] ${uploadedFile ? 'border-[#1d8102] bg-[#f0faf0]' : 'border-[#aab7b8] bg-[#fafafa] hover:border-[#0073bb] hover:bg-[#f0f8ff]'}`}>
                    {uploadedFile ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-[#1d8102]" />
                        <span className="text-xs text-[#1d8102] font-semibold">{uploadedFile}</span>
                        <span className="text-[10px] text-[#545b64]">คลิกเพื่อเปลี่ยนรูป</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-[#aab7b8]" />
                        <span className="text-xs text-[#545b64]">คลิกหรือลากรูปมาวาง</span>
                        <span className="text-[10px] text-[#aab7b8]">PNG, JPG ขนาดไม่เกิน 5MB</span>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={e => setUploadedFile(e.target.files?.[0]?.name ?? null)} />
                  </label>
                </div>

                {/* Validate button */}
                <button
                  onClick={handleValidate}
                  disabled={!validateInput.trim() || isValidating}
                  className="w-full py-2 text-sm font-bold text-white bg-[#0073bb] hover:bg-[#005f99] rounded-sm transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      AI กำลังวิเคราะห์...
                    </>
                  ) : 'Validate สินค้า'}
                </button>
              </div>

              {/* Right: result panel */}
              <div className="flex-1">
                {!validateResult && !isValidating && (
                  <div className="h-full border border-dashed border-[#aab7b8] rounded-sm bg-[#fafafa] flex flex-col items-center justify-center gap-3 min-h-[360px]">
                    <div className="w-12 h-12 rounded-full bg-[#f0f8ff] border border-[#b8d9f0] flex items-center justify-center">
                      <Search className="w-5 h-5 text-[#0073bb]" />
                    </div>
                    <p className="text-sm font-semibold text-[#545b64]">รอผลการวิเคราะห์</p>
                    <p className="text-xs text-[#aab7b8] text-center max-w-xs">กรอกชื่อสินค้าและกด Validate<br/>AI จะวิเคราะห์ตลาดให้ภายใน 2 วินาที</p>
                  </div>
                )}

                {isValidating && (
                  <div className="h-full border border-[#b8d9f0] rounded-sm bg-[#f0f8ff] flex flex-col items-center justify-center gap-4 min-h-[360px]">
                    <div className="w-10 h-10 border-3 border-[#0073bb] border-t-transparent rounded-full animate-spin" />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-[#0073bb]">AI กำลังวิเคราะห์ข้อมูลตลาด</p>
                      <p className="text-xs text-[#545b64] mt-1">ดึงข้อมูลจาก Google Trends, Shopee, Lazada...</p>
                    </div>
                  </div>
                )}

                {validateResult && !isValidating && (
                  <div className="border border-[#eaeded] rounded-sm bg-[#fafafa] space-y-0 overflow-hidden">
                    {/* Result header */}
                    <div className="px-4 py-3 bg-[#f8f8f8] border-b border-[#eaeded] flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[#16191f]">{validateResult.name}</div>
                        <div className="text-xs text-[#545b64] mt-0.5">{validateResult.desc}</div>
                      </div>
                      <span className="text-xs font-bold text-white bg-[#0073bb] px-3 py-1 rounded-sm flex-shrink-0 ml-3">
                        Score : {validateResult.score}
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Market Size', value: validateResult.marketSize },
                          { label: 'Competition', value: validateResult.competition },
                          { label: 'Margin Est.', value: validateResult.marginEst },
                        ].map((s, i) => (
                          <div key={i} className="bg-white border border-[#eaeded] rounded-sm p-3">
                            <div className="text-[10px] text-[#545b64] uppercase tracking-wide">{s.label}</div>
                            <div className="text-sm font-bold text-[#0073bb] mt-1">{s.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#e8f4fd] border border-[#b8d9f0] rounded-sm p-3">
                          <div className="text-xs font-bold text-[#0073bb] mb-2">Pro :</div>
                          <ul className="text-xs text-[#16191f] space-y-1.5">
                            {validateResult.pros.map((p, i) => (
                              <li key={i} className="flex gap-1.5 items-start"><span className="text-[#0073bb] flex-shrink-0 mt-0.5">•</span>{p}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-[#fde8e8] border border-[#f0b8b8] rounded-sm p-3">
                          <div className="text-xs font-bold text-[#d13212] mb-2">Cons :</div>
                          <ul className="text-xs text-[#16191f] space-y-1.5">
                            {validateResult.cons.map((c, i) => (
                              <li key={i} className="flex gap-1.5 items-start"><span className="text-[#d13212] flex-shrink-0 mt-0.5">•</span>{c}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Business Solution */}
                      <div className="bg-white border border-[#eaeded] rounded-sm p-3">
                        <div className="text-xs font-bold text-[#16191f] mb-1">Business Solution</div>
                        <p className="text-xs text-[#545b64] leading-relaxed">{validateResult.recommendation}</p>
                      </div>

                      {/* Risk/Reward bars */}
                      <div className="bg-white border border-[#eaeded] rounded-sm p-3 space-y-2.5">
                        {[
                          { label: 'Risk', value: validateResult.risk, color: 'bg-[#d13212]' },
                          { label: 'Reward', value: validateResult.reward, color: 'bg-[#1d8102]' },
                        ].map((b, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <span className="text-xs text-[#545b64] w-20 flex-shrink-0">
                              {b.label} : <span className="font-semibold">{b.value < 40 ? 'ต่ำ' : b.value < 70 ? 'ปานกลาง' : 'สูง'}</span>
                            </span>
                            <ProgressBar value={b.value} color={b.color} />
                            <span className="text-xs font-bold text-[#16191f] w-8 text-right">{b.value}%</span>
                          </div>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-1">
                        <button className="flex-1 py-1.5 text-xs font-bold text-white bg-[#1d8102] hover:bg-[#1a7302] rounded-sm transition">
                          เพิ่มในรายการสินค้า
                        </button>
                        <button
                          onClick={() => { setValidateResult(null); setValidateInput(''); setUploadedFile(null); }}
                          className="px-4 py-1.5 text-xs font-bold border border-[#aab7b8] text-[#545b64] hover:bg-[#f2f3f3] rounded-sm transition"
                        >
                          ล้างข้อมูล
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
