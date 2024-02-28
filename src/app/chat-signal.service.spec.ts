import { TestBed } from '@angular/core/testing';

import { ChatSignalService } from './chat-signal.service';

describe('ChatSignalService', () => {
  let service: ChatSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
