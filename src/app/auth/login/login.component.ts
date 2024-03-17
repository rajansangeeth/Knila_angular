import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginModel } from 'src/models/login.model';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: LoginModel;
  unSubscribe$ = new Subject();
  constructor(private authService: AuthService, private router: Router) {
    this.model = {
      email: "",
      password: ""
    };
  }

  login() {
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          let authToken = response?.token;
          localStorage.setItem("JWT", authToken);
          this.router.navigateByUrl("/pages/contacts");
        }
      });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  ngOnDestroy(): void {
    this.unSubscribe$.complete();
    this.unSubscribe$.next(null);
  }

}
