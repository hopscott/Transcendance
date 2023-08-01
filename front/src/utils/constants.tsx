const API_URL = 'http://localhost:3000'

export const API_ROUTES = {
    SIGN_UP: `${API_URL}/auth/signup`,
    SIGN_IN: `${API_URL}/auth/signin`,
    LOG_OUT: `${API_URL}/users/logout`,
    USER_PROFILE: `${API_URL}/users/me`,
    USER_PROFILE_EDIT: `${API_URL}/users`,
    GENERIC_USER_PROFILE: `${API_URL}/users/`,
    UPLOAD_PROFILE_PIC: `${API_URL}/users/upload-profile-picture`,
    ADD_FRIEND:         `${API_URL}/users/add-friend/`,
    GET_LEADERBOARD: `${API_URL}/users/leaderboard`,
}

export const APP_URL = 'http://localhost:4000'

export const APP_ROUTES = {
    HOME:                 '/',
    SIGN_IN:              '/login',
    SIGN_UP:              '/signup',
    LOG_OUT:              '/logout',
    USER_PROFILE:         '/profile/me',
    USER_PROFILE_EDIT:    '/profile/me/edit',
    GENERIC_USER_PROFILE: '/profile/',
    LEADERBOARD:          '/leaderboard',
}