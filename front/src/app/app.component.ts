import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private authService:AuthService, private router:Router){
    this.authService.loginStatus.subscribe();
  }

  ngOnInit(){
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
