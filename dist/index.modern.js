import React, { useRef, useState, useCallback, useEffect } from 'react';
import MetaMaskOnboarding from '@metamask/onboarding';

var DEFAULT_SUBSTRING_LENGTH = 6;
var Address = React.memo(function (_ref) {
  var address = _ref.children,
      substrLength = _ref.substrLength;
  return React.createElement("span", null, shortenAddress(address, substrLength));
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

var MetaMaskOnboardingStatus;

(function (MetaMaskOnboardingStatus) {
  MetaMaskOnboardingStatus["notInstalled"] = "notInstalled";
  MetaMaskOnboardingStatus["notConnected"] = "notConnected";
  MetaMaskOnboardingStatus["onboarding"] = "onboarding";
  MetaMaskOnboardingStatus["connecting"] = "connecting";
  MetaMaskOnboardingStatus["connected"] = "connected";
})(MetaMaskOnboardingStatus || (MetaMaskOnboardingStatus = {}));

var ethereum = window.ethereum;

function useMetaMask() {
  var metaMaskOnboarding = useRef(new MetaMaskOnboarding());
  var initialStatus = MetaMaskOnboarding.isMetaMaskInstalled() ? MetaMaskOnboardingStatus.notConnected : MetaMaskOnboardingStatus.notInstalled;

  var _useState = useState({
    status: initialStatus,
    accounts: []
  }),
      onboardingState = _useState[0],
      setOnboardingState = _useState[1];

  var handleAccountsChanded = useCallback(function (accounts) {
    var _metaMaskOnboarding$c;

    setOnboardingState({
      status: MetaMaskOnboardingStatus.connected,
      accounts: accounts
    });
    (_metaMaskOnboarding$c = metaMaskOnboarding.current) === null || _metaMaskOnboarding$c === void 0 ? void 0 : _metaMaskOnboarding$c.stopOnboarding();
  }, []);
  useEffect(function () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      ethereum.on('accountsChanged', handleAccountsChanded);
    }

    return function () {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        ethereum.removeListener('accountsChanged', handleAccountsChanded);
      }
    };
  }, [handleAccountsChanded]);
  var connect = useCallback(function () {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setOnboardingState({
        status: MetaMaskOnboardingStatus.connecting,
        accounts: []
      });
      ethereum.request({
        method: 'eth_requestAccounts'
      }).then(handleAccountsChanded);
    } else {
      var _metaMaskOnboarding$c2;

      setOnboardingState({
        status: MetaMaskOnboardingStatus.onboarding,
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

export { Address, MetaMaskOnboardingStatus, ethereum, useMetaMask };
//# sourceMappingURL=index.modern.js.map
