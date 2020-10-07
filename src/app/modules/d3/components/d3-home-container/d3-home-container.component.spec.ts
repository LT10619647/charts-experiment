import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3HomeContainerComponent } from './d3-home-container.component';

describe('D3HomeContainerComponent', () => {
  let component: D3HomeContainerComponent;
  let fixture: ComponentFixture<D3HomeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3HomeContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3HomeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
