import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePlugCatalogComponent } from './manage-plug-catalog.component';

describe('ManagePlugCatalogComponent', () => {
  let component: ManagePlugCatalogComponent;
  let fixture: ComponentFixture<ManagePlugCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePlugCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePlugCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
