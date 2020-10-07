import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmchartsHomeComponent } from './amcharts-home.component';

describe('AmchartsHomeComponent', () => {
  let component: AmchartsHomeComponent;
  let fixture: ComponentFixture<AmchartsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmchartsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmchartsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
