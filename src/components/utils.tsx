// utils.ts

import React from 'react';

// The textReplacer function with proper types
export const textReplacer = (text: string | undefined, textToReplace: string, replacingText: string): string | undefined => {
  return text !== undefined ? text.replace(textToReplace, replacingText) : text;
};

// Typing for the React Component State for the _emptyTest function
interface ComponentWithEmptiesState {
  empties: Record<string, string>;
}

// The _emptyTest function with proper types
export const _emptyTest = (input: string | number, el: React.Component<any, ComponentWithEmptiesState>, name: string): boolean => {
  const text = input.toString().trim();
  const empty = text.length === 0;

  if (empty) {
    el.setState((prevState) => ({
      ...prevState,
      empties: {
        ...prevState.empties,
        [name]: `${name} cannot be empty!`,
      },
    }));
  } else {
    el.setState((prevState) => {
      const emptyArr = { ...prevState.empties };
      delete emptyArr[name];
      return {
        ...prevState,
        empties: emptyArr,
      };
    });
  }

  return empty;
};
