import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/reservations')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        alert('Error fetching data: ' + error.message);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Table',
        accessor: 'table',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTheadProps,
    getTrProps,
    getThProps,
    getTdProps,
  } = useTable({ columns, data });

  return (
    <div>
      <h1>Customer</h1>
      <table {...getTableProps()}>
        <thead>
          <tr {...getTheadProps()}>
            {columns.map(column => (
              <th {...getThProps({ column })}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr {...getTrProps({ row })}>
              {columns.map(column => (
                <td {...getTdProps({ column, row })}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;