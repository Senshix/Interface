import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProfileComponent } from './crud-profile.component';

describe('CrudProfileComponent', () => {
  let component: CrudProfileComponent;
  let fixture: ComponentFixture<CrudProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudProfileComponent]
    });
    fixture = TestBed.createComponent(CrudProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
