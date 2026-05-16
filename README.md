# Free-Local-Agent / DAVClaw & DAVSI

Free-Local-Agent (also known as **DAVClaw** & **DAVSI**) is a full-stack local AI agent platform built on emergent.sh. Rebranded from DroidClaw and Kira.

## Architecture — DAVSI 4-Pillar Cognitive Cortex

| Pillar | Function | Details |
| :--- | :--- | :--- |
| **SOMA** | SHA-256 blockchain memory chain | Verifiable, searchable, append-only memory chain. |
| **IRIS** | 6 routing profiles | REFLEX / FAST / SHARP / GENTLE / BALANCED / DEEP. |
| **GROUND** | 60s perception scheduler | Images destroyed after text extraction. |
| **DAEMON** | 8-min inner monologue scheduler | Persistence across reboots. |

## Backend — DAVSI
- **Runtime**: Bun + Hono HTTP server.
- **Ports**: `8001` (REST API), `3000` (Cyberpunk Dashboard).
- **WebSocket**: Real-time communication.
- **Self-Mod**: Self-modifying code capacity.

## Mobile — DAVClaw
- **Platform**: Android (APK built via Gradle).
- **SDK**: Android SDK 36.0.0.
- **Cross-arch**: QEMU user-static for x86_64 → aarch64 emulation.

## Getting Started

1. **Install Bun**: `curl -fsSL https://bun.sh/install | bash`
2. **Setup Environment**: Copy `.env.example` to `.env` and add your API keys.
3. **Run Backend**:
   ```bash
   cd davsi
   bun install
   bun run server.ts
   ```
4. **Access Dashboard**: Open `http://localhost:8001` in your browser.

## Verified Endpoints
- `/api/health`: Cortex status
- `/api/iris/route`: LLM routing
- `/api/daemon/tick`: Inner monologue
- `/api/self/propose`: Code modification proposals
- `/api/soma/verify`: Memory integrity
- `/api/bridge/heartbeat`: Mobile heartbeat
