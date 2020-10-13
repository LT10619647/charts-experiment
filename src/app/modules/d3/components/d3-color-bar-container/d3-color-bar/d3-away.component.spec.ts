import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ColorBarComponent } from './d3-color-bar.component';

describe('D3ColorBarComponent', () => {
  let component: D3ColorBarComponent;
  let fixture: ComponentFixture<D3ColorBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D3ColorBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ColorBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
