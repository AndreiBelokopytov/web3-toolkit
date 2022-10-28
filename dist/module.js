import {jsx as $h1OuD$jsx} from "react/jsx-runtime";
import $h1OuD$react, {memo as $h1OuD$memo, createContext as $h1OuD$createContext, useState as $h1OuD$useState, useContext as $h1OuD$useContext, useCallback as $h1OuD$useCallback, useEffect as $h1OuD$useEffect, useMemo as $h1OuD$useMemo} from "react";
import {formatUnits as $h1OuD$formatUnits} from "ethers/lib/utils";
import {getDefaultProvider as $h1OuD$getDefaultProvider, providers as $h1OuD$providers, Contract as $h1OuD$Contract} from "ethers";
import $h1OuD$metamaskonboarding from "@metamask/onboarding";

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


var $be0b80c7d092986b$exports = {};
var $c8c6171bf842faa5$exports = {};

$parcel$export($c8c6171bf842faa5$exports, "Balance", () => $c8c6171bf842faa5$export$276e99f8b64146b2);



const $c2fb42a9184c50b6$export$82f46aa4e6535a45 = (error)=>{
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;
    if (typeof error === "string") errorMessage = error;
    return errorMessage;
};
class $c2fb42a9184c50b6$export$7750cdfb4db2c3d extends Error {
}
function $c2fb42a9184c50b6$export$a7a9523472993e97(condition, msg) {
    if (!condition) throw new $c2fb42a9184c50b6$export$7750cdfb4db2c3d(msg);
}


const $c8c6171bf842faa5$var$DEFAULT_UNITS = 18;
const $c8c6171bf842faa5$export$276e99f8b64146b2 = /*#__PURE__*/ (0, $h1OuD$memo)(({ value: value , units: units = $c8c6171bf842faa5$var$DEFAULT_UNITS , fractionDigits: fractionDigits  })=>{
    (0, $c2fb42a9184c50b6$export$a7a9523472993e97)(fractionDigits === undefined || fractionDigits >= 0 && fractionDigits < units, 'invalid value for the "fractionDigits" attribute');
    let formattedValue = (0, $h1OuD$formatUnits)(value, units);
    const fraction = formattedValue.split(".")[1];
    if (fractionDigits && fraction.length > fractionDigits) formattedValue = formattedValue.slice(0, formattedValue.length - fraction.length + fractionDigits);
    return /*#__PURE__*/ (0, $h1OuD$jsx)("span", {
        children: formattedValue
    });
});


$parcel$exportWildcard($be0b80c7d092986b$exports, $c8c6171bf842faa5$exports);


$parcel$exportWildcard($46914435460bb52d$exports, $3bf0e81424fa74e3$exports);
$parcel$exportWildcard($46914435460bb52d$exports, $be0b80c7d092986b$exports);


var $5700acf22cb6391e$exports = {};
var $6e6001b2f043445d$exports = {};
var $1291230e517cb182$exports = {};

$parcel$export($1291230e517cb182$exports, "useAddress", () => $1291230e517cb182$export$ac0686965540f22d);
var $b5bf33355828ad95$exports = {};

$parcel$export($b5bf33355828ad95$exports, "Web3Provider", () => $b5bf33355828ad95$export$d05096c9fd9d936d);
$parcel$export($b5bf33355828ad95$exports, "useWeb3", () => $b5bf33355828ad95$export$5d39cdc6a2aceb53);



const $b5bf33355828ad95$var$defaultChainDict = {
    "0x1": "Mainnet",
    "0x3": "Ropsten",
    "0x4": "Rinkeby",
    "0x5": "Goerli",
    "0x2a": "Kovan"
};
const $b5bf33355828ad95$var$defaultProvider = (0, $h1OuD$getDefaultProvider)();
const $b5bf33355828ad95$var$Web3Context = /*#__PURE__*/ (0, $h1OuD$createContext)({
    setAddress: ()=>null,
    setChainId: ()=>null,
    chainDict: $b5bf33355828ad95$var$defaultChainDict,
    provider: $b5bf33355828ad95$var$defaultProvider
});
const $b5bf33355828ad95$export$d05096c9fd9d936d = ({ children: children , address: initialAddress , chainId: initialChainId , provider: provider = $b5bf33355828ad95$var$defaultProvider , signer: signer , chainDict: chainDict = {}  })=>{
    const [address, setAddress] = (0, $h1OuD$useState)(initialAddress);
    const [chainId, setChainId] = (0, $h1OuD$useState)(initialChainId);
    const context = {
        address: address,
        chainId: chainId,
        setAddress: setAddress,
        setChainId: setChainId,
        provider: provider,
        signer: signer,
        chainDict: {
            ...$b5bf33355828ad95$var$defaultChainDict,
            ...chainDict
        }
    };
    return /*#__PURE__*/ (0, $h1OuD$jsx)($b5bf33355828ad95$var$Web3Context.Provider, {
        value: context,
        children: children
    });
};
const $b5bf33355828ad95$export$5d39cdc6a2aceb53 = ()=>(0, $h1OuD$useContext)($b5bf33355828ad95$var$Web3Context);


const $1291230e517cb182$export$ac0686965540f22d = ()=>{
    const { address: address  } = (0, $b5bf33355828ad95$export$5d39cdc6a2aceb53)();
    return address;
};


$parcel$exportWildcard($6e6001b2f043445d$exports, $1291230e517cb182$exports);


var $b58986a61cf36c36$exports = {};
var $6e87fadcbd56498c$exports = {};

$parcel$export($6e87fadcbd56498c$exports, "useNetwork", () => $6e87fadcbd56498c$export$553aaf59afc1a2d8);


const $6e87fadcbd56498c$export$553aaf59afc1a2d8 = ()=>{
    const { chainId: chainId  } = (0, $b5bf33355828ad95$export$5d39cdc6a2aceb53)();
    if (!chainId) return undefined;
    return (0, $h1OuD$providers).getNetwork(chainId);
};


$parcel$exportWildcard($b58986a61cf36c36$exports, $6e87fadcbd56498c$exports);


var $528d7b5141a3ccd8$exports = {};
var $353c4fd9c23dc190$exports = {};

$parcel$export($353c4fd9c23dc190$exports, "useContract", () => $353c4fd9c23dc190$export$5556fed9e469df03);


var $919486e51744d371$exports = {};
var $7c49c323774941e5$exports = {};

$parcel$export($7c49c323774941e5$exports, "useProvider", () => $7c49c323774941e5$export$693cdb10cec23617);
var $95ad1495d8d22fad$exports = {};

$parcel$exportWildcard($95ad1495d8d22fad$exports, $b5bf33355828ad95$exports);


const $7c49c323774941e5$export$693cdb10cec23617 = ()=>{
    const { provider: provider  } = (0, $b5bf33355828ad95$export$5d39cdc6a2aceb53)();
    return provider;
};


$parcel$exportWildcard($919486e51744d371$exports, $7c49c323774941e5$exports);


var $bc79a488b049a0e2$exports = {};
var $9e97004f6662087d$exports = {};

$parcel$export($9e97004f6662087d$exports, "useSigner", () => $9e97004f6662087d$export$9a227db3d64f1ffd);

const $9e97004f6662087d$export$9a227db3d64f1ffd = ()=>{
    const { signer: signer  } = (0, $b5bf33355828ad95$export$5d39cdc6a2aceb53)();
    return signer;
};


$parcel$exportWildcard($bc79a488b049a0e2$exports, $9e97004f6662087d$exports);


const $353c4fd9c23dc190$export$5556fed9e469df03 = (address, abi)=>{
    const signer = (0, $9e97004f6662087d$export$9a227db3d64f1ffd)();
    const provider = (0, $7c49c323774941e5$export$693cdb10cec23617)();
    const [contract, setContract] = (0, $h1OuD$useState)(new (0, $h1OuD$Contract)(address, abi, provider));
    const connect = (0, $h1OuD$useCallback)(()=>{
        if (signer) setContract(contract.connect(signer));
    }, [
        contract,
        signer
    ]);
    return [
        contract,
        connect
    ];
};


$parcel$exportWildcard($528d7b5141a3ccd8$exports, $353c4fd9c23dc190$exports);


var $fb44dc37b7573206$exports = {};
var $55abee8d73d3bb4a$exports = {};

$parcel$export($55abee8d73d3bb4a$exports, "useMetaMask", () => $55abee8d73d3bb4a$export$6f1a648d65fc54a1);



const $b17d838aab2157cc$var$onboarding = new (0, $h1OuD$metamaskonboarding)();
const $b17d838aab2157cc$export$4e217c25dcf81ae2 = window.ethereum;
const $b17d838aab2157cc$export$bff392e758e98175 = (metaMask)=>{
    return (0, $h1OuD$metamaskonboarding).isMetaMaskInstalled();
};
const $b17d838aab2157cc$export$f171239676c462b6 = ()=>$b17d838aab2157cc$var$onboarding.startOnboarding();
const $b17d838aab2157cc$export$32dda890157e21f6 = ()=>$b17d838aab2157cc$var$onboarding.stopOnboarding();





function $55abee8d73d3bb4a$export$6f1a648d65fc54a1() {
    const { setAddress: setAddress , setChainId: setChainId  } = (0, $b5bf33355828ad95$export$5d39cdc6a2aceb53)();
    const initialState = (0, $b17d838aab2157cc$export$bff392e758e98175)((0, $b17d838aab2157cc$export$4e217c25dcf81ae2)) ? {
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
        (0, $b17d838aab2157cc$export$32dda890157e21f6)();
    }, [
        setAddress
    ]);
    const handleChainChanged = (0, $h1OuD$useCallback)((chainId)=>setChainId(chainId), [
        setChainId
    ]);
    (0, $h1OuD$useEffect)(()=>{
        if ((0, $b17d838aab2157cc$export$bff392e758e98175)((0, $b17d838aab2157cc$export$4e217c25dcf81ae2))) {
            (0, $b17d838aab2157cc$export$4e217c25dcf81ae2).on("accountsChanged", handleAccountsChanded);
            (0, $b17d838aab2157cc$export$4e217c25dcf81ae2).on("chainChanged", handleChainChanged);
        }
        return ()=>{
            if ((0, $b17d838aab2157cc$export$bff392e758e98175)((0, $b17d838aab2157cc$export$4e217c25dcf81ae2))) {
                (0, $b17d838aab2157cc$export$4e217c25dcf81ae2).removeListener("accountsChanged", handleAccountsChanded);
                (0, $b17d838aab2157cc$export$4e217c25dcf81ae2).removeListener("chainChanged", handleChainChanged);
            }
        };
    }, [
        handleAccountsChanded,
        handleChainChanged
    ]);
    const connect = (0, $h1OuD$useCallback)(async ()=>{
        if (!(0, $b17d838aab2157cc$export$bff392e758e98175)((0, $b17d838aab2157cc$export$4e217c25dcf81ae2))) {
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "onboarding"
                }));
            (0, $b17d838aab2157cc$export$f171239676c462b6)();
            return;
        }
        setOnboardingState((prevState)=>({
                ...prevState,
                status: "connecting",
                error: undefined
            }));
        try {
            const accounts = await (0, $b17d838aab2157cc$export$4e217c25dcf81ae2).request({
                method: "eth_requestAccounts"
            });
            handleAccountsChanded(accounts);
            const chainId = await (0, $b17d838aab2157cc$export$4e217c25dcf81ae2).request({
                method: "eth_chainId"
            });
            handleChainChanged(chainId);
        } catch (err) {
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "notConnected",
                    error: (0, $c2fb42a9184c50b6$export$82f46aa4e6535a45)(err)
                }));
        }
    }, [
        handleAccountsChanded,
        handleChainChanged
    ]);
    const disconnect = (0, $h1OuD$useCallback)(()=>{
        handleAccountsChanded([]);
        handleChainChanged(undefined);
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
        connect: connect,
        disconnect: disconnect
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
    "function balanceOf(address owner) view returns (uint256)"
];
const $9cfbd30380651811$export$c79c82fb94eb75b4 = (contractAddress, address, { refreshOnTransfer: refreshOnTransfer  } = {})=>{
    const [contract] = (0, $353c4fd9c23dc190$export$5556fed9e469df03)(contractAddress, $9cfbd30380651811$var$abi);
    const filterTransferTo = (0, $h1OuD$useMemo)(()=>contract.filters.Transfer(null, address), [
        contract,
        address
    ]);
    const filterTransferFrom = (0, $h1OuD$useMemo)(()=>contract.filters.Transfer(address), [
        contract,
        address
    ]);
    const [state, setState] = (0, $h1OuD$useState)({
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
            setState((prevState)=>({
                    ...prevState,
                    isLoading: false,
                    error: (0, $c2fb42a9184c50b6$export$82f46aa4e6535a45)(err)
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
    (0, $h1OuD$useEffect)(()=>{
        if (refreshOnTransfer) {
            contract.on(filterTransferTo, refresh);
            contract.on(filterTransferFrom, refresh);
        }
        return ()=>{
            if (refreshOnTransfer) {
                contract.off(filterTransferTo, refresh);
                contract.off(filterTransferFrom, refresh);
            }
        };
    }, [
        contract,
        filterTransferTo,
        filterTransferFrom,
        refreshOnTransfer,
        refresh
    ]);
    return {
        ...state,
        refresh: refresh
    };
};


$parcel$exportWildcard($80d717538ad2e1e9$exports, $9cfbd30380651811$exports);


var $3aafae72fb40ba94$exports = {};
var $6eb90ea1e4e9ef36$exports = {};

$parcel$export($6eb90ea1e4e9ef36$exports, "useTokenMetadata", () => $6eb90ea1e4e9ef36$export$9d829cdfbbd34b71);



const $6eb90ea1e4e9ef36$var$abi = [
    "function tokenURI(uint256 tokenId) view returns (string)"
];
const $6eb90ea1e4e9ef36$var$asDataUrl = (url)=>{
    const found = url.match(/^data:application\/json;base64,(.+)/);
    return found?.[1];
};
const $6eb90ea1e4e9ef36$export$9d829cdfbbd34b71 = (contractAddress, tokenId)=>{
    const [contract] = (0, $353c4fd9c23dc190$export$5556fed9e469df03)(contractAddress, $6eb90ea1e4e9ef36$var$abi);
    const [state, setState] = (0, $h1OuD$useState)({
        isLoading: false
    });
    (0, $h1OuD$useEffect)(()=>{
        const fetchMetadata = async ()=>{
            setState((prevState)=>({
                    ...prevState,
                    error: undefined,
                    isLoading: true
                }));
            try {
                let metadata;
                const tokenUri = await contract.tokenURI(tokenId);
                const base64Data = $6eb90ea1e4e9ef36$var$asDataUrl(tokenUri);
                if (base64Data) metadata = JSON.parse(atob(base64Data));
                else {
                    const response = await fetch(tokenUri);
                    if (!response.ok) throw new Error(`Network response was not OK, status: ${response.status}`);
                    metadata = await response.json();
                }
                setState((prevState)=>({
                        ...prevState,
                        isLoading: false,
                        metadata: metadata
                    }));
            } catch (error) {
                setState((prevState)=>({
                        ...prevState,
                        error: (0, $c2fb42a9184c50b6$export$82f46aa4e6535a45)(error),
                        isLoading: false
                    }));
            }
        };
        fetchMetadata();
    }, [
        contract,
        tokenId
    ]);
    return state;
};


$parcel$exportWildcard($3aafae72fb40ba94$exports, $6eb90ea1e4e9ef36$exports);


var $049ac9de6abc74c7$exports = {};
var $6f864d5f96b5a0b3$exports = {};

$parcel$export($6f864d5f96b5a0b3$exports, "useWalletBalance", () => $6f864d5f96b5a0b3$export$512f6b8a30d065e1);



const $6f864d5f96b5a0b3$export$512f6b8a30d065e1 = (address, { refreshOnBlock: refreshOnBlock  } = {})=>{
    const [state, setState] = (0, $h1OuD$useState)({
        isLoading: false
    });
    const provider = (0, $7c49c323774941e5$export$693cdb10cec23617)();
    const fetchBalance = (0, $h1OuD$useCallback)(async ()=>{
        setState((prevState)=>({
                ...prevState,
                isLoading: true,
                error: undefined
            }));
        try {
            const balance = await provider.getBalance(address);
            setState((prevState)=>({
                    ...prevState,
                    balance: balance,
                    isLoading: false
                }));
        } catch (err) {
            setState((prevState)=>({
                    ...prevState,
                    isLoading: false,
                    error: (0, $c2fb42a9184c50b6$export$82f46aa4e6535a45)(err)
                }));
        }
    }, [
        address,
        provider
    ]);
    (0, $h1OuD$useEffect)(()=>{
        fetchBalance();
    }, [
        fetchBalance
    ]);
    (0, $h1OuD$useEffect)(()=>{
        if (refreshOnBlock) provider.on("block", fetchBalance);
        return ()=>{
            if (refreshOnBlock) provider.off("block", fetchBalance);
        };
    }, [
        provider,
        fetchBalance,
        refreshOnBlock
    ]);
    return state;
};


$parcel$exportWildcard($049ac9de6abc74c7$exports, $6f864d5f96b5a0b3$exports);


$parcel$exportWildcard($5700acf22cb6391e$exports, $6e6001b2f043445d$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $b58986a61cf36c36$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $528d7b5141a3ccd8$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $fb44dc37b7573206$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $919486e51744d371$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $bc79a488b049a0e2$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $80d717538ad2e1e9$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $049ac9de6abc74c7$exports);
$parcel$exportWildcard($5700acf22cb6391e$exports, $3aafae72fb40ba94$exports);



var $fd4e7a97551fe0f5$exports = {};




export {$46ace6a8ad08831d$export$73974d1f547d9d48 as Address, $c8c6171bf842faa5$export$276e99f8b64146b2 as Balance, $1291230e517cb182$export$ac0686965540f22d as useAddress, $6e87fadcbd56498c$export$553aaf59afc1a2d8 as useNetwork, $353c4fd9c23dc190$export$5556fed9e469df03 as useContract, $55abee8d73d3bb4a$export$6f1a648d65fc54a1 as useMetaMask, $4c518f06881b3c31$export$ff1cd117057bac38 as OnboardingState, $7c49c323774941e5$export$693cdb10cec23617 as useProvider, $9e97004f6662087d$export$9a227db3d64f1ffd as useSigner, $9cfbd30380651811$export$c79c82fb94eb75b4 as useTokenBalance, $6f864d5f96b5a0b3$export$512f6b8a30d065e1 as useWalletBalance, $6eb90ea1e4e9ef36$export$9d829cdfbbd34b71 as useTokenMetadata, $b5bf33355828ad95$export$d05096c9fd9d936d as Web3Provider, $b5bf33355828ad95$export$5d39cdc6a2aceb53 as useWeb3};
//# sourceMappingURL=module.js.map
