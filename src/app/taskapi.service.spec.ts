import { TestBed } from '@angular/core/testing';

import { TaskapiService } from './taskapi.service';

describe('TaskapiService', () => {
  let service: TaskapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
