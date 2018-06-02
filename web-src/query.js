import queryString from 'query-string';

const parsedQuery = queryString.parse(location.search);

const parsedSeed = parseInt(parsedQuery.seed);
const overrideSeed = isNaN(parsedSeed) || parsedSeed > MAX32
  ? null
  : parsedSeed;

export default {
  overrideSeed,
};
