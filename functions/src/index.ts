import {https} from "firebase-functions/v1"
import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const stripe = new Stripe(
  "sk_test_51Lmt9qBvutsnmRE58thgs2GYka2whnvTdi7P19kpzGiz9qDMJVpelO1nUXaxksVqSSAcf7iv5yDwJMc8GcLOMIvg00JAGOrCzf",
  {
    apiVersion: "2022-08-01",
  }
);

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello");
});
app.post("/payments/create", async (req, res) => {
  const total = Number(req.query.total);

  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  console.log(paymentIntent.amount)
  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
});

export const api = https.onRequest(app);
