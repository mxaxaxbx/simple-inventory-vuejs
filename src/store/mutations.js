const mutations = {
    UPDATE_USER_INFO(state, payload){
        let userInfo = JSON.parse(localStorage.getItem('userInfo')) || state.AppActiveUser

        for(const property of Object.keys(payload)){
            if(payload[property] != null){
                state.AppActiveUser[property] = payload[property]
                userInfo[property] = payload[property]
            }
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },

    UPDATE_ROLE(state, role){
        state.AppActiveUser['role'] = role
        localStorage.setItem('role', role)
    },

    RESET_USER_INFO(state){
        state.AppActiveUser['uid'] = 0
        state.AppActiveUser['name'] = ''
        state.AppActiveUser['email'] = ''
        state.AppActiveUser['profilePicture'] = ''
        state.AppActiveUser['role'] = 'guest'
    }
}

export default mutations