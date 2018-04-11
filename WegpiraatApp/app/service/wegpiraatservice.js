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
                headers: token
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
            return {
                'Authorization': 'Bearer ' + bear
            }
        } else {
            throw Error("Bear token not present or failed to refresh!")
        }        
    }
}