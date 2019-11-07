import { TestBed } from '@angular/core/testing';

import { ApiCallerService } from './api-caller.service';

describe('ApiCallerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiCallerService = TestBed.get(ApiCallerService);
    expect(service).toBeTruthy();
  });
});
