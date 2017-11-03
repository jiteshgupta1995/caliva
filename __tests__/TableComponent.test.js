import TableComponent from '../src/components/TableComponent';
import renderer from 'react-test-renderer';
import React from 'react';

test('Table component renders the data correctly', () => {
    const data = { 
        header: [
            {code: "product", title: "Product"},
            {code: "price", title: "Price"},
        ],
        body:[
            {product: "some thing", price:"12 INR"},
        ],
        order: "asc",
        sortKey: "Product",
    };
    const rendered = renderer.create(
        <TableComponent value={data} />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
});
