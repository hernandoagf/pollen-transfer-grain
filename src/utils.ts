import { sourcecred } from 'sourcecred'
import { config } from 'dotenv'
import fetch from 'node-fetch'

config()

export const loadLedger = async (): Promise<any> => {
  try {
    const ledgerFileURI = process.env.REPO_AND_BRANCH + 'data/ledger.json'
    const ledgerFileResponse = await fetch(ledgerFileURI);

    if (!ledgerFileResponse.ok)
      throw new Error(`An error has occurred: ${ledgerFileResponse.status}`)

    const ledgerRaw = await ledgerFileResponse.text()
    return sourcecred.ledger.ledger.Ledger.parse(ledgerRaw)
  } catch (err) {
    console.log(err)
    return null
  }
}