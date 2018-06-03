import queryString from 'query-string';

const MAX32 = 2 ** 32 - 1;

const parsedQuery = queryString.parse(location.search);

const parsedSeed = parseInt(parsedQuery.seed);
const overrideSeed = isNaN(parsedSeed) || parsedSeed > MAX32
  ? null
  : parsedSeed;

export default {
  overrideSeed,
};
