import { AccountIdentifier } from "@dfinity/nns";

export async function transferICP(sellerAddress, amount, memo) {
    const canister = window.canister.ledger;
    const account = AccountIdentifier.fromHex(sellerAddress);
    const result = await canister.transfer({
        to: account.toUint8Array(),
        amount: { e8s: amount },
        memo,
        fee: { e8s: 10000n },
        from_subaccount: [],
        created_at_time: []
    });
    return result.Ok;
}


//MODIFIED FOR OUR EXACT USE CASE
export async function send(number, amount) {
    //ADD A FUNCTION TO CALL THE getUser() function from our backend canister
    const user = await window.canister.marketplace.getUser(number);
    console.log("user is: ")
    console.log(user)
    const canister = window.canister.ledger;
    const account = AccountIdentifier.fromHex(user.wallet);
    const result = await canister.transfer({
        to: account.toUint8Array(),
        amount: { e8s: amount },
        fee: { e8s: 10000n },
        from_subaccount: [],
        created_at_time: []
    });
    return result.Ok;
}




export async function balance() {
    const canister = window.canister.ledger;
    const address = await window.canister.marketplace.getAddressFromPrincipal(window.auth.principal);
    const balance = await canister.account_balance_dfx({account: address});
    return (balance?.e8s / BigInt(10**8)).toString();
}