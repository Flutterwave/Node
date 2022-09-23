import RaveBase from '../../lib/rave.base';
import { BankTranferPayload, BankTransferResponse } from './types';

const morx = require('morx');
const q = require('q');
const encrypt = require('./encryp');
const axios = require('axios');
const package_json = require('../../package.json');

var spec = morx
  .spec()
  .build('currency', 'required:true, eg:GBP')
  .build('amount', 'required:true, eg:10')
  .build('phone_number', 'required:false, eg:08030930236')
  .build('email', 'required:true, eg:debowalefaulkner@gmail.com')
  .build('fullname', 'required:false, eg:lawal garba')
  .build('client_ip', 'required:false, eg:127.0.0.1')
  .build('tx_ref', 'required:true, eg:FLW_y-443342')
  .build('subaccounts', 'required:false')
  .build('meta', 'required:false')
  .build('country', 'required:false')
  .build('redirect_url', 'required:false')
  .build('device_fingerprint', 'required:false')
  .end();

ach_payment.morxspc = spec;

export default function ach_payment(data: BankTranferPayload, _rave: RaveBase): Promise<BankTransferResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package_json.version,
      title: 'Incoming call',
      message: 'ACH Charge',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT, {
      throw_error: true,
    });
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request('v3/charges?type=ach_payment', params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
