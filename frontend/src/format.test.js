import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDateTime, toLocalDateTimeInput, fromLocalDateTimeInput } from './format';

const pad = (n) => String(n).padStart(2, "0");
const now = new Date();

describe('formatCurrency()', () => {

  it('soll einen Betrag korrekt formatieren', () => {
    expect(formatCurrency(100))
      .toBe('100,00\u00A0€'); //  (U+00A0) geschütztes Leerzeichen / Non-Breaking Space
  });
  
  it('soll einen Betrag mit Nachkommastellen korrekt formatieren', () => {
    expect(formatCurrency(123.5))
      .toBe('123,50\u00A0€');
  });
  
  it('soll 0 korrekt formatieren', () => {
    expect(formatCurrency(0))
      .toBe('0,00\u00A0€');
  });
});

describe('formatDateTime()', () => {

  it('soll ein ISO-Datumzeit korrekt formatieren', () => {
    expect(formatDateTime('2026-11-07T14:05:00'))
      .toBe('07.11.2026, 14:05');
  });

  it('soll ein ISO-Datumzeit (Einstellige Stunde) korrekt formatieren', () => {
    expect(formatDateTime('2026-11-07T08:05:00'))
      .toBe('07.11.2026, 08:05');
  });

  it('soll ein ISO-Datumzeit (Mitternacht) korrekt formatieren', () => {
    expect(formatDateTime('2026-11-07T00:00:00'))
      .toBe('07.11.2026, 00:00');
  });
});

describe('toLocalDateTimeInput()', () => {
  it('soll ein normales Datum korrekt formatieren', () => {
    expect(toLocalDateTimeInput('2026-11-08T14:05:00'))
      .toBe('2026-11-08T14:05');
  });

  it('soll einstellige Werte mit einer führenden Null formatieren', () => {
    expect(toLocalDateTimeInput('2026-01-05T08:09:00'))
      .toBe('2026-01-05T08:09');
  });

  it('soll ein Datum im Sommer korrekt formatieren', () => {
    expect(toLocalDateTimeInput('2026-06-15T09:30:00'))
      .toBe('2026-06-15T09:30');
  });

  it('soll den Jahreswechsel korrekt formatieren', () => {
    expect(toLocalDateTimeInput('2025-12-31T23:59:00'))
      .toBe('2025-12-31T23:59');
  });

  it('soll Mitternacht korrekt formatieren', () => {
    expect(toLocalDateTimeInput('2026-03-01T00:00:00'))
      .toBe('2026-03-01T00:00');
  });

  it('soll den 29. Februar eines Schaltjahres korrekt formatieren', () => {
    expect(toLocalDateTimeInput('2024-02-29T12:45:00'))
      .toBe('2024-02-29T12:45');
  });

  it('soll das aktuelle Datum und die aktuelle Uhrzeit verwenden, wenn kein Argument übergeben wird', () => {
    const expected =
      `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
    expect(toLocalDateTimeInput()).toBe(expected);
  });
});

describe('fromLocalDateTimeInput()', () => {
  it('soll ein normales Datum in ISO-Format umwandeln', () => {
    expect(fromLocalDateTimeInput('2026-11-08T14:05'))
      .toBe('2026-11-08T13:05:00.000Z');
  });

  it('soll Mitternacht korrekt umwandeln', () => {
    expect(fromLocalDateTimeInput('2026-11-08T00:00'))
      .toBe('2026-11-07T23:00:00.000Z');
  });

  it('soll den Jahreswechsel korrekt umwandeln', () => {
    expect(fromLocalDateTimeInput('2026-01-01T00:00'))
      .toBe('2025-12-31T23:00:00.000Z');
  });

  it('soll die Sommerzeit berücksichtigen', () => {
    expect(fromLocalDateTimeInput('2026-06-15T14:05'))
      .toBe('2026-06-15T12:05:00.000Z');
  });

  it('soll bei einem ungültigen Datum einen Fehler werfen', () => {
  expect(() => fromLocalDateTimeInput('kein-datum'))
    .toThrow(RangeError);
});
});