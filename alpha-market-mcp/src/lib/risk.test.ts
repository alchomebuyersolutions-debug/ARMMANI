import { describe, it, expect } from 'vitest';
import { isDrawdownBreached, checkRevengeTrading, calculateLotSize } from './risk.js';

describe('Risk Engine', () => {
    describe('isDrawdownBreached', () => {
        it('should return true if drawdown is exceeded', () => {
            expect(isDrawdownBreached(45000, 50000, 4000)).toBe(true);
        });

        it('should return false if drawdown is within limits', () => {
            expect(isDrawdownBreached(47000, 50000, 4000)).toBe(false);
        });
    });

    describe('checkRevengeTrading', () => {
        it('should block trade if within cooling period', () => {
            const recently = new Date(Date.now() - 30 * 60000).toISOString();
            const result = checkRevengeTrading(recently, 60);
            expect(result.blocked).toBe(true);
            expect(result.remainingMins).toBeGreaterThan(0);
        });

        it('should allow trade if cooling period passed', () => {
            const longAgo = new Date(Date.now() - 90 * 60000).toISOString();
            const result = checkRevengeTrading(longAgo, 60);
            expect(result.blocked).toBe(false);
        });
    });

    describe('calculateLotSize', () => {
        it('should calculate correct lot size for basic risk', () => {
            // account 50000, risk 0.5% = 250
            // distance = 100 pips (e.g. 1.1000 to 1.0900)
            // distance * 10 = 1000
            // 250 / 1000 = 0.25
            const lots = calculateLotSize('EURUSD', 1.1000, 1.0900, 0.005, 50000);
            expect(lots).toBe(0.25);
        });
    });
});
