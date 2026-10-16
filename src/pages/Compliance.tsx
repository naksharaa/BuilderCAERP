import { complianceTasks } from '../data';
import { CalendarCheck, AlertTriangle, CheckCircle, Clock, Play } from 'lucide-react';

export default function Compliance() {
  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={14} className="text-emerald-500" />;
      case 'overdue': return <AlertTriangle size={14} className="text-red-500" />;
      case 'in-progress': return <Play size={14} className="text-blue-500" />;
      default: return <Clock size={14} className="text-amber-500" />;
    }
  };

  const typeColor = (type: string) => {
    switch (type) {
      case 'GST': return 'bg-emerald-100 text-emerald-700';
      case 'TDS': return 'bg-blue-100 text-blue-700';
      case 'TCS': return 'bg-purple-100 text-purple-700';
      case 'RERA': return 'bg-pink-100 text-pink-700';
      case 'ROC': return 'bg-orange-100 text-orange-700';
      case 'Income Tax': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Calendar</h1>
          <p className="text-sm text-gray-500">Due dates, assignments, reminders and filing status</p>
        </div>
        <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">+ Add Task</button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Total Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{complianceTasks.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600">{complianceTasks.filter(t => t.status === 'pending').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">{complianceTasks.filter(t => t.status === 'in-progress').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-emerald-600">{complianceTasks.filter(t => t.status === 'completed').length}</p>
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CalendarCheck size={18} className="text-emerald-600" /> Upcoming Deadlines — May/June 2025
        </h3>
        <div className="space-y-3">
          {complianceTasks.map(task => (
            <div key={task.id} className={`flex items-center gap-4 p-4 rounded-lg border ${
              task.status === 'completed' ? 'bg-gray-50 border-gray-200 opacity-60' :
              task.status === 'overdue' ? 'bg-red-50 border-red-200' :
              task.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
              'bg-white border-gray-200'
            }`}>
              <div className="flex-shrink-0">
                {statusIcon(task.status)}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">Assigned: {task.assignee}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColor(task.type)}`}>
                {task.type}
              </span>
              {task.status !== 'completed' && (
                <button className="px-3 py-1 text-xs bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 font-medium">
                  Mark Done
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Types Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Compliance by Type</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {['GST', 'TDS', 'TCS', 'RERA', 'ROC', 'Income Tax'].map(type => {
            const count = complianceTasks.filter(t => t.type === type).length;
            const pending = complianceTasks.filter(t => t.type === type && t.status !== 'completed').length;
            return (
              <div key={type} className="text-center p-3 bg-gray-50 rounded-lg">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-2 ${typeColor(type)}`}>{type}</span>
                <p className="text-lg font-bold text-gray-900">{count}</p>
                <p className="text-[10px] text-gray-500">{pending} pending</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
