import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3ShellComponent } from './d3-shell.component';

describe('D3ShellComponent', () => {
  let component: D3ShellComponent;
  let fixture: ComponentFixture<D3ShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3ShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
