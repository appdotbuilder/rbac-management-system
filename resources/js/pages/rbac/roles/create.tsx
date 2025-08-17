import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface RoleFormData {
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    [key: string]: string | boolean;
}



export default function CreateRole() {
    const { data, setData, post, processing, errors } = useForm<RoleFormData>({
        name: '',
        slug: '',
        description: '',
        is_active: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/roles');
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleNameChange = (name: string) => {
        setData('name', name);
        if (!data.slug || data.slug === generateSlug(data.name)) {
            setData('slug', generateSlug(name));
        }
    };

    return (
        <AppShell>
            <Head title="Create Role" />
            
            <div className="container mx-auto p-6">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Link href="/roles" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            🛡️ Roles
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-700 dark:text-gray-300">Create New Role</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        🛡️ Create New Role
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Define a new user role with specific permissions and access levels
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Role Information */}
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                            📝 Role Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Role Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.name}
                                                    onChange={(e) => handleNameChange(e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="Administrator"
                                                    required
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Role Slug <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={data.slug}
                                                    onChange={(e) => setData('slug', e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="administrator"
                                                    required
                                                />
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Used for system identification (lowercase, no spaces)
                                                </p>
                                                {errors.slug && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.slug}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Description
                                                </label>
                                                <textarea
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    rows={4}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    placeholder="Describe the role's purpose and responsibilities..."
                                                />
                                                {errors.description && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
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
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
                                                Active role (can be assigned to users)
                                            </label>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                                        <Link
                                            href="/roles"
                                            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-colors"
                                        >
                                            Cancel
                                        </Link>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            {processing ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating Role...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="mr-2">🛡️</span>
                                                    Create Role
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar with Tips */}
                    <div className="space-y-6">
                        {/* Role Tips */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
                                💡 Role Best Practices
                            </h3>
                            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Use clear, descriptive names
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Follow the principle of least privilege
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Create roles based on job functions
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">•</span>
                                    Regularly review role permissions
                                </li>
                            </ul>
                        </div>

                        {/* Common Roles */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-4">
                                🛡️ Common Role Examples
                            </h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                                    <div className="font-medium text-green-800 dark:text-green-300">Superadmin</div>
                                    <div className="text-sm text-green-600 dark:text-green-400">Full system access and control</div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                                    <div className="font-medium text-green-800 dark:text-green-300">Administrator</div>
                                    <div className="text-sm text-green-600 dark:text-green-400">Administrative privileges without system settings</div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                                    <div className="font-medium text-green-800 dark:text-green-300">Operator</div>
                                    <div className="text-sm text-green-600 dark:text-green-400">Day-to-day operational tasks</div>
                                </div>
                                <div className="p-3 bg-white dark:bg-gray-800 rounded-md">
                                    <div className="font-medium text-green-800 dark:text-green-300">Auditor</div>
                                    <div className="text-sm text-green-600 dark:text-green-400">Read-only access for compliance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}