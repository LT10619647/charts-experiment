import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmchartsHomeContainerComponent } from './amcharts-home-container.component';

describe('AmchartsHomeContainerComponent', () => {
  let component: AmchartsHomeContainerComponent;
  let fixture: ComponentFixture<AmchartsHomeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmchartsHomeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmchartsHomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
