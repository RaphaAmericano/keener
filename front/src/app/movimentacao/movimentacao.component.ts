import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss']
})
export class MovimentacaoComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router){
    this.authService.loginStatus.subscribe();
  }

  ngOnInit(): void {
    
  }

}
