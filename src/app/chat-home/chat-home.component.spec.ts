import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHomeComponent } from './chat-home.component';

describe('ChatHomeComponent', () => {
  let component: ChatHomeComponent;
  let fixture: ComponentFixture<ChatHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatHomeComponent]
    });
    fixture = TestBed.createComponent(ChatHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
