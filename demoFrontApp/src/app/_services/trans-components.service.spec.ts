import { TestBed } from '@angular/core/testing';

import { TransComponentsService } from './trans-components.service';

describe('TransComponentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransComponentsService = TestBed.get(TransComponentsService);
    expect(service).toBeTruthy();
  });
});
