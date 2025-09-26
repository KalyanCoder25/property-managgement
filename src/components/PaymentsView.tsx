import React, { useState } from 'react';
import { Calendar, DollarSign, Download, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Payment {
  id: string;
  tenantName: string;
  property: string;
  unit: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: string;
}

interface PaymentsViewProps {
  searchQuery: string;
}

const PaymentsView: React.FC<PaymentsViewProps> = ({ searchQuery }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  
  const payments: Payment[] = [
    {
      id: '1',
      tenantName: 'Sarah Johnson',
      property: 'Sunset Apartments',
      unit: '2A',
      amount: 1800,
      dueDate: '2024-03-01',
      paidDate: '2024-02-28',
      status: 'paid',
      method: 'Bank Transfer',
    },
    {
      id: '2',
      tenantName: 'Michael Chen',
      property: 'Riverside House',
      unit: '1',
      amount: 3200,
      dueDate: '2024-03-01',
      paidDate: '2024-03-01',
      status: 'paid',
      method: 'Check',
    },
    {
      id: '3',
      tenantName: 'Emma Rodriguez',
      property: 'Garden View Townhouse',
      unit: '3B',
      amount: 2400,
      dueDate: '2024-03-01',
      status: 'pending',
    },
    {
      id: '4',
      tenantName: 'David Wilson',
      property: 'Downtown Loft',
      unit: '5B',
      amount: 2200,
      dueDate: '2024-02-28',
      status: 'overdue',
    },
    {
      id: '5',
      tenantName: 'Lisa Park',
      property: 'Oak Street Apartments',
      unit: '1C',
      amount: 1600,
      dueDate: '2024-03-01',
      paidDate: '2024-03-02',
      status: 'paid',
      method: 'Credit Card',
    },
  ];

  const filteredPayments = payments.filter(payment =>
    payment.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          color: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
          text: 'Paid',
        };
      case 'pending':
        return {
          color: 'bg-orange-50 text-orange-700 border-orange-200',
          icon: Clock,
          text: 'Pending',
        };
      case 'overdue':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          icon: AlertCircle,
          text: 'Overdue',
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          icon: Clock,
          text: 'Unknown',
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalPaid = filteredPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = filteredPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = filteredPayments
    .filter(p => p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Collected</p>
              <p className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">${totalPending.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-red-600">${totalOverdue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {((totalPaid / (totalPaid + totalPending + totalOverdue)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const statusConfig = getStatusConfig(payment.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.tenantName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{payment.property}</div>
                      <div className="text-sm text-gray-500">Unit {payment.unit}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">${payment.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(payment.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.paidDate ? formatDate(payment.paidDate) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.method || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
          <p className="text-gray-500">
            {searchQuery ? 'Try adjusting your search criteria.' : 'Payment records will appear here once tenants start making payments.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentsView;