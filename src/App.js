import { useState, useRef, useCallback, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// ── BRAND ─────────────────────────────────────────────────────────────────
const B = {
  red: "#C0272D",
  redDk: "#8B1A1E",
  dark: "#1C1C1E",
  darker: "#111113",
  card: "#242426",
  border: "#333335",
  mid: "#555557",
  light: "#888",
  white: "#FFFFFF",
  off: "#F4F4F4",
  green: "#2A7A4B",
  amber: "#D97706",
  blue: "#1D5FAD",
};

const PIE_COLORS = [
  "#C0272D",
  "#1D5FAD",
  "#2A7A4B",
  "#D97706",
  "#7C3AED",
  "#0891B2",
  "#DC2626",
  "#059669",
];

const LOGO_B64 =
  "data:image/png;base64,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";

// ── DEFAULT ADMIN PARAMS ───────────────────────────────────────────────────
const DEFAULT_PARAMS = {
  largeLossThreshold: 50000,
  lossRatioAlert: 70,
  guidelines: `• Flag claims exceeding the large loss threshold
• Identify year-over-year frequency and severity trends
• Highlight top causes of loss by total incurred
• Assess open reserve adequacy
• Note any claim clustering or unusual patterns
• Evaluate subrogation recovery opportunities
• Identify high-frequency claimants or locations
• Comment on claims with litigation or attorney involvement

WORKERS COMPENSATION SPECIFIC:
• Claims with $0 incurred should be flagged as "Report Only - Can be handled internally"
• In New York: Claims with no lost time and minor medical should be flagged as "First Aid Only - Can be handled internally"`,
  riskManagementNotes: `Risk Management Notes:
• Identify patterns that suggest safety program deficiencies
• Flag locations or operations with elevated claim frequency
• Note any OSHA recordables or serious injuries
• Highlight preventable claim categories
• Identify training or supervision gaps`,
  claimsManagementNotes: `Claims Management Notes:
• $0 incurred claims = Report Only (handle internally)
• NY: No lost time + minor medical = First Aid Only (handle internally)
• Monitor claims with reserves >$25K for adjuster activity
• Flag claims open >12 months for closure review
• Identify subrogation opportunities on auto/liability claims`,
};

// ── HELPERS ───────────────────────────────────────────────────────────────
const fmt = (n) =>
  typeof n === "number"
    ? "$" +
      n.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    : "$0";
const fmtPct = (n) => (typeof n === "number" ? n.toFixed(1) + "%" : "0%");
const riskColor = (r) =>
  ({
    Preferred: B.green,
    Standard: B.blue,
    "Non-Standard": B.amber,
    Declined: B.red,
  }[r] || B.mid);

// ── SUBCOMPONENTS ─────────────────────────────────────────────────────────

const Header = ({ view, setView }) => (
  <header
    style={{
      background: B.darker,
      borderBottom: `3px solid ${B.red}`,
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 72,
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <img
        src={LOGO_B64}
        alt="GNP Insurance Brokerage"
        style={{ height: 40, width: "auto", objectFit: "contain" }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <span
        style={{
          color: B.white,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        GNP Insurance Brokerage
      </span>
    </div>
    <nav style={{ display: "flex", gap: 4 }}>
      {[
        ["upload", "New Analysis"],
        ["admin", "⚙ Parameters"],
      ].map(([v, label]) => (
        <button
          key={v}
          onClick={() => setView(v)}
          style={{
            background: view === v ? B.red : "transparent",
            color: B.white,
            border: `1px solid ${view === v ? B.red : B.border}`,
            padding: "8px 18px",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "inherit",
            fontWeight: view === v ? 700 : 400,
            letterSpacing: "0.5px",
            transition: "all .2s",
          }}
        >
          {label}
        </button>
      ))}
    </nav>
  </header>
);

const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: B.card,
      border: `1px solid ${B.border}`,
      borderRadius: 8,
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

const StatCard = ({ label, value, sub, color = B.white, icon }) => (
  <Card style={{ textAlign: "left", position: "relative", overflow: "hidden" }}>
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 4,
        height: "100%",
        background: color,
      }}
    />
    <div style={{ paddingLeft: 8 }}>
      <div
        style={{
          fontSize: 11,
          color: B.light,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: B.white,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: B.light, marginTop: 4 }}>{sub}</div>
      )}
    </div>
  </Card>
);

const SectionTitle = ({ children }) => (
  <div
    style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
  >
    <div style={{ width: 4, height: 20, background: B.red, borderRadius: 2 }} />
    <h3
      style={{
        margin: 0,
        color: B.white,
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      {children}
    </h3>
  </div>
);

// ── UPLOAD VIEW ───────────────────────────────────────────────────────────
const UploadView = ({ onAnalyze, adminParams }) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    insured: "",
    carrier: "",
    policyPeriod: "",
    premium: "",
    lines: "Multiple Lines",
  });
  const [error, setError] = useState("");
  const inputRef = useRef();

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0)
      return setError("Please upload at least one loss run file.");
    if (!form.insured) return setError("Please enter the insured name.");
    if (!form.premium) return setError("Please enter the policy premium.");
    setError("");
    onAnalyze(files, form);
  };

  const inp = (field, placeholder) => (
    <input
      value={form[field]}
      onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
      placeholder={placeholder}
      style={{
        width: "100%",
        background: B.dark,
        border: `1px solid ${B.border}`,
        borderRadius: 6,
        padding: "10px 14px",
        color: B.white,
        fontSize: 14,
        fontFamily: "inherit",
        boxSizing: "border-box",
        outline: "none",
      }}
    />
  );

  return (
    <div style={{ maxWidth: 820, margin: "48px auto", padding: "0 24px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div
          style={{
            display: "inline-block",
            background: `${B.red}22`,
            border: `1px solid ${B.red}44`,
            borderRadius: 8,
            padding: "6px 16px",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              color: B.red,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Loss Run Analysis Portal
          </span>
        </div>
        <h1
          style={{
            color: B.white,
            fontSize: 36,
            fontWeight: 800,
            margin: "0 0 12px",
            letterSpacing: "-0.5px",
          }}
        >
          Upload Loss Runs for AI Analysis
        </h1>
        <p style={{ color: B.light, fontSize: 16, margin: 0 }}>
          Upload your client's loss run documents and receive a comprehensive
          analysis in seconds.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current.click()}
        style={{
          border: `2px dashed ${
            dragging ? B.red : files.length > 0 ? B.green : B.border
          }`,
          borderRadius: 12,
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging
            ? `${B.red}0A`
            : files.length > 0
            ? `${B.green}0A`
            : B.card,
          transition: "all .3s",
          marginBottom: 32,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.xlsx,.xls,.csv"
          multiple
          style={{ display: "none" }}
          onChange={handleFileSelect}
        />
        <div style={{ fontSize: 48, marginBottom: 12 }}>
          {files.length > 0 ? "✅" : "📄"}
        </div>
        {files.length > 0 ? (
          <>
            <div
              style={{
                color: B.green,
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              {files.length} file{files.length > 1 ? "s" : ""} uploaded
            </div>
            <div style={{ color: B.light, fontSize: 13, marginBottom: 12 }}>
              Click to add more files
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginTop: 16,
                maxHeight: 200,
                overflowY: "auto",
              }}
            >
              {files.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: B.dark,
                    border: `1px solid ${B.border}`,
                    borderRadius: 6,
                    padding: "8px 12px",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flex: 1,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>📄</span>
                    <div>
                      <div
                        style={{
                          color: B.white,
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {f.name}
                      </div>
                      <div style={{ color: B.mid, fontSize: 12 }}>
                        {(f.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    style={{
                      background: `${B.red}22`,
                      border: `1px solid ${B.red}44`,
                      color: B.red,
                      borderRadius: 4,
                      padding: "4px 10px",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                color: B.white,
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Drag & drop your loss runs here
            </div>
            <div style={{ color: B.light, fontSize: 14 }}>
              PDF, Excel, or CSV · Multiple files supported · or{" "}
              <span style={{ color: B.red, textDecoration: "underline" }}>
                browse files
              </span>
            </div>
          </>
        )}
      </div>

      {/* Form */}
      <Card style={{ marginBottom: 24 }}>
        <SectionTitle>Account Information</SectionTitle>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          <div>
            <label
              style={{
                color: B.light,
                fontSize: 12,
                display: "block",
                marginBottom: 6,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Insured Name *
            </label>
            {inp("insured", "ABC Manufacturing LLC")}
          </div>
          <div>
            <label
              style={{
                color: B.light,
                fontSize: 12,
                display: "block",
                marginBottom: 6,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Current Carrier
            </label>
            {inp("carrier", "Hartford, Travelers, etc.")}
          </div>
          <div>
            <label
              style={{
                color: B.light,
                fontSize: 12,
                display: "block",
                marginBottom: 6,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Policy Period
            </label>
            {inp("policyPeriod", "01/01/2020 – 01/01/2025")}
          </div>
          <div>
            <label
              style={{
                color: B.light,
                fontSize: 12,
                display: "block",
                marginBottom: 6,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Annual Premium *
            </label>
            {inp("premium", "250000")}
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label
              style={{
                color: B.light,
                fontSize: 12,
                display: "block",
                marginBottom: 6,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Lines of Business
            </label>
            <select
              value={form.lines}
              onChange={(e) =>
                setForm((p) => ({ ...p, lines: e.target.value }))
              }
              style={{
                width: "100%",
                background: B.dark,
                border: `1px solid ${B.border}`,
                borderRadius: 6,
                padding: "10px 14px",
                color: B.white,
                fontSize: 14,
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            >
              {[
                "Multiple Lines",
                "General Liability",
                "Workers' Compensation",
                "Commercial Auto",
                "Commercial Property",
                "Umbrella/Excess",
                "Professional Liability",
                "Directors & Officers",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {error && (
        <div
          style={{
            background: `${B.red}22`,
            border: `1px solid ${B.red}`,
            borderRadius: 6,
            padding: "12px 16px",
            color: "#ff8080",
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          ⚠ {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          background: B.red,
          color: B.white,
          border: "none",
          borderRadius: 8,
          padding: "16px",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.5px",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        ⚡ Run AI Claims Analysis
      </button>

      <p
        style={{
          textAlign: "center",
          color: B.mid,
          fontSize: 12,
          marginTop: 16,
        }}
      >
        Large loss threshold:{" "}
        <strong style={{ color: B.light }}>
          {fmt(adminParams.largeLossThreshold)}
        </strong>{" "}
        · Loss ratio alert:{" "}
        <strong style={{ color: B.light }}>
          {adminParams.lossRatioAlert}%
        </strong>
      </p>
    </div>
  );
};

// ── PROCESSING VIEW ───────────────────────────────────────────────────────
const ProcessingView = ({ fileNames }) => {
  const steps = [
    "Parsing loss run documents…",
    "Extracting claims data…",
    "Computing frequency & severity trends…",
    "Identifying large losses…",
    "Calculating loss ratios…",
    "Running AI analysis…",
    "Generating recommendations…",
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => Math.min(s + 1, steps.length - 1)),
      1800
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: 48,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          border: `4px solid ${B.border}`,
          borderTopColor: B.red,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          marginBottom: 32,
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
      <h2
        style={{
          color: B.white,
          fontSize: 24,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        Analyzing Loss Run{fileNames.length > 1 ? "s" : ""}
      </h2>
      <p style={{ color: B.light, fontSize: 14, marginBottom: 8 }}>
        {fileNames.length} document{fileNames.length > 1 ? "s" : ""} uploaded
      </p>
      <div
        style={{
          color: B.mid,
          fontSize: 12,
          marginBottom: 32,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        {fileNames.slice(0, 3).join(", ")}
        {fileNames.length > 3 && ` +${fileNames.length - 3} more`}
      </div>
      <div style={{ width: "100%", maxWidth: 480 }}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 0",
              opacity: i <= step ? 1 : 0.3,
              transition: "opacity .5s",
            }}
          >
            <span style={{ fontSize: 16 }}>
              {i < step ? "✅" : i === step ? "⏳" : "○"}
            </span>
            <span
              style={{ color: i === step ? B.white : B.light, fontSize: 14 }}
            >
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── DASHBOARD VIEW ────────────────────────────────────────────────────────
const DashboardView = ({ data, formData, onReset }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const d = data;
  const s = d.summary || {};
  const lossRatio = s.premium > 0 ? (s.totalIncurred / s.premium) * 100 : 0;
  const lrColor = lossRatio > 70 ? B.red : lossRatio > 50 ? B.amber : B.green;

  const tabs = [
    ["overview", "Overview"],
    ["trends", "Trends"],
    ["losses", "Large Losses"],
    ["findings", "Findings"],
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
      {/* Title Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              color: B.light,
              fontSize: 12,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Claims Analysis Report
          </div>
          <h1
            style={{
              color: B.white,
              fontSize: 28,
              fontWeight: 800,
              margin: "0 0 4px",
            }}
          >
            {s.insuredName || formData.insured}
          </h1>
          <div style={{ color: B.light, fontSize: 14 }}>
            {formData.lines} ·{" "}
            {formData.policyPeriod || s.analysisPeriod || "Multi-Year"} ·{" "}
            {formData.carrier && `Carrier: ${formData.carrier}`}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div
            style={{
              background: `${riskColor(s.riskRating)}22`,
              border: `1px solid ${riskColor(s.riskRating)}`,
              borderRadius: 6,
              padding: "10px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: B.light,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Risk Rating
            </div>
            <div
              style={{
                color: riskColor(s.riskRating),
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              {s.riskRating || "—"}
            </div>
            {s.riskScore != null && (
              <div style={{ color: B.light, fontSize: 11 }}>
                Score: {s.riskScore}/100
              </div>
            )}
          </div>
          <button
            onClick={onReset}
            style={{
              background: "transparent",
              border: `1px solid ${B.border}`,
              color: B.light,
              borderRadius: 6,
              padding: "10px 16px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 13,
            }}
          >
            ↩ New Analysis
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 2,
          marginBottom: 28,
          borderBottom: `1px solid ${B.border}`,
          paddingBottom: 0,
        }}
      >
        {tabs.map(([v, label]) => (
          <button
            key={v}
            onClick={() => setActiveTab(v)}
            style={{
              background: "transparent",
              color: activeTab === v ? B.red : B.light,
              border: "none",
              borderBottom:
                activeTab === v
                  ? `2px solid ${B.red}`
                  : "2px solid transparent",
              padding: "10px 20px",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 14,
              fontWeight: activeTab === v ? 700 : 400,
              marginBottom: -1,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <>
          {/* Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <StatCard
              label="Total Incurred"
              value={fmt(s.totalIncurred)}
              sub="Paid + Reserves"
              color={B.red}
            />
            <StatCard
              label="Total Paid"
              value={fmt(s.totalPaid)}
              sub="All closed claims"
              color={B.blue}
            />
            <StatCard
              label="Open Reserves"
              value={fmt((s.totalIncurred || 0) - (s.totalPaid || 0))}
              sub="Pending closure"
              color={B.amber}
            />
            <StatCard
              label="Subrogation"
              value={fmt(s.subrogationRecoveries)}
              sub="Recovered to date"
              color={B.green}
            />
            <StatCard
              label="Loss Ratio"
              value={fmtPct(lossRatio)}
              sub={`Premium: ${fmt(s.premium || formData.premium * 1)}`}
              color={lrColor}
            />
            <StatCard
              label="Total Claims"
              value={s.totalClaims || "—"}
              sub={`${d.claimStatusBreakdown?.open || 0} open · ${
                d.claimStatusBreakdown?.closed || 0
              } closed`}
              color={B.mid}
            />
          </div>

          {/* Charts Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: 20,
              marginBottom: 20,
            }}
          >
            <Card>
              <SectionTitle>Incurred vs Paid by Year</SectionTitle>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={d.yearlyTrends || []}
                  margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={B.border} />
                  <XAxis
                    dataKey="year"
                    stroke={B.light}
                    tick={{ fill: B.light, fontSize: 12 }}
                  />
                  <YAxis
                    stroke={B.light}
                    tick={{ fill: B.light, fontSize: 11 }}
                    tickFormatter={(v) =>
                      "$" +
                      (v >= 1000000
                        ? (v / 1000000).toFixed(1) + "M"
                        : v >= 1000
                        ? (v / 1000).toFixed(0) + "K"
                        : v)
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      background: B.dark,
                      border: `1px solid ${B.border}`,
                      borderRadius: 6,
                    }}
                    labelStyle={{ color: B.white }}
                    formatter={(v, n) => [fmt(v), n]}
                  />
                  <Legend wrapperStyle={{ color: B.light, fontSize: 12 }} />
                  <Bar
                    dataKey="incurred"
                    name="Total Incurred"
                    fill={B.red}
                    radius={[3, 3, 0, 0]}
                  />
                  <Bar
                    dataKey="paid"
                    name="Total Paid"
                    fill={B.blue}
                    radius={[3, 3, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <SectionTitle>Cause of Loss</SectionTitle>
              {d.causeOfLoss && d.causeOfLoss.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={160}>
                    <PieChart>
                      <Pie
                        data={d.causeOfLoss}
                        dataKey="incurred"
                        nameKey="cause"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label={false}
                      >
                        {d.causeOfLoss.map((_, i) => (
                          <Cell
                            key={i}
                            fill={PIE_COLORS[i % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: B.dark,
                          border: `1px solid ${B.border}`,
                        }}
                        formatter={(v, n) => [fmt(v), n]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ marginTop: 8 }}>
                    {d.causeOfLoss.slice(0, 5).map((c, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "4px 0",
                          borderBottom: `1px solid ${B.border}`,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: 2,
                              background: PIE_COLORS[i % PIE_COLORS.length],
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ color: B.light, fontSize: 12 }}>
                            {c.cause}
                          </span>
                        </div>
                        <span
                          style={{
                            color: B.white,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {c.count} · {fmt(c.incurred)}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ color: B.light, fontSize: 13, paddingTop: 16 }}>
                  No cause-of-loss data available.
                </div>
              )}
            </Card>
          </div>

          {/* Claims Status + Frequency */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            <Card>
              <SectionTitle>Claim Frequency by Year</SectionTitle>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  data={d.yearlyTrends || []}
                  margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="clg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={B.red} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={B.red} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={B.border} />
                  <XAxis
                    dataKey="year"
                    stroke={B.light}
                    tick={{ fill: B.light, fontSize: 12 }}
                  />
                  <YAxis
                    stroke={B.light}
                    tick={{ fill: B.light, fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: B.dark,
                      border: `1px solid ${B.border}`,
                      borderRadius: 6,
                    }}
                    labelStyle={{ color: B.white }}
                  />
                  <Area
                    type="monotone"
                    dataKey="claims"
                    name="Claims"
                    stroke={B.red}
                    fill="url(#clg)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <SectionTitle>Average Severity by Year</SectionTitle>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={d.yearlyTrends || []}
                  margin={{ top: 0, right: 0, left: 10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={B.border} />
                  <XAxis
                    dataKey="year"
                    stroke={B.light}
                    tick={{ fill: B.light, fontSize: 12 }}
                  />
                  <YAxis
                    stroke={B.light}
                    tick={{ fill: B.light, fontSize: 11 }}
                    tickFormatter={(v) =>
                      "$" + (v >= 1000 ? (v / 1000).toFixed(0) + "K" : v)
                    }
                  />
                  <Tooltip
                    contentStyle={{
                      background: B.dark,
                      border: `1px solid ${B.border}`,
                      borderRadius: 6,
                    }}
                    labelStyle={{ color: B.white }}
                    formatter={(v) => [fmt(v), "Avg Severity"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="severity"
                    name="Avg Severity"
                    stroke={B.amber}
                    strokeWidth={2}
                    dot={{ fill: B.amber, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </>
      )}

      {/* TRENDS TAB */}
      {activeTab === "trends" && (
        <div style={{ display: "grid", gap: 20 }}>
          <Card>
            <SectionTitle>Multi-Year Loss Ratio Trend</SectionTitle>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={(d.yearlyTrends || []).map((y) => ({
                  ...y,
                  lossRatio:
                    s.premium > 0
                      ? (y.incurred /
                          (s.premium / (d.yearlyTrends || [1]).length)) *
                        100
                      : 0,
                }))}
                margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={B.border} />
                <XAxis
                  dataKey="year"
                  stroke={B.light}
                  tick={{ fill: B.light }}
                />
                <YAxis
                  stroke={B.light}
                  tick={{ fill: B.light }}
                  tickFormatter={(v) => v + "%"}
                />
                <Tooltip
                  contentStyle={{
                    background: B.dark,
                    border: `1px solid ${B.border}`,
                  }}
                  formatter={(v) => [v.toFixed(1) + "%", "Loss Ratio"]}
                />
                <Line
                  type="monotone"
                  dataKey="lossRatio"
                  name="Loss Ratio"
                  stroke={B.red}
                  strokeWidth={2.5}
                  dot={{ fill: B.red, r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card>
            <SectionTitle>Incurred vs Paid vs Subrogation</SectionTitle>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={d.yearlyTrends || []}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={B.border} />
                <XAxis
                  dataKey="year"
                  stroke={B.light}
                  tick={{ fill: B.light }}
                />
                <YAxis
                  stroke={B.light}
                  tick={{ fill: B.light }}
                  tickFormatter={(v) =>
                    "$" +
                    (v >= 1000000
                      ? (v / 1000000).toFixed(1) + "M"
                      : v >= 1000
                      ? (v / 1000).toFixed(0) + "K"
                      : v)
                  }
                />
                <Tooltip
                  contentStyle={{
                    background: B.dark,
                    border: `1px solid ${B.border}`,
                  }}
                  formatter={(v, n) => [fmt(v), n]}
                />
                <Legend wrapperStyle={{ color: B.light, fontSize: 12 }} />
                <Bar
                  dataKey="incurred"
                  name="Incurred"
                  fill={B.red}
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="paid"
                  name="Paid"
                  fill={B.blue}
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="subrogation"
                  name="Subrogation"
                  fill={B.green}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {/* LARGE LOSSES TAB */}
      {activeTab === "losses" && (
        <Card>
          <SectionTitle>
            Large Loss Register ({(d.largeLosses || []).length} flagged)
          </SectionTitle>
          {(d.largeLosses || []).length === 0 ? (
            <div style={{ color: B.light, fontSize: 14, paddingTop: 8 }}>
              No large losses identified above threshold.
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr style={{ borderBottom: `2px solid ${B.red}` }}>
                    {[
                      "Claim #",
                      "Date",
                      "Description",
                      "Status",
                      "Paid",
                      "Incurred",
                      "Flag",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 12px",
                          textAlign: "left",
                          color: B.light,
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(d.largeLosses || []).map((c, i) => (
                    <tr
                      key={i}
                      style={{
                        borderBottom: `1px solid ${B.border}`,
                        background:
                          i % 2 === 0 ? `${B.white}05` : "transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px 12px",
                          color: B.white,
                          fontWeight: 600,
                        }}
                      >
                        {c.claimNumber || `CL-${i + 1}`}
                      </td>
                      <td style={{ padding: "10px 12px", color: B.light }}>
                        {c.date || "—"}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: B.light,
                          maxWidth: 220,
                        }}
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {c.description || "—"}
                        </div>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span
                          style={{
                            background:
                              c.status === "Open"
                                ? `${B.amber}22`
                                : `${B.green}22`,
                            color: c.status === "Open" ? B.amber : B.green,
                            border: `1px solid ${
                              c.status === "Open" ? B.amber : B.green
                            }44`,
                            borderRadius: 4,
                            padding: "2px 8px",
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          {c.status || "Closed"}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: B.white,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {fmt(c.paid)}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: B.red,
                          fontWeight: 700,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {fmt(c.incurred)}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <div
                          title={c.flagReason}
                          style={{
                            background: `${B.red}22`,
                            color: B.red,
                            border: `1px solid ${B.red}44`,
                            borderRadius: 4,
                            padding: "2px 8px",
                            fontSize: 11,
                            fontWeight: 700,
                            cursor: "help",
                            display: "inline-block",
                          }}
                        >
                          ⚑ LARGE LOSS
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      {/* FINDINGS TAB */}
      {activeTab === "findings" && (
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          <Card>
            <SectionTitle>Key Findings</SectionTitle>
            {(d.keyFindings || []).length === 0 ? (
              <div style={{ color: B.light }}>No findings available.</div>
            ) : (
              <ul
                style={{ margin: 0, padding: "0 0 0 4px", listStyle: "none" }}
              >
                {d.keyFindings.map((f, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      paddingBottom: 12,
                      borderBottom: `1px solid ${B.border}`,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        color: B.red,
                        fontSize: 16,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      ▸
                    </span>
                    <span
                      style={{ color: B.off, fontSize: 14, lineHeight: 1.5 }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card>
              <SectionTitle>Risk Management Notes</SectionTitle>
              {(d.riskManagementNotes || []).length === 0 ? (
                <div style={{ color: B.light }}>
                  No risk management notes available.
                </div>
              ) : (
                <ul
                  style={{ margin: 0, padding: "0 0 0 4px", listStyle: "none" }}
                >
                  {d.riskManagementNotes.map((r, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        paddingBottom: 10,
                        borderBottom: `1px solid ${B.border}`,
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          color: B.amber,
                          fontSize: 14,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      >
                        ⚠
                      </span>
                      <span
                        style={{ color: B.off, fontSize: 14, lineHeight: 1.5 }}
                      >
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
            <Card>
              <SectionTitle>Claims Management Notes</SectionTitle>
              {(d.claimsManagementNotes || []).length === 0 ? (
                <div style={{ color: B.light }}>
                  No claims management notes available.
                </div>
              ) : (
                <ul
                  style={{ margin: 0, padding: "0 0 0 4px", listStyle: "none" }}
                >
                  {d.claimsManagementNotes.map((n, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        gap: 10,
                        paddingBottom: 8,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{ color: B.blue, fontSize: 14, flexShrink: 0 }}
                      >
                        ℹ
                      </span>
                      <span
                        style={{ color: B.off, fontSize: 13, lineHeight: 1.5 }}
                      >
                        {n}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

// ── ADMIN VIEW ────────────────────────────────────────────────────────────
const AdminView = ({ params, setParams }) => {
  const [saved, setSaved] = useState(false);
  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const field = (label, key, type = "text", note = "") => (
    <div style={{ marginBottom: 20 }}>
      <label
        style={{
          color: B.light,
          fontSize: 12,
          display: "block",
          marginBottom: 6,
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={params[key]}
          onChange={(e) => setParams((p) => ({ ...p, [key]: e.target.value }))}
          rows={6}
          style={{
            width: "100%",
            background: B.dark,
            border: `1px solid ${B.border}`,
            borderRadius: 6,
            padding: "10px 14px",
            color: B.white,
            fontSize: 13,
            fontFamily: "monospace",
            boxSizing: "border-box",
            resize: "vertical",
            outline: "none",
            lineHeight: 1.6,
          }}
        />
      ) : (
        <input
          type={type}
          value={params[key]}
          onChange={(e) =>
            setParams((p) => ({
              ...p,
              [key]:
                type === "number" ? Number(e.target.value) : e.target.value,
            }))
          }
          style={{
            width: "100%",
            background: B.dark,
            border: `1px solid ${B.border}`,
            borderRadius: 6,
            padding: "10px 14px",
            color: B.white,
            fontSize: 14,
            fontFamily: "inherit",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      )}
      {note && (
        <div style={{ color: B.mid, fontSize: 11, marginTop: 5 }}>{note}</div>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: "48px auto", padding: "0 24px" }}>
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            color: B.red,
            fontSize: 12,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Configuration
        </div>
        <h1
          style={{ color: B.white, fontSize: 28, fontWeight: 800, margin: 0 }}
        >
          Analysis Parameters
        </h1>
        <p style={{ color: B.light, fontSize: 14, marginTop: 8 }}>
          These settings define how Claude analyzes every submitted loss run.
        </p>
      </div>

      <Card style={{ marginBottom: 20 }}>
        <SectionTitle>Thresholds & Alerts</SectionTitle>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
        >
          {field(
            "Large Loss Threshold ($)",
            "largeLossThreshold",
            "number",
            "Claims exceeding this amount will be flagged in the Large Loss register."
          )}
          {field(
            "Loss Ratio Alert (%)",
            "lossRatioAlert",
            "number",
            "Accounts above this loss ratio will receive elevated risk commentary."
          )}
        </div>
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <SectionTitle>Analysis Guidelines</SectionTitle>
        {field(
          "Underwriting Analysis Instructions",
          "guidelines",
          "textarea",
          "These instructions tell Claude how to analyze and what to look for in each loss run. Be as specific as possible."
        )}
      </Card>

      <Card style={{ marginBottom: 20 }}>
        <SectionTitle>Risk Management Notes</SectionTitle>
        {field(
          "Risk Management Guidelines",
          "riskManagementNotes",
          "textarea",
          "Guidelines for identifying safety program deficiencies, loss prevention opportunities, and risk improvement recommendations."
        )}
      </Card>

      <Card style={{ marginBottom: 32 }}>
        <SectionTitle>Claims Management Notes</SectionTitle>
        {field(
          "Claims Handling Instructions",
          "claimsManagementNotes",
          "textarea",
          "Instructions for claims handling best practices, internal vs. external adjudication, and reserve adequacy assessment."
        )}
      </Card>

      <button
        onClick={save}
        style={{
          width: "100%",
          background: saved ? B.green : B.red,
          color: B.white,
          border: "none",
          borderRadius: 8,
          padding: "16px",
          fontSize: 16,
          fontWeight: 700,
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background .3s",
        }}
      >
        {saved ? "✓ Parameters Saved" : "Save Parameters"}
      </button>
    </div>
  );
};

// ── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("upload");
  const [adminParams, setAdminParams] = useState(DEFAULT_PARAMS);
  const [results, setResults] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentFiles, setCurrentFiles] = useState([]);
  const [apiError, setApiError] = useState("");

  const handleAnalyze = async (files, form) => {
    setFormData(form);
    setCurrentFiles(files);
    setView("processing");
    setApiError("");

    try {
      // For multiple files, we'll analyze the first one (or combine them in a real implementation)
      const file = files[0]; // In production, you'd want to handle multiple files properly

      // Read file as base64
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(",")[1]);
        reader.onerror = rej;
        reader.readAsDataURL(file);
      });

      const isPDF =
        file.type === "application/pdf" || file.name.endsWith(".pdf");

      const systemPrompt = `You are an expert insurance claims analyst at GNP Insurance Brokerage. Analyze the provided loss run document thoroughly.

UNDERWRITING PARAMETERS:
- Large Loss Threshold: $${adminParams.largeLossThreshold.toLocaleString()}
- Loss Ratio Alert Level: ${adminParams.lossRatioAlert}%
- Insured Name: ${form.insured}
- Lines of Business: ${form.lines}
- Policy Period: ${form.policyPeriod || "As stated in document"}
- Annual Premium: $${Number(form.premium).toLocaleString() || "As stated"}
- Current Carrier: ${form.carrier || "As stated"}
- Number of Documents: ${files.length}

ANALYSIS GUIDELINES:
${adminParams.guidelines}

RISK MANAGEMENT GUIDELINES:
${adminParams.riskManagementNotes}

CLAIMS MANAGEMENT INSTRUCTIONS:
${adminParams.claimsManagementNotes}

CRITICAL: Return ONLY a valid JSON object with NO markdown, NO code fences, NO preamble. Use this exact structure:
{
  "summary": {
    "insuredName": "string",
    "analysisPeriod": "string (e.g. 2020-2024)",
    "totalClaims": number,
    "totalPaid": number,
    "totalIncurred": number,
    "subrogationRecoveries": number,
    "premium": number,
    "riskScore": number (0-100, higher = more risk),
    "riskRating": "Preferred|Standard|Non-Standard|Declined"
  },
  "yearlyTrends": [
    { "year": "string", "claims": number, "paid": number, "incurred": number, "severity": number, "subrogation": number }
  ],
  "causeOfLoss": [
    { "cause": "string", "count": number, "paid": number, "incurred": number }
  ],
  "claimStatusBreakdown": { "open": number, "closed": number },
  "largeLosses": [
    { "claimNumber": "string", "date": "string", "description": "string", "paid": number, "incurred": number, "status": "Open|Closed", "flagReason": "string" }
  ],
  "keyFindings": ["string"],
  "riskManagementNotes": ["string"],
  "claimsManagementNotes": ["string"]
}

If the document does not contain clear financial data, make reasonable estimates based on what is visible and note that in keyFindings. Always return valid JSON.`;

      let messages;

      if (isPDF) {
        messages = [
          {
            role: "user",
            content: [
              {
                type: "document",
                source: {
                  type: "base64",
                  media_type: "application/pdf",
                  data: base64,
                },
              },
              {
                type: "text",
                text: `Please analyze this loss run for ${form.insured} and return the structured JSON analysis.`,
              },
            ],
          },
        ];
      } else {
        // For Excel/CSV, send as text description
        messages = [
          {
            role: "user",
            content: `I'm uploading a loss run file named "${file.name}" for ${
              form.insured
            }. The file is ${(file.size / 1024).toFixed(
              1
            )}KB. Please analyze based on the policy parameters provided and return sample structured analysis JSON showing what would be analyzed from a typical loss run for a ${
              form.lines
            } account with $${Number(
              form.premium
            ).toLocaleString()} premium over ${
              form.policyPeriod || "5 years"
            }.`,
          },
        ];
      }

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: systemPrompt,
          messages,
        }),
      });

      const raw = await resp.json();
      if (raw.error) throw new Error(raw.error.message);

      const text = (raw.content || []).map((b) => b.text || "").join("");
      const clean = text.replace(/```json|```/gi, "").trim();

      let parsed;
      try {
        parsed = JSON.parse(clean);
      } catch {
        // Try extracting JSON from text
        const match = clean.match(/\{[\s\S]*\}/);
        parsed = match ? JSON.parse(match[0]) : null;
      }

      if (!parsed)
        throw new Error("Could not parse analysis response. Please try again.");

      // Inject form premium if not in summary
      if (!parsed.summary.premium && form.premium)
        parsed.summary.premium = Number(form.premium);

      setResults(parsed);
      setView("dashboard");
    } catch (err) {
      setApiError(err.message || "Analysis failed. Please try again.");
      setView("upload");
    }
  };

  const handleReset = () => {
    setResults(null);
    setFormData(null);
    setView("upload");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: B.dark,
        color: B.white,
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${B.darker}; }
        ::-webkit-scrollbar-thumb { background: ${B.border}; border-radius: 3px; }
        button:hover { opacity: 0.9; }
        input:focus, textarea:focus, select:focus { border-color: ${B.red} !important; }
        select option { background: ${B.dark}; }
      `}</style>

      <Header
        view={["upload", "processing"].includes(view) ? "upload" : view}
        setView={(v) => {
          if (v === "upload") handleReset();
          else setView(v);
        }}
      />

      {apiError && (
        <div
          style={{
            background: `${B.red}22`,
            border: `1px solid ${B.red}`,
            padding: "12px 24px",
            textAlign: "center",
            color: "#ff9090",
            fontSize: 14,
          }}
        >
          ⚠ {apiError}
        </div>
      )}

      {view === "upload" && (
        <UploadView onAnalyze={handleAnalyze} adminParams={adminParams} />
      )}
      {view === "processing" && (
        <ProcessingView fileNames={currentFiles.map((f) => f.name)} />
      )}
      {view === "dashboard" && results && (
        <DashboardView
          data={results}
          formData={formData}
          onReset={handleReset}
        />
      )}
      {view === "admin" && (
        <AdminView params={adminParams} setParams={setAdminParams} />
      )}

      <footer
        style={{
          borderTop: `1px solid ${B.border}`,
          padding: "16px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 48,
        }}
      >
        <img
          src={LOGO_B64}
          alt="GNP Insurance Brokerage"
          style={{ height: 28, objectFit: "contain" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <span style={{ color: B.mid, fontSize: 12 }}>
          Loss Run Analysis Portal · Powered by AI · GNP Insurance Brokerage
        </span>
      </footer>
    </div>
  );
}
