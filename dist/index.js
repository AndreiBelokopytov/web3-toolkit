function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var MetaMaskOnboarding = _interopDefault(require('@metamask/onboarding'));

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

exports.Address = Address;
exports.ethereum = ethereum;
exports.useMetaMask = useMetaMask;
//# sourceMappingURL=index.js.map
