import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoListaComponent } from './movimentacao-lista.component';

describe('MovimentacaoListaComponent', () => {
  let component: MovimentacaoListaComponent;
  let fixture: ComponentFixture<MovimentacaoListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentacaoListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacaoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
