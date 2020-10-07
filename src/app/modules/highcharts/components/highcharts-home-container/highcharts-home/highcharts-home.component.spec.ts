import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsHomeComponent } from './highcharts-home.component';

describe('HighchartsHomeComponent', () => {
  let component: HighchartsHomeComponent;
  let fixture: ComponentFixture<HighchartsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighchartsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
