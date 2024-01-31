import { Principal } from "@dfinity/principal";
import { transferICP } from "./ledger";
import { transferTokens } from "./usdnledger";

export async function createProduct(product) {
  return window.canister.marketplace.addProduct(product);
}

export async function registerUser(user) {
  return window.canister.marketplace.addUser(user);
}

export async function registerBusiness(business) {
  return window.canister.marketplace.addBusiness(business);
}

export async function getAuth(princ) {
  try {
    const user = await window.canister.marketplace.getAuth(princ);
    return user.Ok.number
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
  }
}

export async function getProducts() {
  try {
    return await window.canister.marketplace.getProducts();
  } catch (err) {
    if (err.name === "AgentHTTPResponseError") {
      const authClient = window.auth.client;
      await authClient.logout();
    }
    return [];
  }
}

export async function buyProduct(product) {
  const marketplaceCanister = window.canister.marketplace;
  const orderResponse = await marketplaceCanister.createOrder(product.id);
  const sellerPrincipal = Principal.from(orderResponse.Ok.seller);
  const sellerAddress = await marketplaceCanister.getAddressFromPrincipal(sellerPrincipal);
  const block = await transferICP(sellerAddress, orderResponse.Ok.price, orderResponse.Ok.memo);
  await marketplaceCanister.completePurchase(sellerPrincipal, product.id, orderResponse.Ok.price, block, orderResponse.Ok.memo);
}

export async function sendUSD(number, amount) {
  const marketplaceCanister = window.canister.marketplace;
  const orderResponse = await marketplaceCanister.getUser(number);
  const sellerPrincipal = Principal.from(orderResponse.Ok.wallet);
  const sellerAddress = await marketplaceCanister.getAddressFromPrincipal(sellerPrincipal);
  const block = await transferICP(sellerAddress, amount, 0);
  console.log(block)
}

export async function sendUSDN(number, amount) {
  const marketplaceCanister = window.canister.marketplace;
  const orderResponse = await marketplaceCanister.getUser(number);
  const sellerPrincipal = Principal.from(orderResponse.Ok.wallet);
  const sellerAddress = await marketplaceCanister.getAddressFromPrincipal(sellerPrincipal);
  const block = await transferTokens(sellerAddress, amount, 0);
  console.log(block)
}

export async function payMerchant(till, amount) {
  const marketplaceCanister = window.canister.marketplace;
  const orderResponse = await marketplaceCanister.getBusiness(till);
  const sellerPrincipal = Principal.from(orderResponse.Ok.wallet);
  const sellerAddress = await marketplaceCanister.getAddressFromPrincipal(sellerPrincipal);
  const block = await transferICP(sellerAddress, amount, 0);
  console.log(block)
}

export async function getBusinessDetails(till) {
  const marketplaceCanister = window.canister.marketplace;
  const orderResponse = await marketplaceCanister.getBusiness(till);
  const name = orderResponse.Ok.name;
   return name;
}

export async function getUserName(number) {
  const marketplaceCanister = window.canister.marketplace;
  const orderResponse = await marketplaceCanister.getUser(number);
  const name = orderResponse.Ok.name;
   return name;
}

