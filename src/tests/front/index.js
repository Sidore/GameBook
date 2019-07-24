import React from 'react';
import renderer from 'react-test-renderer';
import Counter from "../../src/client/components/Counter/index.tsx"

test('Counter', () => {
  const component = renderer.create(
    <Counter />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});