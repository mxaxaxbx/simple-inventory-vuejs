import EventEmitter from 'events';

import store from  '@/store/store.js';

const localStorageKey = 'loggedIn';
const tokenExpiryKey = 'tokenExpiry';
const loginEvent = 'loginEvent';

class AuthService extends EventEmitter {
    idToken = null;
    profile = null;
    tokenExpiry = null;

    localLogin(authResult){
        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;

        this.tokenExpiry = new Date(this.profile.exp * 1000);
        localStorage.setItem(tokenExpiryKey, this.tokenExpiry);
        localStorage.setItem(localStorageKey, 'true');

        store.commit('UPDATE_USER_INFO', {
            name: this.profile.name,
            email: this.profile.email,
            profilePicture: this.profile.profilePicture,
            id: this.profile.sub
        })

        this.emit(loginEvent, {
            loggedIn: true,
            profile: authResult.idTokenPayload,
            state: authResult.appState || {},
        });
    }

    logOut(redirected = true){
        localStorage.removeItem(localStorageKey);
        localStorage.removeItem(tokenExpiryKey);
        localStorage.removeItem('userInfo');
        
        this.idToken = null;
        this.tokenExpiry = null;
        this.profile = null;

        this.emit(loginEvent, {loggedIn: false});

        store.dispatch('logout', redirected);
        
    }

    isAuthenticated(){
        return (
            new Date(Date.now()) < new Date(localStorage.getItem(tokenExpiryKey)) && localStorage.getItem(localStorageKey) === 'true'
        );
    }
}

export default new AuthService();