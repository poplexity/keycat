import { useCallback, useState, useEffect } from 'react';
import Peekaboo from 'pkbjs'

export const useTest = (network) => {
  const [account, setAccount] = useState(null)
  const [txs, setTxs] = useState([])

  const signin = useCallback(async () => {
    const pkb = new Peekaboo({ network })
    const { account } = await pkb.signin()
    setAccount(account)
  }, [network])

  const transact = useCallback(async () => {
    const pkb = new Peekaboo({ network })
    const payload = {
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        data: {
          from: account,
          to: 'ivote4eosusa',
          quantity: `0.0001 EOS`,
          memo: ``,
        }
      }]
    }

    const { transaction_id: id } = await pkb.transact(account, payload)
    setTxs([...txs, id])
  }, [account, txs])

  useEffect(() => {
    signin()
  }, [network])

  return {
    signin,
    account,
    transact,
    receipts: txs,
  }
}