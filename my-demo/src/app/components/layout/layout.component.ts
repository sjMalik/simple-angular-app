import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  userName: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getLoggedInUsername();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getLoggedInUsername(): void {
    const decodedToken = this.authService.getDecodedToken();
    this.userName = decodedToken?.name;
  }

  logout(): void {
    this.authService.logout();
  }

}
