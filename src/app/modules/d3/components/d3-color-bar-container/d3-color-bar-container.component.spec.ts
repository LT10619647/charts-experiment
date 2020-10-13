import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ColorBarContainerComponent } from './d3-color-bar-container.component';

describe('D3AwayContainerComponent', () => {
  let component: D3ColorBarContainerComponent;
  let fixture: ComponentFixture<D3ColorBarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D3ColorBarContainerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ColorBarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
