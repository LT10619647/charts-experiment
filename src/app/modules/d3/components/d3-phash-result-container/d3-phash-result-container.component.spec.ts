import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3PhashResultContainerComponent } from './d3-phash-result-container.component';

describe('D3PhashResultContainerComponent', () => {
  let component: D3PhashResultContainerComponent;
  let fixture: ComponentFixture<D3PhashResultContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3PhashResultContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3PhashResultContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
