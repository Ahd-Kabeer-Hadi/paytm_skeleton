import Router, { Request, Response } from "express";
import { AuthMiddleWare } from "./middleware";
import { Account } from "../lib/db";
import { startSession } from "mongoose";
const AccountRouter = Router();

AccountRouter.get(
  "/balance",
  AuthMiddleWare,
  async (req: Request, res: Response) => {
    const account = await Account.findOne({
      userId: req.userId,
    });
    if (account) {
      res.json({
        balance: account.balance,
      });
    }
  }
);

AccountRouter.post(
  "/transfer",
  AuthMiddleWare,
  async (req: Request, res: Response) => {
    const session = await startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    const recieverBalance = toAccount.balance / 100;
    const payeeBalance = account.balance / 100;
    const creditAmount = ((recieverBalance + amount)*100).toFixed(0);
    const debitAmount = ((payeeBalance - amount) *100).toFixed(0);
      (await Account.updateOne(
        { userId: req.userId },
        {  balance: debitAmount } 
      ).session(session));
    await Account.updateOne(
      { userId: to },
      { balance: creditAmount } 
    ).session(session);

    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  }
);

export default AccountRouter;

// testcode
async function transfer(req: any) {
  const { amount, to } = req.body;
  const session = await startSession();
  session.startTransaction();
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    console.log("Insufficient balance");
    return;
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    console.log("Invalid account");
    return;
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  console.log("done");
}

// (async () => {
//     const promises = [];

//     // Define the number of concurrent hits
//     const numConcurrentHits = 10;

//     // Create an array of promises representing the concurrent hits
//     for (let i = 0; i < numConcurrentHits; i++) {
//       promises.push(
//         transfer({
//           userId: "65df4c5a889d034b10661a44",
//           body: {
//             to: "65df4c75889d034b10661a4a",
//             amount: 100,
//           },
//         })
//       );
//     }

//     // Await all concurrent hits to complete
//     await Promise.all(promises);
//   })();
