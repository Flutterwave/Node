import RaveBase from '../../lib/rave.base';
import { BulkTokenChargePayload, BulkTokenChargeResponse, TokenChargePayload } from './types';

const morx = require('morx');
const q = require('q');
const axios = require('axios');

const spec = morx
  .spec()
  .build('title', 'required:false, eg:akhlm blk tknzd chrg pstmn tst 1')
  .build(
    'retry_strategy',
    'required:false, eg:{"retry_interval": 120, "retry_amount_variable": 60,"retry_attempt_variable": 2}',
  )
  .build(
    'bulk_data',
    'required:true, eg:"bulk_data": [{"currency": "NGN","token": "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k","country": "NG","amount": 3500,"email": "user@example.com","first_name": "Example", "last_name": "User", "ip": "pstmn","tx_ref": "akhlm-pstmn-blkchrg-xy10" },{ "currency": "NGN","token": "flw-t1nf-f9b3bf384cd30d6fca42b6df9d27bd2f-m03k","country": "NG", "amount": 3000, "email": "user@example.com","first_name": "Jane", "last_name": "Doe", "ip": "pstmn","tx_ref": "akhlm-pstmn-blkchrge-xx10 }]',
  )
  .build('last_name', 'required:false, eg:garuba')
  .build('first_name', 'required:false, eg:garuba')

  .end();

bulk_charge.morxspc = spec;

export default function bulk_charge(
  data: BulkTokenChargePayload,
  _rave: RaveBase,
): Promise<BulkTokenChargeResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Bulk Tokenization charge',
    },
  );

  var d = q.defer();
  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      return _rave.request(`v3/bulk-tokenized-charges`, params);
    })
    .then((resp: any) => {
      d.resolve(resp.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
