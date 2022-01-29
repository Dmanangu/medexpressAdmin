import nc from "next-connect";
import { getAuth } from "firebase/auth";

const handler = nc();
handler.use(getAuth);
handler.get(async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

export default handler;
