export function createHooks(callback) {
  const hooks = [];
  let idx = 0;

  function useState(initState) {
    const _idx = idx;
    let state = hooks[_idx] || initState;

    const setState = (newState) => {
      if (
        state !== newState &&
        JSON.stringify(state) !== JSON.stringify(newState)
      ) {
        state = hooks[_idx] = newState;
        callback();
      }
    };

    idx++;
    return [state, setState];
  }

  function resetContext() {
    idx = 0;
  }

  return { useState, resetContext };
}
