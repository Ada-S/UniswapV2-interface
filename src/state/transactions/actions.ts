import { createAction } from '@reduxjs/toolkit'
import { ChainId } from 'sepolia-sdk-adas'

export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

// 添加
export const addTransaction = createAction<{
  chainId: ChainId
  hash: string
  from: string
  approval?: { tokenAddress: string; spender: string }
  summary?: string
}>('transactions/addTransaction')
// 
export const clearAllTransactions = createAction<{ chainId: ChainId }>('transactions/clearAllTransactions')
// 确认交易
export const finalizeTransaction = createAction<{
  chainId: ChainId
  hash: string
  receipt: SerializableTransactionReceipt
}>('transactions/finalizeTransaction')
// 监听交易结果
export const checkedTransaction = createAction<{
  chainId: ChainId
  hash: string
  blockNumber: number
}>('transactions/checkedTransaction')
