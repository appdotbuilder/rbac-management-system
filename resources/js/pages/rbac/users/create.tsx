import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Role {
    id: number;
    name: string;
}

interface UserType {
    id: number;
    name: string;
}

interface UserFormData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role_id: string;
    user_type_id: string;
    is_active: boolean;
    [key: string]: string | boolean;
}

interface Props {
    roles: Role[];
    userTypes: UserType[];
    [key: string]: unknown;
}

export default function CreateUser({ roles, userTypes }: Props) {
    const { data, setData, post, processing, errors } = useForm<UserFormData>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        user_type_id: '',
        is_active: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <AppShell>
            <Head title="Create User" />
            
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/users" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            👥 Users
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-700 dark:text-gray-300">Create New User</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        👤 Create New User
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Add a new user to the system with role and permissions
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    📝 Basic Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="John Doe"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="john@example.com"
                                            required
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    🔒 Security
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Minimum 8 characters"
                                            required
                                        />
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Confirm Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Re-type password"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Role and Type */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    🛡️ Role & Classification
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            User Role
                                        </label>
                                        <select
                                            value={data.role_id}
                                            onChange={(e) => setData('role_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select a role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.role_id && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role_id}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            User Type
                                        </label>
                                        <select
                                            value={data.user_type_id}
                                            onChange={(e) => setData('user_type_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="">Select a user type</option>
                                            {userTypes.map((userType) => (
                                                <option key={userType.id} value={userType.id}>
                                                    {userType.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.user_type_id && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.user_type_id}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    ⚙️ Settings
                                </h3>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
                                        Active user (can login and access the system)
                                    </label>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Link
                                    href="/users"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors"
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating User...
                                        </>
                                    ) : (
                                        <>
                                            <span className="mr-2">👤</span>
                                            Create User
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}