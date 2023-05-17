import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery'
import { Subject } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {


  check: string
  role:string =''
  isAdmin: boolean = false
  profile:string = ''
  user:any
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.check = this.user['userId']
    this.profile = this.user['profilePicture']
    this.userCheck()
  }
  ngAfterViewInit(): void {
    this.profileDropdown()
  }

  userCheck(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    this.role=user.authority
    if ( this.role=== 'ADMIN') {
      this.isAdmin = true
    }
  }

  logOut() {

    localStorage.removeItem('user')

    setInterval(
      ()=>{
        location.reload()
      },1000
    )
    this.router.navigate(['/home/'])


  }
  profileDropdown(): void {

    $(".header-notifications").each(function () {
      var userMenu = $(this);
      var userMenuTrigger = $(this).find('.header-notifications-trigger a');
      console.log('found')
      $(userMenuTrigger).on('click', function (event) {
        event.preventDefault();
        console.log('clicked')
        if ($(this).closest(".header-notifications").is(".active")) {
          close_user_dropdown();
        } else {
          close_user_dropdown();
          userMenu.addClass('active');
        }
      });
    });

    // Closing function
    function close_user_dropdown() {
      $('.header-notifications').removeClass("active");
    }

    // Closes notification dropdown on click outside the conatainer
    var mouse_is_inside = false;

    $(".header-notifications").on("mouseenter", function () {
      mouse_is_inside = true;
    });
    $(".header-notifications").on("mouseleave", function () {
      mouse_is_inside = false;
    });

    $("body").mouseup(function () {
      if (!mouse_is_inside) close_user_dropdown();
    });

    // Close with ESC
    $(document).keyup(function (e) {
      if (e.keyCode == 27) {
        close_user_dropdown();
      }
    });

  }
}
