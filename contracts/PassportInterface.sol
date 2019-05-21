pragma solidity ^0.5.0;

/**
 * @title Passport interface
 */
interface PassportInterface {

  function hasActive(address owner) external view returns (bool);

  function get(address owner) external view returns (uint32);

  function isOwner(uint32 pass, address owner) external view returns(bool);

  function getOwner(uint32 pass) external view returns(address);

  function isActive(uint32 pass) external view returns(bool);

  function isProvider(address account) external view returns(bool);

  function grantProvider(address account) external  returns(bool);

  function issue(address account, uint32 pass, uint8 passtype) external returns(bool);

  function deactivatePass(uint32 pass) external returns(bool);

  function deletePass(address account, uint32 pass) external returns(bool);

  function delegatePass(address account, uint32 pass) external returns(bool);

  function activatePass(uint32 pass) external returns(bool);

  event PassportIssue(
    uint32 indexed pass,
    address indexed owner,
    uint256 typepass
  );


  event PassportDelegate(
     uint32 indexed pass,
     address indexed to
  );

}
