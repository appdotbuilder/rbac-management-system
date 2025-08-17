<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\RoleMenuAccess
 *
 * @property int $id
 * @property int $role_id
 * @property int|null $menu_id
 * @property int|null $submenu_id
 * @property bool $can_view
 * @property bool $can_create
 * @property bool $can_edit
 * @property bool $can_delete
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Role $role
 * @property-read \App\Models\Menu|null $menu
 * @property-read \App\Models\Submenu|null $submenu
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess query()
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereCanCreate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereCanDelete($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereCanEdit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereCanView($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereMenuId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereSubmenuId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|RoleMenuAccess whereUpdatedAt($value)
 * @method static \Database\Factories\RoleMenuAccessFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class RoleMenuAccess extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'role_menu_access';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'role_id',
        'menu_id',
        'submenu_id',
        'can_view',
        'can_create',
        'can_edit',
        'can_delete',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'role_id' => 'integer',
        'menu_id' => 'integer',
        'submenu_id' => 'integer',
        'can_view' => 'boolean',
        'can_create' => 'boolean',
        'can_edit' => 'boolean',
        'can_delete' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the role that owns this access permission.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Get the menu this access permission is for.
     */
    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    /**
     * Get the submenu this access permission is for.
     */
    public function submenu(): BelongsTo
    {
        return $this->belongsTo(Submenu::class);
    }
}