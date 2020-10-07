import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasjsHomeComponent } from './canvasjs-home.component';

describe('CanvasjsHomeComponent', () => {
  let component: CanvasjsHomeComponent;
  let fixture: ComponentFixture<CanvasjsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasjsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasjsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
