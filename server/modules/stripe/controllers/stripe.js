import Event from '../../../models/event';
import Stripe from '../../../helpers/Stripe';

export default class StripeController {
  /**
   * Paginate event
   */
  test = async (req, res, next) => {
    try {
      const customer = await Stripe.createCustomer({ email: 'test@mailinator.com' });

      return res.status(200).send({
        customer
      })
    }
    catch (err) {
      return next(err)
    }
  };
}
