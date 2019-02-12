/**
 * Created by ethan on 2/8/17.
 */

import { MEDIA_URI, DEFAULT_PHOTO } from '../config';

export class ProfileModel {
    wwuid: string;
    username: string;
    full_name: string;
    photo: string;
    gender: string;
    birthday: string;
    email: string;
    phone: string;
    website: string;
    majors: string;
    minors: string;
    graduate: string;
    preprofessional: string;
    class_standing: string;
    high_school: string;
    class_of: string;
    relationship_status: string;
    attached_to: string;
    quote: string;
    quote_author: string;
    hobbies: string;
    career_goals: string;
    favorite_books: string;
    favorite_food: string;
    favorite_movies: string;
    favorite_music: string;
    pet_peeves: string;
    personality: string;
    views: number;
    privacy: number;
    department: string;
    office: string;
    office_hours: string;

    //If the data passed to the ProfileModel is a JSON, this constructor will parse it.
    constructor(data: any) {
        if (typeof data == "string") data = JSON.parse(data);
        for (var key in data) {
            if (data[key].length > 0 && data[key] != "None") {
                this[key] = data[key].trim(); 
            }
        }
        if ((!this.full_name || this.full_name == '') && this.username) {
            this.full_name = this.username.replace(/\./g, ' ');
        }
    }

    linkByField(key: string): string {
        let value = this[key];
        let link = 'javascript:void(0);';

        if (key == "phone") link = 'tel:' + value;
        if (key == "email") link = 'mailto:' + value;

        return link;
    }

    /*
    * Taken From Brock's old Angular mask
    * Gets the link for a given photo
    * TODO: Get functions in the model to be accessible to components
    * */
    getPhotoLink(uri: string): string {
        if (!uri || uri == '') uri = this.photo || DEFAULT_PHOTO;
        let photo = MEDIA_URI + "/img-sm/" + uri.replace(MEDIA_URI, "");
        photo = photo.replace("//","/");
        return photo;
    }
    photoLink(): string {
        return this.getPhotoLink('');
    }
}