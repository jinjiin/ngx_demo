import { Component } from '@angular/core';

@Component({
  selector: 'ngx-security-cameras',
  styleUrls: ['./security-cameras.component.scss'],
  templateUrl: './security-cameras.component.html',
})
export class SecurityCamerasComponent {

  cameras: any[] = [{
    title: 'Camera #1',
    source: 'assets/csvfiles/camera1.jpg',
  }, {
    title: 'Camera #2',
    source: 'assets/csvfiles/camera2.jpg',
  }, {
    title: 'Camera #3',
    source: 'assets/csvfiles/camera3.jpg',
  }, {
    title: 'Camera #4',
    source: 'assets/csvfiles/camera4.jpg',
  }];

  selectedCamera: any = this.cameras[0];

  userMenu = [{
    title: 'Profile',
  }, {
    title: 'Log out',
  }];

  isSingleView = false;

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }
}
