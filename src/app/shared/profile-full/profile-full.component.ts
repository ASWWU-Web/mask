import { Component, Input } from '@angular/core';
import { RequestService } from '../../RequestService/request.service';

import { ProfileModel, FieldsInOrder, UnescapePipe } from '../shared';
import {CURRENT_YEAR, MEDIA_MD, DEFAULT_PHOTO } from '../../config';

@Component({
	selector: 'profile-full',
	templateUrl: 'profile-full.component.html',
	styleUrls: [ 'profile-full.styles.css' ]
})

export class ProfileFullComponent {
	@Input('User') username: string;
	@Input() profile: ProfileModel;

	fieldsInOrder: string[] = FieldsInOrder;

	displayKey(key: string): string { return key.replace(/_/g, ' '); }

	getPhotoLink(url: string) {
		if(url && url != "None"){
			return MEDIA_MD + "/" + url;
		} else {
			return MEDIA_MD + "/" + DEFAULT_PHOTO;
		}
	}

}
