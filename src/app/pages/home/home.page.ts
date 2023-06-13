import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  ngAfterViewInit(): void {
    this.toggleSideNav();
  }

  // NB: same script located in assets/scripts, but doesn't work from there
  toggleSideNav(){
    // Uncomment Below to persist sidebar toggle between refreshes
    if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      document.body.classList.toggle('sb-sidenav-toggled');
    }
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', event => {
        console.log("toggle button clicked");
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        var isSidebarToggled = document.body.classList.contains('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', isSidebarToggled.toString());
      });
    }
  }

}
