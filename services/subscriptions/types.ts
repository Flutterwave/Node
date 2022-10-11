import { FLWResponse, PageMeta } from '../../utils/types';

export type SubscriptionType = {
  id: number;
  amount: number;
  customer: {
    id: number;
    customer_email: string;
  };
  plan: number;
  status: 'cancelled' | 'inactive' | string;
  created_at: string;
};

export type SubscriptionPayload = {
  /**
   * This is the email of the subscriber. You can use this to query the transactions for a single customer.
   */
  email?: string;
  /**
   * This is a unique transaction identifier generated by our systems. It is returned in the initiate charge response as data.id.
   */
  transaction_id?: string;
  /**
   * This is the ID of the payment plan. It is returned in the call to create a payment plan as data.id.
   */
  plan?: number;
  /**
   * This is the start date of the subscriptions(when they are first active). You can use this as a starting point for your query.
   * The expected date format for this parameter is YYYY-MM-DD
   */
  subscribed_from?: string;
  /**
   * This is the end date for a subscription. Like subscribed_from, It also has an expected date format of YYYY-MM-DD.
   */
  subscribed_to?: string;
  /**
   * This is the parameter to filter from the start date of the next due subscriptions.
   */
  next_due_from?: string;
  /**
   * This is the parameter to filter to the end date of the next due subscriptions.
   */
  next_due_to?: string;
  /**
   * This is the page number to retrieve e.g. setting 1 retrieves the first page.
   */
  page?: string;
  /**
   * This is the status for the queried transactions. Expected values are active and cancelled.
   */
  status?: 'active' | 'cancelled';
};

export interface SubscriptionResponse extends FLWResponse {
  data: SubscriptionType;
}

export interface SubscriptionsResponse extends FLWResponse {
  meta: PageMeta;
  data: SubscriptionType[];
}
