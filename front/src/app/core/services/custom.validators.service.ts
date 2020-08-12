import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  constructor() { }

  public static passwordMatch(passwordControl:AbstractControl): { [key:string]:boolean } | null  {
    const password = passwordControl.get('password');
    const confirmaPassword = passwordControl.get('confirma_password');

    if(password.pristine || confirmaPassword.pristine){
      return null;
    }

    if(password.value === confirmaPassword.value){
      return null;
    }

    return { match: true }
  }
  
}
