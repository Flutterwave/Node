import RaveBase from "../../lib/rave.base";
import { FeePayload, TransferFeeResponse } from "./types";

var morx = require('morx');
var q = require('q');
const axios = require('axios');

var spec = morx
  .spec()
  .build('currency', 'required:true, eg:NGN')
  .build('amount', 'required:true, eg:1000')
  .end();

fee_transfer.morxspc = spec;

export default function fee_transfer(data: FeePayload, _rave: RaveBase): Promise<TransferFeeResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Get-transfer-fee',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      // params.seckey = _rave.getSecretKey();
      params.method = 'GET';
      var uri = `v3/transfers/fee?currency=${params.currency}&amount=${params.amount}`;

      return _rave.request(uri, params);
    })
    .then((response: any) => {
      // console.log(response.body);
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
