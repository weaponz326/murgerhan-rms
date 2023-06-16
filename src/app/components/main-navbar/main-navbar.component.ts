import { Component } from '@angular/core';
import { AuthApiService } from 'src/app/services/auth-api/auth-api.service';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent {

  constructor(
    private authApi: AuthApiService,
  ) { }

  isLoggedIn: boolean = false;
  isAuthLoading: boolean = false;

  name: string = "";
  email: string = "";
  photo: string = "../../../../assets/images/utilities/photo-avatar.jpg";

  ngOnInit(): void {
    this.getAuth();
  }

  getAuth(){
    this.isAuthLoading = true;

    this.authApi.getAuth()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.isAuthLoading = false;

          localStorage.setItem('uid', res.uid);

          if (res.uid){
            this.isLoggedIn = true;
            this.email = res.email;
          }
        },
        (err: any) => {
          console.log(err);
          this.isLoggedIn = false;
          this.isAuthLoading = false;
        }
      )
  }

  logout(){
    // e.stopPropagation();
    console.log("u logging out? ...where u going?");

    this.authApi.logout()
      .then(
        (res: any) => {
          console.log(res);
          window.location.href = "/";
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

}
