import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmchartsShellComponent } from './amcharts-shell.component';

describe('AmchartsShellComponent', () => {
  let component: AmchartsShellComponent;
  let fixture: ComponentFixture<AmchartsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmchartsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmchartsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
