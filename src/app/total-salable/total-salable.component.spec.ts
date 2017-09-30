import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSalableComponent } from './total-salable.component';

describe('TotalSalableComponent', () => {
  let component: TotalSalableComponent;
  let fixture: ComponentFixture<TotalSalableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalSalableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSalableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
