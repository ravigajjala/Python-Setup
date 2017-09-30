import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingFromOtherStationsComponent } from './receiving-from-other-stations.component';

describe('ReceivingFromOtherStationsComponent', () => {
  let component: ReceivingFromOtherStationsComponent;
  let fixture: ComponentFixture<ReceivingFromOtherStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivingFromOtherStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingFromOtherStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
