import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLogged:boolean = false;

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.loginStatus.subscribe(
      res => this.isLogged = res,
      error => console.log(error)
    )
  }

  ngOnInit(): void {
    
  }

  public logout():void {
    this.authService.clearStorage();
    this.router.navigate(['/login'])
  }
}
