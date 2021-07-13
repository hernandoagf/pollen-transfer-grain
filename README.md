# pollen-transfer-grain

A script to automate the grain transfer process. It reads the `withdrawals.csv` file and transfers grain from those users identities to the burned-grain identity.

## Developer setup

### Install dependencies

`npm install`, `npm install -D`

### Add env variables

Copy the content of your `.env.sample` file into a new `.env` file and add the corresponding variables:

### Run the script!

- `npm start` will execute the script in production mode.
- `npm run dev` will execute the script with hot reloading.
