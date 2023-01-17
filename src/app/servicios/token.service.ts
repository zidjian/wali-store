import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }

    saveToken( token: string ) {
        document.cookie = `token=${token}`;
    }

    getToken() {
        const cookie = this.getCookie('token');
        return cookie;
    }

    getCookie(name: string) {
        // Split cookie string and get all individual name=value pairs in an array
        const cookieArr = document.cookie.split(";");

        // Loop through the array elements
        for(let i = 0; i < cookieArr.length; i++) {
            const cookiePair = cookieArr[i].split("=");

            /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
            if(name == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return cookiePair[1];
            }
        }

        // Return null if not found
        return null;
    }
}
