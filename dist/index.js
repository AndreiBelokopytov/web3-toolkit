var $adHgb$reactjsxruntime = require("react/jsx-runtime");
var $adHgb$react = require("react");
var $adHgb$metamaskonboarding = require("@metamask/onboarding");
var $adHgb$ethers = require("ethers");

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


$parcel$exportWildcard($f4f77e0c5912504a$exports, $8c7f795f82028d2c$exports);


var $6082b9225335fda8$exports = {};
var $1767db27b8c19e41$exports = {};

$parcel$export($1767db27b8c19e41$exports, "Web3Provider", () => $1767db27b8c19e41$export$d05096c9fd9d936d);
$parcel$export($1767db27b8c19e41$exports, "useWeb3Context", () => $1767db27b8c19e41$export$80233ff53690030c);


const $1767db27b8c19e41$var$defaultChainDict = {
    "0x1": "Mainnet",
    "0x3": "Ropsten",
    "0x4": "Rinkeby",
    "0x5": "Goerli",
    "0x2a": "Kovan"
};
const $1767db27b8c19e41$var$Web3Context = /*#__PURE__*/ (0, $adHgb$react.createContext)({
    setAddress: ()=>null,
    setChainId: ()=>null,
    chainDict: $1767db27b8c19e41$var$defaultChainDict
});
const $1767db27b8c19e41$export$d05096c9fd9d936d = ({ children: children , address: initialAddress , chainId: initialChainId , provider: provider , chainDict: chainDict = {}  })=>{
    const [address, setAddress] = (0, $adHgb$react.useState)(initialAddress);
    const [chainId, setChainId] = (0, $adHgb$react.useState)(initialChainId);
    const context = {
        address: address,
        chainId: chainId,
        setAddress: setAddress,
        setChainId: setChainId,
        provider: provider,
        chainDict: {
            ...$1767db27b8c19e41$var$defaultChainDict,
            ...chainDict
        }
    };
    return /*#__PURE__*/ (0, $adHgb$reactjsxruntime.jsx)($1767db27b8c19e41$var$Web3Context.Provider, {
        value: context,
        children: children
    });
};
const $1767db27b8c19e41$export$80233ff53690030c = ()=>(0, $adHgb$react.useContext)($1767db27b8c19e41$var$Web3Context);


$parcel$exportWildcard($6082b9225335fda8$exports, $1767db27b8c19e41$exports);


var $c0c07659166c9de8$exports = {};
var $56a135bc917291c1$exports = {};
var $b74bd2e9d19bd79e$exports = {};

$parcel$export($b74bd2e9d19bd79e$exports, "useAddress", () => $b74bd2e9d19bd79e$export$ac0686965540f22d);

const $b74bd2e9d19bd79e$export$ac0686965540f22d = ()=>{
    const { address: address  } = (0, $1767db27b8c19e41$export$80233ff53690030c)();
    return address;
};


$parcel$exportWildcard($56a135bc917291c1$exports, $b74bd2e9d19bd79e$exports);


var $51ed8dc16fdb6b1e$exports = {};
var $a20f1a10da85b3f9$exports = {};

$parcel$export($a20f1a10da85b3f9$exports, "useChain", () => $a20f1a10da85b3f9$export$a4a17273dffcc09c);

const $a20f1a10da85b3f9$export$a4a17273dffcc09c = ()=>{
    const { chainId: chainId , chainDict: chainDict  } = (0, $1767db27b8c19e41$export$80233ff53690030c)();
    if (!chainId) return undefined;
    const name = chainDict[chainId] ?? "Unknown";
    return {
        id: chainId,
        name: name
    };
};


$parcel$exportWildcard($51ed8dc16fdb6b1e$exports, $a20f1a10da85b3f9$exports);


var $6aa5989b47ada426$exports = {};
var $7dfaf4cffe76781c$exports = {};

$parcel$export($7dfaf4cffe76781c$exports, "useMetaMask", () => $7dfaf4cffe76781c$export$6f1a648d65fc54a1);


var $b074651bcad67e82$exports = {};
var $d23f3f4243372246$exports = {};

$parcel$export($d23f3f4243372246$exports, "metaMaskProvider", () => $d23f3f4243372246$export$621e95380bede4a2);
const $d23f3f4243372246$export$621e95380bede4a2 = window.ethereum;


$parcel$exportWildcard($b074651bcad67e82$exports, $d23f3f4243372246$exports);



function $7dfaf4cffe76781c$export$6f1a648d65fc54a1() {
    const metaMaskOnboarding = (0, $adHgb$react.useRef)(new (0, ($parcel$interopDefault($adHgb$metamaskonboarding)))());
    const { setAddress: setAddress , setChainId: setChainId  } = (0, $1767db27b8c19e41$export$80233ff53690030c)();
    const initialState = (0, ($parcel$interopDefault($adHgb$metamaskonboarding))).isMetaMaskInstalled() ? {
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
        metaMaskOnboarding.current?.stopOnboarding();
    }, [
        setAddress
    ]);
    const handleChainChanged = (0, $adHgb$react.useCallback)((chainId)=>setChainId(chainId), [
        setChainId
    ]);
    (0, $adHgb$react.useEffect)(()=>{
        if ((0, ($parcel$interopDefault($adHgb$metamaskonboarding))).isMetaMaskInstalled()) {
            (0, $d23f3f4243372246$export$621e95380bede4a2).on("accountsChanged", handleAccountsChanded);
            (0, $d23f3f4243372246$export$621e95380bede4a2).on("chainChanged", handleChainChanged);
        }
        return ()=>{
            if ((0, ($parcel$interopDefault($adHgb$metamaskonboarding))).isMetaMaskInstalled()) {
                (0, $d23f3f4243372246$export$621e95380bede4a2).removeListener("accountsChanged", handleAccountsChanded);
                (0, $d23f3f4243372246$export$621e95380bede4a2).removeListener("chainChanged", handleChainChanged);
            }
        };
    }, [
        handleAccountsChanded,
        handleChainChanged
    ]);
    const connect = (0, $adHgb$react.useCallback)(async ()=>{
        if (!(0, ($parcel$interopDefault($adHgb$metamaskonboarding))).isMetaMaskInstalled()) {
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
            const accounts = await (0, $d23f3f4243372246$export$621e95380bede4a2).request({
                method: "eth_requestAccounts"
            });
            handleAccountsChanded(accounts);
            const chainId = await (0, $d23f3f4243372246$export$621e95380bede4a2).request({
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


var $ff0d9ec41c5160b1$exports = {};
var $9f2efcd9dd9f4089$exports = {};

$parcel$export($9f2efcd9dd9f4089$exports, "useProvider", () => $9f2efcd9dd9f4089$export$693cdb10cec23617);

const $9f2efcd9dd9f4089$export$693cdb10cec23617 = ()=>{
    const { provider: provider  } = (0, $1767db27b8c19e41$export$80233ff53690030c)();
    return provider;
};


$parcel$exportWildcard($ff0d9ec41c5160b1$exports, $9f2efcd9dd9f4089$exports);


const $88f989a8bd357839$var$abi = [
    "function balanceOf(address owner) view returns (uint256)"
];
const $88f989a8bd357839$export$c79c82fb94eb75b4 = (contractAddress, address)=>{
    const provider = (0, $9f2efcd9dd9f4089$export$693cdb10cec23617)();
    const contract = (0, $adHgb$react.useMemo)(()=>{
        return new (0, $adHgb$ethers.Contract)(contractAddress, $88f989a8bd357839$var$abi, provider);
    }, [
        contractAddress,
        provider
    ]);
    const [state, setState] = (0, $adHgb$react.useState)({
        balance: (0, $adHgb$ethers.BigNumber).from(0),
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
    (0, $adHgb$react.useEffect)(()=>{
        refresh();
    }, [
        refresh
    ]);
    return {
        ...state,
        refresh: refresh
    };
};


$parcel$exportWildcard($f0647d1c2a263569$exports, $88f989a8bd357839$exports);



$parcel$exportWildcard($c0c07659166c9de8$exports, $56a135bc917291c1$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $51ed8dc16fdb6b1e$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $6aa5989b47ada426$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $f0647d1c2a263569$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $ff0d9ec41c5160b1$exports);



$parcel$exportWildcard(module.exports, $f4f77e0c5912504a$exports);
$parcel$exportWildcard(module.exports, $6082b9225335fda8$exports);
$parcel$exportWildcard(module.exports, $c0c07659166c9de8$exports);
$parcel$exportWildcard(module.exports, $b074651bcad67e82$exports);


//# sourceMappingURL=index.js.map
