import React from 'react';
import DataTable from 'react-data-table-component';
import {
  Container,
} from './StyledComponents';

const data = [
  {
    id: 1,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 2,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 3,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 4,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 6,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 7,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 8,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 9,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 10,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 11,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 12,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 13,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 14,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 15,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 16,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 17,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 19,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 19,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 20,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 21,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 22,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 23,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 24,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 25,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 26,
    branchId: 9,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 27,
    branchId: 39,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 28,
    branchId: 7,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 29,
    branchId: 5,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 30,
    branchId: 23,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 31,
    branchId: 10,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 32,
    branchId: 1,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
  {
    id: 33,
    branchId: 4,
    city: 'Riyadh',
    totalOrders: 500,
    statues: 'Active'
  },
]
const columns = [
  {
    name: 'Branch ID',
    selector: 'branchId',
    sortable: true,
  },
  {
    name: 'City',
    selector: 'city',
    sortable: true,
  },
  {
    name: 'Total orders',
    selector: 'totalOrders',
    sortable: true,
  },
  {
    name: 'Statues',
    selector: 'statues',
    sortable: true,
  },
];

class TableComponent extends React.Component {

  render() {

    return (
      <Container>
        <DataTable
          title="Branches"
          columns={columns}
          data={data}
          striped
          pointerOnHover
          persistTableHead
          pagination
        />
      </Container>
    );
  }
}

export default TableComponent;
