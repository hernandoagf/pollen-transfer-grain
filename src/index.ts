import { readFileSync } from "fs"

import { manager } from './utils'

const transferGrain = async () => {
  try {
    await manager.reloadLedger()
    const ledger = manager.ledger
    const withdrawalsData = readFileSync('./withdrawals.csv', 'utf-8')

    withdrawalsData
      .split('\n')
      .slice(1)
      .forEach(allocation => {
        const [user, amount] = allocation.split(/\t/)
        const userAccount = ledger.accountByName(user)
        const burnedGrainId = ledger.accountByName('burned-grain').identity.id

        // In case of account inactive error, activates account
        // if (userAccount.identity.id === "bKydXCrVafY0IpGebvlDvg" || userAccount.identity.id === "DPH6opYvu5iWoBnf0dUWBQ") {
        //   ledger.activate(userAccount.identity.id)
        //   console.log(`\nActivated ledger account for user ${userAccount.identity.name}`)
        // }

        ledger.transferGrain({
          from: userAccount.identity.id,
          to: burnedGrainId,
          amount: (+amount * 1e18).toString(),
          memo: null
        })

        console.log(`Burned ${amount} HNY from user ${user}, remaining balance: ${(+userAccount.balance * 1e-18).toFixed(4)} HNY`)

        // Re-deactivates account if it was activated due to account inactive error
        // if (userAccount.identity.id === "bKydXCrVafY0IpGebvlDvg" || userAccount.identity.id === "DPH6opYvu5iWoBnf0dUWBQ") {
        //   ledger.deactivate(userAccount.identity.id)
        //   console.log(`Deactivated ledger account for user ${userAccount.identity.name}\n`)
        // }
      })

      // Commit modified ledger
      const persistRes = await manager.persist()
  
    if(persistRes.error) console.log(
      `\nAn error occurred when trying to commit the new ledger: ${persistRes.error}`
    )
    else console.log('\nAccounts successfully modified')

    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

transferGrain()