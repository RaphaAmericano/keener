import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private authService:AuthService){
    this.authService.loginStatus.subscribe();
  }

  ngOnInit(){
    this.authService.checagemLogin().then()
  }
}
