import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/shared/models/usuario';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = environment.API;

  private usuario:Usuario;
  private isLoggedIn:boolean = false;

  private loginMudancaSubject:Subject<boolean> = new Subject<boolean>();
  public loginMudanca = this.loginMudancaSubject.asObservable();
  private loginStatusSubject:Subject<any> = new Subject<boolean>();
  public loginStatus = this.loginStatusSubject.asObservable();

  constructor(private http:HttpClient) { 
    this.loginStatus.subscribe(
      res => this.isLoggedIn = res
    )
  }

  public requisicaoAuth(usuario:Usuario): Observable<any> {
      return this.http.post(`${this.API}auth/authenticate`, usuario).pipe(
        catchError(this.handleError)
      )
  }

  public guardarLocalStorage(res): void {
    this.loginStatusSubject.next(true);
    localStorage.setItem('usuario', JSON.stringify(res));
  }

  public getStorage() {
    return JSON.parse(localStorage.getItem('usuario'))
  }

  public clearStorage(): void {
    localStorage.removeItem('usuario')
  }

  public getIsLogged(): boolean {
    return this.isLoggedIn;
  }

  public checagemLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const usuario_atual = this.getStorage();
          //todo: verificar o vencimento do jwt
        this.loginMudancaSubject.next(!!usuario_atual);
        if(!!usuario_atual) this.loginStatusSubject.next(usuario_atual);
        this.loginStatusSubject.next(!!usuario_atual);
        resolve(!!usuario_atual)
      } catch (error) {
        reject(error)
      }
    });
  }


  private handleError(err){
    let mensagemErro = { mensagem: err };
    return throwError(mensagemErro);
  }
}
