import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router){
    this.authService.loginStatus.subscribe();
  }

  ngOnInit(): void {
    this.authService.checagemLogin().then(
      res => {
        if(res){
          this.authService.armarzenarUsuario(this.authService.getStorage())
        } else {
          this.authService.clearStorage();
          this.router.navigate(['login']);
        }
      },
      rej => {
        this.authService.clearStorage();
        this.router.navigate(['login']);
      }      
    )
  }

}
