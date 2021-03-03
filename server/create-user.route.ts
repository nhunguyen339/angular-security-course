import { Request, Response } from "express";
import { db } from "./database";


export function createUser(request: Request, res: Response) {
  const credential = request.body;

  const user = db.createUse(credential.email, credential.password);
console.log(user)
  res.status(200).json({id: user.id, email: user.email})
}