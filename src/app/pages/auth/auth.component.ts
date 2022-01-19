import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData } from 'src/app/models/AuthResponseData.model';
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/cmps/common/alert/alert.component';
import { PlaceholderDirective } from 'src/app/directives/placeholder.directive';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective , {static: true}) alertHost: PlaceholderDirective;

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const {email} = form.value
    const {password} = form.value
    this.isLoading = true

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    }

    else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false
        this.router.navigate(['/recipe'])
      },
      errorMessage => {
        this.error = errorMessage
        this.showErrorAlert(errorMessage);
        this.isLoading = false
      }
    )

    form.reset();
  }
  onHandleError() {
    this.error = null
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear();

    const compomnentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    compomnentRef.instance.message = message;
    this.closeSub = compomnentRef.instance.close.subscribe(()=> {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if(this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
