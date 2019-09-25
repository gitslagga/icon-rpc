const IconService = require('icon-sdk-js')

const Wallet  = IconService.IconWallet
const account = Wallet.create()
console.log("account address", account.getAddress())
console.log("account private key", account.getPrivateKey())
console.log("account public key", account.getPublicKey())

const provider = new IconService.HttpProvider('https://bicon.net.solidwallet.io/api/v3')
const iconService = new IconService(provider)
const { CallBuilder } = IconService.IconBuilder
const IconConverter = IconService.IconConverter
const IconValidator = IconService.IconValidator
const valid = IconValidator.isAddress(account.getAddress())
console.log("isAddress", valid)

async function unittest(){

    /* Get block information by block height */
    const block1 = await iconService.getBlockByHeight(1000).execute()
    console.log("getBlockByHeight", JSON.stringify(block1))

    /* Get block information by block hash */
    const block2 = await iconService.getBlockByHash('0xa4a3d122523e7d920df53331a083174eba1e2f79e41a3946e002bfd3eaa94b5c').execute()
    console.log("getBlockByHash", JSON.stringify(block2))

    /* Get latest block information */
    const block3 = await iconService.getLastBlock().execute()
    console.log("getLastBlock", JSON.stringify(block3))

    /* Returns the balance of a EOA address */
    const balance = await iconService.getBalance('hx6e1dd0d4432620778b54b2bbc21ac3df961adf89').execute()
    console.log("getBalance", IconConverter.toNumber(balance) / UnitMap.icx)
    
    /* Returns the total number of issued ICX. */
    const totalSupply = await iconService.getTotalSupply().execute()
    console.log("totalSupply", IconConverter.toNumber(totalSupply) / UnitMap.icx)

    // /* Returns information about a transaction requested by transaction hash */
    const txObj1 = await iconService.getTransaction('0x6ad6e1bd140bffa092148c60e22b90fe53ca30bb42b323f922682ca3d73ca996').execute()
    console.log("getTransaction", JSON.stringify(txObj1))

    /* Returns the result of a transaction by transaction hash */
    const txObj2 = await iconService.getTransactionResult('0x2fe5f2e0b883af122b0dee97e2b731da8bb383e0f0e11ccf59e1e8869b408c18').execute()
    console.log("getTransactionResult", JSON.stringify(txObj2))

    /* Generates a call instance using the CallBuilder */
    const callObj = new CallBuilder()
        .to('cxbb19278e1985bb70413261a23808cdf6f0a47752')
        .method('balanceOf')
        .params({ _owner: 'hx9e38aa832215951c285670818449e2b22bfb7e7e' })
        .build()

    /* Executes a call method to call a read-only API method on the SCORE immediately without creating a transaction on Loopchain */
    const result = await iconService.call(callObj).execute()
    console.log("call balanceOf", IconConverter.toNumber(result) / UnitMap.icx)
}

const UnitMap = {
	loop: '1',
	gloop: '1000000000',
	icx: '1000000000000000000',
}
unittest()