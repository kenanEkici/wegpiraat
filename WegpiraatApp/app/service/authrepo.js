import React from 'react';
import { AsyncStorage } from 'react-native';
import moment from 'moment';

export default class AuthRepo {
    
    async setKeys(data) {
        try {         
            this.clearAll();   
            await AsyncStorage.setItem('wp_bearer', data.access_token);
            await AsyncStorage.setItem('wp_refresh', data.refresh_token);
            await AsyncStorage.setItem('wp_expire', moment(new Date()).add(data.expires_in, 'seconds').toString());
            return true;
        } catch (error) {
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
            return false;
        }
    }

    async clearAll() {
        try {
            await AsyncStorage.multiRemove(['wp_bearer', 'wp_refresh', 'wp_expire']);
            return true
        } catch (e) {
            throw e;
        }
    }
}