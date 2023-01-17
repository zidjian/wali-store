import { TestBed } from '@angular/core/testing';

import { TiempoInterceptor } from './tiempo.interceptor';

describe('TiempoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TiempoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TiempoInterceptor = TestBed.inject(TiempoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
