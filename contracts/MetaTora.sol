pragma solidity >=0.4.21 <0.6.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract MetaTora is ERC20, ERC20Detailed {

    mapping(bytes => bool) signatures;

    constructor(uint256 _supply) ERC20Detailed("Metatora", "MTTR", 18) public {
        _mint(msg.sender, _supply);
    }

    function transferPreSigned(
        bytes memory _signature,
        address _to,
        uint256 _value,
        uint256 _fee,
        uint256 _nonce
    ) public returns (bool) {
        require(_to != address(0));
        require(signatures[_signature] == false);

        bytes32 hashedTx = transferPreSignedHashing(address(this), _to, _value, _fee, _nonce);

        address from = recover(hashedTx, _signature);
        require(from != address(0));

        return true;
    }

    function transferPreSignedHashing(
        address _token,
        address _to,
        uint256 _value,
        uint256 _fee,
        uint256 _nonce
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(bytes4(0x48664c16), _token, _to, _value, _fee, _nonce));
    }

    // function _prefix(bytes32 _hash) internal pure returns (bytes32) {
    //     return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _hash));
    // }

    function recover(
        bytes32 hash,
        bytes memory sig
    ) public pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        if (sig.length != 65) {
            return (address(0));
        }

        /* solium-disable-next-line */
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            bytes memory prefix = "\x19Ethereum Signed Message:\n32";
            bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, hash));
            return ecrecover(prefixedHash, v, r, s);
        }
    }
}