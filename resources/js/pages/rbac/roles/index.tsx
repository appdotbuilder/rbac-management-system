import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Role {
    id: number;
    name: string;
    slug: string;
    description?: string;
    is_active: boolean;
    users_count: number;
    created_at: string;
}

interface Props {
    roles: {
        data: Role[];
        links: unknown[];
        meta: unknown;
    };
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function RolesIndex({ roles, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = () => {
        router.get('/roles', {
            search,
            status: statusFilter
        }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('');
        router.get('/roles');
    };

    return (
        <AppShell>
            <Head title="Roles Management" />
            
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            🛡️ Roles Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Define and manage user roles and their permissions
                        </p>
                    </div>
                    <Link
                        href="/roles/create"
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        <span className="mr-2">🛡️</span>
                        Add New Role
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Roles
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Role name or description..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">All Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                            >
                                Search
                            </button>
                            <button
                                onClick={handleClearFilters}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition-colors"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.data.map((role) => (
                        <div key={role.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="text-3xl mr-3">🛡️</div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {role.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {role.slug}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        role.is_active 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                    }`}>
                                        {role.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-4 min-h-[3rem]">
                                    {role.description || 'No description provided'}
                                </p>

                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    <span>👥 {role.users_count} users</span>
                                    <span>📅 {new Date(role.created_at).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/roles/${role.id}`}
                                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium"
                                        >
                                            View Details
                                        </Link>
                                        <span className="text-gray-300">•</span>
                                        <Link
                                            href={`/roles/${role.id}/edit`}
                                            className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 text-sm font-medium"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                    {role.users_count === 0 && (
                                        <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {roles.data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🛡️</div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No roles found</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {filters.search || filters.status 
                                ? 'Try adjusting your search filters' 
                                : 'Get started by creating your first role'
                            }
                        </p>
                        <Link
                            href="/roles/create"
                            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Create First Role
                        </Link>
                    </div>
                )}

                {/* Role Types Info */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
                        💡 Common Role Types
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="text-center">
                            <div className="text-2xl mb-2">👑</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">Superadmin</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400">Full system access</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">⚙️</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">Administrator</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400">Admin privileges</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">🔧</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">Operator</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400">Operational tasks</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">👤</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">User</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400">Standard access</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">👁️</div>
                            <h4 className="font-medium text-blue-800 dark:text-blue-300">Auditor</h4>
                            <p className="text-sm text-blue-600 dark:text-blue-400">Read-only access</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}