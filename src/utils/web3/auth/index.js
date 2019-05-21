import moment from 'moment'
import Web3 from "web3";
import sigUtil from "eth-sig-util";
import {SIGN_MSG} from "@/constant/ethereum";

class Web3Auth {
    static __generate_sign() {
        const message = moment().utc().format('YYYY-MM-DD');
        const convMessage = window.web3.utils.toHex(message);
        const msgToSign = `${SIGN_MSG} ${convMessage}`;
        return window.web3.utils.toHex(msgToSign)
    }

    static sign_auth(address) {
        return new Promise((resolve) => {
            window.web3 = new Web3(web3.currentProvider);
            const toSign = Web3Auth.__generate_sign();
            window.web3.currentProvider.sendAsync(
                {
                    method: 'personal_sign',
                    params: [
                        toSign,
                        address
                    ],
                    from: address
                },
                (err, res) => {
                    const recovered = sigUtil.recoverPersonalSignature({
                        data: toSign,
                        sig: res.result
                    });
                    if (recovered === address.toLowerCase()) {
                        sessionStorage.setItem('sign', res.result);
                        resolve(res.result)
                    }
                });
        })
    }
}

export default Web3Auth