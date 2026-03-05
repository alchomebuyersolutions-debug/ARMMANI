import MetaTrader5 as mt5
from flask import Flask, request, jsonify
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("MT5-Bridge")

app = Flask(__name__)

# Initialize MT5
if not mt5.initialize():
    logger.error("MT5 initialization failed")
    quit()

logger.info("MT5 Bridge is online and connected to Terminal")

@app.route('/trade', methods=['POST'])
def execute_trade():
    """
    Expects JSON: {
        "symbol": "XAUUSD",
        "action": "buy" | "sell",
        "volume": 0.1,
        "sl": 2000.0,
        "tp": 2050.0,
        "magic": 123456
    }
    """
    data = request.json
    symbol = data.get("symbol")
    action_str = data.get("action", "buy").lower()
    volume = float(data.get("volume", 0.01))
    sl = float(data.get("sl", 0))
    tp = float(data.get("tp", 0))
    magic = int(data.get("magic", 123456))

    # Map action
    if action_str == "buy":
        action = mt5.TRADE_ACTION_DEAL
        order_type = mt5.ORDER_TYPE_BUY
        price = mt5.symbol_info_tick(symbol).ask
    elif action_str == "sell":
        action = mt5.TRADE_ACTION_DEAL
        order_type = mt5.ORDER_TYPE_SELL
        price = mt5.symbol_info_tick(symbol).bid
    else:
        return jsonify({"status": "error", "message": "Invalid action"}), 400

    request_dict = {
        "action": action,
        "symbol": symbol,
        "volume": volume,
        "type": order_type,
        "price": price,
        "sl": sl,
        "tp": tp,
        "magic": magic,
        "comment": "Alpha Engine Trade",
        "type_time": mt5.ORDER_TIME_GTC,
        "type_filling": mt5.ORDER_FILLING_IOC,
    }

    # Send order
    result = mt5.order_send(request_dict)
    
    if result.retcode != mt5.TRADE_RETCODE_DONE:
        logger.error(f"Trade failed: {result.comment}")
        return jsonify({
            "status": "error", 
            "retcode": result.retcode, 
            "message": result.comment
        }), 500

    logger.info(f"Trade successful: {symbol} {action_str} {volume}")
    return jsonify({
        "status": "success",
        "order_id": result.order,
        "message": "Order executed successfully"
    })

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify({
        "status": "online",
        "terminal_info": mt5.terminal_info()._asdict() if mt5.terminal_info() else "None"
    })

if __name__ == '__main__':
    # You can change the port here if needed
    app.run(host='0.0.0.0', port=5000)
