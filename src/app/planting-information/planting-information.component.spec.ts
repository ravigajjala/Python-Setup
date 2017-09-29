import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantingInformationComponent } from './planting-information.component';

describe('PlantingInformationComponent', () => {
  let component: PlantingInformationComponent;
  let fixture: ComponentFixture<PlantingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
