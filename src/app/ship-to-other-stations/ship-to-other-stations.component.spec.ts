import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipToOtherStationsComponent } from './ship-to-other-stations.component';

describe('ShipToOtherStationsComponent', () => {
  let component: ShipToOtherStationsComponent;
  let fixture: ComponentFixture<ShipToOtherStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipToOtherStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipToOtherStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
