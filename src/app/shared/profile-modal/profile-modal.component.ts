import { Component, OnInit, Output, Input } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, Validators } from '@angular/forms';
import { CURRENT_YEAR} from '../../config';
import { ProfileModel } from '../profile.model';
import { RequestService } from '../../RequestService/request.service';
import { ActivatedRoute} from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { ProfileFullComponent } from '../profile-full/profile-full.component';

@Component({
  selector: 'app-profile-modal-content',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']

})
export class ProfileModalContentComponent implements OnInit {
  @Input() username: String;
  @Input() year: String;
  profile: ProfileModel;

  constructor(public activeModal: NgbActiveModal, private rs: RequestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.year = this.year ? this.year : CURRENT_YEAR;
    const url = '/profile/' + this.year + '/' + this.username;
    this.rs.get(url, (data) => this.profile = new ProfileModel(data), undefined);
    const stateObj = { hello: 'there '};
    history.pushState(stateObj, 'Profile View', url);
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

  open(username, year): void {
    // save the modal reference so we can close it
    this.modal = this.modalService.open(ProfileModalContentComponent, {size: 'lg'});
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
