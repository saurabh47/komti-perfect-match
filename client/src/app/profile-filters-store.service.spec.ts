import { TestBed } from '@angular/core/testing';

import { ProfileFiltersStoreService } from './profile-filters-store.service';

describe('ProfileFiltersStoreService', () => {
  let service: ProfileFiltersStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileFiltersStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
