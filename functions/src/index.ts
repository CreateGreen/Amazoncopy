import {https} from "firebase-functions/v1"
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import {getdatabase,authservice,adminservice} from './database'


const app = express();
const stripe = new Stripe(
  "sk_test_51Lmt9qBvutsnmRE58thgs2GYka2whnvTdi7P19kpzGiz9qDMJVpelO1nUXaxksVqSSAcf7iv5yDwJMc8GcLOMIvg00JAGOrCzf",
  {
    apiVersion: "2022-08-01",
  }
);

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", async (req, res) => {
  const snapshot = await getdatabase("product");
  const productarr:any[] =[]
  if(!snapshot){
    res.status(404).send("No product data")
  }else{
    snapshot.docs.map((doc)=>{
      productarr.push(doc.data())
    })
    res.send(productarr)

  }
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

app.post("/login",async (req, res)=>{
  const Id = req.body.email;
  const Pw = req.body.pw;
  authservice.signInWithEmailAndPassword(Id,Pw).then((user)=>{
    adminservice.createCustomToken(user.user.uid).then((token)=>{
      res.send(token)
    })
  }).catch(err=>res.send(err))
})



export const api = https.onRequest(app);
