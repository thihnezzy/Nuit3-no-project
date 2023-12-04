
const appConfig = {
    apiPrefix: process.env.NODE_ENV === 'production' ? 'https://nuitinfo-backend-dragon-4d105301931d.herokuapp.com/api' : "http://localhost:8080/api",
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: true,
}

export default appConfig
