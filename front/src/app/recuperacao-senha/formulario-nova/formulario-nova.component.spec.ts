import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioNovaComponent } from './formulario-nova.component';

describe('FormularioNovaComponent', () => {
  let component: FormularioNovaComponent;
  let fixture: ComponentFixture<FormularioNovaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioNovaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioNovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
