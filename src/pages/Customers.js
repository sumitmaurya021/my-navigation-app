import React, { useState, useEffect } from 'react';
import './Customers.css';

function Customers() {
  const customerData = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `Customer ${index + 1}`,
    email: `customer${index + 1}@example.com`,
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    image: `https://randomuser.me/api/portraits/men/${index % 99}.jpg`,
  }));

  // State to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // Calculate the current set of customers
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customerData.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Handle the next page click
  const nextPage = () => {
    if (currentPage < Math.ceil(customerData.length / customersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle the previous page click
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Animation effect on page change
  useEffect(() => {
    const tableBody = document.querySelector('.customers-table tbody');
    tableBody.classList.add('fade-in');
    setTimeout(() => tableBody.classList.remove('fade-in'), 500);
  }, [currentPage]);

  return (
    <div className="customers-container">
      <h2>Customer List</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <img src={customer.image} alt={customer.name} className="customer-image" />
              </td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination-controls">
        {currentPage > 1 && (
          <button onClick={previousPage} className="pagination-button">
            Previous
          </button>
        )}
        {currentPage < Math.ceil(customerData.length / customersPerPage) && (
          <button onClick={nextPage} className="pagination-button">
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Customers;
