pragma solidity ^0.5.0;
import "./PassportInterface.sol";
// import "./PassportProvider.sol";
import "./Ownable.sol";


contract SkylarkPassport is PassportInterface, Ownable {

    struct Passport {
      uint8 passtype;
      address owner;
      bool active;
    }

    mapping (address => uint32) balances;
    mapping (uint32 => Passport) passport;
    mapping (address => bool) provider;

    constructor() public {
      provider[msg.sender] = true;
    }

    modifier onlyProvider(){
      require(isProvider(msg.sender));
      _;
    }

    // Grant provider role to account
    function grantProvider(address account) public onlyOwner returns(bool){
      provider[account] = true;
      return true;
    }

    // Deactivate provider account
    function deactivateProvider(address account) public onlyOwner returns(bool){
      provider[account] = false;
      return true;
    }

    // Check if address isProvider
    function isProvider(address account) public view returns(bool){
      return provider[account];
    }
    // Check if passport isActive
    function isActive(uint32 pass) public view returns(bool){
      return passport[pass].active;
    }
    // Check if address have an passport
    function hasActive(address account) public view returns(bool) {
      return isActive(balances[account]) == true ? true : false;
    }

    // Get passport owner
    function getOwner(uint32 pass) public view returns(address) {
      return passport[pass].owner;
    }

    // Get passport by address
    function get(address account) public view returns(uint32) {
       return balances[account];
    }

    // Check if address is pass owner
    function isOwner(uint32 pass, address owner) public view returns(bool) {
      if (passport[pass].owner == owner){
        return true;
      } else {
        return false;
      }
    }

    // Delegate passport to account
    function delegatePass(address account, uint32 pass) public returns(bool) {
      require(isOwner(pass, msg.sender));
      require(!hasActive(account));
      balances[account] = pass;
      return true;
    }

    // Delete delegated passport from account
    function deletePass(address account, uint32 pass) public returns(bool) {
      require(isOwner(pass, msg.sender));
      require(!hasActive(account));
      delete balances[account];
      emit PassportDelegate(pass, account);
      return true;
    }

    // Deactivate passport
    function deactivatePass(uint32 pass) public returns(bool) {
      require(isOwner(pass, msg.sender) || isProvider(msg.sender));
      require(hasActive(msg.sender));
      passport[pass].active = false;
      return true;
    }

    // Activate passport
    function activatePass(uint32 pass) public onlyProvider returns(bool) {
      passport[pass].active = true;
      return true;
    }

    // Issue passport to account
    function issue(address account, uint32 pass, uint8 passtype) public onlyProvider returns(bool) {
      passport[pass].passtype = passtype;
      passport[pass].active = true;
      passport[pass].owner = account;
      balances[account] = pass;
      emit PassportIssue(pass, account, passtype);
      return true;
    }

}
