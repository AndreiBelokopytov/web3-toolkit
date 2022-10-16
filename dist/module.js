import {jsx as $h1OuD$jsx} from "react/jsx-runtime";
import $h1OuD$react, {useRef as $h1OuD$useRef, useState as $h1OuD$useState, useCallback as $h1OuD$useCallback, useEffect as $h1OuD$useEffect, useMemo as $h1OuD$useMemo} from "react";
import $h1OuD$metamaskonboarding from "@metamask/onboarding";
import {Contract as $h1OuD$Contract, BigNumber as $h1OuD$BigNumber} from "ethers";

function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $46914435460bb52d$exports = {};
var $3bf0e81424fa74e3$exports = {};
var $46ace6a8ad08831d$exports = {};

$parcel$export($46ace6a8ad08831d$exports, "Address", () => $46ace6a8ad08831d$export$73974d1f547d9d48);


const $46ace6a8ad08831d$var$DEFAULT_SUBSTRING_LENGTH = 6;
const $46ace6a8ad08831d$export$73974d1f547d9d48 = /*#__PURE__*/ (0, $h1OuD$react).memo(({ children: address , substrLength: substrLength  })=>{
    return /*#__PURE__*/ (0, $h1OuD$jsx)("span", {
        children: $46ace6a8ad08831d$var$shortenAddress(address, substrLength)
    });
});
function $46ace6a8ad08831d$var$shortenAddress(address, substrLength = $46ace6a8ad08831d$var$DEFAULT_SUBSTRING_LENGTH) {
    if (address.length <= substrLength * 2 || address.match(/.*\.{3}.*/)) return address;
    return `${address.slice(0, substrLength)}...${address.slice(address.length - substrLength, address.length)}`;
}


$parcel$exportWildcard($3bf0e81424fa74e3$exports, $46ace6a8ad08831d$exports);


$parcel$exportWildcard($46914435460bb52d$exports, $3bf0e81424fa74e3$exports);


var $5700acf22cb6391e$exports = {};
var $fb44dc37b7573206$exports = {};
var $55abee8d73d3bb4a$exports = {};

$parcel$export($55abee8d73d3bb4a$exports, "useMetaMask", () => $55abee8d73d3bb4a$export$6f1a648d65fc54a1);


var $95ad1495d8d22fad$exports = {};
var $a7e306555e36ddd8$exports = {};

$parcel$export($a7e306555e36ddd8$exports, "metaMaskProvider", () => $a7e306555e36ddd8$export$621e95380bede4a2);
const $a7e306555e36ddd8$export$621e95380bede4a2 = window.ethereum;


$parcel$exportWildcard($95ad1495d8d22fad$exports, $a7e306555e36ddd8$exports);


function $55abee8d73d3bb4a$export$6f1a648d65fc54a1() {
    const metaMaskOnboarding = (0, $h1OuD$useRef)(new (0, $h1OuD$metamaskonboarding)());
    const initialState = (0, $h1OuD$metamaskonboarding).isMetaMaskInstalled() ? {
        status: "notConnected",
        accounts: []
    } : {
        status: "notInstalled",
        accounts: []
    };
    const [onboardingState, setOnboardingState] = (0, $h1OuD$useState)(initialState);
    const handleAccountsChanded = (0, $h1OuD$useCallback)((accounts)=>{
        if (accounts.length > 0) setOnboardingState((prevState)=>({
                ...prevState,
                status: "connected",
                accounts: accounts
            }));
        else setOnboardingState((prevState)=>({
                ...prevState,
                status: "notConnected",
                accounts: []
            }));
        metaMaskOnboarding.current?.stopOnboarding();
    }, [
        setOnboardingState
    ]);
    const handleChainChanged = (0, $h1OuD$useCallback)((chainId)=>setOnboardingState((prevState)=>({
                ...prevState,
                chainId: chainId
            })), []);
    (0, $h1OuD$useEffect)(()=>{
        if ((0, $h1OuD$metamaskonboarding).isMetaMaskInstalled()) {
            (0, $a7e306555e36ddd8$export$621e95380bede4a2).on("accountsChanged", handleAccountsChanded);
            (0, $a7e306555e36ddd8$export$621e95380bede4a2).on("chainChanged", handleChainChanged);
        }
        return ()=>{
            if ((0, $h1OuD$metamaskonboarding).isMetaMaskInstalled()) {
                (0, $a7e306555e36ddd8$export$621e95380bede4a2).removeListener("accountsChanged", handleAccountsChanded);
                (0, $a7e306555e36ddd8$export$621e95380bede4a2).removeListener("chainChanged", handleChainChanged);
            }
        };
    }, [
        handleAccountsChanded,
        handleChainChanged
    ]);
    const connect = (0, $h1OuD$useCallback)(async ()=>{
        if (!(0, $h1OuD$metamaskonboarding).isMetaMaskInstalled()) {
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "onboarding",
                    accounts: []
                }));
            metaMaskOnboarding.current?.startOnboarding();
            return;
        }
        setOnboardingState((prevState)=>({
                ...prevState,
                status: "connecting",
                accounts: [],
                error: undefined
            }));
        try {
            const accounts = await (0, $a7e306555e36ddd8$export$621e95380bede4a2).request({
                method: "eth_requestAccounts"
            });
            handleAccountsChanded(accounts);
            const chainId = await (0, $a7e306555e36ddd8$export$621e95380bede4a2).request({
                method: "eth_chainId"
            });
            handleChainChanged(chainId);
        } catch (err) {
            let message;
            if (err instanceof Error) message = err?.message;
            if (typeof err === "string") message = err;
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "notConnected",
                    error: message
                }));
        }
    }, [
        handleAccountsChanded,
        handleChainChanged
    ]);
    return {
        ...onboardingState,
        isNotInstalled: onboardingState.status === "notInstalled",
        isNotConnected: onboardingState.status === "notConnected",
        isConnected: onboardingState.status === "connected",
        isConnecting: onboardingState.status === "connecting",
        isOnboarding: onboardingState.status === "onboarding",
        connect: connect
    };
}


var $4c518f06881b3c31$exports = {};

$parcel$export($4c518f06881b3c31$exports, "OnboardingState", () => $4c518f06881b3c31$export$ff1cd117057bac38);
const $4c518f06881b3c31$export$ff1cd117057bac38 = {
    notInstalled () {
        return {
            status: "notInstalled",
            accounts: []
        };
    },
    notConnected () {
        return {
            status: "notConnected",
            accounts: []
        };
    },
    connected (accounts) {
        return {
            status: "connected",
            accounts: accounts
        };
    },
    connecting () {
        return {
            status: "connecting",
            accounts: []
        };
    },
    onboarding () {
        return {
            status: "onboarding",
            accounts: []
        };
    }
};


$parcel$exportWildcard($fb44dc37b7573206$exports, $55abee8d73d3bb4a$exports);
$parcel$exportWildcard($fb44dc37b7573206$exports, $4c518f06881b3c31$exports);


var $80d717538ad2e1e9$exports = {};
var $9cfbd30380651811$exports = {};

$parcel$export($9cfbd30380651811$exports, "useTokenBalance", () => $9cfbd30380651811$export$c79c82fb94eb75b4);


const $9cfbd30380651811$var$abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function transfer(address to, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
];
const $9cfbd30380651811$export$c79c82fb94eb75b4 = (contractAddress, address, provider)=>{
    const contract = (0, $h1OuD$useMemo)(()=>{
        return new (0, $h1OuD$Contract)(contractAddress, $9cfbd30380651811$var$abi, provider);
    }, [
        contractAddress,
        provider
    ]);
    const [state, setState] = (0, $h1OuD$useState)({
        balance: (0, $h1OuD$BigNumber).from(0),
        isLoading: true
    });
    const refresh = (0, $h1OuD$useCallback)(async ()=>{
        setState((prevState)=>({
                ...prevState,
                isLoading: true,
                errorMessage: undefined
            }));
        try {
            const balance = await contract.balanceOf(address);
            setState((prevState)=>({
                    ...prevState,
                    balance: balance,
                    isLoading: false
                }));
        } catch (err) {
            let errorMessage;
            if (err instanceof Error) errorMessage = err.message;
            if (typeof err === "string") errorMessage = err;
            setState((prevState)=>({
                    ...prevState,
                    errorMessage: errorMessage
                }));
        }
    }, [
        address,
        contract
    ]);
    (0, $h1OuD$useEffect)(()=>{
        refresh();
    }, [
        refresh
    ]);
    return {
        ...state,
        refresh: refresh
    };
};


$parcel$exportWildcard($80d717538ad2e1e9$exports, $9cfbd30380651811$exports);


$parcel$exportWildcard($5700acf22cb6391e$exports, $fb44dc37b7573206$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $80d717538ad2e1e9$exports);





export {$46ace6a8ad08831d$export$73974d1f547d9d48 as Address, $55abee8d73d3bb4a$export$6f1a648d65fc54a1 as useMetaMask, $4c518f06881b3c31$export$ff1cd117057bac38 as OnboardingState, $9cfbd30380651811$export$c79c82fb94eb75b4 as useTokenBalance, $a7e306555e36ddd8$export$621e95380bede4a2 as metaMaskProvider};
//# sourceMappingURL=module.js.map
