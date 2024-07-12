export type AuthContextProps = {
    authenticate: Function,
    logout: Function,
    getAccessToken: Function,
}

export type AccessCodeProps = {
    clientId: string,
    scopes: string[],
    scheme: string,
    path: string
}

export type AccessTokenProps = {
    clientId: string,
    code: string,
    verifier: string,
    redirectUri: string
}

export type RefreshedTokenProps = {
    clientId: string,
    refreshToken: string
}