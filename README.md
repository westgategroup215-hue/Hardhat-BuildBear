# Hardhat x BuildBear

**Hardhat x BuildBear** lets you create your own private testnet, (optional) forked from the mainnet, with your own Native and ERC20 Token faucet and blockchain Explorer.

# 🐻 Features of Hardhat x [ BuildBear](https://buildbear.io)

## Create your Private Testnet

![image](createTestnet.png)

## Use your personal Native & ERC20 Token Faucet

![image](faucet.jpeg)

## Use your personal Explorer with built-in Transaction Trace

![image](explorer.jpeg)

# 🏄‍♂️ Quick Start

> 1️⃣ Clone/fork Hardhat x Buildbear:

```bash
git clone https://github.com/BuildBearLabs/Hardhat-BuildBear.git
```

> 2️⃣ Install dependencies 

```bash
cd Hardhat-BuildBear
npm install
```

> 3️⃣ Create your private testnet (forked from the mainnet):

```bash
npm run createTestnet
```

Once the Testnet is live, its RPC, Explorer and Faucet details are added to the `testnet.json` file

> ⚠️ To deploy to Ethereum mainnet, set these environment variables first:
>
> ```bash
> export MAINNET_RPC_URL="https://mainnet.infura.io/v3/<your_key>"
> export PRIVATE_KEY="0x..."
> ```

> 4️⃣ Create a purse wallet to receive tokens

```bash
npm run init-wallet
```

This creates a `wallet-config.json` file with your purse wallet address and private key. All deploy-and-mint scripts will send tokens to this wallet by default.

> 5️⃣ To Deploy the `Greeter.sol` smart contract

```bash
npx hardhat run scripts/deploy-greeter.js
```

> 6️⃣ To deploy mainnet-style stable coins (USDC, USDT, USD)

```bash
npm run deploy-usdc-usdt-usd
```

> 7️⃣ To deploy and mint all three stable tokens (USDC, USDT, USD) in one step

```bash
npm run deploy-and-mint-stable -- <amount|max>
```

> 8️⃣ To deploy and mint USDC only

```bash
npm run deploy-and-mint-usdc -- <amount|max>
```

> 9️⃣ To deploy and mint USDT only

```bash
npm run deploy-and-mint-usdt -- <amount|max>
```

> 🔟 To deploy and mint USD only

```bash
npm run deploy-and-mint-usd -- <amount|max>
```

**To send to an optional recipient instead of your purse wallet:**

```bash
npm run deploy-and-mint-usdc -- 0xRecipientAddress <amount|max>
```

> 1️⃣1️⃣ To mint a specific amount of stable tokens to an existing contract

```bash
npm run mint-stable -- <CONTRACT_ADDRESS> [recipient] [amount]
```

> 1️⃣2️⃣ To mint the maximum possible amount and save run metadata

```bash
npm run mint-max-stable -- <CONTRACT_ADDRESS> [recipient] [amount|max]
```

> 1️⃣3️⃣ To Run the Test script `Greeter-Test.js`

```bash
npx hardhat test
```



# 🔭 Learning Resources 

-  [Getting to know Solidity](https://www.buildbear.io/resources/guides-and-tutorials/Solidity)
-  [Building a Decentralized NFT Marketplace ](https://www.buildbear.io/resources/guides-and-tutorials/Building_a_Decentralized_NFT_Marketplace)
-  [Build your own Decentralized Exchange](https://www.buildbear.io/resources/guides-and-tutorials/Build_your_own_Decentralized_Exchange)
-  [Build Your Own Decentralized Lending Protocol](https://www.buildbear.io/resources/guides-and-tutorials/Build_Your_Own_Decentralized_Lending_Protocol)
-  [Learn and deploy an ERC 1155 smart contract ](https://www.buildbear.io/resources/guides-and-tutorials/Learn_and_deploy_an_ERC_1155_smart_contract)
-  [Learn how to Code a Decentralised Hotel Booking System Smart Contract](https://www.buildbear.io/resources/guides-and-tutorials/Learn_how_to_Code_a_Decentralised_Hotel_Booking_System_Smart_Contract)
-  [Building an NFT Lottery: Step-by-Step Guide for Creating a Smart Contract and Frontend](https://www.buildbear.io/resources/guides-and-tutorials/Building_an_NFT_Lottery)



# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/Web3_dApp_Developers)
