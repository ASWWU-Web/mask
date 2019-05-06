import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CURRENT_YEAR} from '../../config';
import { ProfileModel } from '../profile.model';
import { MaskRequestService } from '../../../shared-ng/services/services'
import { ActivatedRoute} from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { ProfileFullComponent } from '../profile-full/profile-full.component';

@Component({
  selector: 'app-profile-modal-content',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ProfileModalContentComponent implements OnInit {
  @Input() username: string;
  @Input() year: string;
  profile: ProfileModel;

  constructor(public activeModal: NgbActiveModal, private mrs: MaskRequestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.year = this.year ? this.year : CURRENT_YEAR;
    const url = '/profile/' + this.year + '/' + this.username;
    const display_url = '/profile/' + this.username + '/' + this.year;  // URL to display

    const maskObservable = this.mrs.readProfile(this.year, this.username);
    maskObservable.subscribe((data) => {
      this.profile = new ProfileModel(data)
    }, undefined);
    // this.rs.get(url, (data) => this.profile = new ProfileModel(data), undefined);
    const stateObj = { hello: 'there'};
    history.pushState(stateObj, 'Profile View', display_url);
  }
}


@Component({
  selector: 'app-profile-modal',
  template: ``,
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  modal: NgbModalRef;
  backButton: Boolean = false;

  constructor(private modalService: NgbModal, private location: PlatformLocation) {
    // Closes modal if back button is clicked
    location.onPopState(() => {
      if (this.backButton) {
        this.modal.close();
        this.backButton = false;
      }
    });
  }

  ngOnInit() {}

  open(username: string, year: string): void {
    // save the modal reference so we can close it
    this.modal = this.modalService.open(ProfileModalContentComponent, {size: 'lg', windowClass: 'modal-adaptive'});
    // pass data to the modal inputs
    this.modal.componentInstance.username = username;
    this.modal.componentInstance.year = year;
    // Flag variable will be true for location.onPopState if the back button was clicked; else will be set to false first
    this.backButton = true;

    // Promise is rejected if click outside of modal or exit button is clicked; resolved if back button is clicked
    this.modal.result.then(() => {}, () => {
      this.backButton = false;
      history.back();
    });
  }
}
