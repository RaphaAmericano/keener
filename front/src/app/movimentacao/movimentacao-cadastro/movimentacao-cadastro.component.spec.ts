import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoCadastroComponent } from './movimentacao-cadastro.component';

describe('MovimentacaoCadastroComponent', () => {
  let component: MovimentacaoCadastroComponent;
  let fixture: ComponentFixture<MovimentacaoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentacaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
