import { TestBed } from '@angular/core/testing';

import { BackendConnectorService } from './backend-connector.service';

describe('BackendConnectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendConnectorService = TestBed.get(BackendConnectorService);
    expect(service).toBeTruthy();
  });
});
