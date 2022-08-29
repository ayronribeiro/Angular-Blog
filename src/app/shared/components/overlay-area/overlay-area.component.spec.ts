import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayAreaComponent } from './overlay-area.component';

describe('OverlayAreaComponent', () => {
  let component: OverlayAreaComponent;
  let fixture: ComponentFixture<OverlayAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
