import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  // NB: same script located in assets/scripts, but doesn't work from there
  ngAfterViewInit(): void {
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
