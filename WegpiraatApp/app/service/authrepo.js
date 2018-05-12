import React from 'react';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

export default class AuthRepo {
    
    async setKeys(data) {
        try {         
            await this.clearTokens();              
            await AsyncStorage.setItem('wp_bearer', data.access_token);
            await AsyncStorage.setItem('wp_refresh', data.refresh_token);
            await AsyncStorage.setItem('wp_expire', moment(new Date()).add(data.expires_in, 'seconds').toString());
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    async setUser(data) {
        try {
            await AsyncStorage.setItem('wegpiraat', data.username); 
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }    

    async getTokens() {
        try {
            let bearer = await AsyncStorage.getItem('wp_bearer');
            let refresh =  await AsyncStorage.getItem('wp_refresh');
            let expire =  await AsyncStorage.getItem('wp_expire');

            const value = {
                expire: expire,
                bearer: bearer,
                refresh: refresh
            }
            
            return value;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async getUser() {
        try {
            let username = await AsyncStorage.getItem('wegpiraat');

            const value = {
                username: username
            }
            
            return value;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async clearTokens() {
        try {
            await AsyncStorage.multiRemove(['wp_bearer', 'wp_refresh', 'wp_expire']);
            return true;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async clearUser() {
        try {
            await AsyncStorage.multiRemove(['wegpiraat']);
            return true;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}