import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoginService } from "../services/login.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private loginService: LoginService, private router: Router) {}
  isLoggedIn = false;
  subs: Subscription;
  balSubs: Subscription;
  balance = 0;
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.subs = this.loginService.isLoggedInSubject
      .asObservable()
      .subscribe(resp => (this.isLoggedIn = resp));
    this.balSubs = this.loginService.balanceSubject
      .asObservable()
      .subscribe(resp => (this.balance = resp));
    this.loginService.getBalance();
  }

  signOut() {
    this.loginService.signOut();
    this.router.navigateByUrl("/login");
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.balSubs.unsubscribe();
  }
}
