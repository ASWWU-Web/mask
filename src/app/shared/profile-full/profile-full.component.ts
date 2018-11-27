import { Component, Input } from '@angular/core';
import { RequestService } from '../../RequestService/request.service';

import { ProfileModel } from '../profile.model';
import { FieldsInOrder } from '../fields';
import { UnescapePipe } from '../unescape';
import { CURRENT_YEAR, MEDIA_MD, DEFAULT_PHOTO, AUTH_URI } from '../../config';

@Component({
	selector: 'profile-full',
	templateUrl: 'profile-full.component.html',
	styleUrls: [ 'profile-full.styles.css' ]
})

export class ProfileFullComponent {
	@Input('User') username: string;
	@Input() profile: ProfileModel;

	fieldsInOrder: string[] = FieldsInOrder;

	constructor(private rs: RequestService) {}

	displayKey(key: string): string { return key.replace(/_/g, ' '); }

	getPhotoLink(url: string) {
		if(url && url != "None"){
			return MEDIA_MD + "/" + url;
		} else {
			return MEDIA_MD + "/" + DEFAULT_PHOTO;
		}
	}
	isLoggedOn() {
		return this.rs.isLoggedOn();
	}
	getSamlLink() {
		return AUTH_URI + '?redirectURI=' + window.location.pathname;
	}

}
