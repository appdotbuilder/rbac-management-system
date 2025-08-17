import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Menu {
    id: number;
    name: string;
    slug: string;
    icon?: string;
    route?: string;
    sort_order: number;
    is_active: boolean;
    submenus_count: number;
    created_at: string;
}

interface Props {
    menus: {
        data: Menu[];
        links: unknown[];
        meta: unknown;
    };
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function MenusIndex({ menus, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleSearch = () => {
        router.get('/menus', {
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
        router.get('/menus');
    };

    return (
        <AppShell>
            <Head title="Menus Management" />
            
            <div className="container mx-auto p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            📋 Menus Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage application navigation menus and submenus
                        </p>
                    </div>
                    <Link
                        href="/menus/create"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        <span className="mr-2">📋</span>
                        Add New Menu
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Menus
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Menu name or slug..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">All Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <div className="flex items-end gap-2">
                            <button
                                onClick={handleSearch}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
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

                {/* Menus Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Menu
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Route
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Submenus
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {menus.data.map((menu) => (
                                    <tr key={menu.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                                                {menu.sort_order}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-2xl mr-3">
                                                    {menu.icon ? (
                                                        <span>{menu.icon === 'dashboard' ? '📊' : 
                                                              menu.icon === 'users' ? '👥' : 
                                                              menu.icon === 'shield-check' ? '🛡️' :
                                                              menu.icon === 'bars-3' ? '📋' :
                                                              menu.icon === 'lock-closed' ? '🔒' :
                                                              menu.icon === 'document-chart-bar' ? '📊' :
                                                              menu.icon === 'cog-6-tooth' ? '⚙️' : '📋'}</span>
                                                    ) : (
                                                        '📋'
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {menu.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {menu.slug}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                {menu.route || 'No route'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                                                {menu.submenus_count} items
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                menu.is_active 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                            }`}>
                                                {menu.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/menus/${menu.id}`}
                                                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={`/menus/${menu.id}/edit`}
                                                    className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {menus.data.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No menus found</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                {filters.search || filters.status 
                                    ? 'Try adjusting your search filters' 
                                    : 'Get started by creating your first menu'
                                }
                            </p>
                            <Link
                                href="/menus/create"
                                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Create First Menu
                            </Link>
                        </div>
                    )}
                </div>

                {/* Menu Structure Info */}
                <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-4">
                        📋 Menu Structure Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className="text-2xl mb-2">📊</div>
                            <h4 className="font-medium text-purple-800 dark:text-purple-300">Dashboard</h4>
                            <p className="text-sm text-purple-600 dark:text-purple-400">Main overview</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">👥</div>
                            <h4 className="font-medium text-purple-800 dark:text-purple-300">User Management</h4>
                            <p className="text-sm text-purple-600 dark:text-purple-400">User operations</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">🛡️</div>
                            <h4 className="font-medium text-purple-800 dark:text-purple-300">Role Management</h4>
                            <p className="text-sm text-purple-600 dark:text-purple-400">Role definitions</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl mb-2">⚙️</div>
                            <h4 className="font-medium text-purple-800 dark:text-purple-300">Settings</h4>
                            <p className="text-sm text-purple-600 dark:text-purple-400">Configuration</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}