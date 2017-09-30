import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicTrackerSheetComponent } from './organic-tracker-sheet.component';

describe('OrganicTrackerSheetComponent', () => {
  let component: OrganicTrackerSheetComponent;
  let fixture: ComponentFixture<OrganicTrackerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganicTrackerSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganicTrackerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
