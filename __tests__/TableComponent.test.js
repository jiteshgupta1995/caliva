import TableComponent from '../src/components/TableComponent';
import renderer from 'react-test-renderer';
import React from 'react';

test('Table component renders the data correctly', () => {
  const data = { 
    header: [
      "Product",
      "Price"
    ],
    body:[
    {Product: "some thing",Price:"12 INR"}
    ],
    sort:[],
    showEdit: "Price",
    showBlock: "Price",
    showThumbDown: "Product",
    showThumbUp: "Product",
    order: "asc",
    sortKey: "Product",
    colSpan: [],
    rowSpan: [] 
  };
  const rendered = renderer.create(
    <TableComponent value={data} />
  );
  expect(rendered.toJSON()).toMatchSnapshot();
});
