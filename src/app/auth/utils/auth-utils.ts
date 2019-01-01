
export function isLogout() {
    return localStorage.getItem('id_token') ? true : false;
}
