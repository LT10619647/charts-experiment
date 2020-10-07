import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3HomeComponent } from './d3-home.component';

describe('D3HomeComponent', () => {
  let component: D3HomeComponent;
  let fixture: ComponentFixture<D3HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3HomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
