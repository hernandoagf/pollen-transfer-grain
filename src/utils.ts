import { sourcecred } from 'sourcecred'
import { config } from 'dotenv'

config()

const storage = new sourcecred.ledger.storage.GithubStorage({
  apiToken: process.env.GITHUB_API_TOKEN,
  repo: process.env.REPO,
  branch: process.env.BRANCH
})

export const manager = new sourcecred.ledger.manager.LedgerManager({ storage })
