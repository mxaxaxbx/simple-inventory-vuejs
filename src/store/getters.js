const getters = {
    role: (state) => {
        return state.AppActiveUser.role;
    },

    uid: (state) => {
        return state.AppActiveUser.uid;
    },

    email: (state) => {
        return state.AppActiveUser.email;
    },
}

export default getters