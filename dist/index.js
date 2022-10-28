var $adHgb$reactjsxruntime = require("react/jsx-runtime");
var $adHgb$react = require("react");
var $adHgb$etherslibutils = require("ethers/lib/utils");
var $adHgb$ethers = require("ethers");
var $adHgb$metamaskonboarding = require("@metamask/onboarding");

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
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $f4f77e0c5912504a$exports = {};
var $8c7f795f82028d2c$exports = {};
var $bcf4b3780774a97d$exports = {};

$parcel$export($bcf4b3780774a97d$exports, "Address", () => $bcf4b3780774a97d$export$73974d1f547d9d48);


const $bcf4b3780774a97d$var$DEFAULT_SUBSTRING_LENGTH = 6;
const $bcf4b3780774a97d$export$73974d1f547d9d48 = /*#__PURE__*/ (0, ($parcel$interopDefault($adHgb$react))).memo(({ children: address , substrLength: substrLength  })=>{
    return /*#__PURE__*/ (0, $adHgb$reactjsxruntime.jsx)("span", {
        children: $bcf4b3780774a97d$var$shortenAddress(address, substrLength)
    });
});
function $bcf4b3780774a97d$var$shortenAddress(address, substrLength = $bcf4b3780774a97d$var$DEFAULT_SUBSTRING_LENGTH) {
    if (address.length <= substrLength * 2 || address.match(/.*\.{3}.*/)) return address;
    return `${address.slice(0, substrLength)}...${address.slice(address.length - substrLength, address.length)}`;
}


$parcel$exportWildcard($8c7f795f82028d2c$exports, $bcf4b3780774a97d$exports);


var $d8b3ca1b3dbc6ea2$exports = {};
var $85d0f383f98a68e3$exports = {};

$parcel$export($85d0f383f98a68e3$exports, "Balance", () => $85d0f383f98a68e3$export$276e99f8b64146b2);



const $457495504b5c2d38$export$82f46aa4e6535a45 = (error)=>{
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;
    if (typeof error === "string") errorMessage = error;
    return errorMessage;
};
class $457495504b5c2d38$export$7750cdfb4db2c3d extends Error {
}
function $457495504b5c2d38$export$a7a9523472993e97(condition, msg) {
    if (!condition) throw new $457495504b5c2d38$export$7750cdfb4db2c3d(msg);
}


const $85d0f383f98a68e3$var$DEFAULT_UNITS = 18;
const $85d0f383f98a68e3$export$276e99f8b64146b2 = /*#__PURE__*/ (0, $adHgb$react.memo)(({ value: value , units: units = $85d0f383f98a68e3$var$DEFAULT_UNITS , fractionDigits: fractionDigits  })=>{
    (0, $457495504b5c2d38$export$a7a9523472993e97)(fractionDigits === undefined || fractionDigits >= 0 && fractionDigits < units, 'invalid value for the "fractionDigits" attribute');
    let formattedValue = (0, $adHgb$etherslibutils.formatUnits)(value, units);
    const fraction = formattedValue.split(".")[1];
    if (fractionDigits && fraction.length > fractionDigits) formattedValue = formattedValue.slice(0, formattedValue.length - fraction.length + fractionDigits);
    return /*#__PURE__*/ (0, $adHgb$reactjsxruntime.jsx)("span", {
        children: formattedValue
    });
});


$parcel$exportWildcard($d8b3ca1b3dbc6ea2$exports, $85d0f383f98a68e3$exports);


$parcel$exportWildcard($f4f77e0c5912504a$exports, $8c7f795f82028d2c$exports);
$parcel$exportWildcard($f4f77e0c5912504a$exports, $d8b3ca1b3dbc6ea2$exports);


var $c0c07659166c9de8$exports = {};
var $56a135bc917291c1$exports = {};
var $b74bd2e9d19bd79e$exports = {};

$parcel$export($b74bd2e9d19bd79e$exports, "useAddress", () => $b74bd2e9d19bd79e$export$ac0686965540f22d);
var $fd05b2240cbd4f8f$exports = {};

$parcel$export($fd05b2240cbd4f8f$exports, "Web3Provider", () => $fd05b2240cbd4f8f$export$d05096c9fd9d936d);
$parcel$export($fd05b2240cbd4f8f$exports, "useWeb3", () => $fd05b2240cbd4f8f$export$5d39cdc6a2aceb53);



const $fd05b2240cbd4f8f$var$defaultChainDict = {
    "0x1": "Mainnet",
    "0x3": "Ropsten",
    "0x4": "Rinkeby",
    "0x5": "Goerli",
    "0x2a": "Kovan"
};
const $fd05b2240cbd4f8f$var$defaultProvider = (0, $adHgb$ethers.getDefaultProvider)();
const $fd05b2240cbd4f8f$var$Web3Context = /*#__PURE__*/ (0, $adHgb$react.createContext)({
    setAddress: ()=>null,
    setChainId: ()=>null,
    chainDict: $fd05b2240cbd4f8f$var$defaultChainDict,
    provider: $fd05b2240cbd4f8f$var$defaultProvider
});
const $fd05b2240cbd4f8f$export$d05096c9fd9d936d = ({ children: children , address: initialAddress , chainId: initialChainId , provider: provider = $fd05b2240cbd4f8f$var$defaultProvider , signer: signer , chainDict: chainDict = {}  })=>{
    const [address, setAddress] = (0, $adHgb$react.useState)(initialAddress);
    const [chainId, setChainId] = (0, $adHgb$react.useState)(initialChainId);
    const context = {
        address: address,
        chainId: chainId,
        setAddress: setAddress,
        setChainId: setChainId,
        provider: provider,
        signer: signer,
        chainDict: {
            ...$fd05b2240cbd4f8f$var$defaultChainDict,
            ...chainDict
        }
    };
    return /*#__PURE__*/ (0, $adHgb$reactjsxruntime.jsx)($fd05b2240cbd4f8f$var$Web3Context.Provider, {
        value: context,
        children: children
    });
};
const $fd05b2240cbd4f8f$export$5d39cdc6a2aceb53 = ()=>(0, $adHgb$react.useContext)($fd05b2240cbd4f8f$var$Web3Context);


const $b74bd2e9d19bd79e$export$ac0686965540f22d = ()=>{
    const { address: address  } = (0, $fd05b2240cbd4f8f$export$5d39cdc6a2aceb53)();
    return address;
};


$parcel$exportWildcard($56a135bc917291c1$exports, $b74bd2e9d19bd79e$exports);


var $ef7d49319f2771db$exports = {};
var $0f6b9fdf302597a6$exports = {};

$parcel$export($0f6b9fdf302597a6$exports, "useNetwork", () => $0f6b9fdf302597a6$export$553aaf59afc1a2d8);


const $0f6b9fdf302597a6$export$553aaf59afc1a2d8 = ()=>{
    const { chainId: chainId  } = (0, $fd05b2240cbd4f8f$export$5d39cdc6a2aceb53)();
    if (!chainId) return undefined;
    return (0, $adHgb$ethers.providers).getNetwork(chainId);
};


$parcel$exportWildcard($ef7d49319f2771db$exports, $0f6b9fdf302597a6$exports);


var $c5eded837e2f2da8$exports = {};
var $6a4fc3770554f563$exports = {};

$parcel$export($6a4fc3770554f563$exports, "useContract", () => $6a4fc3770554f563$export$5556fed9e469df03);


var $ff0d9ec41c5160b1$exports = {};
var $9f2efcd9dd9f4089$exports = {};

$parcel$export($9f2efcd9dd9f4089$exports, "useProvider", () => $9f2efcd9dd9f4089$export$693cdb10cec23617);
var $b074651bcad67e82$exports = {};

$parcel$exportWildcard($b074651bcad67e82$exports, $fd05b2240cbd4f8f$exports);


const $9f2efcd9dd9f4089$export$693cdb10cec23617 = ()=>{
    const { provider: provider  } = (0, $fd05b2240cbd4f8f$export$5d39cdc6a2aceb53)();
    return provider;
};


$parcel$exportWildcard($ff0d9ec41c5160b1$exports, $9f2efcd9dd9f4089$exports);


var $fc0409aadd1d83d2$exports = {};
var $429d9969700ede68$exports = {};

$parcel$export($429d9969700ede68$exports, "useSigner", () => $429d9969700ede68$export$9a227db3d64f1ffd);

const $429d9969700ede68$export$9a227db3d64f1ffd = ()=>{
    const { signer: signer  } = (0, $fd05b2240cbd4f8f$export$5d39cdc6a2aceb53)();
    return signer;
};


$parcel$exportWildcard($fc0409aadd1d83d2$exports, $429d9969700ede68$exports);


const $6a4fc3770554f563$export$5556fed9e469df03 = (address, abi)=>{
    const signer = (0, $429d9969700ede68$export$9a227db3d64f1ffd)();
    const provider = (0, $9f2efcd9dd9f4089$export$693cdb10cec23617)();
    const [contract, setContract] = (0, $adHgb$react.useState)(new (0, $adHgb$ethers.Contract)(address, abi, provider));
    const connect = (0, $adHgb$react.useCallback)(()=>{
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


$parcel$exportWildcard($c5eded837e2f2da8$exports, $6a4fc3770554f563$exports);


var $6aa5989b47ada426$exports = {};
var $7dfaf4cffe76781c$exports = {};

$parcel$export($7dfaf4cffe76781c$exports, "useMetaMask", () => $7dfaf4cffe76781c$export$6f1a648d65fc54a1);



const $198014b093d23cca$var$onboarding = new (0, ($parcel$interopDefault($adHgb$metamaskonboarding)))();
const $198014b093d23cca$export$4e217c25dcf81ae2 = window.ethereum;
const $198014b093d23cca$export$bff392e758e98175 = (metaMask)=>{
    return (0, ($parcel$interopDefault($adHgb$metamaskonboarding))).isMetaMaskInstalled();
};
const $198014b093d23cca$export$f171239676c462b6 = ()=>$198014b093d23cca$var$onboarding.startOnboarding();
const $198014b093d23cca$export$32dda890157e21f6 = ()=>$198014b093d23cca$var$onboarding.stopOnboarding();





function $7dfaf4cffe76781c$export$6f1a648d65fc54a1() {
    const { setAddress: setAddress , setChainId: setChainId  } = (0, $fd05b2240cbd4f8f$export$5d39cdc6a2aceb53)();
    const initialState = (0, $198014b093d23cca$export$bff392e758e98175)((0, $198014b093d23cca$export$4e217c25dcf81ae2)) ? {
        status: "notConnected"
    } : {
        status: "notInstalled"
    };
    const [onboardingState, setOnboardingState] = (0, $adHgb$react.useState)(initialState);
    const handleAccountsChanded = (0, $adHgb$react.useCallback)((accounts)=>{
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
        (0, $198014b093d23cca$export$32dda890157e21f6)();
    }, [
        setAddress
    ]);
    const handleChainChanged = (0, $adHgb$react.useCallback)((chainId)=>setChainId(chainId), [
        setChainId
    ]);
    (0, $adHgb$react.useEffect)(()=>{
        if ((0, $198014b093d23cca$export$bff392e758e98175)((0, $198014b093d23cca$export$4e217c25dcf81ae2))) {
            (0, $198014b093d23cca$export$4e217c25dcf81ae2).on("accountsChanged", handleAccountsChanded);
            (0, $198014b093d23cca$export$4e217c25dcf81ae2).on("chainChanged", handleChainChanged);
        }
        return ()=>{
            if ((0, $198014b093d23cca$export$bff392e758e98175)((0, $198014b093d23cca$export$4e217c25dcf81ae2))) {
                (0, $198014b093d23cca$export$4e217c25dcf81ae2).removeListener("accountsChanged", handleAccountsChanded);
                (0, $198014b093d23cca$export$4e217c25dcf81ae2).removeListener("chainChanged", handleChainChanged);
            }
        };
    }, [
        handleAccountsChanded,
        handleChainChanged
    ]);
    const connect = (0, $adHgb$react.useCallback)(async ()=>{
        if (!(0, $198014b093d23cca$export$bff392e758e98175)((0, $198014b093d23cca$export$4e217c25dcf81ae2))) {
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "onboarding"
                }));
            (0, $198014b093d23cca$export$f171239676c462b6)();
            return;
        }
        setOnboardingState((prevState)=>({
                ...prevState,
                status: "connecting",
                error: undefined
            }));
        try {
            const accounts = await (0, $198014b093d23cca$export$4e217c25dcf81ae2).request({
                method: "eth_requestAccounts"
            });
            handleAccountsChanded(accounts);
            const chainId = await (0, $198014b093d23cca$export$4e217c25dcf81ae2).request({
                method: "eth_chainId"
            });
            handleChainChanged(chainId);
        } catch (err) {
            setOnboardingState((prevState)=>({
                    ...prevState,
                    status: "notConnected",
                    error: (0, $457495504b5c2d38$export$82f46aa4e6535a45)(err)
                }));
        }
    }, [
        handleAccountsChanded,
        handleChainChanged
    ]);
    const disconnect = (0, $adHgb$react.useCallback)(()=>{
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


var $59830d75f32d61f8$exports = {};

$parcel$export($59830d75f32d61f8$exports, "OnboardingState", () => $59830d75f32d61f8$export$ff1cd117057bac38);
const $59830d75f32d61f8$export$ff1cd117057bac38 = {
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


$parcel$exportWildcard($6aa5989b47ada426$exports, $7dfaf4cffe76781c$exports);
$parcel$exportWildcard($6aa5989b47ada426$exports, $59830d75f32d61f8$exports);




var $f0647d1c2a263569$exports = {};
var $88f989a8bd357839$exports = {};

$parcel$export($88f989a8bd357839$exports, "useTokenBalance", () => $88f989a8bd357839$export$c79c82fb94eb75b4);



const $88f989a8bd357839$var$abi = [
    "function balanceOf(address owner) view returns (uint256)"
];
const $88f989a8bd357839$export$c79c82fb94eb75b4 = (contractAddress, address, { refreshOnTransfer: refreshOnTransfer  } = {})=>{
    const [contract] = (0, $6a4fc3770554f563$export$5556fed9e469df03)(contractAddress, $88f989a8bd357839$var$abi);
    const filterTransferTo = (0, $adHgb$react.useMemo)(()=>contract.filters.Transfer(null, address), [
        contract,
        address
    ]);
    const filterTransferFrom = (0, $adHgb$react.useMemo)(()=>contract.filters.Transfer(address), [
        contract,
        address
    ]);
    const [state, setState] = (0, $adHgb$react.useState)({
        isLoading: true
    });
    const refresh = (0, $adHgb$react.useCallback)(async ()=>{
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
                    error: (0, $457495504b5c2d38$export$82f46aa4e6535a45)(err)
                }));
        }
    }, [
        address,
        contract
    ]);
    (0, $adHgb$react.useEffect)(()=>{
        refresh();
    }, [
        refresh
    ]);
    (0, $adHgb$react.useEffect)(()=>{
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


$parcel$exportWildcard($f0647d1c2a263569$exports, $88f989a8bd357839$exports);


var $1677d79a02accae2$exports = {};
var $9ac683317b690db3$exports = {};

$parcel$export($9ac683317b690db3$exports, "useTokenMetadata", () => $9ac683317b690db3$export$9d829cdfbbd34b71);



const $9ac683317b690db3$var$abi = [
    "function tokenURI(uint256 tokenId) view returns (string)"
];
const $9ac683317b690db3$var$asDataUrl = (url)=>{
    const found = url.match(/^data:application\/json;base64,(.+)/);
    return found?.[1];
};
const $9ac683317b690db3$export$9d829cdfbbd34b71 = (contractAddress, tokenId)=>{
    const [contract] = (0, $6a4fc3770554f563$export$5556fed9e469df03)(contractAddress, $9ac683317b690db3$var$abi);
    const [state, setState] = (0, $adHgb$react.useState)({
        isLoading: false
    });
    (0, $adHgb$react.useEffect)(()=>{
        const fetchMetadata = async ()=>{
            setState((prevState)=>({
                    ...prevState,
                    error: undefined,
                    isLoading: true
                }));
            try {
                let metadata;
                const tokenUri = await contract.tokenURI(tokenId);
                const base64Data = $9ac683317b690db3$var$asDataUrl(tokenUri);
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
                        error: (0, $457495504b5c2d38$export$82f46aa4e6535a45)(error),
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


$parcel$exportWildcard($1677d79a02accae2$exports, $9ac683317b690db3$exports);


var $b8f97f93e1823d67$exports = {};
var $28679e69c1e5eac7$exports = {};

$parcel$export($28679e69c1e5eac7$exports, "useWalletBalance", () => $28679e69c1e5eac7$export$512f6b8a30d065e1);



const $28679e69c1e5eac7$export$512f6b8a30d065e1 = (address, { refreshOnBlock: refreshOnBlock  } = {})=>{
    const [state, setState] = (0, $adHgb$react.useState)({
        isLoading: false
    });
    const provider = (0, $9f2efcd9dd9f4089$export$693cdb10cec23617)();
    const fetchBalance = (0, $adHgb$react.useCallback)(async ()=>{
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
                    error: (0, $457495504b5c2d38$export$82f46aa4e6535a45)(err)
                }));
        }
    }, [
        address,
        provider
    ]);
    (0, $adHgb$react.useEffect)(()=>{
        fetchBalance();
    }, [
        fetchBalance
    ]);
    (0, $adHgb$react.useEffect)(()=>{
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


$parcel$exportWildcard($b8f97f93e1823d67$exports, $28679e69c1e5eac7$exports);


$parcel$exportWildcard($c0c07659166c9de8$exports, $56a135bc917291c1$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $ef7d49319f2771db$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $c5eded837e2f2da8$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $6aa5989b47ada426$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $ff0d9ec41c5160b1$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $fc0409aadd1d83d2$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $f0647d1c2a263569$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $b8f97f93e1823d67$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $1677d79a02accae2$exports);



var $7476bb2f3e99131c$exports = {};


$parcel$exportWildcard(module.exports, $f4f77e0c5912504a$exports);
$parcel$exportWildcard(module.exports, $c0c07659166c9de8$exports);
$parcel$exportWildcard(module.exports, $b074651bcad67e82$exports);
$parcel$exportWildcard(module.exports, $7476bb2f3e99131c$exports);


//# sourceMappingURL=index.js.map
