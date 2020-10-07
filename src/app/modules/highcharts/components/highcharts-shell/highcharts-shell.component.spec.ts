import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsShellComponent } from './highcharts-shell.component';

describe('HighchartsShellComponent', () => {
  let component: HighchartsShellComponent;
  let fixture: ComponentFixture<HighchartsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighchartsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
