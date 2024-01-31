import { AccountIdentifier } from "@dfinity/nns";
import { IcrcLedgerCanister } from "@dfinity/ledger";
import { createAgent } from "@dfinity/utils";

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

export async function transferTokens(receiver, amount, memo) {
    const HOST = "https://laughing-space-carnival-7wx6vrg7gjg2vqx-4943.app.github.dev/";
    const authClient = await window.auth.client;
    const ledgerCanisterId = "mxzaz-hqaaa-aaaar-qaada-cai"

    try {
      // Create an agent
      const agent = await createAgent({
        identity: authClient.getIdentity(),
        host: HOST,
      });
  
      // Create an instance of IcrcLedgerCanister
      const ledgerCanister = IcrcLedgerCanister.create({
        agent,
        canisterId: ledgerCanisterId,
      });
      const account = AccountIdentifier.fromHex(receiver);

      // Perform the token transfer
      const result = await ledgerCanister.transfer(
        {
        to: account.toUint8Array(),
        amount: { e8s: amount },
        memo,
        fee: { e8s: 10000n },
        from_subaccount: [],
        created_at_time: []});
  
      console.log("Token transfer successful:", result);
    } catch (error) {
      console.error("Token transfer failed:", error);
    }
  }