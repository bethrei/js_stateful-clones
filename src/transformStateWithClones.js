'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let previousState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    const newObj = {};

    switch (type) {
      case 'addProperties': {
        Object.assign(newObj, previousState, extraData);
        break;
      }

      case 'removeProperties': {
        Object.assign(newObj, previousState);

        for (const key of keysToRemove) {
          delete newObj[key];
        }
        break;
      }
    }
    states.push(newObj);
    previousState = states[states.length - 1];
  }

  return states;
}

module.exports = transformStateWithClones;
