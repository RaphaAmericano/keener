import { TestBed } from '@angular/core/testing';

import { SenhaResolverService } from './senha-resolver.service';

describe('SenhaResolverService', () => {
  let service: SenhaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenhaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
