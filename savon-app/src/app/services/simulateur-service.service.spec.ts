import { TestBed } from '@angular/core/testing';

import { SimulateurServiceService } from './simulateur-service.service';

describe('SimulateurServiceService', () => {
  let service: SimulateurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulateurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
