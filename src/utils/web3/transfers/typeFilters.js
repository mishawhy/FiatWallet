import {main_contract_address} from "../../../constant/ethereum";

class TypeFilters {
    constructor(address) {
        this.address = address;
        this.__types = {
            address: this.address
        };
    }

    __types = {};

    __filtering_types(type) {
        let __apply = {};
        switch (type) {
            case 'send':
                return {
                    from: this.address
                };
            case 'received':
                return {
                    to: this.address
                };
            case 'deposit':
                if(this.address !== main_contract_address) {
                    __apply = {
                        to: this.address
                    }
                }
                return {
                    ...__apply,
                    from: main_contract_address
                };
            case 'deposit-withdraw':
                return {
                    from: [main_contract_address, this.address],
                    to: [main_contract_address, this.address]
                };
            case 'withdraw':
                if(this.address !== main_contract_address) {
                    __apply = {
                        from: this.address
                    }
                }
                return {
                    ...__apply,
                    to: main_contract_address
                };
            default: {
                return {
                    address: this.address
                }
            }
        }
    }

    set_types(type) {
        this.__types = this.__filtering_types(type)
    }


    get() {
        return this.__types
    }
}

export default TypeFilters