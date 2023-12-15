import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsEditComponent } from './metrics-edit.component';

describe('MetricsEditComponent', () => {
  let component: MetricsEditComponent;
  let fixture: ComponentFixture<MetricsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsEditComponent]
    });
    fixture = TestBed.createComponent(MetricsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
