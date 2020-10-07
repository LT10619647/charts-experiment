import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartsHomeContainerComponent } from './highcharts-home-container.component';

describe('HighchartsHomeContainerComponent', () => {
  let component: HighchartsHomeContainerComponent;
  let fixture: ComponentFixture<HighchartsHomeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighchartsHomeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartsHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
