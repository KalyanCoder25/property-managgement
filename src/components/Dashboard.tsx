import React from 'react';
import { Building2, Users, DollarSign, TrendingUp, Calendar, AlertTriangle, Home, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Properties',
      value: '24',
      change: '+2 this month',
      changeType: 'positive',
      icon: Building2,
      color: 'blue',
    },
    {
      title: 'Active Tenants',
      value: '18',
      change: '+1 this week',
      changeType: 'positive',
      icon: Users,
      color: 'green',
    },
    {
      title: 'Monthly Revenue',
      value: '$42,850',
      change: '+5.2% from last month',
      changeType: 'positive',
      icon: DollarSign,
      color: 'orange',
    },
    {
      title: 'Occupancy Rate',
      value: '92%',
      change: '+3% from last month',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple',
    },
  ];

  const recentActivities = [
    {
      type: 'payment',
      message: 'Rent payment received from Sarah Johnson',
      time: '2 hours ago',
      amount: '$1,800',
    },
    {
      type: 'tenant',
      message: 'New tenant application submitted for Unit 4B',
      time: '5 hours ago',
    },
    {
      type: 'maintenance',
      message: 'Maintenance request: AC repair in Unit 2A',
      time: '1 day ago',
    },
    {
      type: 'lease',
      message: 'Lease renewal signed for Unit 3C',
      time: '2 days ago',
    },
  ];

  const upcomingTasks = [
    {
      task: 'Lease expiration: Unit 5B (Michael Chen)',
      date: 'March 15, 2024',
      priority: 'high',
    },
    {
      task: 'Property inspection: 123 Oak Street',
      date: 'March 18, 2024',
      priority: 'medium',
    },
    {
      task: 'Rent due: Follow up with late payments',
      date: 'March 20, 2024',
      priority: 'high',
    },
    {
      task: 'Maintenance: HVAC service scheduled',
      date: 'March 22, 2024',
      priority: 'low',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'green':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'orange':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    {activity.type === 'payment' && <CreditCard className="w-4 h-4" />}
                    {activity.type === 'tenant' && <Users className="w-4 h-4" />}
                    {activity.type === 'maintenance' && <AlertTriangle className="w-4 h-4" />}
                    {activity.type === 'lease' && <Home className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-green-600">{activity.amount}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500 mt-1">{task.date}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Property Performance Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Performance Overview</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;