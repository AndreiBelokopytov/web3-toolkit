function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var MetaMaskOnboarding = _interopDefault(require('@metamask/onboarding'));
var ethers = require('ethers');

var DEFAULT_SUBSTRING_LENGTH = 6;
var Address = React__default.memo(function (_ref) {
  var address = _ref.children,
      substrLength = _ref.substrLength;
  return React__default.createElement("span", null, shortenAddress(address, substrLength));
});

function shortenAddress(address, substrLength) {
  if (substrLength === void 0) {
    substrLength = DEFAULT_SUBSTRING_LENGTH;
  }

  if (address.length <= substrLength * 2 || address.match(/.*\.{3}.*/)) {
    return address;
  }

  return address.slice(0, substrLength) + "..." + address.slice(address.length - substrLength, address.length);
}

(function (MetaMaskOnboardingStatus) {
  MetaMaskOnboardingStatus["notInstalled"] = "notInstalled";
  MetaMaskOnboardingStatus["notConnected"] = "notConnected";
  MetaMaskOnboardingStatus["onboarding"] = "onboarding";
  MetaMaskOnboardingStatus["connecting"] = "connecting";
  MetaMaskOnboardingStatus["connected"] = "connected";
})(exports.MetaMaskOnboardingStatus || (exports.MetaMaskOnboardingStatus = {}));

var ethereum = window.ethereum;

function useMetaMask() {
  var metaMaskOnboarding = React.useRef(new MetaMaskOnboarding());
  var initialStatus = MetaMaskOnboarding.isMetaMaskInstalled() ? exports.MetaMaskOnboardingStatus.notConnected : exports.MetaMaskOnboardingStatus.notInstalled;

  var _useState = React.useState({
    status: initialStatus,
    accounts: []
  }),
      onboardingState = _useState[0],
      setOnboardingState = _useState[1];

  var handleAccountsChanded = React.useCallback(function (accounts) {
    var _metaMaskOnboarding$c;

    setOnboardingState({
      status: exports.MetaMaskOnboardingStatus.connected,
      accounts: accounts
    });
    (_metaMaskOnboarding$c = metaMaskOnboarding.current) === null || _metaMaskOnboarding$c === void 0 ? void 0 : _metaMaskOnboarding$c.stopOnboarding();
  }, []);
  React.useEffect(function () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      ethereum.on('accountsChanged', handleAccountsChanded);
    }

    return function () {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        ethereum.removeListener('accountsChanged', handleAccountsChanded);
      }
    };
  }, [handleAccountsChanded]);
  var connect = React.useCallback(function () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOnboardingState({
        status: exports.MetaMaskOnboardingStatus.connecting,
        accounts: []
      });
      ethereum.request({
        method: 'eth_requestAccounts'
      }).then(handleAccountsChanded);
    } else {
      var _metaMaskOnboarding$c2;

      setOnboardingState({
        status: exports.MetaMaskOnboardingStatus.onboarding,
        accounts: []
      });
      (_metaMaskOnboarding$c2 = metaMaskOnboarding.current) === null || _metaMaskOnboarding$c2 === void 0 ? void 0 : _metaMaskOnboarding$c2.startOnboarding();
    }
  }, [handleAccountsChanded]);
  return {
    onboardingState: onboardingState,
    connect: connect
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var abi = ['function balanceOf(address owner) view returns (uint256)', 'function decimals() view returns (uint8)', 'function symbol() view returns (string)', 'function transfer(address to, uint amount) returns (bool)', 'event Transfer(address indexed from, address indexed to, uint amount)'];
var useTokenBalance = function useTokenBalance(contractAddress, address, provider) {
  var contract = React.useMemo(function () {
    return new ethers.Contract(contractAddress, abi, provider);
  }, [contractAddress, provider]);

  var _useState = React.useState({
    balance: ethers.BigNumber.from(0),
    isLoading: true
  }),
      state = _useState[0],
      setState = _useState[1];

  var refresh = React.useCallback(function () {
    try {
      setState(function (prevState) {
        return _extends({}, prevState, {
          isLoading: true,
          errorMessage: undefined
        });
      });

      var _temp2 = _catch(function () {
        return Promise.resolve(contract.balanceOf(address)).then(function (balance) {
          setState(function (prevState) {
            return _extends({}, prevState, {
              balance: balance,
              isLoading: false
            });
          });
        });
      }, function (err) {
        var errorMessage;

        if (err instanceof Error) {
          errorMessage = err.message;
        }

        if (typeof err === 'string') {
          errorMessage = err;
        }

        setState(function (prevState) {
          return _extends({}, prevState, {
            errorMessage: errorMessage
          });
        });
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  }, [address, contract]);
  React.useEffect(function () {
    refresh();
  }, [refresh]);
  return _extends({}, state, {
    refresh: refresh
  });
};

exports.Address = Address;
exports.ethereum = ethereum;
exports.useMetaMask = useMetaMask;
exports.useTokenBalance = useTokenBalance;
//# sourceMappingURL=index.js.map
