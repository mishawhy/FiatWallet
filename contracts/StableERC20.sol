pragma solidity ^0.5.0;

import "./SIERC20.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./PassportInterface.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
/**
 * @title Stable token ERC20
 *
 */
contract StableERC20 is SIERC20, Ownable {

  using SafeMath for uint256;

  mapping (address => uint256) private _balances;

  mapping (address => mapping (address => uint256)) public _allowed;

  uint256 private _totalSupply;

  address public _transferFeeWallet;

  address public _depositFeeWallet;

  address public _withdrawFeeWallet;

  PassportInterface public _passport;


  struct Fee {
    uint8 transferFlex;
    uint256 transferFix;
    uint8 depositFlex;
    uint256 depositFix;
    uint8 withdrawFlex;
    uint256 withdrawFix;
  }

  mapping (uint32 => Fee) passportFees;

  // Set fees amount for pass
  function setDefaultFee(
    uint8 transferFlex,
    uint256 transferFix,
    uint8 depositFlex,
    uint256 depositFix,
    uint8 withdrawFlex,
    uint256 withdrawFix) public onlyOwner returns(bool) {
      passportFees[0x0].transferFlex = transferFlex;
      passportFees[0x0].transferFix = transferFix;
      passportFees[0x0].depositFlex = depositFlex;
      passportFees[0x0].depositFix = depositFix;
      passportFees[0x0].withdrawFlex = withdrawFlex;
      passportFees[0x0].withdrawFix = withdrawFix;
      return true;
  }

  // Set fees amount for pass
  function setPassportFee(
    uint32 pass,
    uint8 transferFlex,
    uint256 transferFix,
    uint8 depositFlex,
    uint256 depositFix,
    uint8 withdrawFlex,
    uint256 withdrawFix) public onlyOwner returns(bool) {
      passportFees[pass].transferFlex = transferFlex;
      passportFees[pass].transferFix = transferFix;
      passportFees[pass].depositFlex = depositFlex;
      passportFees[pass].depositFix = depositFix;
      passportFees[pass].withdrawFlex = withdrawFlex;
      passportFees[pass].withdrawFix = withdrawFix;
      return true;
  }

  // Get default fees
  function getDefaultFees() public view returns(uint8, uint256, uint8, uint256, uint8, uint256) {
    Fee memory fees = passportFees[0x0];
    return (fees.transferFlex, fees.transferFix, fees.depositFlex, fees.depositFix, fees.withdrawFlex, fees.withdrawFix);
  }
  // Get default fees
  function getFees(address payer) public view returns(uint8, uint256, uint8, uint256, uint8, uint256) {
    uint32 pass = _passport.get(payer);
    Fee memory fees = passportFees[pass];
    return (fees.transferFlex, fees.transferFix, fees.depositFlex, fees.depositFix, fees.withdrawFlex, fees.withdrawFix);
  }

  // Get default fees
  function getPassportFees(uint32 pass) public view returns(uint8, uint256, uint8, uint256, uint8, uint256) {
    Fee memory fees = passportFees[pass];
    return (fees.transferFlex, fees.transferFix, fees.depositFlex, fees.depositFix, fees.withdrawFlex, fees.withdrawFix);
  }


  // Get transfer fee by amount and payer
  function getTransferFee(address payer, uint256 amount) public view returns(uint256){
      uint32 pass = _passport.get(payer);
      uint256 passportFee = passportFees[pass].transferFix.add(amount.mul(passportFees[pass].transferFlex).div(1000));
      uint256 defaultFee = passportFees[0x0].transferFix.add(amount.mul(passportFees[0x0].transferFlex).div(1000));
      if (passportFee > 0){
        return passportFee;
      } else {
        return defaultFee;
      }
  }

  // Get deposit fee by amount and payer
  function getDepositFee(address payer, uint256 amount) public view returns(uint256){
      uint32 pass = _passport.get(payer);
      uint256 passportFee = passportFees[pass].depositFix.add(amount.mul(passportFees[pass].depositFlex).div(1000));
      uint256 defaultFee = passportFees[0x0].depositFix.add(amount.mul(passportFees[0x0].depositFlex).div(1000));
      if (passportFee > 0){
        return passportFee;
      } else {
        return defaultFee;
      }
  }

  // Get deposit fee by amount and payer
  function getWithdrawFee(address payer, uint256 amount) public view returns(uint256){
      uint32 pass = _passport.get(payer);
      uint256 passportFee = passportFees[pass].withdrawFix.add(amount.mul(passportFees[pass].withdrawFlex).div(1000));
      uint256 defaultFee = passportFees[0x0].withdrawFix.add(amount.mul(passportFees[0x0].withdrawFlex).div(1000));
      if (passportFee > 0){
        return passportFee;
      } else {
        return defaultFee;
      }
  }


  /**
  * @dev Total number of tokens in existence
  */
  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param owner The address to query the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address owner) public view returns (uint256) {
    return _balances[owner];
  }

  /**
   * @dev Function to check the amount of tokens that an owner allowed to a spender.
   * @param owner address The address which owns the funds.
   * @param spender address The address which will spend the funds.
   * @return A uint256 specifying the amount of tokens still available for the spender.
   */
  function allowance(
    address owner,
    address spender
   )
    public
    view
    returns (uint256)
  {
    return _allowed[owner][spender];
  }

  /**
  * @dev Transfer token for a specified address
  * @param to The address to transfer to.
  * @param value The amount to be transferred.
  */
  function transfer(address to, uint256 value) public returns (bool) {
    require(_passport.hasActive(to));
    _transfer(msg.sender, to, value, '');
    return true;
  }


  function transferRef(address to, uint256 value, bytes32 ref) public returns (bool) {
    require(_passport.hasActive(to));
    _transfer(msg.sender, to, value, ref);
    return true;
  }


  /**
  * @dev Mint tokens to account if address has pass
  */
  function mint(address account, uint256 value) public onlyOwner returns(bool){
    // require(_passport.hasActivePass(account));
    _mint(account, value);
  }



  /**
  * @dev Mint tokens to account if address has pass
  */
  function burn(address account, uint256 value) public onlyOwner returns(bool){
    // require(_passport.hasActivePass(account));
    _burn(account, value);
  }


  /**
  * @dev Mint tokens to account if address has pass
  */
  function withdraw(uint256 value) public returns(bool){
    // require(_passport.hasActivePass(account));
    _burn(msg.sender, value);
  }
  /**
   * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
   * Beware that changing an allowance with this method brings the risk that someone may use both the old
   * and the new allowance by unfortunate transaction ordering. One possible solution to mitigate this
   * race condition is to first reduce the spender's allowance to 0 and set the desired value afterwards:
   * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
   * @param spender The address which will spend the funds.
   * @param value The amount of tokens to be spent.
   */
  function approve(address spender, uint256 value) public returns (bool) {
    require(spender != address(0));

    _allowed[msg.sender][spender] = value;
    emit Approval(msg.sender, spender, value);
    return true;
  }

  /**
   * @dev Transfer tokens from one address to another
   * @param from address The address which you want to send tokens from
   * @param to address The address which you want to transfer to
   * @param value uint256 the amount of tokens to be transferred
   */
  function transferFrom(
    address from,
    address to,
    uint256 value,
    bytes32 ref
  )
    public
    returns (bool)
  {
    require(_passport.hasActive(to));
    require(value <= _allowed[from][msg.sender]);

    _allowed[from][msg.sender] = _allowed[from][msg.sender].sub(value);
    _transfer(from, to, value, ref);
    return true;
  }

  /**
   * @dev Increase the amount of tokens that an owner allowed to a spender.
   * approve should be called when allowed_[_spender] == 0. To increment
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param spender The address which will spend the funds.
   * @param addedValue The amount of tokens to increase the allowance by.
   */
  function increaseAllowance(
    address spender,
    uint256 addedValue
  )
    public
    returns (bool)
  {
    require(spender != address(0));

    _allowed[msg.sender][spender] = (
      _allowed[msg.sender][spender].add(addedValue));
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    return true;
  }

  /**
   * @dev Decrease the amount of tokens that an owner allowed to a spender.
   * approve should be called when allowed_[_spender] == 0. To decrement
   * allowed value is better to use this function to avoid 2 calls (and wait until
   * the first transaction is mined)
   * From MonolithDAO Token.sol
   * @param spender The address which will spend the funds.
   * @param subtractedValue The amount of tokens to decrease the allowance by.
   */
  function decreaseAllowance(
    address spender,
    uint256 subtractedValue
  )
    public
    returns (bool)
  {
    require(spender != address(0));

    _allowed[msg.sender][spender] = (
      _allowed[msg.sender][spender].sub(subtractedValue));
    emit Approval(msg.sender, spender, _allowed[msg.sender][spender]);
    return true;
  }

  /**
  * @dev Transfer token for a specified addresses
  * @param from The address to transfer from.
  * @param to The address to transfer to.
  * @param value The amount to be transferred.
  */
  function _transfer(address from, address to, uint256 value, bytes32 ref) internal {


    uint fee = getTransferFee(to, value);
    uint valueTotal = value + fee;

    require(valueTotal <= _balances[from]);
    require(to != address(0));



    _balances[from] = _balances[from].sub(value);
    _balances[to] = _balances[to].add(value);
    _balances[_transferFeeWallet] = _balances[_transferFeeWallet].add(fee);

    emit Transfer(from, to, value, fee, ref);
  }

  /**
   * @dev Internal function that mints an amount of the token and assigns it to
   * an account. This encapsulates the modification of balances such that the
   * proper events are emitted.
   * @param account The account that will receive the created tokens.
   * @param value The amount that will be created.
   */
  function _mint(address account, uint256 value) internal {
    require(account != address(0));

    uint fee = getDepositFee(account, value);
    uint valueToTransfer = value - fee;
    _totalSupply = _totalSupply.add(value);
    _balances[account] = _balances[account].add(valueToTransfer);
    _balances[_depositFeeWallet] = _balances[_depositFeeWallet].add(fee);
    emit Transfer(address(0), account, valueToTransfer, fee, '0x1');
  }

  /**
   * @dev Internal function that burns an amount of the token of a given
   * account.
   * @param account The account whose tokens will be burnt.
   * @param value The amount that will be burnt.
   */
  function _burn(address account, uint256 value) internal {
    uint fee = getWithdrawFee(account, value);
    uint valueTotal = value + fee;
    require(account != address(0));
    require(valueTotal <= _balances[account]);


    _totalSupply = _totalSupply.sub(value);
    _balances[account] = _balances[account].sub(valueTotal);
    _balances[_withdrawFeeWallet] = _balances[_withdrawFeeWallet].add(fee);
    emit Transfer(account, address(0), value, fee, '0x0');
  }

  /**
   * @dev Internal function that burns an amount of the token of a given
   * account, deducting from the sender's allowance for said account. Uses the
   * internal burn function.
   * @param account The account whose tokens will be burnt.
   * @param value The amount that will be burnt.
   */
  function _burnFrom(address account, uint256 value) internal {
    require(value <= _allowed[account][msg.sender]);

    // Should https://github.com/OpenZeppelin/zeppelin-solidity/issues/707 be accepted,
    // this function needs to emit an event with the updated approval.
    _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(
      value);
    _burn(account, value);
  }
}
