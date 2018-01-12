import { Component, Input } from '@angular/core';
import { MEDIA_SM, DEFAULT_PHOTO, CURRENT_YEAR } from '../../config';

@Component({
	selector: 'profile-sm',
	templateUrl: 'profile-sm.component.html',
	styleUrls: [ 'profile-sm.styles.css' ],
	inputs: ['searchResult']
})


export class ProfileSmComponent {
	@Input() searchResults: any;
	@Input('year') year: String = undefined;
	current_year = CURRENT_YEAR;
	//Photourl to link funciton returns proper url and BLANK photo if photo == "None"
	getPhotoLink(url: string){
		if(url && url != "None"){
			return MEDIA_SM + "/" + url;
		} else {
			return MEDIA_SM + "/" + DEFAULT_PHOTO;
		}
	}

}
