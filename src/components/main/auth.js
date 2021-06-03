import auth0 from "auth0-js";
import Router from "next/router";

export default class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: "dev-90echocb.us.auth0.com",
            clientID: "3OcvtQQ33UfWeIq9GqMnO9P4QyfsiIME",
            redirectUri: "http://localhost:3000/callback",
            responseType: "token id_token",
            scope: "openid profile email",
        });
    }

    login = () => {
        // this.auth0.authorize()
        this.auth0.login(
            {
                email: "test@test.com",
                password: "Blueprint1!",
                realm: "Username-Password-Authentication",
            },
            (err, authResult) => {
                if (err) {
                    console.log("error", err);
                } else {
                    console.log("success", authResult);
                }
            },
        );
    };

    handleAuth = () => {
        this.auth0.parseHash((err, authResult) => {
            // console.log(authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                Router.push("/protected");
            } else if (err) {
                alert(`Error: ${err.error}`);
                console.log(err);
            }
        });
    };

    setSession = (authResult) => {
        //set the time the access token will expire
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime(),
        );

        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
    };

    isAuthenticated = () => {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    };

    logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        this.userProfile = null;

        this.auth0.logout({
            clientID: "3OcvtQQ33UfWeIq9GqMnO9P4QyfsiIME",
            returnTo: "http://localhost:3000",
        });
    };

    getAccessToken = () => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            throw new Error("No access token found");
        }
        return accessToken;
    };

    getProfile = (callback) => {
        this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
            callback(profile);
        });
    };
}
