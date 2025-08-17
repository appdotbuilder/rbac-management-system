<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use App\Models\Menu;
use App\Models\UserType;
use Inertia\Inertia;

class RbacDashboardController extends Controller
{
    /**
     * Display the RBAC management dashboard.
     */
    public function index()
    {
        $stats = [
            'users' => [
                'total' => User::count(),
                'active' => User::where('is_active', true)->count(),
                'inactive' => User::where('is_active', false)->count(),
                'recent' => User::where('created_at', '>=', now()->subDays(30))->count(),
            ],
            'roles' => [
                'total' => Role::count(),
                'active' => Role::where('is_active', true)->count(),
                'inactive' => Role::where('is_active', false)->count(),
            ],
            'menus' => [
                'total' => Menu::count(),
                'active' => Menu::where('is_active', true)->count(),
                'inactive' => Menu::where('is_active', false)->count(),
            ],
            'userTypes' => [
                'total' => UserType::count(),
                'active' => UserType::where('is_active', true)->count(),
                'inactive' => UserType::where('is_active', false)->count(),
            ],
        ];

        // Recent activity
        $recentUsers = User::with(['role', 'userType'])
            ->latest()
            ->take(5)
            ->get();

        $roleDistribution = Role::withCount('users')
            ->where('is_active', true)
            ->get()
            ->map(function ($role) {
                return [
                    'name' => $role->name,
                    'count' => $role->users_count,
                    'percentage' => User::count() > 0 ? round(($role->users_count / User::count()) * 100, 1) : 0
                ];
            });

        return Inertia::render('rbac/dashboard', [
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'roleDistribution' => $roleDistribution,
        ]);
    }
}