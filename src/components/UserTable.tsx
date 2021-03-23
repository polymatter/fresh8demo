import React from 'react'
import styled from 'styled-components'
import { useTable, Column, Row } from 'react-table'
import { useFetch } from 'react-async';
import { User } from '../types';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }: { columns: Column<User>[], data: User[] }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const [filter, setFilter] = React.useState('');
  const filterFn = (row: Row<User>) => {
    return row.original.name.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  }

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}
                { index === 0 && <><br /><input type="text" value={filter} onChange={e => setFilter(e.target.value)} /></>}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.filter(filterFn).map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function UserTable() {
  const url = 'http://localhost:4000/api/users.json'
  const headers = { Accept: "application/json" }
  const { data, error, isPending } = useFetch(url, { headers });
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Location',
        accessor: 'location',
      }
    ],
    []
  )

  if (isPending) return <div>Loading ...</div>
  if (error) return <div>Something went wrong: {error.message} {JSON.stringify(error)}</div>
  if (data) {
    return (
      <Styles>
        <Table columns={columns as Column<User>[]} data={data as User[]} />
      </Styles>
    )
  }

  return <div>Loading ... Something went wrong</div>
}

export default UserTable
