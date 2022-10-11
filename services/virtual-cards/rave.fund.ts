import RaveBase from '../../lib/rave.base';
import { FundCardPayload, FundCardResponse } from './type';

var morx = require('morx');
var q = require('q');
const axios = require('axios');
const package = require('../../package.json');

var spec = morx
  .spec()
  .build('id', 'required:true, eg:1cb36826-8e05-40d6-8b9e-7f7439a141cb')
  .build('amount', 'required:true, eg:10')
  .build('debit_currency', 'required:true, eg:USD')
  .end();

fund_Card.morxspc = spec;

export default function fund_Card(
  data: FundCardPayload,
  _rave: RaveBase,
): Promise<FundCardResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Fund-card',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      var uri = `v3/virtual-cards/${params.id}/fund`;

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
