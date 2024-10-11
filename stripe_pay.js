const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51N5NLVSF2Mo4AGVvozBmb6d5td4kq0lexk43naVyOdmdzLoO4g8LLDsCFc7pT08pUjBesL0G95eP8Xv95kbOaRgU00qrTMpPnY');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

// Create Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { totalAmount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: 'inr',
      description: 'Spatula company',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment Intent:', paymentIntent);
    res.json({
      message: 'Payment intent created successfully',
      clientSecret: paymentIntent.client_secret,
      success: true,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      message: 'Failed to create payment intent',
      success: false,
    });
  }
});

const port = process.env.PORT || 8084;
app.listen(port, () => {
  console.log(`Stripe server listening on port ${port}`);
});
