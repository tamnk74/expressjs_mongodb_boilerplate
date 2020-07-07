import Stripe from 'stripe';
import { stripeSecretKey } from '../config/stripe';

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2020-03-02'
});

stripe.setAppInfo({
  name: 'Stripe payment demo',
});

export default {
  stripe,
  createProduct: async (name) => stripe.products.create({ name }),
  getProduct: (productId) => stripe.products.retrieve(productId),
  createPlan: (product, amount) => stripe.plans.create({
    amount,
    currency: 'usd',
    interval: 'month',
    product: product.id
  }),
  getPlan: (planId) => stripe.plans.retrieve(planId),
  createCustomer: (customer) => stripe.customers.create(customer),
  getCustomer: (customerId) => stripe.customers.retrieve(customerId),
  getPrice: (priceId) => stripe.prices.retrieve(priceId),
  createInvoice: (customer, data = {}) => stripe.invoices.create({
    customer: customer.id,
    ...data
  }),
  createSubscription: (customer, items = []) => stripe.subscriptions.create({
    customer: customer.id,
    items
  }),
  getInvoiceList: (options) => stripe.invoices.list(options),
  createPaymentMethod: () => stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 7,
      exp_year: 2021,
      cvc: '314',
    },
  }),
  createCard: (customer) => stripe.customers.createSource(
    customer.id,
    { source: 'tok_mastercard' }),
  createPaymentIntent: (amount) => stripe.paymentIntents.create({
    amount,
    currency: 'usd'
  })
};
