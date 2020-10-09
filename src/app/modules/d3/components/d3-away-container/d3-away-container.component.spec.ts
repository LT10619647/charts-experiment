import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3AwayContainerComponent } from './d3-away-container.component';

describe('D3AwayContainerComponent', () => {
  let component: D3AwayContainerComponent;
  let fixture: ComponentFixture<D3AwayContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3AwayContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3AwayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
