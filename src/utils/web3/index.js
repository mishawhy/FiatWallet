import Transfers from './transfers'
import Web3Auth from './auth'
import Movements from './movements/movements'
import Passport from './passport/passport'

export const getTransactions = Transfers.get_transactions
export const sendTransfer = Movements.send
export const getFee = Movements.get_fee
export const getFeesByAddress = Movements.get_fee_by_address
export const setFeesToAddress = Movements.set_fee_to_address
export const issue = Movements.issue
export const burn = Movements.burn
export const withdraw = Movements.withdraw
export const getBalance = Transfers.get_balance
export const getTotalBalance = Transfers.get_total_balance
export const sign = Web3Auth.sign_auth

// Passport
export const issuePass = Passport.issuePass
export const isProvider = Passport.isProvider

export const exportCsv = Transfers.export_csv
