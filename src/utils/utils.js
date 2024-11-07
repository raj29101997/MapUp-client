export const getToken = () => {
    return localStorage.getItem('token')
}

export const getUserRole = () => {
    return localStorage.getItem('role')
}

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData'))
}