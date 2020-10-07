import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasjsShellComponent } from './canvasjs-shell.component';

describe('CanvasjsShellComponent', () => {
  let component: CanvasjsShellComponent;
  let fixture: ComponentFixture<CanvasjsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasjsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasjsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
