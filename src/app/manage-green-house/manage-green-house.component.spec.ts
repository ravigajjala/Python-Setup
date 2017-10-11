import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGreenHouseComponent } from './manage-green-house.component';

describe('ManageGreenHouseComponent', () => {
  let component: ManageGreenHouseComponent;
  let fixture: ComponentFixture<ManageGreenHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGreenHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGreenHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
