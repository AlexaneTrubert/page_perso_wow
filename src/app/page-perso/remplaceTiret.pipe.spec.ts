import {RemplaceTiretPipe} from "./remplaceTiret.pipe";


describe('RemplaceTiretPipe', () => {
  let pipe: RemplaceTiretPipe;

  beforeEach(() => {
    pipe = new RemplaceTiretPipe();
  });

  it('should transforms "hello-world" to "Hello World"', () => {
    const transformedValue = pipe.transform('hello-world');
    expect(transformedValue).toBe('Hello World');
  });
});
