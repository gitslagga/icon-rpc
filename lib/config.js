const configs = {
    'testdapps': {
        Name: 'Yeouido',
        Node: 'https://bicon.net.solidwallet.io',
        ApiEndpoint: 'https://bicon.net.solidwallet.io/api/v3',
        NetworkID: '3',
        Tracker: 'https://bicon.tracker.solidwallet.io',
        UnitIcx: '1000000000000000000',
        None: 1,
        Version: '3',
        TxFee: 0.005,
        GOVERNANCE_ADDRESS: 'cx0000000000000000000000000000000000000001',
        SCORE_INSTALL_ADDRESS: 'cx0000000000000000000000000000000000000000',
        DingToken: 'b0491e394d0f1c0603ea0fab115d85c99199d183379a9d937a80c62e47f4996c'
    },
    'testexchanges': {
        Name: 'Euljiro',
        Node: 'https://test-ctz.solidwallet.io',
        ApiEndpoint: 'https://test-ctz.solidwallet.io/api/v3',
        NetworkID: 2,
        Tracker: 'https://trackerdev.icon.foundation',
        UnitIcx: '1000000000000000000',
        None: 1,
        Version: '3',
        TxFee: 0.005,
        GOVERNANCE_ADDRESS: 'cx0000000000000000000000000000000000000001',
        SCORE_INSTALL_ADDRESS: 'cx0000000000000000000000000000000000000000',
        DingToken: 'b0491e394d0f1c0603ea0fab115d85c99199d183379a9d937a80c62e47f4996c'
    },
    'mainnet': {
        Name: 'Mainnet',
        Node: 'https://ctz.solidwallet.io',
        ApiEndpoint: 'https://ctz.solidwallet.io/api/v3',
        NetworkID: 1,
        Tracker: 'https://tracker.icon.foundation',
        UnitIcx: '1000000000000000000',
        None: 1,
        Version: '3',
        TxFee: 0.005,
        GOVERNANCE_ADDRESS: 'cx0000000000000000000000000000000000000001',
        SCORE_INSTALL_ADDRESS: 'cx0000000000000000000000000000000000000000',
        DingToken: 'b0491e394d0f1c0603ea0fab115d85c99199d183379a9d937a80c62e47f4996c'
    },
    'production': {
        Name: 'production',
        Node: 'http://127.0.0.1:9000',
        ApiEndpoint: 'http://127.0.0.1:9000/api/v3',
        NetworkID: 1,
        Tracker: 'https://tracker.icon.foundation',
        UnitIcx: '1000000000000000000',
        None: 1,
        Version: '3',
        TxFee: 0.005,
        GOVERNANCE_ADDRESS: 'cx0000000000000000000000000000000000000001',
        SCORE_INSTALL_ADDRESS: 'cx0000000000000000000000000000000000000000',
        DingToken: 'b0491e394d0f1c0603ea0fab115d85c99199d183379a9d937a80c62e47f4996c'
    }
}

const config = configs[process.env.NODE_ENV]
module.exports = config