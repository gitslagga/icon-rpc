const IconService = require('icon-sdk-js')
const BigNumber = require('bignumber.js')

/****************************** IconWallet Account ***********************************/
const IconWallet  = IconService.IconWallet
const IconValidator = IconService.IconValidator
function createRecoverWallet() {
    const account = IconWallet.create()
    console.log("address privateKey publicKey")
    console.log(account.getAddress(), account.getPrivateKey(), account.getPublicKey())

    const walletLoadedByPrivateKey = IconWallet.loadPrivateKey(account.getPrivateKey())
    console.log("address privateKey publicKey")
    console.log(walletLoadedByPrivateKey.getAddress(), walletLoadedByPrivateKey.getPrivateKey(), walletLoadedByPrivateKey.getPublicKey())

    const keystoreFile = walletLoadedByPrivateKey.store('qwer1234!');
    const password = 'qwer1234!';
    const walletLoadedByKeyStore = IconWallet.loadKeystore(keystoreFile, password)
    console.log("address privateKey publicKey")
    console.log(walletLoadedByKeyStore.getAddress(), walletLoadedByKeyStore.getPrivateKey(), walletLoadedByKeyStore.getPublicKey())

    const valid = IconValidator.isAddress(account.getAddress())
    console.log("isAddress", valid)
}

// address privateKey publicKey
// hxa0da51da14475cf1eafde27e394b13d26eb869f0 f0481392b9f0cbf0c2c07c9fa9c41cf88e72260fdbbd26c66c25eb57d1f96234 6d136c3d10b201311634a5271ed1e739ae064df0a262ac1c2c3f8bd5895608359a9ca037cda16533605507e55af5bb06fc514fbaf6a286eb97a4266132a95bc7
// address privateKey publicKey
// hxa0da51da14475cf1eafde27e394b13d26eb869f0 f0481392b9f0cbf0c2c07c9fa9c41cf88e72260fdbbd26c66c25eb57d1f96234 6d136c3d10b201311634a5271ed1e739ae064df0a262ac1c2c3f8bd5895608359a9ca037cda16533605507e55af5bb06fc514fbaf6a286eb97a4266132a95bc7
// address privateKey publicKey
// hxa0da51da14475cf1eafde27e394b13d26eb869f0 f0481392b9f0cbf0c2c07c9fa9c41cf88e72260fdbbd26c66c25eb57d1f96234 6d136c3d10b201311634a5271ed1e739ae064df0a262ac1c2c3f8bd5895608359a9ca037cda16533605507e55af5bb06fc514fbaf6a286eb97a4266132a95bc7
// isAddress true

/****************************** IconService BlockBalanceTransaction ***********************************/
const provider = new IconService.HttpProvider('https://bicon.net.solidwallet.io/api/v3')
const iconService = new IconService(provider)
const { CallBuilder, IcxTransactionBuilder } = IconService.IconBuilder
const IconConverter = IconService.IconConverter
const IconAmount = IconService.IconAmount

async function getBlockBalanceTransaction(){
    const rate = 1000000000000000000

    const block1 = await iconService.getBlockByHeight(1000).execute()
    console.log("getBlockByHeight", JSON.stringify(block1))

    const block2 = await iconService.getBlockByHash('0xa4a3d122523e7d920df53331a083174eba1e2f79e41a3946e002bfd3eaa94b5c').execute()
    console.log("getBlockByHash", JSON.stringify(block2))

    const block3 = await iconService.getLastBlock().execute()
    console.log("getLastBlock", JSON.stringify(block3))

    const balance = await iconService.getBalance('hx6e1dd0d4432620778b54b2bbc21ac3df961adf89').execute()
    console.log("getBalance", balance.toFixed() / rate)
    
    const totalSupply = await iconService.getTotalSupply().execute()
    console.log("totalSupply", IconConverter.toNumber(totalSupply) / rate)

    /* Need to check txObj1.status */
    const txObj1 = await iconService.getTransactionResult('0x2fe5f2e0b883af122b0dee97e2b731da8bb383e0f0e11ccf59e1e8869b408c18').execute()
    console.log("getTransactionResult", JSON.stringify(txObj1))

    /* Need to check txObj2.to and txObj2.value */
    const txObj2 = await iconService.getTransaction('0xf92274fb473d633b99bbf7c901618c3288a22808356d3eb28b2ea22880ed3eac').execute()
    console.log("getTransaction", JSON.stringify(txObj2))

    const callObj = new CallBuilder()
        .to('cxbb19278e1985bb70413261a23808cdf6f0a47752')
        .method('balanceOf')
        .params({ _owner: 'hx9e38aa832215951c285670818449e2b22bfb7e7e' })
        .build()

    const result = await iconService.call(callObj).execute()
    console.log("call balanceOf", IconConverter.toNumber(result) / rate)
}

// getBlockByHeight {"height":1000,"blockHash":"0xa4a3d122523e7d920df53331a083174eba1e2f79e41a3946e002bfd3eaa94b5c","merkleTreeRootHash":"0x0a7372d67ecfe9aff987d5951ec3b0f3a654cb8a18df299ebe9fb3b49b62d6ee","prevBlockHash":"0xcfb57d71dc9348ddfdc7f6ec7f06a97b1338de0d25e112aa7da061d7ad230c01","peerId":"hxf64fc9c20c4a5b8c59e999405fbc941a96bc2c00","confirmedTransactionList":[{"version":"3","from":"hx3938461680520062e9fe7e46288d6b74a8682ce7","to":"cx3d85fc30097cb8b18eb52de927b444833c690705","value":"NaN","stepLimit":"100000000","timestamp":1538110559606000,"nid":"3","nonce":"5","txHash":"0x0a7372d67ecfe9aff987d5951ec3b0f3a654cb8a18df299ebe9fb3b49b62d6ee","signature":"dCxhIhAH0ps5xv/n57/m7JWYeZ83hrlmT2f0XtB4Tz4Y4hF2w16YmLwKglCrBVkIzA4m+C4fJddpD+p30YggMQA=","dataType":"call","data":{"method":"approve","params":{"_spender":"hxf6ccadc18a4f4902e03b8fced09dd8cfdac2e005","_value":"0x8ac7230489e80000"}}}],"signature":"lh6UStW+osYiu7kG1XzFBwD0Dto3l/HIM2X3P5zwpjxqbZdn8SWbHyVjXrl0pjUuAvEY/FQ0CKeK57+SgVH4tgE=","timeStamp":1538110560097588,"version":"0.1a"}
// getBlockByHash {"height":1000,"blockHash":"0xa4a3d122523e7d920df53331a083174eba1e2f79e41a3946e002bfd3eaa94b5c","merkleTreeRootHash":"0x0a7372d67ecfe9aff987d5951ec3b0f3a654cb8a18df299ebe9fb3b49b62d6ee","prevBlockHash":"0xcfb57d71dc9348ddfdc7f6ec7f06a97b1338de0d25e112aa7da061d7ad230c01","peerId":"hxf64fc9c20c4a5b8c59e999405fbc941a96bc2c00","confirmedTransactionList":[{"version":"3","from":"hx3938461680520062e9fe7e46288d6b74a8682ce7","to":"cx3d85fc30097cb8b18eb52de927b444833c690705","value":"NaN","stepLimit":"100000000","timestamp":1538110559606000,"nid":"3","nonce":"5","txHash":"0x0a7372d67ecfe9aff987d5951ec3b0f3a654cb8a18df299ebe9fb3b49b62d6ee","signature":"dCxhIhAH0ps5xv/n57/m7JWYeZ83hrlmT2f0XtB4Tz4Y4hF2w16YmLwKglCrBVkIzA4m+C4fJddpD+p30YggMQA=","dataType":"call","data":{"method":"approve","params":{"_spender":"hxf6ccadc18a4f4902e03b8fced09dd8cfdac2e005","_value":"0x8ac7230489e80000"}}}],"signature":"lh6UStW+osYiu7kG1XzFBwD0Dto3l/HIM2X3P5zwpjxqbZdn8SWbHyVjXrl0pjUuAvEY/FQ0CKeK57+SgVH4tgE=","timeStamp":1538110560097588,"version":"0.1a"}
// getLastBlock {"height":3820586,"blockHash":"0x4fb886b4751ac671a782980514b4f6e469e21d78474f86ab12febdb5c316ca43","merkleTreeRootHash":"0x0000000000000000000000000000000000000000000000000000000000000000","prevBlockHash":"0x0caee03cc9b1881f69ab7f386a641e03f77c5998c540d071523c320edf167c9a","peerId":"hxec79e9c1c882632688f8c8f9a07832bcabe8be8f","confirmedTransactionList":[],"signature":"9XuEwyuJVZ7D6EZAYHwqR4x/I0gEMnlq2dkDYGM8txUrNI7dfAGBeVIvlJungwwI+rKnN6L/WryaCusbMNR58wE=","timeStamp":1569428653067099,"version":"0.1a"}
// getBalance 790259926.3232704
// totalSupply 1600920000
// getTransactionResult {"status":0,"to":"cx0000000000000000000000000000000000000001","txHash":"0x2fe5f2e0b883af122b0dee97e2b731da8bb383e0f0e11ccf59e1e8869b408c18","txIndex":0,"blockHeight":20595,"blockHash":"0x911cb3160c85e89e934e09d7b01576759dcc1a68ef3427ef394989ecb77c85d5","cumulativeStepUsed":"50331648","stepUsed":"50331648","stepPrice":"10000000000","eventLogs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","failure":{"code":"0x7d64","message":"Out of step: contractUpdate"}}
// getTransaction {"version":"3","from":"hx4319b60909e402c8499c6407afdd462471b268fe","to":"hx42415d1a4b3b885120bd305ad3150c0b4118848f","value":"1000000000000000000","stepLimit":"200000","timestamp":1569427939330000,"nid":"3","nonce":"1","txHash":"0xf92274fb473d633b99bbf7c901618c3288a22808356d3eb28b2ea22880ed3eac","txIndex":0,"blockHeight":3820230,"blockHash":"0x81cb3b8f411447a99fe21428ea96565e2742bca3f4450984a1d985bf20e0bbc7","signature":"R9mJV38UXiPUOHJ7/IJP6XGjLiOQ7qfukIwUU3O3AVd2u9axhHfIaH9HQcAgGf1X+JZ+WoCtJVOp6reC88dTtwE="}
// call balanceOf 440.3333333333333

/****************************** IconWallet Account ***********************************/
const SignedTransaction = IconService.SignedTransaction
async function getDefaultStepCost() {
    const GOVERNANCE_ADDRESS = 'cx0000000000000000000000000000000000000001'
    const governanceApi = await iconService.getScoreApi(GOVERNANCE_ADDRESS).execute()
    console.log("getScoreApi", JSON.stringify(governanceApi))
    const methodName = 'getStepCosts'

    const callBuilder = new CallBuilder()
    const call = callBuilder
        .to(GOVERNANCE_ADDRESS)
        .method(methodName)
        .build()
    const stepCosts = await iconService.call(call).execute()
    return IconConverter.toBigNumber(stepCosts.default).times(2)
}

async function sendTransaction(privateKey, toAddress) {
    const wallet = IconWallet.loadPrivateKey(privateKey)
    const walletAddress = wallet.getAddress()

    // 1 ICX -> 1000000000000000000 conversion
    const value = IconAmount.of(1, IconAmount.Unit.ICX).toLoop()
    console.log("IconAmount of toLoop", JSON.stringify(value))
    
    const networkId = new BigNumber("3")
    const nonce = IconConverter.toBigNumber(1)
    const version = new BigNumber("3")
    const stepLimit = await getDefaultStepCost()
    const timestamp = (new Date()).getTime() * 1000

    const icxTransactionBuilder = new IcxTransactionBuilder()
    const transaction = icxTransactionBuilder
    .nid(networkId)
    .nonce(nonce)
    .from(walletAddress)
    .to(toAddress)
    .value(value)
    .version(version)
    .stepLimit(stepLimit)
    .timestamp(timestamp)
    .build()

    const signedTransaction = new SignedTransaction(transaction, wallet)
    const txHash = await iconService.sendTransaction(signedTransaction).execute()
    console.log("sendTransaction txHash", txHash)
}

// IconAmount of toLoop "1000000000000000000"
// getScoreApi {}
// sendTransaction txHash 0x2b7b43f1915d02a52403dfcb86eafd909a8a75f6ebfdd253e0ffabbba175f41d

async function UnitTest() {
    createRecoverWallet()

    await getBlockBalanceTransaction()
    
    await sendTransaction('fdff21ccfcc3fa140e8bfc50dd960b0d119cb416f4c4cd1ae1909607cbacd146', 'hx42415d1a4b3b885120bd305ad3150c0b4118848f')
}

UnitTest()