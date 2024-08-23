import React from 'react';
import Header from '../../../components/Header/Header';
import { Helmet } from 'react-helmet';

const globalStyles = `
  body, html {
    background-color: #C5C3C6; 
    height: 100%;
    margin: 0;
  }
  #root, .app {
    height: 100%;
  }
`;


type Transaction = {
  name: string;
  status: {
    [month in 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December']?: 'Cash' | 'GCash';
  };
};

const transactions: Transaction[] = [
  {
    name: 'Alice',
    status: {
      January: 'Cash',
      February: 'Cash',
      March: 'GCash',
      April: 'Cash',
      May: 'GCash',
      June: 'Cash',
      July: 'Cash',
      August: 'Cash',
      September: 'Cash',
      October: 'Cash',
      November: undefined, // Making November blank
      December: undefined, // Making December blank
    },
  },
  {
    name: 'Bob',
    status: {
      January: 'GCash',
      February: 'GCash',
      March: 'GCash',
      April: 'GCash',
      May: 'Cash',
      June: 'Cash',
      July: 'Cash',
      August: 'GCash',
      September: undefined,
      October: undefined,
      November: undefined,
      December: undefined,
    },
  },
  {
    name: 'Charlie',
    status: {
      January: 'Cash',
      February: 'GCash',
      March: 'GCash',
      April: 'Cash',
      May: 'GCash',
      June: 'Cash',
      July: 'Cash',
      August: 'Cash',
      September: 'Cash',
      October: 'Cash',
      November: 'GCash',
      December: 'GCash',
    },
  },
  {
    name: 'David',
    status: {
      January: 'Cash',
      February: 'Cash',
      March: 'Cash',
      April: 'Cash',
      May: 'Cash',
      June: 'Cash',
      July: 'Cash',
      August: 'Cash',
      September: 'Cash',
      October: 'Cash',
      November: 'GCash',
      December: 'GCash',
    },
  },
  // Add more transactions here
];

const months: ('January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December')[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ReportSummary: React.FC = () => {
  const renderTableHeader = () => {
    return (
      <tr className="bg-gray-200">
        <th className="border px-4 py-2">Name</th>
        {months.map((month) => (
          <th key={month} className="border px-4 py-2">
            {month}
          </th>
        ))}
      </tr>
    );
  };

  const renderTableData = () => {
    const sortedTransactions = transactions.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return sortedTransactions.map((transaction, index) => (
      <tr key={index}>
        <td className="border px-4 py-2">{transaction.name}</td>
        {months.map((month) => (
          <td
            key={month}
            className={`border px-4 py-2 ${
              transaction.status[month] === 'Cash' || transaction.status[month] === 'GCash'
                ? 'bg-green-200'
                : 'bg-red-200'
            }`}
          >
            {transaction.status[month] || ''}
          </td>
        ))}
      </tr>
    ));
  };

  return (
    <>
      <Helmet>
        <title>HypTech - Report Summary</title>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <style>{globalStyles}</style>
      </Helmet>
      <div className="w-full ">
        <Header />
        <div className="max-w-screen-xl mx-auto p-8">
          <h1 className="text-3xl font-semibold text-center mb-4">
            Report Summary
          </h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse rounded-lg">
              <thead>{renderTableHeader()}</thead>
              <tbody className='text-center'>{renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportSummary;
