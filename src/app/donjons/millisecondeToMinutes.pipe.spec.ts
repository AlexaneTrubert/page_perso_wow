import {MillisecondeToMinutesPipe} from "./millisecondeToMinutes.pipe";

describe('millisecondeToMinutesPipe', () => {
  let pipe: MillisecondeToMinutesPipe;

  beforeEach(() => {
    pipe = new MillisecondeToMinutesPipe();
  });

  it('should transform 60000ms to 1min when it\'s ok', () => {
    const transformedValue = pipe.transform(60000);
    expect(transformedValue).toBe('0h 1min 0s');
  });

  it('should return empty string if value is undefined', () => {
    const transformedValue = pipe.transform(NaN);
    expect(transformedValue).toBe('');
  });
});
