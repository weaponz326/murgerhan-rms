import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionToastComponent } from 'src/app/components/module-utilities/connection-toast/connection-toast.component';
import { UsersApiService } from 'src/app/services/modules-api/users-api/users-api.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent {

  constructor(
    private router: Router,
    private usersApi: UsersApiService
  ) {}
  
  basicData: any;

  isFetchingData = false;
  isSavingBasic = false;
  showPrompt = false;

  termsAcceptanceStatus: boolean = false;

  @ViewChild('connectionToastComponentReference', { read: ConnectionToastComponent, static: false }) connectionToast!: ConnectionToastComponent;
  
  ngOnInit(): void {
    this.getBasicProfile();
  }

  getBasicProfile() {
    this.isFetchingData = true;

    const id = localStorage.getItem('uid') as string;

    this.usersApi.getBasicUser(id)
      .then((res) => {
        console.log(res);
        this.basicData = res;
        this.isFetchingData = false;
        this.termsAcceptanceStatus = this.basicData.data().terms_acceptance_status;   
      }),
      (err: any) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isFetchingData = false;
      };
  }

  updateBasic() {
    this.isSavingBasic = true;
    
    const id = localStorage.getItem('uid') as string;
    let data = { terms_acceptance_status: true }

    this.usersApi.updateBasicUser(id, data)
      .then((res) => {
        console.log(res);
        this.isSavingBasic = false;
        this.showPrompt = true;
      })
      .catch((err) => {
        console.log(err);
        this.connectionToast.openToast();
        this.isSavingBasic = false;
      });
  }
  
}
