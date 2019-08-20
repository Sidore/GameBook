import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Counter from "../../client/components/Counter/index"

describe('Case with counter', () => {
  it('Counter', () => {

    const component = renderer.create(
      <Counter />,
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();


  });
})
