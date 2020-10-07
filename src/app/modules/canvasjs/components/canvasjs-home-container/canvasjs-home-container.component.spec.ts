import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasjsHomeContainerComponent } from './canvasjs-home-container.component';

describe('CanvasjsHomeContainerComponent', () => {
  let component: CanvasjsHomeContainerComponent;
  let fixture: ComponentFixture<CanvasjsHomeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasjsHomeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasjsHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
