# 🦅 Alpha Market MCP

**v2.0.0 — The Professional Trading Infrastructure for Model Context Protocol**

Alpha Market MCP is a high-performance, modular bridge between LLMs and the global financial markets. It enables AI agents to execute trades on MetaTrader 5 (MT5) and Blofin Exchange while maintaining institutional-grade risk management.

## 🏛️ Modular Architecture

The project has been refactored from a monolithic script into a clean, library-first architecture:

-   **`index.ts`**: The lightweight entrypoint that orchestrates the MCP tool handlers.
-   **`src/lib/`**:
    -   `risk.ts`: Institutional risk engine (drawdown, revenge trading, position sizing).
    -   `clients.ts`: Standardized initialization of MetaApi, Supabase, and Apify.
-   **`src/tools/`**:
    -   `trade.ts`: Multi-platform trade execution logic.
    -   `memory.ts`: Persistent trading memory powered by Supabase.
    -   `market.ts`: Market intelligence and news extraction via Apify.
    -   `strategy.ts`: Secure persistence of algorithmic strategy files.

## 🛠️ Integrated Tools

| Tool | Purpose | Key Feature |
| :--- | :--- | :--- |
| `execute_mt5_trade` | Institutional FX/Gold Trading | Real-time drawdown & revenge trading guards |
| `execute_blofin_trade` | Crypto Futures Execution | Direct API integration with HMAC signing |
| `save_trade_memory` | Agent Feedback Loop | Persist trade rationale for long-term optimization |
| `get_market_news` | Alpha Generation | Real-time sentiment analysis via web scraping |
| `save_strategy` | Algo Lab | Seamlessly save Pine Script or Python backtests |

## 🛡️ Risk Management (House Rules)

Alpha Market MCP enforces strict safety protocols:
-   **Max Drawdown**: Automatically blocks trades if equity falls below `MAX_TOTAL_DRAWDOWN`.
-   **Cooling Period**: Prevents "revenge trading" by enforcing a delay after every closed trade.
-   **Auto-Sizing**: Calculates lot size based on a fixed 0.5% risk-per-trade model if no volume is specified.

## 🚀 Setup & Installation

1.  **Clone & Install**:
    ```bash
    npm install
    ```
2.  **Configuration**: Populate `.env` with your API credentials (MetaApi, Supabase, etc).
3.  **Test**:
    ```bash
    npm test
    ```

---
*Built with precision for the modern algorithmic trader.*
