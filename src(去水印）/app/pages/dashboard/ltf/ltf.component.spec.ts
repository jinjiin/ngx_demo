import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LtfComponent } from './ltf.component';

describe('LtfComponent', () => {
  let component: LtfComponent;
  let fixture: ComponentFixture<LtfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LtfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LtfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
