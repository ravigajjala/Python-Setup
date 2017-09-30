import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlugTrayInformationComponent } from './plug-tray-information.component';

describe('PlugTrayInformationComponent', () => {
  let component: PlugTrayInformationComponent;
  let fixture: ComponentFixture<PlugTrayInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlugTrayInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlugTrayInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
