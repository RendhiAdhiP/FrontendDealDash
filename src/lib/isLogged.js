const isLogged = () => {

    const isLogged = localStorage.getItem('user') ? true : false
    const user = JSON.parse(localStorage.getItem('user'))

    if (isLogged) {
        return user
    } else {
        return false
    }
}

export default isLogged