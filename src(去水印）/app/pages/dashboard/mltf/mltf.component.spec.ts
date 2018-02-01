import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MltfComponent } from './mltf.component';

describe('MltfComponent', () => {
  let component: MltfComponent;
  let fixture: ComponentFixture<MltfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MltfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MltfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
