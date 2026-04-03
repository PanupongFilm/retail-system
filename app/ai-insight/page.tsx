'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, ChevronRight, CheckCircle, XCircle, Database, Sparkles, BarChart2 } from 'lucide-react';

type MessageRole = 'user' | 'assistant' | 'system';
type MessageType = 'text' | 'question' | 'loading' | 'analysis' | 'recommendation' | 'confirm';

interface Message {
  id: number;
  role: MessageRole;
  type: MessageType;
  content: string;
  questions?: string[];
  data?: AnalysisData;
  recommendation?: RecommendationData;
}

interface AnalysisData {
  sources: string[];
  metrics: { label: string; value: string; sub: string }[];
}

interface RecommendationData {
  title: string;
  summary: string;
  pros: string[];
  cons: string[];
  confidence: number;
  action: string;
}

// --- Simulation flow ---
const FLOW: Record<string, Message[]> = {
  apple_facebook: [
    {
      id: 2, role: 'assistant', type: 'question',
      content: 'ดีเลย! ก่อนวิเคราะห์ขอถามเพิ่มเติม 2 ข้อนะคะ',
      questions: ['ต้องการประมาณการรายได้ (Revenue Estimate) ด้วยไหม?', 'มีงบโฆษณาที่ตั้งไว้แล้วหรือยัง?'],
    },
    {
      id: 3, role: 'assistant', type: 'loading',
      content: 'กำลังดึงข้อมูลจากแหล่งต่างๆ...',
    },
    {
      id: 4, role: 'assistant', type: 'analysis',
      content: 'วิเคราะห์ข้อมูลเสร็จแล้ว นี่คือสิ่งที่ระบบพบ:',
      data: {
        sources: ['apple_fuji_Nov_facebook.csv', 'Meta Business Suite API', 'TikTok Shop Analytics', 'Shopee Sales Data TH'],
        metrics: [
          { label: 'ROAS', value: '14.2x', sub: 'Return on Ad Spend' },
          { label: 'Conversion Rate', value: '3.8%', sub: 'จาก Click → Purchase' },
          { label: 'LTV', value: '฿2,840', sub: 'Lifetime Value / ลูกค้า' },
          { label: 'Avg. Order', value: '฿185', sub: 'ราคาเฉลี่ยต่อออเดอร์' },
          { label: 'Reach Est.', value: '42,000', sub: 'คนที่จะเห็น Ads' },
          { label: 'Revenue Est.', value: '฿31,200', sub: 'ประมาณการรายได้' },
        ],
      },
    },
    {
      id: 5, role: 'assistant', type: 'recommendation',
      content: '',
      recommendation: {
        title: 'Campaign: Apple Premium — Facebook Ads',
        summary: 'จากข้อมูลย้อนหลัง 3 เดือน แอปเปิ้ลพรีเมียมมี ROAS สูงกว่าค่าเฉลี่ยตลาด 40% กลุ่มเป้าหมายอายุ 28-42 ปี ตอบสนองต่อ content แนว "healthy lifestyle" ดีที่สุด',
        pros: [
          'ROAS 14.2x สูงกว่า benchmark ของหมวดผลไม้ (8x)',
          'ลูกค้ากลุ่มนี้มี LTV สูง ซื้อซ้ำเฉลี่ย 4.2 ครั้ง/เดือน',
          'ช่วง Nov-Dec เป็น peak season ความต้องการสูงขึ้น 35%',
        ],
        cons: [
          'ต้นทุนต่อ Click (CPC) สูงขึ้น 12% จากคู่แข่งที่เพิ่มขึ้น',
          'Stock ปัจจุบันอาจไม่พอรองรับถ้า campaign ได้ผลดีเกินคาด',
        ],
        confidence: 87,
        action: 'ยิง Facebook Ads งบ ฿5,000 targeting กลุ่มอายุ 28-42 ปี สนใจ healthy food',
      },
    },
    {
      id: 6, role: 'assistant', type: 'confirm',
      content: 'ต้องการดำเนินการ Campaign นี้บน Meta Platform เลยไหมคะ?',
    },
  ],
};

const SUGGESTED = [
  'อยากทำ campaign แอปเปิ้ลฟูจิบน Facebook',
  'วิเคราะห์ยอดขายมะม่วงเดือนนี้เทียบกับเดือนที่แล้ว',
  'สต็อกสินค้าไหนใกล้หมดและควร restock ด่วน?',
  'แนะนำสินค้าที่ควรโปรโมทสัปดาห์นี้บน TikTok',
];

let msgId = 10;

export default function AIInsightPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1, role: 'assistant', type: 'text',
      content: 'สวัสดีค่ะ ฉันคือ Aurora AI 👋\n\nAurora ไม่ได้แค่ตอบคำถาม — เราวิเคราะห์ข้อมูลธุรกิจของคุณ อธิบาย reasoning และขอ confirm ก่อน execute ทุกครั้ง ลองพิมพ์สิ่งที่อยากรู้หรือเลือกจากคำถามแนะนำด้านล่างได้เลยค่ะ',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [flowStep, setFlowStep] = useState(0);
  const [activeFlow, setActiveFlow] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (msg: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...msg, id: msgId++ }]);
  };

  const runFlowStep = (flowKey: string, step: number) => {
    const flow = FLOW[flowKey];
    if (!flow || step >= flow.length) return;

    const msg = flow[step];
    const delay = msg.type === 'loading' ? 0 : 600;

    setTimeout(() => {
      if (msg.type === 'loading') {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage({ ...msg, role: 'assistant' });
          setFlowStep(step + 1);
          runFlowStep(flowKey, step + 1);
        }, 2000);
      } else {
        addMessage({ ...msg, role: 'assistant' });
        setFlowStep(step + 1);
        if (msg.type !== 'question' && msg.type !== 'recommendation' && msg.type !== 'confirm') {
          runFlowStep(flowKey, step + 1);
        }
      }
    }, delay);
  };

  const handleSend = (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;
    setInput('');

    addMessage({ role: 'user', type: 'text', content: msg });

    const isAppleFB = msg.toLowerCase().includes('apple') || msg.toLowerCase().includes('แอปเปิ้') || msg.toLowerCase().includes('facebook') || msg.toLowerCase().includes('campaign');

    if (isAppleFB && !activeFlow) {
      setActiveFlow('apple_facebook');
      setFlowStep(0);
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        runFlowStep('apple_facebook', 0);
      }, 800);
    } else if (activeFlow && FLOW[activeFlow]) {
      const flow = FLOW[activeFlow];
      const currentMsg = flow[flowStep - 1];
      if (currentMsg?.type === 'question' || currentMsg?.type === 'confirm') {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          runFlowStep(activeFlow, flowStep);
        }, 800);
      } else {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addMessage({ role: 'assistant', type: 'text', content: 'ขอบคุณค่ะ! มีอะไรให้ช่วยเพิ่มเติมไหมคะ?' });
          setActiveFlow(null);
        }, 800);
      }
    } else {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({ role: 'assistant', type: 'text', content: 'ขอบคุณค่ะ กำลังประมวลผล... ลองพิมพ์เกี่ยวกับ campaign แอปเปิ้ลบน Facebook เพื่อดู demo เต็มรูปแบบได้เลยค่ะ' });
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f3f3] text-[#16191f] font-sans">
      <main className="max-w-[1400px] mx-auto p-4 flex gap-4 h-[calc(100vh-56px)]">

        {/* Left sidebar */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-3">
          {/* Data sources */}
          <div className="bg-white border border-[#eaeded] rounded-sm shadow-sm">
            <div className="px-3 py-2.5 border-b border-[#eaeded] bg-[#f8f8f8]">
              <div className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#0073bb]" />
                <span className="text-xs font-bold text-[#16191f]">Data Sources</span>
              </div>
            </div>
            <div className="p-2 space-y-1">
              {[
                { name: 'Facebook Ads', status: 'connected', color: 'bg-[#1d8102]' },
                { name: 'Line OA', status: 'connected', color: 'bg-[#1d8102]' },
                { name: 'TikTok Shop', status: 'connected', color: 'bg-[#1d8102]' },
                { name: 'Shopee API', status: 'connected', color: 'bg-[#1d8102]' },
                { name: 'CSV Upload', status: 'connected', color: 'bg-[#1d8102]' },
              ].map((src, i) => (
                <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-[#f2f3f3]">
                  <span className="text-xs text-[#16191f]">{src.name}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${src.color}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Recent insights */}
          <div className="bg-white border border-[#eaeded] rounded-sm shadow-sm flex-1 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-[#eaeded] bg-[#f8f8f8]">
              <div className="flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-[#0073bb]" />
                <span className="text-xs font-bold text-[#16191f]">Recent Insights</span>
              </div>
            </div>
            <div className="p-2 space-y-1">
              {[
                { title: 'Apple Fuji FB Campaign', time: '2 ชม.ที่แล้ว', status: 'approved' },
                { title: 'Mango Peak Season Alert', time: 'เมื่อวาน', status: 'pending' },
                { title: 'Pomelo Restock Approved', time: '3 วันที่แล้ว', status: 'approved' },
                { title: 'Durian TikTok Trend', time: '1 สัปดาห์', status: 'approved' },
              ].map((item, i) => (
                <button key={i} className="w-full text-left px-2 py-2 rounded-sm hover:bg-[#f2f3f3] transition">
                  <div className="text-xs font-semibold text-[#0073bb] truncate">{item.title}</div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[10px] text-[#aab7b8]">{item.time}</span>
                    <span className={`text-[10px] font-semibold ${item.status === 'approved' ? 'text-[#1d8102]' : 'text-[#ec7211]'}`}>
                      {item.status === 'approved' ? 'Approved' : 'Pending'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col bg-white border border-[#eaeded] rounded-sm shadow-sm overflow-hidden">
          {/* Chat header */}
          <div className="px-4 py-3 border-b border-[#eaeded] bg-[#f8f8f8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#0073bb] rounded-sm flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#16191f]">Aurora AI</div>
                <div className="text-[10px] text-[#1d8102] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#1d8102] rounded-full inline-block" /> Online — วิเคราะห์ข้อมูล อธิบาย reasoning ก่อน execute
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#545b64]">
              <span className="px-2 py-0.5 bg-[#f0f8ff] border border-[#b8d9f0] rounded-sm text-[#0073bb] font-semibold">Explain before Execute</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <ChatMessage key={msg.id} msg={msg} onAnswer={handleSend} />
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-[#0073bb] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="bg-[#f2f3f3] border border-[#eaeded] rounded-sm px-3 py-2">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-[#0073bb] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#0073bb] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#0073bb] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested prompts */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTED.map((s, i) => (
                <button key={i} onClick={() => handleSend(s)}
                  className="text-xs px-3 py-1.5 border border-[#aab7b8] rounded-sm text-[#545b64] hover:bg-[#f2f3f3] hover:border-[#0073bb] hover:text-[#0073bb] transition">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-[#eaeded] bg-[#fafafa]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="พิมพ์คำถามหรือสิ่งที่ต้องการวิเคราะห์..."
                className="flex-1 px-3 py-2 text-sm border border-[#aab7b8] rounded-sm outline-none focus:border-[#0073bb] bg-white"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2 bg-[#0073bb] hover:bg-[#005f99] text-white rounded-sm transition disabled:opacity-40 flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#aab7b8] mt-1.5">Aurora AI จะอธิบาย reasoning และขอ confirm ก่อน execute ทุกครั้ง</p>
          </div>
        </div>

      </main>
    </div>
  );
}

function ChatMessage({ msg, onAnswer }: { msg: Message; onAnswer: (text: string) => void }) {
  const isUser = msg.role === 'user';

  if (isUser) {
    return (
      <div className="flex items-start gap-2 justify-end">
        <div className="bg-[#0073bb] text-white rounded-sm px-3 py-2 max-w-md text-sm">{msg.content}</div>
        <div className="w-6 h-6 bg-[#545b64] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2">
      <div className="w-6 h-6 bg-[#0073bb] rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="flex-1 max-w-2xl space-y-2">
        {msg.type === 'text' && (
          <div className="bg-[#f2f3f3] border border-[#eaeded] rounded-sm px-3 py-2 text-sm text-[#16191f] whitespace-pre-line">{msg.content}</div>
        )}

        {msg.type === 'question' && (
          <div className="space-y-2">
            <div className="bg-[#f2f3f3] border border-[#eaeded] rounded-sm px-3 py-2 text-sm text-[#16191f]">{msg.content}</div>
            {msg.questions?.map((q, i) => (
              <button key={i} onClick={() => onAnswer(q)}
                className="flex items-center gap-2 w-full text-left px-3 py-2 border border-[#aab7b8] rounded-sm bg-white hover:border-[#0073bb] hover:bg-[#f0f8ff] transition text-sm text-[#16191f]">
                <ChevronRight className="w-3.5 h-3.5 text-[#0073bb] flex-shrink-0" /> {q}
              </button>
            ))}
          </div>
        )}

        {msg.type === 'loading' && (
          <div className="bg-[#f0f8ff] border border-[#b8d9f0] rounded-sm px-3 py-2">
            <div className="flex items-center gap-2 text-xs text-[#0073bb] font-semibold mb-2">
              <Loader className="w-3.5 h-3.5 animate-spin" /> {msg.content}
            </div>
            {['apple_fuji_Nov_facebook.csv', 'Meta Business Suite API', 'Shopee Sales Data TH'].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#545b64] mt-1">
                <CheckCircle className="w-3 h-3 text-[#1d8102]" /> {s}
              </div>
            ))}
          </div>
        )}

        {msg.type === 'analysis' && msg.data && (
          <div className="space-y-2">
            <div className="bg-[#f2f3f3] border border-[#eaeded] rounded-sm px-3 py-2 text-sm text-[#16191f]">{msg.content}</div>
            <div className="border border-[#eaeded] rounded-sm overflow-hidden">
              <div className="px-3 py-2 bg-[#f8f8f8] border-b border-[#eaeded] text-xs font-bold text-[#16191f] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#0073bb]" /> Data Analysis Results
              </div>
              <div className="p-3 grid grid-cols-3 gap-2">
                {msg.data.metrics.map((m, i) => (
                  <div key={i} className="bg-white border border-[#eaeded] rounded-sm p-2">
                    <div className="text-[10px] text-[#545b64] uppercase tracking-wide">{m.label}</div>
                    <div className="text-base font-bold text-[#0073bb] mt-0.5">{m.value}</div>
                    <div className="text-[10px] text-[#aab7b8]">{m.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {msg.type === 'recommendation' && msg.recommendation && (
          <div className="border border-[#eaeded] rounded-sm overflow-hidden">
            <div className="px-3 py-2 bg-[#f8f8f8] border-b border-[#eaeded] flex items-center justify-between">
              <span className="text-xs font-bold text-[#16191f]">{msg.recommendation.title}</span>
              <span className="text-xs font-bold text-white bg-[#0073bb] px-2 py-0.5 rounded-sm">
                Confidence: {msg.recommendation.confidence}%
              </span>
            </div>
            <div className="p-3 space-y-2">
              <p className="text-xs text-[#545b64] leading-relaxed">{msg.recommendation.summary}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#e8f4fd] border border-[#b8d9f0] rounded-sm p-2">
                  <div className="text-[10px] font-bold text-[#0073bb] mb-1">Pro :</div>
                  {msg.recommendation.pros.map((p, i) => (
                    <div key={i} className="flex gap-1 text-[10px] text-[#16191f] mt-0.5">
                      <span className="text-[#0073bb] flex-shrink-0">•</span>{p}
                    </div>
                  ))}
                </div>
                <div className="bg-[#fde8e8] border border-[#f0b8b8] rounded-sm p-2">
                  <div className="text-[10px] font-bold text-[#d13212] mb-1">Cons :</div>
                  {msg.recommendation.cons.map((c, i) => (
                    <div key={i} className="flex gap-1 text-[10px] text-[#16191f] mt-0.5">
                      <span className="text-[#d13212] flex-shrink-0">•</span>{c}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-[#eaeded] rounded-sm p-2">
                <div className="text-[10px] font-bold text-[#16191f] mb-1">Recommended Action</div>
                <p className="text-[10px] text-[#545b64]">{msg.recommendation.action}</p>
              </div>
            </div>
          </div>
        )}

        {msg.type === 'confirm' && (
          <div className="space-y-2">
            <div className="bg-[#fff8e8] border border-[#f0d080] rounded-sm px-3 py-2 text-sm text-[#16191f]">
              {msg.content}
            </div>
            <div className="flex gap-2">
              <button onClick={() => onAnswer('ใช่ ดำเนินการได้เลย')}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-[#1d8102] hover:bg-[#1a7302] rounded-sm transition">
                <CheckCircle className="w-3.5 h-3.5" /> ดำเนินการเลย
              </button>
              <button onClick={() => onAnswer('ยังไม่ดำเนินการตอนนี้')}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold border border-[#aab7b8] text-[#545b64] hover:bg-[#f2f3f3] rounded-sm transition">
                <XCircle className="w-3.5 h-3.5" /> ยังไม่ดำเนินการ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
