import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import fips1 from "../images/fips1.PNG";  // или "../assets/fips1.PNG" — смотрите где лежит папка
import fips2 from "../images/fips2.PNG";

import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Database,
  BarChart2,
  GraduationCap,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  XCircle,
  ExternalLink,
  X,
  Maximize2,
  BookOpen,
  Link2,
} from "lucide-react";

const DEEP_BLUE = "#1B3A5C";
const GOLD = "#D4AF37";
const LIGHT_GRAY = "#E8EDF2";
const WHITE = "#ffffff";

// ── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 1400, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return val;
}

// ── Hex logo ─────────────────────────────────────────────────────────────────
function HexLogo({ size = 72 }: { size?: number }) {
  const h = Math.round(size * 1.11);
  return (
    <svg width={size} height={h} viewBox="0 0 72 80" fill="none">
      <polygon points="36,2 70,20 70,60 36,78 2,60 2,20" fill={DEEP_BLUE} stroke={GOLD} strokeWidth="2" />
      <text x="36" y="46" textAnchor="middle" fontSize="14" fontWeight="700"
        fontFamily="Inter, sans-serif" fill={WHITE} letterSpacing="1">ФИПС</text>
    </svg>
  );
}

// ── Slide shell ───────────────────────────────────────────────────────────────
function SlideShell({ children, slideNum, total }: { children: React.ReactNode; slideNum: number; total: number }) {
  return (
    <div className="relative w-full h-full flex flex-col" style={{ fontFamily: "Inter, sans-serif", background: WHITE }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${DEEP_BLUE} 0%, ${GOLD} 100%)` }} />
      <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      <div className="flex items-center justify-between px-10" style={{ height: 36, background: DEEP_BLUE }}>
        <span style={{ color: GOLD, fontSize: 10, fontWeight: 600, letterSpacing: 2 }}>
          ОБЗОР СОВРЕМЕННЫХ ИНФОРМАЦИОННЫХ СИСТЕМ · ФИПС
        </span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>{slideNum} / {total}</span>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div style={{ width: 28, height: 2, background: GOLD }} />
      <span style={{ color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
        {children}
      </span>
    </div>
  );
}

// ── Slide 1 ───────────────────────────────────────────────────────────────────
function Slide1({ total }: { total: number }) {
  return (
    <SlideShell slideNum={1} total={total}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6" style={{ padding: "48px 80px" }}>
        <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring" }}>
          <HexLogo size={72} />
        </motion.div>
        <motion.div className="text-center" style={{ marginTop: 8 }}
          initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", marginBottom: 16 }}>
            Научная работа
          </div>
          <h1 style={{ color: DEEP_BLUE, fontSize: 32, fontWeight: 800, lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 620, margin: "0 auto 20px" }}>
            Обзор современных информационных систем
          </h1>
          <div style={{ display: "inline-block", background: DEEP_BLUE, color: WHITE, fontSize: 15, fontWeight: 600, letterSpacing: 1, padding: "8px 28px", borderRadius: 2, marginBottom: 32 }}>
            ФИПС — Федеральный институт промышленной собственности
          </div>
        </motion.div>
        <motion.div style={{ width: 48, height: 1, background: GOLD, opacity: 0.5 }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
        <motion.div className="text-center" style={{ marginTop: 8 }}
          initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.55, duration: 0.5 }}>
          <div style={{ color: DEEP_BLUE, fontSize: 15, fontWeight: 600 }}>Корженевский Макар Владимировив</div>
          <div style={{ color: "#5a7490", fontSize: 12, marginTop: 4, letterSpacing: 1 }}>Группа 594-2 · 2026</div>
        </motion.div>
      </div>
    </SlideShell>
  );
}

// ── Slide 2 ───────────────────────────────────────────────────────────────────
const activities = [
  { icon: FileText, title: "Рассмотрение заявок", detail: "Обработка более 240 000 заявок в год" },
  { icon: Database, title: "Реестры", detail: "Единые государственные реестры объектов ИС" },
  { icon: BarChart2, title: "Патентная аналитика", detail: "Поиск и анализ патентной документации" },
  { icon: GraduationCap, title: "Учебный центр РЭК", detail: "Подготовка и сертификация в области охраны ИС" },
  { icon: Globe, title: "Цифровые услуги", detail: "Электронная подача, ЭЦП и личные кабинеты" },
];

function Slide2({ active, total }: { active: boolean; total: number }) {
  const count = useCounter(240000, 1600, active);
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <SlideShell slideNum={2} total={total}>
      <div className="flex-1 flex" style={{ padding: "44px 64px 36px" }}>
        <div style={{ width: 260, flexShrink: 0, paddingRight: 48, borderRight: `1px solid ${LIGHT_GRAY}` }}>
          <SectionLabel>Деятельность</SectionLabel>
          <h2 style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
            Ключевые функции системы
          </h2>
          <p style={{ color: "#5a7490", fontSize: 12, lineHeight: 1.7 }}>
            ФИПС — основной государственный орган, управляющий правами интеллектуальной собственности в России.
          </p>
          <motion.div style={{ marginTop: 24, padding: "14px 18px", background: DEEP_BLUE, borderRadius: 4 }}
            whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <div style={{ color: GOLD, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>
              {active ? count.toLocaleString("ru-RU") : "0"}+
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 4 }}>заявок в год</div>
          </motion.div>
        </div>
        <div className="flex-1 flex flex-col justify-center" style={{ paddingLeft: 48 }}>
          {activities.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div key={i}
                className="flex items-start gap-4"
                style={{
                  paddingBottom: i < activities.length - 1 ? 18 : 0,
                  marginBottom: i < activities.length - 1 ? 18 : 0,
                  borderBottom: i < activities.length - 1 ? `1px solid ${LIGHT_GRAY}` : "none",
                  borderRadius: 6,
                  padding: "10px 12px",
                  cursor: "default",
                  background: hovered === i ? LIGHT_GRAY : "transparent",
                  transition: "background 0.2s",
                  marginLeft: -12,
                }}
                onHoverStart={() => setHovered(i)}
                onHoverEnd={() => setHovered(null)}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <motion.div
                  style={{ width: 36, height: 36, borderRadius: 4, background: hovered === i ? DEEP_BLUE : LIGHT_GRAY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s" }}
                >
                  <Icon size={16} color={hovered === i ? GOLD : DEEP_BLUE} />
                </motion.div>
                <div>
                  <div style={{ color: DEEP_BLUE, fontSize: 13, fontWeight: 700 }}>{a.title}</div>
                  <div style={{ color: "#5a7490", fontSize: 11, marginTop: 2 }}>{a.detail}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 3 ───────────────────────────────────────────────────────────────────
const criteria = ["Функциональность", "Безопасность", "Дизайн", "Удобство использования"];
const experts = ["Разработчик", "Патентный поверенный", "Пользователь / изобретатель"];
const ratings: number[][] = [[5, 4, 4], [4, 4, 4], [4, 3, 3], [4, 3, 3]];
const averages = [4.3, 4.0, 3.3, 3.3];

function Slide3({ total }: { total: number }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ ri: number; ci: number } | null>(null);

  const expertDesc: Record<string, string[]> = {
    "0": ["Профессиональный разработчик ПО с опытом 5+ лет", "Патентный поверенный, стаж 10 лет", "Изобретатель, первичный пользователь"],
    "1": ["Оценка безопасности разработчиком", "Оценка безопасности поверенным", "Оценка безопасности пользователем"],
    "2": ["Оценка дизайна разработчиком", "Оценка дизайна поверенным", "Оценка дизайна пользователем"],
    "3": ["Оценка UX разработчиком", "Оценка UX поверенным", "Оценка UX пользователем"],
  };

  return (
    <SlideShell slideNum={3} total={total}>
      <div className="flex-1 flex flex-col" style={{ padding: "44px 64px 36px" }}>
        <SectionLabel>Экспертная оценка</SectionLabel>
        <h2 style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800, marginBottom: 28 }}>
          Оценки по 5-балльной шкале
        </h2>
        <div className="flex-1 flex flex-col justify-center">
          <div style={{ position: "relative" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px 16px", background: DEEP_BLUE, color: WHITE, fontWeight: 600, fontSize: 12, letterSpacing: 0.5, borderRadius: "4px 0 0 0" }}>Критерий</th>
                  {experts.map((e) => (
                    <th key={e} style={{ textAlign: "center", padding: "10px 16px", background: DEEP_BLUE, color: WHITE, fontWeight: 600, fontSize: 12, letterSpacing: 0.3 }}>{e}</th>
                  ))}
                  <th style={{ textAlign: "center", padding: "10px 16px", background: GOLD, color: DEEP_BLUE, fontWeight: 700, fontSize: 12, letterSpacing: 0.5, borderRadius: "0 4px 0 0" }}>Среднее</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map((crit, ri) => (
                  <tr key={crit}
                    style={{ background: hoveredRow === ri ? "#dde7f0" : ri % 2 === 0 ? WHITE : LIGHT_GRAY, transition: "background 0.18s", cursor: "default" }}
                    onMouseEnter={() => setHoveredRow(ri)}
                    onMouseLeave={() => { setHoveredRow(null); setTooltip(null); }}
                  >
                    <td style={{ padding: "12px 16px", color: DEEP_BLUE, fontWeight: 600, fontSize: 13, borderBottom: `1px solid ${LIGHT_GRAY}` }}>{crit}</td>
                    {ratings[ri].map((score, ci) => (
                      <td key={ci}
                        style={{ textAlign: "center", padding: "12px 16px", fontWeight: score === 5 ? 700 : 400, fontSize: 13, color: score === 5 ? "#1a6b3c" : DEEP_BLUE, background: score === 5 ? "#d4edda" : "transparent", borderBottom: `1px solid ${LIGHT_GRAY}`, position: "relative", cursor: "help" }}
                        onMouseEnter={() => setTooltip({ ri, ci })}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        {score}
                        {tooltip?.ri === ri && tooltip?.ci === ci && (
                          <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: DEEP_BLUE, color: WHITE, fontSize: 10, padding: "5px 9px", borderRadius: 4, whiteSpace: "nowrap", zIndex: 10, pointerEvents: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                            {expertDesc[String(ri)]?.[ci]}
                            <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `5px solid ${DEEP_BLUE}` }} />
                          </div>
                        )}
                      </td>
                    ))}
                    <td style={{ textAlign: "center", padding: "12px 16px", fontWeight: 800, fontSize: 15, color: GOLD, borderBottom: `1px solid ${LIGHT_GRAY}`, letterSpacing: 0.5 }}>
                      {averages[ri].toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-6" style={{ marginTop: 20 }}>
            <div className="flex items-center gap-2">
              <div style={{ width: 14, height: 14, background: "#d4edda", borderRadius: 2 }} />
              <span style={{ color: "#5a7490", fontSize: 11 }}>Максимальный балл (5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 14, height: 14, background: GOLD, borderRadius: 2 }} />
              <span style={{ color: "#5a7490", fontSize: 11 }}>Средняя оценка (выделена)</span>
            </div>
            <div style={{ color: "#5a7490", fontSize: 11, marginLeft: "auto", fontStyle: "italic" }}>
              Наведите на ячейку для подробностей
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 4 ───────────────────────────────────────────────────────────────────
function Slide4({ total }: { total: number }) {
  return (
    <SlideShell slideNum={4} total={total}>
      <div className="flex-1 flex flex-col" style={{ padding: "44px 64px 36px" }}>
        <SectionLabel>Сильные стороны</SectionLabel>
        <h2 style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800, marginBottom: 28 }}>
          Функциональность и безопасность
        </h2>
        <div className="flex gap-6 flex-1">
          <div className="flex flex-col gap-4" style={{ width: 160, flexShrink: 0 }}>
            {[{ label: "Функциональность", score: "4.3" }, { label: "Безопасность", score: "4.0" }].map((s, i) => (
              <motion.div key={s.label}
                style={{ background: DEEP_BLUE, borderRadius: 6, padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "default" }}
                whileHover={{ scale: 1.06, boxShadow: `0 8px 32px rgba(27,58,92,0.35)` }}
                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.15 * i }}>
                <div style={{ color: GOLD, fontSize: 38, fontWeight: 800, lineHeight: 1 }}>{s.score}</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, marginTop: 6, textAlign: "center" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {[
              {
                icon: CheckCircle, color: "#1a6b3c", label: "Достоинства",
                items: ["HTTPS и шифрование каналов передачи данных", "Широкий спектр интегрированных государственных услуг", "Единая платформа для всех операций с ИС", "Электронная подача и отслеживание заявок"]
              },
              {
                icon: XCircle, color: "#c0392b", label: "Недостатки",
                items: ["Расширенная аналитика требует платной подписки", "Отсутствует двухфакторная аутентификация (2FA)", "Ограниченный API-доступ для внешних интеграций"]
              }
            ].map((group, gi) => {
              const Icon = group.icon;
              return (
                <motion.div key={gi} style={{ background: LIGHT_GRAY, borderRadius: 6, padding: "20px 24px", flex: 1 }}
                  whileHover={{ boxShadow: "0 4px 20px rgba(27,58,92,0.12)" }}>
                  <div className="flex items-center gap-2" style={{ marginBottom: 14 }}>
                    <Icon size={15} color={group.color} />
                    <span style={{ color: DEEP_BLUE, fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{group.label}</span>
                  </div>
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2" style={{ marginBottom: i < group.items.length - 1 ? 10 : 0 }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: gi === 0 ? GOLD : "#c0392b", marginTop: 6, flexShrink: 0 }} />
                      <span style={{ color: DEEP_BLUE, fontSize: 12, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ label, imageSrc, onClose }: { label: string; imageSrc: string; onClose: () => void }) {
  return (
    <motion.div
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={{ background: WHITE, borderRadius: 8, overflow: "hidden", width: "75vw", maxWidth: 900, maxHeight: "85vh", boxShadow: "0 32px 80px rgba(0,0,0,0.6)" }}
        initial={{ scale: 0.85, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 40 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ background: LIGHT_GRAY, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: `1px solid rgba(27,58,92,0.1)` }}>
          {["#e74c3c", "#f39c12", "#27ae60"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
          <div style={{ flex: 1, marginLeft: 8, height: 18, borderRadius: 3, background: "rgba(27,58,92,0.08)" }} />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
            <X size={16} color={DEEP_BLUE} />
          </button>
        </div>
        
        <div style={{ 
          height: 400, 
          background: "#f5f7fa", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          position: "relative",
          overflow: "hidden"
        }}>
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                padding: "16px"
              }}
            />
          ) : (
            // Плейсхолдер если картинки нет
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <div style={{ width: 56, height: 56, borderRadius: 8, background: LIGHT_GRAY, border: `1.5px dashed rgba(27,58,92,0.25)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#5a7490" strokeWidth="1.5" />
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="#5a7490" strokeWidth="1.5" />
                  <path d="M3 16l5-5 4 4 3-3 6 6" stroke="#5a7490" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span style={{ color: "#5a7490", fontSize: 13 }}>Место для скриншота интерфейса</span>
              <span style={{ color: "#aab4c0", fontSize: 11, fontStyle: "italic" }}>Нажмите за пределами, чтобы закрыть</span>
            </div>
          )}
        </div>
        
        <div style={{ padding: "12px 20px", textAlign: "center", background: WHITE, borderTop: `1px solid ${LIGHT_GRAY}` }}>
          <span style={{ color: "#5a7490", fontSize: 12, fontStyle: "italic" }}>{label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Mockup frame ──────────────────────────────────────────────────────────────
function MockupFrame({ label, imageName }: { label: string; imageName: string }) {
  const [open, setOpen] = useState(false);
  const [hov, setHov] = useState(false);

  // Маппинг имен на импортированные картинки (Vite + React)
  const imageMap: Record<string, string> = {
    fips1: fips1,  // import fips1 from "./assets/fips1.PNG";
    fips2: fips2,  // import fips2 from "./assets/fips2.PNG";
  };

  const imageSrc = imageMap[imageName];

  return (
    <>
      <div style={{ flex: 1 }}>
        <motion.div
          style={{
            border: `1.5px solid ${hov ? GOLD : LIGHT_GRAY}`,
            borderRadius: 6,
            overflow: "hidden",
            background: WHITE,
            cursor: "zoom-in",
            transition: "border-color 0.2s"
          }}
          whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(27,58,92,0.15)" }}
          onHoverStart={() => setHov(true)}
          onHoverEnd={() => setHov(false)}
          onClick={() => setOpen(true)}
        >
          <div
            style={{
              background: LIGHT_GRAY,
              padding: "7px 12px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderBottom: `1px solid rgba(27,58,92,0.1)`
            }}
          >
            {["#e74c3c", "#f39c12", "#27ae60"].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
            ))}
            <div
              style={{
                flex: 1,
                marginLeft: 8,
                height: 16,
                borderRadius: 2,
                background: "rgba(27,58,92,0.08)"
              }}
            />
            <Maximize2 size={10} color="#5a7490" />
          </div>

          <div
            style={{
              height: 130,
              background: "#f5f7fa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              position: "relative",
              overflow: "hidden"
            }}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={label}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  inset: 0
                }}
              />
            ) : (
              // Плейсхолдер если картинка не найдена
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  zIndex: 1,
                  pointerEvents: "none"
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    background: LIGHT_GRAY,
                    border: `1px dashed rgba(27,58,92,0.25)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="#5a7490" strokeWidth="1.5" />
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="#5a7490" strokeWidth="1.5" />
                    <path d="M3 16l5-5 4 4 3-3 6 6" stroke="#5a7490" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ color: "#5a7490", fontSize: 10, textAlign: "center", maxWidth: 120 }}>
                  {label}
                </span>
                <span style={{ color: "#b0c4d8", fontSize: 8 }}>Нет изображения</span>
              </div>
            )}

            {hov && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(27,58,92,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2
                }}
              >
                <span
                  style={{
                    background: DEEP_BLUE,
                    color: WHITE,
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: 3
                  }}
                >
                  Нажмите для просмотра
                </span>
              </div>
            )}
          </div>
        </motion.div>

        <div
          style={{
            textAlign: "center",
            marginTop: 8,
            color: "#5a7490",
            fontSize: 10,
            fontStyle: "italic"
          }}
        >
          {label}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <Lightbox 
            label={label} 
            imageSrc={imageSrc}  // ← ПЕРЕДАЁМ КАРТИНКУ В ЛАЙТБОКС
            onClose={() => setOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Slide 5 ───────────────────────────────────────────────────────────────────
function Slide5({ total }: { total: number }) {
  return (
    <SlideShell slideNum={5} total={total}>
      <div className="flex-1 flex" style={{ padding: "44px 64px 36px", gap: 48 }}>
        <div style={{ flex: 1 }}>
          <SectionLabel>Слабые стороны</SectionLabel>
          <h2 style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800, marginBottom: 24 }}>
            Дизайн и удобство использования
          </h2>
          <div className="flex gap-4">
            <div className="flex flex-col gap-3" style={{ flexShrink: 0 }}>
              {[{ label: "Дизайн", score: "3.3" }, { label: "Удобство", score: "3.3" }].map((s) => (
                <motion.div key={s.label}
                  style={{ background: LIGHT_GRAY, borderRadius: 4, padding: "12px 16px", textAlign: "center", border: `1px solid rgba(27,58,92,0.1)` }}
                  whileHover={{ scale: 1.05 }}>
                  <div style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800 }}>{s.score}</div>
                  <div style={{ color: "#5a7490", fontSize: 10, marginTop: 2 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col gap-3" style={{ flex: 1 }}>
              {[
                { col: "Дизайн", items: ["Визуальная перегруженность ключевых страниц", "Непоследовательная цветовая иерархия", "Слабая группировка элементов интерфейса"] },
                { col: "Удобство", items: ["Сложная и неинтуитивная навигация", "Обилие профессиональной терминологии", "Высокий порог входа для начинающих"] },
              ].map((group) => (
                <div key={group.col} style={{ background: LIGHT_GRAY, borderRadius: 4, padding: "12px 16px" }}>
                  <div style={{ color: DEEP_BLUE, fontSize: 11, fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>{group.col}</div>
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2" style={{ marginBottom: i < group.items.length - 1 ? 6 : 0 }}>
                      <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#c0392b", marginTop: 5, flexShrink: 0 }} />
                      <span style={{ color: DEEP_BLUE, fontSize: 11, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ width: 240, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div style={{ color: "#5a7490", fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
            Скриншоты интерфейса
          </div>
          <MockupFrame label="Рисунок 1 — Главная страница" imageName = "fips1"/>
          <MockupFrame label="Рисунок 2 — Портал услуг" imageName = "fips2"/>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 6 ───────────────────────────────────────────────────────────────────
function AnimatedBar({ pct, color, active }: { pct: number; color: string; active: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setWidth(pct), 80);
      return () => clearTimeout(t);
    } else {
      setWidth(0);
    }
  }, [active, pct]);
  return (
    <div style={{ height: 8, background: LIGHT_GRAY, borderRadius: 4, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${width}%`, background: color, borderRadius: 4, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

function Slide6({ active, total }: { active: boolean; total: number }) {
  const dimensions = [
    { label: "Функциональность", score: 4.3, bar: 86, type: "strength" },
    { label: "Безопасность", score: 4.0, bar: 80, type: "strength" },
    { label: "Дизайн", score: 3.3, bar: 66, type: "weakness" },
    { label: "Удобство использования", score: 3.3, bar: 66, type: "weakness" },
  ];
  return (
    <SlideShell slideNum={6} total={total}>
      <div className="flex-1 flex flex-col" style={{ padding: "44px 64px 36px" }}>
        <SectionLabel>Итоговый анализ</SectionLabel>
        <h2 style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800, marginBottom: 28 }}>Сводная оценка системы</h2>
        <div className="flex gap-10 flex-1">
          <div style={{ flex: 1 }}>
            {dimensions.map((d, i) => (
              <div key={d.label} style={{ marginBottom: i < dimensions.length - 1 ? 20 : 0 }}>
                <div className="flex justify-between" style={{ marginBottom: 6 }}>
                  <span style={{ color: DEEP_BLUE, fontSize: 12, fontWeight: 600 }}>{d.label}</span>
                  <span style={{ color: d.type === "strength" ? DEEP_BLUE : "#c0392b", fontSize: 13, fontWeight: 800 }}>{d.score.toFixed(1)}</span>
                </div>
                <AnimatedBar pct={d.bar} color={d.type === "strength" ? DEEP_BLUE : GOLD} active={active} />
              </div>
            ))}
            <div className="flex gap-4" style={{ marginTop: 24 }}>
              <div className="flex items-center gap-2">
                <div style={{ width: 12, height: 12, borderRadius: 2, background: DEEP_BLUE }} />
                <span style={{ color: "#5a7490", fontSize: 11 }}>Сильная сторона</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{ width: 12, height: 12, borderRadius: 2, background: GOLD }} />
                <span style={{ color: "#5a7490", fontSize: 11 }}>Требует улучшения</span>
              </div>
            </div>
          </div>
          <div style={{ width: 260, flexShrink: 0, display: "flex",position: 'relative', bottom: 36, flexDirection: "column", gap: 12 }}>
            {[
              { bg: DEEP_BLUE, labelColor: GOLD, labelTxt: "Достоинства", ItemIcon: Zap, itemColor: GOLD, txtColor: WHITE, items: ["Комплексный функциональный охват", "Надёжная защита данных", "Широкий портфель цифровых услуг"] },
              { bg: LIGHT_GRAY, labelColor: "#c0392b", labelTxt: "Зоны развития", ItemIcon: Shield, itemColor: "#c0392b", txtColor: DEEP_BLUE, items: ["Модернизация интерфейса", "Редизайн UX для широкой аудитории", "Доступность и онбординг"] },
            ].map((col, gi) => {
              const Icon = col.ItemIcon;
              return (
                <motion.div key={gi} style={{ background: col.bg, borderRadius: 6, padding: "20px 22px", flex: 1 }}
                  whileHover={{ scale: 1.02 }}>
                  <div style={{ color: col.labelColor, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>{col.labelTxt}</div>
                  {col.items.map((s, i) => (
                    <div key={i} className="flex items-start gap-2" style={{ marginBottom: i < col.items.length - 1 ? 8 : 0 }}>
                      <Icon size={12} color={col.itemColor} style={{ marginTop: 2, flexShrink: 0 }} />
                      <span style={{ color: col.txtColor, fontSize: 11, lineHeight: 1.5 }}>{s}</span>
                    </div>
                  ))}
                </motion.div>
              );
            })}
            <div style={{ background: `linear-gradient(135deg, ${DEEP_BLUE} 0%, #2a5480 100%)`, borderRadius: 6, padding: "14px 22px", borderLeft: `3px solid ${GOLD}` }}>
              <span style={{ color: WHITE, fontSize: 11, lineHeight: 1.6 }}>
                ФИПС — мощный инструмент для профессионалов, однако требует существенного развития в части дизайна и UX.
              </span>
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 7 ───────────────────────────────────────────────────────────────────
function Slide7({ total }: { total: number }) {
  const points = [
    { num: "01", title: "Высокая функциональная ценность", desc: "Система успешно обрабатывает 240 000+ заявок в год и предоставляет широкий спектр услуг." },
    { num: "02", title: "Надёжная безопасность", desc: "HTTPS-шифрование и защищённые каналы передачи данных обеспечивают прочный фундамент (оценка: 4.0)." },
    { num: "03", title: "Необходима модернизация дизайна", desc: "Визуальная перегруженность и непоследовательность снижают эффективность для нерегулярных пользователей." },
    { num: "04", title: "Требуется улучшение UX", desc: "Сложная навигация и профессиональная терминология создают барьеры для неспециалистов." },
  ];
  return (
    <SlideShell slideNum={7} total={total}>
      <div className="flex-1 flex flex-col" style={{ padding: "44px 64px 36px" }}>
        <SectionLabel>Заключение</SectionLabel>
        <h2 style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800, marginBottom: 28 }}>Основные выводы и рекомендации</h2>
        <div className="grid grid-cols-2 gap-4" style={{ flex: 1 }}>
          {points.map((p, i) => (
            <motion.div key={i}
              style={{ background: i < 2 ? DEEP_BLUE : LIGHT_GRAY, borderRadius: 6, padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between", cursor: "default" }}
              whileHover={{ scale: 1.03, boxShadow: i < 2 ? "0 8px 32px rgba(27,58,92,0.35)" : "0 4px 18px rgba(27,58,92,0.12)" }}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <div style={{ color: i < 2 ? GOLD : "rgba(27,58,92,0.2)", fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{p.num}</div>
              <div style={{ marginTop: 12 }}>
                <div style={{ color: i < 2 ? WHITE : DEEP_BLUE, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{p.title}</div>
                <div style={{ color: i < 2 ? "rgba(255,255,255,0.7)" : "#5a7490", fontSize: 11, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "14px 24px", background: `linear-gradient(90deg, ${DEEP_BLUE}15 0%, ${GOLD}20 100%)`, borderRadius: 4, borderLeft: `3px solid ${GOLD}` }}>
          <span style={{ color: DEEP_BLUE, fontSize: 12, fontWeight: 500, lineHeight: 1.6 }}>
            <strong>Общий вывод:</strong> ФИПС представляет собой мощную профессиональную информационную систему. Для массового распространения платформе необходимо инвестировать в редизайн интерфейса, повышение доступности и создание удобного онбординга.
          </span>
        </div>
      </div>
    </SlideShell>
  );
}

// ── Slide 8: Спасибо ─────────────────────────────────────────────────────────
function Slide8({ total }: { total: number }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setPulse((p) => !p), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideShell slideNum={8} total={total}>
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: "48px 80px", position: "relative", overflow: "hidden" }}>
        {/* background decoration */}
        <motion.div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", border: `1px solid ${LIGHT_GRAY}`, top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0.6 }}
          animate={{ scale: pulse ? 1.06 : 1 }} transition={{ duration: 2.2, ease: "easeInOut" }} />
        <motion.div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", border: `1px solid ${LIGHT_GRAY}`, top: "50%", left: "50%", x: "-50%", y: "-50%", opacity: 0.6 }}
          animate={{ scale: pulse ? 0.96 : 1 }} transition={{ duration: 2.2, ease: "easeInOut" }} />

        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring" }}>
          <HexLogo size={56} />
        </motion.div>

        <motion.div className="text-center" style={{ marginTop: 24, zIndex: 1 }}
          initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}>
          <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase", marginBottom: 16 }}>Спасибо за внимание</div>
          <h1 style={{ color: DEEP_BLUE, fontSize: 38, fontWeight: 800, lineHeight: 1.15, letterSpacing: -0.5, maxWidth: 560, margin: "0 auto" }}>
            Готов ответить на ваши вопросы
          </h1>
        </motion.div>

        <motion.div style={{ width: 64, height: 2, background: `linear-gradient(90deg, ${DEEP_BLUE}, ${GOLD})`, marginTop: 28, marginBottom: 28, borderRadius: 1 }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.5 }} />

        <motion.div className="flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div style={{ color: DEEP_BLUE, fontSize: 15, fontWeight: 600 }}>Корженевский Макар Владимировив</div>
          <div style={{ color: "#5a7490", fontSize: 12, letterSpacing: 1 }}>Группа 594-2 · 2026</div>
        </motion.div>

        <motion.a
          href="https://www1.fips.ru/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 8, padding: "10px 22px", background: DEEP_BLUE, color: WHITE, borderRadius: 4, textDecoration: "none", fontSize: 13, fontWeight: 600 }}
          whileHover={{ scale: 1.05, background: "#24487a" }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
          <Globe size={15} color={GOLD} />
          Перейти на сайт ФИПС
          <ExternalLink size={13} color={GOLD} />
        </motion.a>
      </div>
    </SlideShell>
  );
}

// ── Slide 9: Источники ────────────────────────────────────────────────────────
const sources = [
  { num: "1", title: "Официальный сайт ФИПС", detail: "Федеральный институт промышленной собственности", url: "https://www1.fips.ru/" },
  { num: "2", title: "Роспатент", detail: "Федеральная служба по интеллектуальной собственности", url: "https://rospatent.gov.ru/" },
  { num: "3", title: "ГОСТ Р ИСО/МЭК 25010–2015", detail: "Системная и программная инженерия. Требования и оценка качества систем и программного обеспечения", url: null },
  { num: "4", title: "Nielsen, J. — Usability Engineering", detail: "Morgan Kaufmann, 1994. ISBN 0-12-518406-9", url: null },
  { num: "5", title: "ISO/IEC 27001:2022", detail: "Информационная безопасность, кибербезопасность и защита конфиденциальности", url: null },
  { num: "6", title: "Приказ Роспатента № 12 от 27.01.2023", detail: "О регламенте приёма и рассмотрения заявок в электронной форме", url: null },
];

function Slide9({ total }: { total: number }) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <SlideShell slideNum={9} total={total}>
      <div className="flex-1 flex flex-col" style={{ padding: "24px 64px 36px" }}>
        <SectionLabel>Библиография</SectionLabel>
        <h2 style={{ color: DEEP_BLUE, fontSize: 26, fontWeight: 800, marginBottom: 24 }}>Список источников</h2>
        <div className="flex flex-col gap-2" style={{ justifyContent: "center"}}>
          {sources.map((s, i) => (
            <motion.div key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 14px", borderRadius: 6, background: hov === i ? LIGHT_GRAY : "transparent", transition: "background 0.15s", cursor: s.url ? "pointer" : "default" }}
              onHoverStart={() => setHov(i)}
              onHoverEnd={() => setHov(null)}
              initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.07 * i }}
            >
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: DEEP_BLUE, color: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{s.num}</div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center gap-2">
                  <span style={{ color: DEEP_BLUE, fontSize: 13, fontWeight: 700 }}>{s.title}</span>
                  {s.url && <BookOpen size={12} color={GOLD} />}
                </div>
                <div style={{ color: "#5a7490", fontSize: 11, marginTop: 2 }}>{s.detail}</div>
              </div>
              {s.url && (
                <motion.a href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: hov === i ? DEEP_BLUE : "transparent", color: hov === i ? WHITE : DEEP_BLUE, borderRadius: 3, fontSize: 11, fontWeight: 600, textDecoration: "none", flexShrink: 0, transition: "background 0.15s, color 0.15s", border: `1px solid ${hov === i ? DEEP_BLUE : LIGHT_GRAY}` }}
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.04 }}
                >
                  <Link2 size={11} />
                  Открыть
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "8px 16px", background: LIGHT_GRAY, borderRadius: 4, display: "flex", alignItems: "center", gap: 8 }}>
          <ExternalLink size={13} color={GOLD} />
          <span style={{ color: "#5a7490", fontSize: 11 }}>Кликабельные источники открываются в новой вкладке</span>
        </div>
      </div>
    </SlideShell>
  );
}

// ── App shell ─────────────────────────────────────────────────────────────────
const TOTAL = 9;
const slideTitles = [
  "Титульный", "Деятельность", "Экспертные оценки",
  "Сильные стороны", "Слабые стороны", "Итоговый анализ",
  "Заключение", "Спасибо за внимание", "Источники",
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [animKey, setAnimKey] = useState(0);

  const go = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL) return;
    setDir(next > current ? 1 : -1);
    setCurrent(next);
    setAnimKey((k) => k + 1);
  }, [current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); go(current + 1); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go(current - 1); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(TOTAL - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, go]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-40%" : "40%", opacity: 0 }),
  };

  const renderSlide = () => {
    switch (current) {
      case 0: return <Slide1 total={TOTAL} />;
      case 1: return <Slide2 active={current === 1} total={TOTAL} />;
      case 2: return <Slide3 total={TOTAL} />;
      case 3: return <Slide4 total={TOTAL} />;
      case 4: return <Slide5 total={TOTAL} />;
      case 5: return <Slide6 active={current === 5} total={TOTAL} />;
      case 6: return <Slide7 total={TOTAL} />;
      case 7: return <Slide8 total={TOTAL} />;
      case 8: return <Slide9 total={TOTAL} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f1923", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "Inter, sans-serif" }}>

      {/* Slide frame */}
      <div style={{ width: "100%", maxWidth: 1080, aspectRatio: "16 / 9", boxShadow: "0 24px 80px rgba(0,0,0,0.55)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
        <AnimatePresence custom={dir} mode="popLayout">
          <motion.div key={animKey} custom={dir}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute", inset: 0 }}>
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6" style={{ marginTop: 20 }}>
        <button onClick={() => go(current - 1)} disabled={current === 0}
          style={{ width: 40, height: 40, borderRadius: "50%", background: current === 0 ? "rgba(255,255,255,0.08)" : GOLD, border: "none", cursor: current === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
          <ChevronLeft size={18} color={current === 0 ? "rgba(255,255,255,0.25)" : DEEP_BLUE} />
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button key={i} onClick={() => go(i)} title={slideTitles[i]}
              style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, background: i === current ? GOLD : "rgba(255,255,255,0.22)", border: "none", cursor: "pointer", transition: "all 0.25s ease", padding: 0 }} />
          ))}
        </div>

        <button onClick={() => go(current + 1)} disabled={current === TOTAL - 1}
          style={{ width: 40, height: 40, borderRadius: "50%", background: current === TOTAL - 1 ? "rgba(255,255,255,0.08)" : GOLD, border: "none", cursor: current === TOTAL - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}>
          <ChevronRight size={18} color={current === TOTAL - 1 ? "rgba(255,255,255,0.25)" : DEEP_BLUE} />
        </button>
      </div>

      <div style={{ marginTop: 10, color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
        {slideTitles[current]}
      </div>
    </div>
  );
}
