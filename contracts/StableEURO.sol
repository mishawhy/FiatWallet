pragma solidity ^0.5.0;
import "./StableERC20.sol";
import "./PassportInterface.sol";

contract StableEURO is StableERC20 {
    string public constant name = "StableEURO";
    string public constant symbol = "EURO";
    uint public constant decimals = 18;

    constructor(PassportInterface passport, address transferFeeWallet, address depositFeeWallet, address withdrawFeeWallet) public {
         _passport = passport;
         _transferFeeWallet = transferFeeWallet;
         _depositFeeWallet = depositFeeWallet;
         _withdrawFeeWallet = withdrawFeeWallet;
     }

}
