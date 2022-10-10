import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: UntypedFormGroup;
  submitted = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  public async submit() {

    this.submitted = true;

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }

    await this.auth.login(user).then(() => {
      this.router.navigate(['/admin', 'dashboard']);
    },
    error => {
      
    });

    this.submitted = false;
    
  }

}
