import { TestBed } from '@angular/core/testing';

import { DrawerStateService } from './drawer-state.service';

describe('DrawerStateService', () => {
  let service: DrawerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
