import { TestBed } from '@angular/core/testing';

import { JSONPlaceholderService } from './json-place-holder.service';

describe('UserService', () => {
  let service: JSONPlaceholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JSONPlaceholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
