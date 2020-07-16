const user = {
    uid: 0,
    name: '',
    email: '',
    profilePicture: '',
    role: 'guest',
}

const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo')) || {}

const getUserInfo = () => {
    let userInfo = {}

    Object.keys(user).forEach((key) => {
        userInfo[key] = userInfoLocalStorage[key] ? userInfoLocalStorage[key] : user[key]
    })

    Object.keys(userInfoLocalStorage).forEach((key) => {
        if(userInfo[key] == undefined && userInfoLocalStorage[key] != null) userInfoLocalStorage[key]
    })

    return userInfo
}

const state = {
    AppActiveUser: getUserInfo(),

}

export default state