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


var $c0c07659166c9de8$exports = {};
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
    const initialState = (0, ($parcel$interopDefault($adHgb$metamaskonboarding))).isMetaMaskInstalled() ? {
        status: "notConnected",
        accounts: []
    } : {
        status: "notInstalled",
        accounts: []
    };
    const [onboardingState, setOnboardingState] = (0, $adHgb$react.useState)(initialState);
    const handleAccountsChanded = (0, $adHgb$react.useCallback)((accounts)=>{
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
    const handleChainChanged = (0, $adHgb$react.useCallback)((chainId)=>setOnboardingState((prevState)=>({
                ...prevState,
                chainId: chainId
            })), []);
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


const $88f989a8bd357839$var$abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function transfer(address to, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
];
const $88f989a8bd357839$export$c79c82fb94eb75b4 = (contractAddress, address, provider)=>{
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


$parcel$exportWildcard($c0c07659166c9de8$exports, $6aa5989b47ada426$exports);
$parcel$exportWildcard($c0c07659166c9de8$exports, $f0647d1c2a263569$exports);



$parcel$exportWildcard(module.exports, $f4f77e0c5912504a$exports);
$parcel$exportWildcard(module.exports, $c0c07659166c9de8$exports);
$parcel$exportWildcard(module.exports, $b074651bcad67e82$exports);


//# sourceMappingURL=index.js.map
