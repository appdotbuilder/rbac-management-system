<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\UserType;
use App\Models\Menu;
use App\Models\Submenu;
use App\Models\RoleMenuAccess;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RbacSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Roles
        $roles = [
            [
                'name' => 'Superadmin',
                'slug' => 'superadmin',
                'description' => 'Full system access with all permissions'
            ],
            [
                'name' => 'Administrator',
                'slug' => 'administrator',
                'description' => 'Administrative access with most permissions'
            ],
            [
                'name' => 'Operator',
                'slug' => 'operator',
                'description' => 'Operational access with moderate permissions'
            ],
            [
                'name' => 'User',
                'slug' => 'user',
                'description' => 'Standard user with basic permissions'
            ],
            [
                'name' => 'Auditor',
                'slug' => 'auditor',
                'description' => 'Read-only access for auditing purposes'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(
                ['slug' => $role['slug']],
                $role + ['is_active' => true]
            );
        }

        // Create User Types
        $userTypes = [
            [
                'name' => 'Internal User',
                'slug' => 'internal-user',
                'description' => 'Internal company employees'
            ],
            [
                'name' => 'External User',
                'slug' => 'external-user',
                'description' => 'External users and contractors'
            ],
            [
                'name' => 'Client',
                'slug' => 'client',
                'description' => 'Client users with limited access'
            ],
            [
                'name' => 'Partner',
                'slug' => 'partner',
                'description' => 'Business partner users'
            ]
        ];

        foreach ($userTypes as $userType) {
            UserType::firstOrCreate(
                ['slug' => $userType['slug']],
                $userType + ['is_active' => true]
            );
        }

        // Create Menus
        $menus = [
            [
                'name' => 'Dashboard',
                'slug' => 'dashboard',
                'icon' => 'chart-bar',
                'route' => 'dashboard',
                'sort_order' => 1
            ],
            [
                'name' => 'User Management',
                'slug' => 'user-management',
                'icon' => 'users',
                'route' => null,
                'sort_order' => 2
            ],
            [
                'name' => 'Role Management',
                'slug' => 'role-management',
                'icon' => 'shield-check',
                'route' => null,
                'sort_order' => 3
            ],
            [
                'name' => 'Menu Management',
                'slug' => 'menu-management',
                'icon' => 'bars-3',
                'route' => null,
                'sort_order' => 4
            ],
            [
                'name' => 'Access Control',
                'slug' => 'access-control',
                'icon' => 'lock-closed',
                'route' => null,
                'sort_order' => 5
            ],
            [
                'name' => 'Reports',
                'slug' => 'reports',
                'icon' => 'document-chart-bar',
                'route' => null,
                'sort_order' => 6
            ],
            [
                'name' => 'Settings',
                'slug' => 'settings',
                'icon' => 'cog-6-tooth',
                'route' => 'settings.index',
                'sort_order' => 7
            ]
        ];

        foreach ($menus as $menu) {
            Menu::firstOrCreate(
                ['slug' => $menu['slug']],
                $menu + ['is_active' => true]
            );
        }

        // Create Submenus
        $submenus = [
            // User Management submenus
            ['menu_slug' => 'user-management', 'name' => 'All Users', 'slug' => 'all-users', 'route' => 'users.index', 'sort_order' => 1],
            ['menu_slug' => 'user-management', 'name' => 'Create User', 'slug' => 'create-user', 'route' => 'users.create', 'sort_order' => 2],
            ['menu_slug' => 'user-management', 'name' => 'User Types', 'slug' => 'user-types', 'route' => 'user-types.index', 'sort_order' => 3],

            // Role Management submenus
            ['menu_slug' => 'role-management', 'name' => 'All Roles', 'slug' => 'all-roles', 'route' => 'roles.index', 'sort_order' => 1],
            ['menu_slug' => 'role-management', 'name' => 'Create Role', 'slug' => 'create-role', 'route' => 'roles.create', 'sort_order' => 2],
            ['menu_slug' => 'role-management', 'name' => 'Role Permissions', 'slug' => 'role-permissions', 'route' => 'role-permissions.index', 'sort_order' => 3],

            // Menu Management submenus
            ['menu_slug' => 'menu-management', 'name' => 'All Menus', 'slug' => 'all-menus', 'route' => 'menus.index', 'sort_order' => 1],
            ['menu_slug' => 'menu-management', 'name' => 'Create Menu', 'slug' => 'create-menu', 'route' => 'menus.create', 'sort_order' => 2],
            ['menu_slug' => 'menu-management', 'name' => 'Submenus', 'slug' => 'submenus', 'route' => 'submenus.index', 'sort_order' => 3],

            // Access Control submenus
            ['menu_slug' => 'access-control', 'name' => 'Menu Access', 'slug' => 'menu-access', 'route' => 'menu-access.index', 'sort_order' => 1],
            ['menu_slug' => 'access-control', 'name' => 'Role Assignment', 'slug' => 'role-assignment', 'route' => 'role-assignment.index', 'sort_order' => 2],

            // Reports submenus
            ['menu_slug' => 'reports', 'name' => 'User Reports', 'slug' => 'user-reports', 'route' => 'reports.users', 'sort_order' => 1],
            ['menu_slug' => 'reports', 'name' => 'Access Reports', 'slug' => 'access-reports', 'route' => 'reports.access', 'sort_order' => 2],
            ['menu_slug' => 'reports', 'name' => 'Activity Reports', 'slug' => 'activity-reports', 'route' => 'reports.activity', 'sort_order' => 3],
        ];

        foreach ($submenus as $submenu) {
            $menu = Menu::where('slug', $submenu['menu_slug'])->first();
            if ($menu) {
                Submenu::firstOrCreate(
                    ['menu_id' => $menu->id, 'slug' => $submenu['slug']],
                    [
                        'name' => $submenu['name'],
                        'slug' => $submenu['slug'],
                        'route' => $submenu['route'],
                        'sort_order' => $submenu['sort_order'],
                        'is_active' => true
                    ]
                );
            }
        }

        // Create default access permissions
        $this->createDefaultPermissions();

        // Create a demo superadmin user
        $superadminRole = Role::where('slug', 'superadmin')->first();
        $internalUserType = UserType::where('slug', 'internal-user')->first();

        if ($superadminRole && $internalUserType) {
            User::firstOrCreate(
                ['email' => 'admin@example.com'],
                [
                    'name' => 'System Administrator',
                    'password' => 'password',
                    'role_id' => $superadminRole->id,
                    'user_type_id' => $internalUserType->id,
                    'is_active' => true,
                    'email_verified_at' => now(),
                ]
            );
        }
    }

    /**
     * Create default permissions for roles.
     */
    protected function createDefaultPermissions(): void
    {
        $roles = Role::all();
        $menus = Menu::all();
        $submenus = Submenu::all();

        foreach ($roles as $role) {
            // Superadmin gets full access to everything
            if ($role->slug === 'superadmin') {
                foreach ($menus as $menu) {
                    RoleMenuAccess::firstOrCreate(
                        ['role_id' => $role->id, 'menu_id' => $menu->id],
                        [
                            'can_view' => true,
                            'can_create' => true,
                            'can_edit' => true,
                            'can_delete' => true,
                        ]
                    );
                }
                foreach ($submenus as $submenu) {
                    RoleMenuAccess::firstOrCreate(
                        ['role_id' => $role->id, 'submenu_id' => $submenu->id],
                        [
                            'can_view' => true,
                            'can_create' => true,
                            'can_edit' => true,
                            'can_delete' => true,
                        ]
                    );
                }
            }
            // Administrator gets most permissions
            elseif ($role->slug === 'administrator') {
                foreach ($menus as $menu) {
                    RoleMenuAccess::firstOrCreate(
                        ['role_id' => $role->id, 'menu_id' => $menu->id],
                        [
                            'can_view' => true,
                            'can_create' => true,
                            'can_edit' => true,
                            'can_delete' => false,
                        ]
                    );
                }
                foreach ($submenus as $submenu) {
                    RoleMenuAccess::firstOrCreate(
                        ['role_id' => $role->id, 'submenu_id' => $submenu->id],
                        [
                            'can_view' => true,
                            'can_create' => true,
                            'can_edit' => true,
                            'can_delete' => false,
                        ]
                    );
                }
            }
            // Auditor gets read-only access
            elseif ($role->slug === 'auditor') {
                foreach ($menus as $menu) {
                    RoleMenuAccess::firstOrCreate(
                        ['role_id' => $role->id, 'menu_id' => $menu->id],
                        [
                            'can_view' => true,
                            'can_create' => false,
                            'can_edit' => false,
                            'can_delete' => false,
                        ]
                    );
                }
                foreach ($submenus as $submenu) {
                    RoleMenuAccess::firstOrCreate(
                        ['role_id' => $role->id, 'submenu_id' => $submenu->id],
                        [
                            'can_view' => true,
                            'can_create' => false,
                            'can_edit' => false,
                            'can_delete' => false,
                        ]
                    );
                }
            }
            // Standard user gets limited access
            elseif ($role->slug === 'user') {
                $allowedMenus = ['dashboard', 'reports'];
                foreach ($menus as $menu) {
                    if (in_array($menu->slug, $allowedMenus)) {
                        RoleMenuAccess::firstOrCreate(
                            ['role_id' => $role->id, 'menu_id' => $menu->id],
                            [
                                'can_view' => true,
                                'can_create' => false,
                                'can_edit' => false,
                                'can_delete' => false,
                            ]
                        );
                    }
                }
            }
        }
    }
}