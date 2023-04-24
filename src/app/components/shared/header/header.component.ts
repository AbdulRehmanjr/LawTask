import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as $ from 'jquery'

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit{


  check:string
  ngOnInit(): void {

    this.check = JSON.parse(localStorage.getItem('user'))['userId']
  }
  ngAfterViewInit(): void {
    this.profileDropdown()
  }
  profileDropdown():void {
    console.log('fie')
    $(".header-notifications").each(function() {
      var userMenu = $(this);
      var userMenuTrigger = $(this).find('.header-notifications-trigger a');
      console.log('found')
      $(userMenuTrigger).on('click', function(event) {
        event.preventDefault();
        console.log('clicked')
        if ( $(this).closest(".header-notifications").is(".active") ) {
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

    $( ".header-notifications" ).on( "mouseenter", function() {
      mouse_is_inside=true;
    });
    $( ".header-notifications" ).on( "mouseleave", function() {
      mouse_is_inside=false;
    });

    $("body").mouseup(function(){
        if(! mouse_is_inside) close_user_dropdown();
    });

    // Close with ESC
    $(document).keyup(function(e) {
      if (e.keyCode == 27) {
        close_user_dropdown();
      }
    });

  }
}
