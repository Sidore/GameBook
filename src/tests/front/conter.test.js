import React from 'react';
import renderer from 'react-test-renderer';
import Counter from "../../client/components/Counter/index.tsx"

describe('Case with counter', () => {
  it('Counter', () => {

    const component = renderer.create(
      <Counter />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


  });
})
