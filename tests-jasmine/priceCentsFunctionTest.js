import { priceCent } from '../../src/priceCentsFunction.js';

describe('priceCent', () => {
    it('cents into dollars', () => {
        expect(priceCent(100)).toEqual('1.00');
        expect(priceCent(123)).toEqual('1.23');
        expect(priceCent(1234)).toEqual('12.34');
        expect(priceCent(12345)).toEqual('123.45');
        expect(priceCent(123456)).toEqual('1234.56');
    });
});