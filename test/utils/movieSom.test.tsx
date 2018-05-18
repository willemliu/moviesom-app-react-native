import { formatDuration } from "../../src/utils/movieSom";

describe('MovieSom utils', () => {
    it('should display runtime in (n)h (n)m format', () => {
        expect(formatDuration(120)).toBe('2h 0m');
        expect(formatDuration(149)).toBe('2h 29m');
        expect(formatDuration(96)).toBe('1h 36m');
        expect(formatDuration(121)).toBe('2h 1m');
    });
});
