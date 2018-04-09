import c from '../configuration/settings';
import qs from 'qs';
import AuthRepo from './authrepo';
import moment from 'moment';

export default class AuthService {

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
            else {
                return await new AuthRepo().setKeys(await resp.json())
            }
        } catch(e) {
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
                return await new AuthRepo().setKeys(await resp.json())
            }
        } catch(e) {
            return false;
        }
    }
    
    authorised = async() => {
        let repo = new AuthRepo();
        let tokens = await repo.getTokens();
        
        if (tokens.refresh != null) {
            let timeLeft = moment(tokens.expire).isAfter(moment(new Date()))
            if (timeLeft) return true;
            else return await this.refresh(tokens.refresh);
        } else {
            return false;
        }
    }
}