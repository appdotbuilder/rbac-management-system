import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Stats {
    users: {
        total: number;
        active: number;
        inactive: number;
        recent: number;
    };
    roles: {
        total: number;
        active: number;
        inactive: number;
    };
    menus: {
        total: number;
        active: number;
        inactive: number;
    };
    userTypes: {
        total: number;
        active: number;
        inactive: number;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    role?: { name: string };
    user_type?: { name: string };
    created_at: string;
}

interface RoleDistribution {
    name: string;
    count: number;
    percentage: number;
}

interface Props {
    stats: Stats;
    recentUsers: User[];
    roleDistribution: RoleDistribution[];
    [key: string]: unknown;
}

export default function RbacDashboard({ stats, recentUsers, roleDistribution }: Props) {
    return (
        <AppShell>
            <Head title="RBAC Management Dashboard" />
            
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🔐 RBAC Management Dashboard
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Monitor and manage your Role-Based Access Control system
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                        <div className="flex items-center">
                            <div className="text-3xl mb-2">👥</div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Users</h3>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.users.total}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {stats.users.active} active, {stats.users.recent} new this month
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
                        <div className="flex items-center">
                            <div className="text-3xl mb-2">🛡️</div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Roles</h3>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.roles.total}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {stats.roles.active} active roles
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <div className="flex items-center">
                            <div className="text-3xl mb-2">📋</div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Menus</h3>
                                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.menus.total}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {stats.menus.active} active items
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                        <div className="flex items-center">
                            <div className="text-3xl mb-2">🗂️</div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Types</h3>
                                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.userTypes.total}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {stats.userTypes.active} active types
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🚀 Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <Link
                            href="/users/create"
                            className="flex flex-col items-center p-4 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors"
                        >
                            <span className="text-2xl mb-2">👤</span>
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Add User</span>
                        </Link>
                        
                        <Link
                            href="/roles/create"
                            className="flex flex-col items-center p-4 rounded-lg bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 transition-colors"
                        >
                            <span className="text-2xl mb-2">🛡️</span>
                            <span className="text-sm font-medium text-green-800 dark:text-green-300">Add Role</span>
                        </Link>
                        
                        <Link
                            href="/menus/create"
                            className="flex flex-col items-center p-4 rounded-lg bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 transition-colors"
                        >
                            <span className="text-2xl mb-2">📋</span>
                            <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Add Menu</span>
                        </Link>
                        
                        <Link
                            href="/users"
                            className="flex flex-col items-center p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/40 transition-colors"
                        >
                            <span className="text-2xl mb-2">👥</span>
                            <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Manage Users</span>
                        </Link>
                        
                        <Link
                            href="/roles"
                            className="flex flex-col items-center p-4 rounded-lg bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/20 dark:hover:bg-pink-900/40 transition-colors"
                        >
                            <span className="text-2xl mb-2">⚙️</span>
                            <span className="text-sm font-medium text-pink-800 dark:text-pink-300">Manage Roles</span>
                        </Link>
                        
                        <Link
                            href="/menu-access"
                            className="flex flex-col items-center p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 transition-colors"
                        >
                            <span className="text-2xl mb-2">🔒</span>
                            <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Access Control</span>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">👥 Recent Users</h2>
                            <Link href="/users" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                                View all →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {user.role?.name || 'No role'} • {user.user_type?.name || 'No type'}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/users/${user.id}`}
                                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                                    >
                                        View
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Role Distribution */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">🛡️ Role Distribution</h2>
                            <Link href="/roles" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                                Manage roles →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {roleDistribution.map((role, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-900 dark:text-white">{role.name}</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            {role.count} users ({role.percentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full dark:bg-blue-400" 
                                            style={{ width: `${role.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}