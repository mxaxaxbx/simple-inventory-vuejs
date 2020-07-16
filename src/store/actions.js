const actions = {
    updateUserInfo({commit}, payload){
        commit('UPDATE_USER_INFO', payload)
    },

    updateUserRole({dispacth}, payload){
        payload.aclChangeRole(payload.userRole)
        dispacth('updateUserInfo', {userRole: payload.user.role})
    }
}

export default actions