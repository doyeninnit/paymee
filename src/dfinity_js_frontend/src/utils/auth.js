import React from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { getAuth } from "./marketplace";
import RegistrationForm from "../components/marketplace/register";
import ReactDOM from 'react-dom';

// that is the url of the webapp for the internet identity. 
const IDENTITY_PROVIDER = `https://laughing-space-carnival-7wx6vrg7gjg2vqx-4943.app.github.dev/?canisterId=bnz7o-iuaaa-aaaaa-qaaaa-cai&id=bd3sg-teaaa-aaaaa-qaaba-cai#authorize`;
const MAX_TTL = 7 * 24 * 60 * 60 * 1000 * 1000 * 1000;

export async function getAuthClient() {
    return await AuthClient.create();
}

export async function login() {
    const authClient = window.auth.client;

    const isAuthenticated = await authClient.isAuthenticated();

    if (!isAuthenticated) {
        await authClient?.login({
            identityProvider: IDENTITY_PROVIDER,
            onSuccess: async () => {
                //after the authenitcation is success, we need to also check if the address is registered in our platform
                //by calling the getAuth function, if not it should display the register component, else if the getAUth function returns
                //a value, let it just display the normal page, which i guess is the window.loction reload
                // window.auth.isAuthenticated = await authClient.isAuthenticated();
                // window.location.reload();

                    window.auth.isAuthenticated = await authClient.isAuthenticated();
                    window.location.reload();
            },
            maxTimeToLive: MAX_TTL,
        });
    }
}

export async function logout() {
    const authClient = window.auth.client;
    authClient.logout();
    window.location.reload();
}

function showRegistrationForm() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(<RegistrationForm />, container);
}

