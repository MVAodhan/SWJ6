// Type definitions for the Temporal API (partial)
// For full type support, consider installing 'temporal-polyfill' or '@js-temporal/polyfill'

declare namespace Temporal {
  interface ZonedDateTimeLike {
    era?: string;
    eraYear?: number;
    year?: number;
    month?: number;
    monthCode?: string;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
    offset?: string;
    timeZone?: string | object;
    calendar?: string | object;
  }

  class ZonedDateTime {
    withTimeZone(arg0: string): ZonedDateTime;
    static from(
      item: string | ZonedDateTimeLike,
      options?: {
        overflow?: "constrain" | "reject";
        disambiguation?: "compatible" | "earlier" | "later" | "reject";
        offset?: "use" | "ignore" | "prefer" | "reject";
      },
    ): ZonedDateTime;

    readonly year: number;
    readonly month: number;
    readonly day: number;
    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly microsecond: number;
    readonly nanosecond: number;
    readonly epochSeconds: number;
    readonly epochMilliseconds: number;

    toString(options?: object): string;
    toJSON(): string;
    toLocaleString(locales?: string | string[], options?: object): string;
  }

  class PlainDate {
    static from(item: string | object, options?: object): PlainDate;

    readonly year: number;
    readonly month: number;
    readonly day: number;

    toString(options?: object): string;
    toJSON(): string;
  }

  class PlainTime {
    static from(item: string | object, options?: object): PlainTime;

    readonly hour: number;
    readonly minute: number;
    readonly second: number;
    readonly millisecond: number;
    readonly microsecond: number;
    readonly nanosecond: number;

    toString(options?: object): string;
    toJSON(): string;
  }

  class Duration {
    // ... minimal
  }
}
