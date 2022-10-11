import RaveBase from '../../lib/rave.base';
import { FetchSubAccountResponse } from './types';

var morx = require('morx');
var q = require('q');
const path = require('path');
const axios = require('axios');

var spec = morx
  .spec()
  .build('id', 'required:true, eg:RS_C3FCBECF928B4B33B9C3BC74A357A9E5')
  .end();

get.morxspc = spec;

export default function get(data: { id: string }, _rave: RaveBase): Promise<FetchSubAccountResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: require('../../../package.json').version,
      title: 'Incoming call',
      message: 'Fetch a Subaccount',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;

    return params;
  })
    .then((params: any) => {
      params.method = 'GET';
      var uri = `v3/subaccounts/${params.id}`;
      // console.log(params)
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
