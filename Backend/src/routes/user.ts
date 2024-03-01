import Router, { Request, Response } from "express";
import {
  JWT_SECRET,
  validateExistingUserProfileUpdate,
  validateSignin,
  validateSignup,
} from "../lib/validations";
import { Account, User } from "../lib/db";
import Jwt from "jsonwebtoken";
import { AuthMiddleWare } from "./middleware";
import { Types } from "mongoose";
const UserRouter = Router();

UserRouter.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  const { success } = validateSignup.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const isUserExists = await User.findOne({
    username: body.username,
  });

  if (isUserExists) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });
  const userId = user._id;
  if (userId) {
    const balance = await Account.create({
      userId,
      balance: (1 + Math.random() * 10000).toFixed(2).replace(".", ""),
    });
  }

  const token = Jwt.sign({ userId }, JWT_SECRET);
  return res.json({
    token,
        message: "User created successfully",
  });
});

UserRouter.post("/signin", async (req: Request, res: Response) => {
  const body = req.body;

  const { success } = validateSignin.safeParse(body);

  if (!success) {
    return res.status(411).send("Incorrect inputs");
  }
  const isUserExists = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (!isUserExists) {
    return res.status(411).send("Consider Signing up first");
  }
  const userId = isUserExists._id;

  const token = Jwt.sign({ userId }, JWT_SECRET);

  return res.json({
    token,
    userId,
    message: "logged in successful",
  });
});

UserRouter.get("/me", AuthMiddleWare, async (req: Request, res: Response) => {
  try {
    const currentUser = await User.aggregate([
      { $match: { _id: new Types.ObjectId(req.userId) } },
      {
        $lookup: {
          from: "accounts",
          localField: "_id",
          foreignField: "userId",
          as: "account",
        },
      },
      {
        $unwind: "$account",
      },
      { $project: {
        _id: 1,
        username: 1,
        firstName: 1,
        lastName: 1,
        balance : '$account.balance'
      } },
    ]);
    // await User.findById({ _id: req.userId }, { _id: true });
    if (currentUser) {
      return res.json({
        currentUser: currentUser[0],
      });
    }
  } catch (error) {
    res.send(500).json({ message: "signin/signup and try again", error });
  }
});

UserRouter.put("/", AuthMiddleWare, async (req: Request, res: Response) => {
  const { success } = validateExistingUserProfileUpdate.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }
  try {
    const result = await User.updateOne({ _id: req.userId }, req.body);

    if (!result.modifiedCount) {
      console.error("something happened while updating");
      return;
    }
    res.json({
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something happened",
    });
  }
});

UserRouter.get("/bulk", AuthMiddleWare, async (req: Request, res: Response) => {
  const filter = req.query.filter || "";
  const userId = req.userId;

  try {
    const Users = await User.find({
      $and: [
        {
          $or: [
            {
              firstName: {
                $regex: filter,
              },
            },
            {
              lastName: {
                $regex: filter,
              },
            },
          ],
        },
        { _id: { $ne: userId } },
      ],
    });

    if (!Users.length) {
      return res.status(200).json({
        message: "no user found",
      });
    }

    res.json({
      users: Users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    res.status(500).send({
      error,
      message: "something happened",
    });
  }
});

export default UserRouter;
