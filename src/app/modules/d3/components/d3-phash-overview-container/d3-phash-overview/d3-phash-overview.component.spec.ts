import { ComponentFixture, TestBed } from '@angular/core/testing'

import { D3PhashOverviewComponent } from './d3-phash-overview.component'

describe('D3PhashOverviewComponent', () => {
  let component: D3PhashOverviewComponent
  let fixture: ComponentFixture<D3PhashOverviewComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [D3PhashOverviewComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(D3PhashOverviewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
