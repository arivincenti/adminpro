import { TestBed } from '@angular/core/testing';

import { HospitalesService } from './hospitales.service';

describe('HospitalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalesService = TestBed.get(HospitalesService);
    expect(service).toBeTruthy();
  });
});
