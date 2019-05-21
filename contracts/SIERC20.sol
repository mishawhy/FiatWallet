pragma solidity ^0.5.0;

/**
 * @title Stable token ERC20 interface
 */
interface SIERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address who) external view returns (uint256);

  function allowance(address owner, address spender)
    external view returns (uint256);

  function transfer(address to, uint256 value) external returns (bool);

  function transferRef(address to, uint256 value, bytes32 ref) external returns (bool);

  function approve(address spender, uint256 value)
    external returns (bool);

  function burn(address account, uint256 value) external returns(bool);

  function withdraw(uint256 value) external returns(bool);

  function mint(address account, uint256 value) external returns(bool);

  function transferFrom(address from, address to, uint256 value, bytes32 ref)
    external returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value,
    uint256 fee,
    bytes32 ref
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}
