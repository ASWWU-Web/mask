import { Component, OnInit, Output, Input } from '@angular/core';
import { NgbModal, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, Validators } from '@angular/forms';
import { CURRENT_YEAR} from '../../config';
import { ProfileModel } from '../profile.model';
import { RequestService } from '../../RequestService/request.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
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
  private subscription: Subscription;
  ballotForm: FormGroup;
  clostFormFlag = false;

  constructor(public activeModal: NgbActiveModal, private rs: RequestService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.year = this.year ? this.year : CURRENT_YEAR;
    this.rs.get('/profile/' + this.year + '/' + this.username, (data) => this.profile = new ProfileModel(data), undefined);
  }

  onCloseModal(): void {
    // set the close form flag for when the votes have been submitted
    this.clostFormFlag = true;
  }
}


@Component({
  selector: 'app-profile-modal',
  template: ``,
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnInit {
  modal: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(username, year): void {
    // save the modal reference so we can close it
    this.modal = this.modalService.open(ProfileModalContentComponent, {size: 'lg'});
    // pass data to the modal inputs
    this.modal.componentInstance.username = username;
    this.modal.componentInstance.year = year;
  }
}
