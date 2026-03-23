import { useState } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

// 공통 5개 축 + 개인 특화 1개
const members = [
  {
    id: 1,
    name: "이소정",
    nickname: "Sojung",
    emoji: "🎭",
    travelType: "썰 수집형 여행가",
    mbtiActual: "ENTP",
    mbtiEstimate: "ENFP",
    mbtiFit: "높음",
    stamina: "중하",
    sleep: "올빼미",
    swimming: "걷기 레인의 수호자",
    note: "중국산 배터리 같은 체력",
    role: "분위기 설계자",
    keywords: ["주도적", "즉흥적", "언어적 유머", "철학적 자의식"],
    description:
      "대화 흐름을 설계하는 사람. 기획성 유머가 강하고 자기 관찰력도 높음. 허당 끼와 추진력이 공존하는 ENTP 정석.",
    color: "#6366f1",
    stats: [
      { subject: "체력",   value: 35 },
      { subject: "계획력", value: 65 },
      { subject: "텐션",   value: 92 },
      { subject: "수면력", value: 42 },
      { subject: "물개력", value: 28 },
      { subject: "아이디어", value: 82 },
    ],
  },
  {
    id: 2,
    name: "최강석",
    nickname: "캉형부",
    emoji: "🛠️",
    travelType: "장비 덕후형 여행가",
    mbtiActual: "ENFJ?",
    mbtiEstimate: "ISTJ",
    mbtiFit: "보통",
    stamina: "중",
    sleep: "(보영이만 알듯...)",
    swimming: "아바타 물의 길 출연자",
    note: "아낌없이 주는 나무",
    role: "실용 정보 허브",
    keywords: ["정보 수집형", "배려", "건조한 유머", "체계적"],
    description:
      "행동으로 챙기는 사람. e-sim·VPN·결제 주의사항까지 먼저 정리해 공유. 그룹 유일한 외부인이지만 자연스럽게 스며든 보호자.",
    color: "#0ea5e9",
    stats: [
      { subject: "체력",   value: 55 },
      { subject: "계획력", value: 85 },
      { subject: "텐션",   value: 65 },
      { subject: "수면력", value: 58 },
      { subject: "물개력", value: 75 },
      { subject: "챙김력", value: 95 },
    ],
  },
  {
    id: 3,
    name: "임보영",
    nickname: "보보",
    emoji: "📸",
    travelType: "자연 속 몰입형 여행가",
    mbtiActual: "ISFP",
    mbtiEstimate: "ESFJ",
    mbtiFit: "높음",
    stamina: "중상",
    sleep: "업어가도 모름",
    swimming: "물개, 물강아지",
    note: "어느 곳에서나 잘 적응함",
    role: "낙천적 무드메이커",
    keywords: ["수용적", "낙천적", "현실 직관", "감성적"],
    description:
      "상황을 긍정적으로 재정의하는 능력이 있음. 아프리카부터 하얼빈까지 어디서든 잘 적응하고, 소소한 것에서 의미를 잘 찾는 스타일.",
    color: "#f43f5e",
    stats: [
      { subject: "체력",   value: 65 },
      { subject: "계획력", value: 48 },
      { subject: "텐션",   value: 80 },
      { subject: "수면력", value: 98 },
      { subject: "물개력", value: 92 },
      { subject: "낙천적", value: 97 },
    ],
  },
  {
    id: 4,
    name: "김은빈",
    nickname: "은겔러",
    emoji: "📋",
    travelType: "완벽 준비형 여행가",
    mbtiActual: "ESTJ",
    mbtiEstimate: "ISFJ",
    mbtiFit: "높음",
    stamina: "중상",
    sleep: "아침형",
    swimming: "YMCA 수영장 고인물",
    note: "인간 29cm 느좋녀",
    role: "운영 총무",
    keywords: ["완벽 준비형", "실행력", "체계적", "허당 끼"],
    description:
      "새벽 5시에 공동 예산 시트를 만들어 예약 메시지로 걸어두는 그룹의 실질적 운영자. 단, 핫팩으로 카드를 구부린 '은겔러' 사건의 주인공이기도.",
    color: "#10b981",
    stats: [
      { subject: "체력",   value: 65 },
      { subject: "계획력", value: 97 },
      { subject: "텐션",   value: 68 },
      { subject: "수면력", value: 72 },
      { subject: "물개력", value: 88 },
      { subject: "업무량", value: 94 },
    ],
  },
  {
    id: 5,
    name: "김현진",
    nickname: "현진",
    emoji: "🗺️",
    travelType: "현지 탐험형 여행가",
    mbtiActual: "ENFP",
    mbtiEstimate: "ISFP",
    mbtiFit: "보통",
    stamina: "상",
    sleep: "6시간으로 충전 완료",
    swimming: "버터플라이 영법 전문가",
    note: "75kg를 움직일 수 있음. 보부상",
    role: "보부상 겸 행동대장",
    keywords: ["행동력", "배려", "자기 페이스", "조용한 현실형"],
    description:
      "말수는 적지만 행동이 먼저 나오는 사람. 여행 중에도 대리구매 제안, 여권 유효기간 알림 등 조용한 배려가 특징.",
    color: "#f59e0b",
    stats: [
      { subject: "체력",   value: 88 },
      { subject: "계획력", value: 52 },
      { subject: "텐션",   value: 85 },
      { subject: "수면력", value: 85 },
      { subject: "물개력", value: 92 },
      { subject: "보부상", value: 97 },
    ],
  },
  {
    id: 6,
    name: "김민주",
    nickname: "장군 삐샤",
    emoji: "🔍",
    travelType: "발품 리서치형 여행가",
    mbtiActual: "ESFJ",
    mbtiEstimate: "ENTJ",
    mbtiFit: "높음",
    stamina: "중상",
    sleep: "잘잠",
    swimming: "물 좋아하는 육지동물",
    note: "별명이 민주 귀여워 킴",
    role: "현장 조사대",
    keywords: ["탐구적", "열정적", "발품 장인", "애정 표현 직접적"],
    description:
      "하얼빈 준비를 위해 이틀에 걸쳐 백화점을 돌아다니는 발품 장인. 그룹 내 감정 표현이 가장 솔직하고 진심 어린 새해 인사를 쓰는 스타일.",
    color: "#8b5cf6",
    stats: [
      { subject: "체력",   value: 68 },
      { subject: "계획력", value: 87 },
      { subject: "텐션",   value: 78 },
      { subject: "수면력", value: 90 },
      { subject: "물개력", value: 52 },
      { subject: "맛집탐방", value: 91 },
    ],
  },
];

// MBTI 부합도 색상
const fitColor = { "높음": "#22c55e", "보통": "#f59e0b", "낮음": "#ef4444" };

export default function TravelProfiles() {
  const [selected, setSelected] = useState(0);
  const m = members[selected];
  const uniqueAxis = m.stats[5].subject;

  return (
    <div style={{
      fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
      background: "linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 100%)",
      minHeight: "100vh",
      padding: "24px 16px",
    }}>

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "22px", fontWeight: "800", color: "#1e293b" }}>
          🧊 하얼빈 여행팀 프로필
        </div>
        <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
          멤버를 선택하면 스탯을 볼 수 있어요
        </div>
      </div>

      {/* Member tabs */}
      <div style={{
        display: "flex", gap: "8px", marginBottom: "20px",
        flexWrap: "wrap", justifyContent: "center",
      }}>
        {members.map((member, i) => (
          <button
            key={member.id}
            onClick={() => setSelected(i)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: selected === i ? "none" : "1.5px solid #e2e8f0",
              background: selected === i ? member.color : "white",
              color: selected === i ? "white" : "#64748b",
              fontWeight: selected === i ? "700" : "400",
              cursor: "pointer",
              fontSize: "13px",
              boxShadow: selected === i ? `0 4px 12px ${member.color}50` : "none",
              transition: "all 0.2s ease",
            }}
          >
            {member.emoji} {member.name}
          </button>
        ))}
      </div>

      {/* Profile Card */}
      <div style={{
        background: "white",
        borderRadius: "24px",
        padding: "24px",
        maxWidth: "380px",
        margin: "0 auto",
        boxShadow: `0 8px 32px ${m.color}25`,
        border: `1.5px solid ${m.color}20`,
      }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "18px",
            background: `linear-gradient(135deg, ${m.color}30, ${m.color}10)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "26px", flexShrink: 0,
            border: `2px solid ${m.color}30`,
          }}>
            {m.emoji}
          </div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "19px", color: "#1e293b" }}>{m.name}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "3px" }}>
              💬 {m.note}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px", flexWrap: "wrap" }}>
              <div style={{
                padding: "3px 10px", borderRadius: "20px",
                background: `${m.color}15`, color: m.color,
                fontSize: "11px", fontWeight: "600",
              }}>
                {m.travelType}
              </div>
              <div style={{
                padding: "3px 10px", borderRadius: "20px",
                background: "#f1f5f9", color: "#475569",
                fontSize: "11px", fontWeight: "600",
              }}>
                MBTI: {m.mbtiActual}
                <span style={{ color: "#94a3b8", fontWeight: "400" }}> (AI 추정 {m.mbtiEstimate})</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 새 섹션: 그룹 내 역할 + MBTI 부합도 ── */}
        <div style={{
          display: "flex", gap: "8px", marginBottom: "14px", alignItems: "stretch",
        }}>
          {/* 역할 */}
          <div style={{
            flex: 1, background: `${m.color}08`, border: `1px solid ${m.color}20`,
            borderRadius: "12px", padding: "10px 12px",
          }}>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600", marginBottom: "4px" }}>
              그룹 내 역할
            </div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: m.color }}>
              {m.role}
            </div>
          </div>
          {/* MBTI 부합도 */}
          <div style={{
            flex: 1, background: "#f8fafc", border: "1px solid #e2e8f0",
            borderRadius: "12px", padding: "10px 12px",
          }}>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600", marginBottom: "4px" }}>
              MBTI 부합도
            </div>
            <div style={{
              fontSize: "13px", fontWeight: "700",
              color: fitColor[m.mbtiFit] || "#64748b",
            }}>
              {m.mbtiFit}
            </div>
          </div>
        </div>

        {/* ── 새 섹션: 성격 키워드 ── */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600", marginBottom: "6px" }}>
            성격 키워드
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {m.keywords.map((kw) => (
              <span key={kw} style={{
                padding: "3px 10px", borderRadius: "20px",
                background: `${m.color}12`, color: m.color,
                fontSize: "11px", fontWeight: "600",
                border: `1px solid ${m.color}25`,
              }}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* ── 새 섹션: 대화 기반 소개문 ── */}
        <div style={{
          background: "#f8fafc", borderRadius: "12px",
          padding: "12px 14px", marginBottom: "16px",
          borderLeft: `3px solid ${m.color}`,
        }}>
          <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "600", marginBottom: "5px" }}>
            💬 대화 기반 분석
          </div>
          <div style={{ fontSize: "12px", color: "#475569", lineHeight: "1.6" }}>
            {m.description}
          </div>
        </div>

        {/* Radar Chart */}
        <div style={{
          background: "#fafbfc", borderRadius: "16px",
          padding: "8px 0 4px", marginBottom: "16px",
        }}>
          {/* 개인 특화 축 뱃지 */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}>
            <span style={{
              padding: "3px 12px", borderRadius: "20px",
              background: `${m.color}15`, color: m.color,
              fontSize: "11px", fontWeight: "700",
              border: `1px solid ${m.color}30`,
            }}>
              ✦ 시그니처 스탯: {uniqueAxis}
            </span>
          </div>

          <div style={{ height: "230px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={m.stats} margin={{ top: 10, right: 35, bottom: 10, left: 35 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={({ x, y, payload }) => {
                    const isUnique = payload.value === uniqueAxis;
                    return (
                      <text
                        x={x} y={y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={isUnique ? 12 : 11}
                        fontWeight={isUnique ? "800" : "500"}
                        fill={isUnique ? m.color : "#475569"}
                      >
                        {payload.value}
                      </text>
                    );
                  }}
                />
                <Radar
                  dataKey="value"
                  stroke={m.color}
                  fill={m.color}
                  fillOpacity={0.22}
                  strokeWidth={2.5}
                  dot={{ fill: m.color, r: 3.5 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex", justifyContent: "center", gap: "12px",
        marginTop: "20px", alignItems: "center",
      }}>
        <button
          onClick={() => setSelected((selected - 1 + members.length) % members.length)}
          style={{
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1.5px solid #e2e8f0", background: "white",
            cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >←</button>
        <span style={{ fontSize: "12px", color: "#94a3b8" }}>
          {selected + 1} / {members.length}
        </span>
        <button
          onClick={() => setSelected((selected + 1) % members.length)}
          style={{
            width: "40px", height: "40px", borderRadius: "50%",
            border: "1.5px solid #e2e8f0", background: "white",
            cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >→</button>
      </div>
    </div>
  );
}
