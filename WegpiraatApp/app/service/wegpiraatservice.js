import c from '../configuration/settings';
import qs from 'qs';
import AuthService from './authservice';

export default class WegpiraatService {
    
    constructor() {
        this.service = new AuthService();
    }

    getAllWegpiraten = async() => {
        try {
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.wegpiraten}`, { 
                method: 'GET', 
                headers: {
                    "Authorization": token
                }
            });   

            if (resp.status > 400)
                return false;
            else {
                return await resp.json();
            }
        } catch(e) {
            return false;
        }
    }
    
    check = async() => {
        if (await this.service.authorised()) {
            let bear = await this.service.spawnBearer();
            return  'Bearer ' + bear;
        } else {
            throw Error("Bear token not present or failed to refresh!")
        }        
    }

    upload = async(data) => {
        
        var form = new FormData();
        form.append('title', data.title);
        form.append('description', data.desc);
        form.append('created', new Date().toString());
        form.append('picture', {uri: data.pic, name: 'wegpiraat.jpg', type: 'multipart/form-data'});

        try {
            let token = await this.check();

            let resp = await fetch(`${c.api}/${c.wegpiraten}`, { 
                method: 'POST', 
                headers: {
                    "Authorization": token,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: form
            });

            if (resp.status > 400)
                return false;
            else {
                return await resp.json();
            }
        } catch(e) {
            return false;
        }
    }
}