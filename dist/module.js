import {jsx as $h1OuD$jsx} from "react/jsx-runtime";
import $h1OuD$react, {createContext as $h1OuD$createContext, useState as $h1OuD$useState, useContext as $h1OuD$useContext, useRef as $h1OuD$useRef, useCallback as $h1OuD$useCallback, useEffect as $h1OuD$useEffect, useMemo as $h1OuD$useMemo} from "react";
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


var $ef92e575eb314c48$exports = {};
var $1fdce9eeb1cdb6b4$exports = {};

$parcel$export($1fdce9eeb1cdb6b4$exports, "Web3Provider", () => $1fdce9eeb1cdb6b4$export$d05096c9fd9d936d);
$parcel$export($1fdce9eeb1cdb6b4$exports, "useWeb3Context", () => $1fdce9eeb1cdb6b4$export$80233ff53690030c);


const $1fdce9eeb1cdb6b4$var$defaultChainDict = {
    "0x1": "Mainnet",
    "0x3": "Ropsten",
    "0x4": "Rinkeby",
    "0x5": "Goerli",
    "0x2a": "Kovan"
};
const $1fdce9eeb1cdb6b4$var$Web3Context = /*#__PURE__*/ (0, $h1OuD$createContext)({
    setAddress: ()=>null,
    setChainId: ()=>null,
    chainDict: $1fdce9eeb1cdb6b4$var$defaultChainDict
});
const $1fdce9eeb1cdb6b4$export$d05096c9fd9d936d = ({ children: children , address: initialAddress , chainId: initialChainId , provider: provider , chainDict: chainDict = {}  })=>{
    const [address, setAddress] = (0, $h1OuD$useState)(initialAddress);
    const [chainId, setChainId] = (0, $h1OuD$useState)(initialChainId);
    const context = {
        address: address,
        chainId: chainId,
        setAddress: setAddress,
        setChainId: setChainId,
        provider: provider,
        chainDict: {
            ...$1fdce9eeb1cdb6b4$var$defaultChainDict,
            ...chainDict
        }
    };
    return /*#__PURE__*/ (0, $h1OuD$jsx)($1fdce9eeb1cdb6b4$var$Web3Context.Provider, {
        value: context,
        children: children
    });
};
const $1fdce9eeb1cdb6b4$export$80233ff53690030c = ()=>(0, $h1OuD$useContext)($1fdce9eeb1cdb6b4$var$Web3Context);


$parcel$exportWildcard($ef92e575eb314c48$exports, $1fdce9eeb1cdb6b4$exports);


var $5700acf22cb6391e$exports = {};
var $6e6001b2f043445d$exports = {};
var $1291230e517cb182$exports = {};

$parcel$export($1291230e517cb182$exports, "useAddress", () => $1291230e517cb182$export$ac0686965540f22d);

const $1291230e517cb182$export$ac0686965540f22d = ()=>{
    const { address: address  } = (0, $1fdce9eeb1cdb6b4$export$80233ff53690030c)();
    return address;
};


$parcel$exportWildcard($6e6001b2f043445d$exports, $1291230e517cb182$exports);


var $800d14b319126306$exports = {};
var $b97469360e3d3488$exports = {};

$parcel$export($b97469360e3d3488$exports, "useChain", () => $b97469360e3d3488$export$a4a17273dffcc09c);

const $b97469360e3d3488$export$a4a17273dffcc09c = ()=>{
    const { chainId: chainId , chainDict: chainDict  } = (0, $1fdce9eeb1cdb6b4$export$80233ff53690030c)();
    if (!chainId) return undefined;
    const name = chainDict[chainId] ?? "Unknown";
    return {
        id: chainId,
        name: name
    };
};


$parcel$exportWildcard($800d14b319126306$exports, $b97469360e3d3488$exports);


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
    const { setAddress: setAddress , setChainId: setChainId  } = (0, $1fdce9eeb1cdb6b4$export$80233ff53690030c)();
    const initialState = (0, $h1OuD$metamaskonboarding).isMetaMaskInstalled() ? {
        status: "notConnected"
    } : {
        status: "notInstalled"
    };
    const [onboardingState, setOnboardingState] = (0, $h1OuD$useState)(initialState);
    const handleAccountsChanded = (0, $h1OuD$useCallback)((accounts)=>{
        if (accounts.length > 0) {
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "connected"
                }));
            setAddress(accounts[0]);
        } else {
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "notConnected"
                }));
            setAddress(undefined);
        }
        metaMaskOnboarding.current?.stopOnboarding();
    }, [
        setAddress
    ]);
    const handleChainChanged = (0, $h1OuD$useCallback)((chainId)=>setChainId(chainId), [
        setChainId
    ]);
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
                    status: "onboarding"
                }));
            metaMaskOnboarding.current?.startOnboarding();
            return;
        }
        setOnboardingState((prevState)=>({
                ...prevState,
                status: "connecting",
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


var $919486e51744d371$exports = {};
var $7c49c323774941e5$exports = {};

$parcel$export($7c49c323774941e5$exports, "useProvider", () => $7c49c323774941e5$export$693cdb10cec23617);

const $7c49c323774941e5$export$693cdb10cec23617 = ()=>{
    const { provider: provider  } = (0, $1fdce9eeb1cdb6b4$export$80233ff53690030c)();
    return provider;
};


$parcel$exportWildcard($919486e51744d371$exports, $7c49c323774941e5$exports);


const $9cfbd30380651811$var$abi = [
    "function balanceOf(address owner) view returns (uint256)"
];
const $9cfbd30380651811$export$c79c82fb94eb75b4 = (contractAddress, address)=>{
    const provider = (0, $7c49c323774941e5$export$693cdb10cec23617)();
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
                error: undefined
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
                    isLoading: false,
                    error: errorMessage
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



$parcel$exportWildcard($5700acf22cb6391e$exports, $6e6001b2f043445d$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $800d14b319126306$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $fb44dc37b7573206$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $80d717538ad2e1e9$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $919486e51744d371$exports);





export {$46ace6a8ad08831d$export$73974d1f547d9d48 as Address, $1fdce9eeb1cdb6b4$export$d05096c9fd9d936d as Web3Provider, $1fdce9eeb1cdb6b4$export$80233ff53690030c as useWeb3Context, $1291230e517cb182$export$ac0686965540f22d as useAddress, $b97469360e3d3488$export$a4a17273dffcc09c as useChain, $55abee8d73d3bb4a$export$6f1a648d65fc54a1 as useMetaMask, $4c518f06881b3c31$export$ff1cd117057bac38 as OnboardingState, $9cfbd30380651811$export$c79c82fb94eb75b4 as useTokenBalance, $7c49c323774941e5$export$693cdb10cec23617 as useProvider, $a7e306555e36ddd8$export$621e95380bede4a2 as metaMaskProvider};
//# sourceMappingURL=module.js.map
