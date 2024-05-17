sdk:
1. token => new Token

interface:
1. state
    - user
        - tokens: 用户自定义添加的自定义token
        - userExpertMode 是否是expert模式，有没有Recipient
        - userDeadline 交易的最长持续时间
        - userSlippageTolerance 滑点比例
    - lists
        - selectedListUrl: 选中的token列表的url
        - byUrl： 
        ```
        {
            tokenlist.aave.eth: {
                current: 存储token的json,
                error: ……
                loadingRequestId: ……
            }
            ……
        }
        
        ```
    - wallet
        没有state，只有hooks
    - multicall
        - callListeners: 
        ```
            {
                1115111: {
                    [callKey]: {
                       blocksPerFetch: 1 // 累加
                    }
                }
                ……
            }
        ```
        - callResults
        ```
            callResults: {
                [chainId: number]: {
                    [callKey: string]: {
                        data?: string | null
                        blockNumber?: number
                        fetchingBlockNumber?: number
                    }
                }
            }
        ```
        - updater


    - application
        - blockNumber: 各个chainId的blockNumber
        - walletModalOpen： wallet弹窗的展示flag
        - popupList 要展示的弹窗列表


        - updater： 
        ```
            1. 当chainId、library……更改时，获取library.getBlockNumber()、更新state。
            2. 也可library.on('block', blockNumberCallback)监听，更新state。
        ```
    - swap
        - INPUT
        - OUTPUT
        - typedValue 输入的数值
        - recipient 交易接收者的地址
        - independentField   用户希望使用精确的 输入数值 还是 输出数值
    - transation
        - transactions
        ```
        chainId: {
            txHash: TransactionDetails
        }
        ```
        - updater
        因为交易是异步的，成功后的popup的提示
        1. 增加Transaction（更改链数据的交易）
        2. 监听application的blockNumber的更改，取出transations，过滤，更改transaction的状态，限制popup
        

2. hooks：（调用的有state文件夹下的hook）
    1. tokens
    - useAllTokens： 整合用户自定义添加的token + 默认token
    - useToken：返回new Token，allTokens没有的token，useSingleCallResult进行请求自定义token
    2. useContract：生成合约

3. components
    - Header
        - Web3Status
            - walletModal 钱包弹窗




npm包学习
1. @ethersproject/address
 - getAddress()： 是否是正确的address
 - getCreate2Address() create2获取合约地址
2. @ethersproject/contracts
 - new Contract： 生成合约
    - contract?.interface?.getFunction(methodName): 获取合约内的方法FunctionFragment。
    - contract?.interface?.encodeFunctionData: 生成callData
    - contract?/interface?.decodeFunctionResult
3. @ethersproject/strings
    - parseBytes32String：将bytes32转为string
4. @ethersproject/providers
    - Web3Provider 可以做ts声明
    ```
    useWeb3ReactCore<Web3Provider>()
    ```
5. @ethersproject/units
    - parerUnits 大单位转小单位
6. @ethersproject/solidity
    - pack
    - keccak256 
7. @ethersproject/abi
    - Interface 获取interface
    ```
    const PAIR_INTERFACE = new Interface(IUniswapV2PairABI)
    // 也可以getFunction、encodeFuntionData
    ```
    - FunctionFragment
6. @web3-react/core
    - useWeb3React 获取chainId、library, account ……
    - library.getSigner(account)
    - library.getBlockNumber()
    - library.on('block', blockNumberCallback)
    - library.getTransactionReceipt(hash)

1. react-redux
    - useDispatch 生成dispath
    - useSelector 获取state
2. @reduxjs/toolkit
    - createReducer 创建reducer
    - createAction 创建action

1. react-window
    - FixedSizeList 组件
2. react-router-dom
    - useLocation 获取search

1. jsbi
    - JSBI.BigInt()



用户流程
1. 添加token ✅
2. multicall、wallet（怎么获取余额）

sdk：
new Token
new Pair
new Trade
new Percent
Trade



滑点是用百分比表示的，它衡量了你的交易造成的价格偏移程度。滑点百分比越高，意味着交易执行时价格偏离预期价格的程度越大