import { TestBed } from '@angular/core/testing';

import { ClasesServiciosService } from './clases-servicios.service';

describe('ClasesServiciosService', () => {
  let service: ClasesServiciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasesServiciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
