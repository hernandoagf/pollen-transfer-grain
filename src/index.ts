import { readFileSync } from "fs"

import { loadLedger } from "./utils"

const transferGrain = async () => {
  try {
    const ledger = await loadLedger()
    const withdrawalsData = readFileSync('./withdrawals.csv', 'utf-8')

    withdrawalsData
      .split('\n')
      .forEach(allocation => {
        const [user, amount] = allocation.split(', ')
        console.log(user, amount)
      })

    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

transferGrain()