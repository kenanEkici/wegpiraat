import c from '../configuration/settings';
import qs from 'qs';
import AuthRepo from './authrepo';
import moment from 'moment';

export default class AuthService {
    
    constructor() {
        this.repo = new AuthRepo();
    }

    login = async(username, password) => {
        try {
            let resp = await fetch(
                `${c.api}/${c.login}`,
                {
                    method:'POST',
                    headers: {          
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: qs.stringify({
                    username:username,
                    password:password,
                    client_id:c.clientid,
                    client_secret:c.secret,
                    grant_type:c.grant
                })
            });           

            if (resp.status > 400)
                return false;        
                
            if (await this.repo.setKeys(await resp.json())) {
                return await this.repo.setUser(await this.getUser());
            }
            return false;
            
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    refresh = async(token) => {
        try {
            let resp = await fetch(
                `${c.api}/${c.login}`,
                {
                    method:'POST',
                    headers: {          
                    'Content-Type': 'application/x-www-form-urlencoded'
                },          
                body: qs.stringify({
                    refresh_token:token,
                    client_id:c.clientid,
                    client_secret:c.secret,
                    grant_type:c.grant2
                })
            });

            if (resp.status > 400)
                return false;
            else {
                return await this.repo.setKeys(await resp.json())
            }
        } catch(e) {
            return false;
        }
    }
    
    authorised = async() => {
        let tokens = await this.repo.getTokens();        
        if (tokens.refresh != null) {
            let timeLeft = moment(tokens.expire).isAfter(moment(new Date()));
            if (timeLeft) {
                return true;
            } else {
                return await this.refresh(tokens.refresh);
            }
        }
        return false;
    }

    spawnBearer = async() => {
        let tokens = await this.repo.getTokens();
        return tokens.bearer;
    }

    logout = async() => {
        this.repo.clearTokens();
        this.repo.clearUser();
    }

    getUser = async() => {
        let token = await this.spawnBearer();
        let resp = await fetch(`${c.api}/${c.user}`, { 
            method: 'GET', 
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (resp.status > 400)
            return false;
        return await resp.json();        
    }

    getUserLocal = async() => {
        return await this.repo.getUser();
    }
}