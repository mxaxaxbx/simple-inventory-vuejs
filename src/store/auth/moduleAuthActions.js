import firebase from 'firebase/app';
import 'firebase/auth';
import router from '@/router';

export default {
    loginAttemp({dispatch}, payload){
        if(!payload.checkbox_remember_me){
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function(){
                dispatch('login', payload)
            })

            .catch(function(err){
                alert(err.message)
            })
        }else{
            dispatch('login', payload)
        }
    },

    login({commit, state, dispatch}, payload){
        if(state.isUserLoggedIn()){
            if(payload.closeAnimation) payload.closeAnimation()

            alert('You are already loged in!')

            return false
        }

        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((result) => {
            let isUsernameUpdateRequired = false

            if(payload.updateUsername && payload.userDetails.username){
                isUsernameUpdateRequired = true

                dispatch('updateUsername', {
                    user: result.user,
                    username: payload.userDetails.username,
                    notify: payload.notify,
                    isReloadedRequired: true
                })
            }

            if(!isUsernameUpdateRequired){
                router.push(router.currentRoute.query.to || '/dashboard')
                result.user.providerData[0]['role'] = 'editor';
                commit('UPDATE_USER_INFO', result.user.providerData[0], {root: true})
            }
        }, (err) => {
            alert(err.message)
        })
    },

    registerUser({dispatch}, payload){
        firebase.auth().createUserWithEmailAndPassword(payload.userDetails.email, payload.userDetails.password)
        .then(() => {
            payload.notify({
                title: 'Account Created',
                text: 'You are successfully registered!',
                color: 'success',
            })

            const newPayload = {
                userDetails: payload.userDetails,
                notify: payload.notify,
                updateUsername: true
            }

            dispatch('login', newPayload)
        }, (error) => {
            payload.notify({
                title: 'Error',
                text: error.message,
                color: 'danger',
            })
        })
    },

    logout({commit}, redirected){
        firebase.auth().signOut()
        .then(() => {
            commit('RESET_USER_INFO');
            if (redirected){
                router.push({path:'/'});
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    
}