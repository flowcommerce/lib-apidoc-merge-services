const concat = require('lodash/concat');
const defaults = require('lodash/defaults');
const intersectionBy = require('lodash/intersectionBy');
const invariant = require('invariant');
const isEmpty = require('lodash/isEmpty');
const map = require('lodash/map');
const sortBy = require('lodash/sortBy');

const defaultOptions = {
  formatConflictMessage: ({ duplicates }) => `CONFLICT found duplicate unions: ${duplicates}.`,
};

function mergeUnions(target = [], source = [], options) {
  const { formatConflictMessage } = defaults(options, defaultOptions);
  const duplicates = intersectionBy(target, source, 'name');
  const message = formatConflictMessage({ duplicates: map(duplicates, 'name'), type: 'union' });
  invariant(isEmpty(duplicates), message);
  return sortBy(concat(target, source), 'name');
}

module.exports = mergeUnions;
