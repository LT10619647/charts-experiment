import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3AwayComponent } from './d3-away.component';

describe('D3AwayComponent', () => {
  let component: D3AwayComponent;
  let fixture: ComponentFixture<D3AwayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3AwayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3AwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
