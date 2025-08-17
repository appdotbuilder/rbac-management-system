import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-indigo-50 to-white p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-[1200px] text-sm">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg border border-indigo-200 px-6 py-2 text-sm font-medium text-indigo-700 transition-colors hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300 dark:hover:bg-indigo-900"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/rbac"
                                    className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    RBAC Management
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[1200px] flex-col lg:flex-row lg:gap-12">
                        {/* Hero Content */}
                        <div className="flex-1 text-center lg:text-left lg:py-20">
                            <div className="mb-8">
                                <h1 className="mb-4 text-5xl font-bold leading-tight">
                                    🔐 <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">RBAC Management System</span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Complete Role-Based Access Control solution for modern applications. 
                                    Manage users, roles, and permissions with enterprise-grade security.
                                </p>
                            </div>

                            {/* Feature Grid */}
                            <div className="grid gap-6 md:grid-cols-2 mb-8">
                                <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900">
                                            <span className="text-2xl">👥</span>
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Complete CRUD operations, password management, and role assignments for all users.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900">
                                            <span className="text-2xl">🛡️</span>
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Role Control</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Define roles like Superadmin, Administrator, Operator, User, and Auditor with precision.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900">
                                            <span className="text-2xl">🗂️</span>
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">User Types</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Classify users into Internal, External, Client, Partner, and custom categories.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-6 shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                    <div className="flex items-center mb-3">
                                        <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900">
                                            <span className="text-2xl">📋</span>
                                        </div>
                                        <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Menu System</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Dynamic navigation management with submenus and granular access permissions.
                                    </p>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 dark:from-indigo-900/20 dark:to-purple-900/20 dark:border-indigo-800">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">🚀 Ready to Get Started?</h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Join thousands of applications using our secure RBAC system for enterprise-grade access control.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    {auth.user ? (
                                        <Link
                                            href="/rbac"
                                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-lg font-semibold text-white transition-all hover:from-indigo-700 hover:to-purple-700 hover:scale-105"
                                        >
                                            Open RBAC Dashboard →
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-lg font-semibold text-white transition-all hover:from-indigo-700 hover:to-purple-700 hover:scale-105"
                                            >
                                                Get Started Free →
                                            </Link>
                                            <Link
                                                href={route('login')}
                                                className="inline-flex items-center justify-center rounded-lg border border-indigo-300 px-8 py-3 text-lg font-semibold text-indigo-700 transition-all hover:bg-indigo-50 dark:border-indigo-600 dark:text-indigo-300 dark:hover:bg-indigo-900"
                                            >
                                                Sign In
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Visual Content */}
                        <div className="flex-1 mt-8 lg:mt-0 lg:py-20">
                            <div className="rounded-2xl bg-white p-8 shadow-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">📊 System Overview</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                        <span className="font-medium text-blue-900 dark:text-blue-300">👥 Active Users</span>
                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                                        <span className="font-medium text-green-900 dark:text-green-300">🛡️ Roles Defined</span>
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">8</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                                        <span className="font-medium text-purple-900 dark:text-purple-300">📋 Menu Items</span>
                                        <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">24</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                                        <span className="font-medium text-orange-900 dark:text-orange-300">🔒 Access Rules</span>
                                        <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">156</span>
                                    </div>
                                </div>
                                
                                <div className="mt-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Security Level</div>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-600">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                        </div>
                                        <span className="text-sm font-bold text-green-600 dark:text-green-400">92% Secure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}