const { logger } = require('../../utils/logger');
const { validator } = require('../../utils/validator');
const { fetchBalance } = require('../schema/auxillary');

async function service(data, _rave) {
  validator(fetchBalance, data);
  logger(`Query balance by currency`, _rave);
  data.method = 'GET';
  const { body: response } = await _rave.request(
    `/v3/balances/${data.currency}`,
    data,
  );
  return response;
}

module.exports = service;
