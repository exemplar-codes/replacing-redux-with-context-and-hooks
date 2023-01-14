// this is a abstract file (library), not meant to be edited during feature development.
import { useEffect, useState } from "react";

let globalState = {}; // generic name - can contain "global state" for unrelated parts, like "slices" in RTK
let listeners = []; // places where we can listen to changes in the global state
let actions = {}; // to mutate the store

// simple scoped variables. Not exported.
const useCustomStore = () => {
  const setCustomStoreState = useState(globalState)[1];
  // 1. using useState because it allows us to trigger a re-render
  // 2. also, when a custom hook re-renders, the component using the hook also re-render
  // 3. Even if the custom hook is used at multiple places, the useState(arg) will remain the same (i.e. the latest value of globalState), because we are using an external variable.
  //    This way, all the components in the app actually have a shared state.
  // 4. We expose the state setter, so components can mutate the store, and also cause a re-render.
  // 5. Listeners is an array of functions to update all components that are use the hook and are interested in the changes to the global state.
  //   //    We add the state setter (setCustomStoreState) to the listener for now.
  // //  listeners.push(setCustomStoreState);
  // 6. We'll add more setter functions for each component that uses the hook. We'll remove the function when the component un-mounts.
  //    To do this addition and removal "removal", we'll use useEffect.
  useEffect(() => {
    listeners.push(setCustomStoreState);

    return () => {
      listeners = listeners.filter((li) => li !== setCustomStoreState);
      // FIXME: can you compare functions in general? maybe React.useState setters are comparable.

      // BTW, the cleanup function runs at a later time, so the setter is stored (in a closure)
    };
  }, []);
  // 7. yes, this is only when the hook is encountered for the first time.
  // Both useState and this will be ignored for all subsequent re-renders of the component as well re-render due to store state change

  // 8. build the dispatch function, because we wish to have a action-reducer like pattern
  const dispatch = (actionId, payload) => {
    /// WHY this architecture?
    const newState = actions[actionId]?.(globalState, payload); // at place of use - dispatch(actionId)
    globalState = { ...globalState, ...newState };

    // 9. re-renders all components that use the hook
    for (const listener of listeners) {
      listener(globalState); // FIXME: pre-order traversal is fine for global state updates?
    }
  };

  return [globalState, dispatch]; // like useReducer, but it's not useful for global state management, according to Max. FIXME: useReducer is just a syntax sugar over useState, right, so why not use it instead of useState in this hook?
};

// 10. Function to set actions, and initialState to be used in the app.
// Note: this function is meant to be run only once
export const initStore = (userActions, initialState) => {
  globalState = { ...globalState, ...(initialState ?? {}) }; // like combineReducer??. FIMXE: slices?
  actions = { ...actions, ...(userActions ?? {}) };
};

export default useCustomStore;
