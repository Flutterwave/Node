import RaveBase from '../../lib/rave.base';
import { BlockUnblockCardPayload, BlockUnblockCardResponse } from './type';

const morx = require('morx');
const q = require('q');
const axios = require('axios');
const package = require('../../package.json');

const spec = morx
  .spec()
  .build('id', 'required:true, eg:a1b7864f-c56d-4453-bf55-a08db4acb5fe')
  .build('status_action', 'required:true, eg:block')
  .end();

block_card.morxspc = spec;

export default function block_card(
  data: BlockUnblockCardPayload,
  _rave: RaveBase,
): Promise<BlockUnblockCardResponse> {
  axios.post(
    'https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent',
    {
      publicKey: _rave.getPublicKey(),
      language: 'NodeJs v3',
      version: package.version,
      title: 'Incoming call',
      message: 'Block/unblock-card',
    },
  );

  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = validated.params;
    return params;
  })
    .then((params: any) => {
      params.method = 'PUT';
      var uri = `v3/virtual-cards/${params.id}/status/${params.status_action}`;
      return _rave.request(uri, params);
    })
    .then((response: any) => {
      d.resolve(response.body);
    })
    .catch((err: any) => {
      d.reject(err);
    });

  return d.promise;
}
