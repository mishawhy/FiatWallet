pragma solidity ^0.5.0;

contract PassportProvider {
  address public contractOwner;
  mapping (address => bool) public providers;

  constructor() internal {
    contractOwner = msg.sender;
    providers[msg.sender] = true;
  }

  modifier onlyContractOwner() {
    require(msg.sender == contractOwner);
    _;
  }

  modifier onlyProvider() {
    require(isProvider(msg.sender));
    _;
  }

  // Check if address is provider
  function isProvider(address provider) public view returns (bool) {
    return providers[provider] == true ? true : false;
  }

  // Add new issuer
  function addProvider(address newProvider) public onlyContractOwner returns (bool) {
    providers[newProvider] = true;
    return true;
  }

  // Delete issuer
  function deleteIssuer(address provider) public onlyContractOwner returns (bool) {
    providers[provider] = false;
    return true;
  }

  function transferOwnership(address newOwner) public onlyContractOwner {
    if (newOwner != address(0)) {
      contractOwner = newOwner;
    }
  }

}
