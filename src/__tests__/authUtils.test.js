import { calculatePasswordStrength } from '../pages/Auth/authUtils';

describe('calculatePasswordStrength', () => {
  test('should return 0 for empty or null password', () => {
    expect(calculatePasswordStrength('')).toBe(0);
    expect(calculatePasswordStrength(null)).toBe(0);
    expect(calculatePasswordStrength(undefined)).toBe(0);
  });

  test('should return 1 (Weak) for short passwords or single criteria', () => {
    expect(calculatePasswordStrength('12345')).toBe(1);
    expect(calculatePasswordStrength('abcdefg')).toBe(1);
    expect(calculatePasswordStrength('ABCDEFG')).toBe(1);
    expect(calculatePasswordStrength('!!!!!!!')).toBe(1);
    expect(calculatePasswordStrength('short')).toBe(1); // length < 8
  });

  test('should return 2 (Medium) for meeting two criteria (e.g., length + one type)', () => {
    // Length + lowercase
    expect(calculatePasswordStrength('abcdefgh')).toBe(2); 
    // Length + uppercase
    expect(calculatePasswordStrength('ABCDEFGH')).toBe(2); 
    // Length + numbers
    expect(calculatePasswordStrength('12345678')).toBe(2); 
    // Length + symbols
    expect(calculatePasswordStrength('!!!!!!!!')).toBe(2);
  });

  test('should return 3 (Good) for meeting more criteria', () => {
    // Length + Lower + Upper
    expect(calculatePasswordStrength('abcDEFgh')).toBe(3); 
    // Length + Lower + Number
    expect(calculatePasswordStrength('abcdef12')).toBe(3);
    // Length + Lower + Symbol
    expect(calculatePasswordStrength('abcdef!!')).toBe(3); 
    // Length + Upper + Number
    expect(calculatePasswordStrength('ABCDEF12')).toBe(3);
    // Length + Upper + Symbol
    expect(calculatePasswordStrength('ABCDEF!!')).toBe(3);
    // Length + Number + Symbol
    expect(calculatePasswordStrength('123456!!')).toBe(3);
  });

  test('should return 3 or 4 (Good/Strong) based on criteria', () => {
    // Length + Lower + Upper + Number (4 criteria) -> 3
    expect(calculatePasswordStrength('Abcdef12')).toBe(3);
    // Length + Lower + Upper + Symbol (4 criteria) -> 3
    expect(calculatePasswordStrength('Abcdef!!')).toBe(3);
    // Length + Lower + Number + Symbol (4 criteria) -> 3
    expect(calculatePasswordStrength('abcd12!!')).toBe(3);
    // Length + Upper + Number + Symbol (4 criteria) -> 3
    expect(calculatePasswordStrength('ABCD12!!')).toBe(3);
    // All criteria short (< 8 length, 4 other criteria) -> 3
    expect(calculatePasswordStrength('Abc12!')).toBe(3); 
     // All criteria long (>= 12 length, 5 other criteria, +1 for length) -> 4
    expect(calculatePasswordStrength('Abcdef12345!')).toBe(4); 
  });
}); 