import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAlumnosComponent } from './dialogo-alumnos.component';

describe('DialogoAlumnosComponent', () => {
  let component: DialogoAlumnosComponent;
  let fixture: ComponentFixture<DialogoAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoAlumnosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
