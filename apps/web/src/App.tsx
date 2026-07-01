import { theme } from "@go-irl/shared"

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 900 }}>GO IRL — Web</div>
        <div style={{ color: theme.textMuted, fontSize: 13, marginTop: 8 }}>
          Phase 2 placeholder
        </div>
      </div>
    </div>
  )
}
