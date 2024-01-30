import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory as marketPlaceIDL } from "../../../declarations/dfinity_js_backend/dfinity_js_backend.did.js";
import { idlFactory as ledgerIDL } from "../../../declarations/ledger_canister/ledger_canister.did.js";

const MARKETPLACE_CANISTER_ID = "be2us-64aaa-aaaaa-qaabq-cai";
const LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";
const HOST = "https://laughing-space-carnival-7wx6vrg7gjg2vqx-4943.app.github.dev/";

export async function getMarketplaceCanister() {
    return await getCanister(MARKETPLACE_CANISTER_ID, marketPlaceIDL);
}

export async function getLedgerCanister() {
    return getCanister(LEDGER_CANISTER_ID, ledgerIDL);
}
//3b058b9f06dac4ebf23f11fe5f2b8d29586ebb8cf34828072df7d703cf7c5be6


async function getCanister(canisterId, idl) {
    const authClient = window.auth.client;
    const agent = new HttpAgent({
        host: HOST,
        identity: authClient.getIdentity()
    });
    await agent.fetchRootKey(); // this line is needed for the local env only
    return Actor.createActor(idl, {
        agent,
        canisterId,
    });
}