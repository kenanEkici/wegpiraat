import c from '../configuration/settings';
import qs from 'qs';
import AuthService from './authservice';
import moment from 'moment';

export default class WegpiraatService {
    
    constructor() {
        this.service = new AuthService();
    }

    getWegpiraten = async(page, filterType, filter) => {
       if (filterType == "none") {
           return this.getAllWegpiraten(page);
       } else if (filterType == "search") {
           return this.getWegpiratenByPlate(page, filter);
       } else if (filterType == "profile") {
            let user = await this.service.getUser();
            if (filter == "posts") return await this.getWegpiratenByArr(page, user.posts);
            else if (filter == "likes") return await this.getWegpiratenByArr(page, user.likes);
            else if (filter == "comments") return null;
       }
    }

    getAllWegpiraten = async(page) => {
        try {
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.pagination}/${page}`, { 
                method: 'GET', 
                headers: {
                    "Authorization": token
                }
            });   

            var data = await resp.json();
            data = this.processFeed(data);

            if (resp.status > 400)
                return false;
            else {
                return await data;
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
        form.append('plate', data.plate);
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

    like = async(id) => {
        try {
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.wegpiraten}/${id}/like`, { 
                method: 'POST',
                headers: {
                    "Authorization": token
                }
            });

            if (resp.status > 400)
                return false;            
            return true
        } catch(e) {
            return false;
        }
    }

    comment = async(id, comment) => {
        try {
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.wegpiraten}/${id}/comment`, 
                { 
                    method: 'POST',
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ commentData: comment })
                }               
            );

            if (resp.status > 400)
                return false;            
            return await resp.json();
        } catch(e) {
            console.log(e);
            return false;
        }
    }

    getWegpiratenByPlate = async(page, plate) => {
        try {
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.search}/${plate}/${page}`, { 
                method: 'GET', 
                headers: {
                    "Authorization": token
                }
            });

            let data = await resp.json();
            data = this.processFeed(data);

            if (resp.status > 400)
                return false;
            else {
                return await data;
            }
        } catch(e) {
            return false;
        }
    }

    getWegpiratenByArr = async(page, arr) => {
        try {                        
            let token = await this.check();
            let resp = await fetch(`${c.api}/${c.array}/${page}`, { 
                method: 'POST', 
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ idArr: arr})
            });
            let data = await resp.json();
            data = this.processFeed(data);

            if (resp.status > 400)
                return false;
            else {
                return await data;
            }
        } catch(e) {
            return false;
        }
    }
    
    processFeed = async(data) => {
        var user = await this.service.getUserLocal();

        for(let i = 0; i < data.docs.length; i++) {
            data.docs[i].liked = false;
            data.docs[i].likeImg = require("../public/unlike.png");
            data.docs[i].likeCount = data.docs[i].likes.length;
            data.docs[i].createdAt = moment(data.docs[i].createdAt).format('D MMMM YYYY, h:mm:ss a').toString();

            for(let j = 0; j < data.docs[i].likes.length; j++) {
                if (data.docs[i].likes[j].likedBy == user.username) {
                    data.docs[i].liked = true;
                    data.docs[i].likeImg = require("../public/like.png");
                }
            }
        }
        return data;
    }
}