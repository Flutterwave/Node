import initiate from '../services/virtual-account/rave.create';
import create_bulk_account from '../services/virtual-account/rave.create.bulk';
import retrieve from '../services/virtual-account/rave.retrieve';
import retrieve_bulk from '../services/virtual-account/rave.retrieve.bulk';
import {
  CreateAccountPayload,
  FetchBatchVirtualAccountPayload,
  FetchVirtualAccountPayload,
} from '../services/virtual-account/types';
import RaveBase from './rave.base';

export default class Virtual_account {
  private rave: RaveBase;
  constructor(arg: RaveBase) {
    this.rave = arg;
  }
  /**
   * This creates bulk virtual account numbers
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-account-numbers#create-bulk-virtual-account-numbers
   */
  create_bulk(data: CreateAccountPayload) {
    return create_bulk_account(data, this.rave);
  }

  /**
   * This creates virtual account numbers
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-account-numbers#create-a-virtual-account-number
   */
  create(data: CreateAccountPayload) {
    return initiate(data, this.rave);
  }

  /**
   * This allows you to fetch a virtual account number using order reference
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-account-numbers#get-bulk-virtual-account-details
   */
  fetch(data: FetchVirtualAccountPayload) {
    return retrieve(data, this.rave);
  }

  /**
   * This allows you to fetch bulk virtual account numbers using batch id
   * 
   * @link https://developer.flutterwave.com/reference/endpoints/virtual-account-numbers#get-bulk-virtual-account-details
   */
  fetch_bulk(data: FetchBatchVirtualAccountPayload) {
    return retrieve_bulk(data, this.rave);
  }
}
