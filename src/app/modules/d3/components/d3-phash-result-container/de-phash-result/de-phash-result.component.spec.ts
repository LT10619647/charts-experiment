import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DePhashResultComponent } from './de-phash-result.component';

describe('DePhashResultComponent', () => {
  let component: DePhashResultComponent;
  let fixture: ComponentFixture<DePhashResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DePhashResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DePhashResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
