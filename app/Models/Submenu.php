<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Submenu
 *
 * @property int $id
 * @property int $menu_id
 * @property string $name
 * @property string $slug
 * @property string|null $icon
 * @property string|null $route
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Menu $menu
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RoleMenuAccess> $roleAccess
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu query()
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereMenuId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereRoute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Submenu active()
 * @method static \Database\Factories\SubmenuFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Submenu extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'menu_id',
        'name',
        'slug',
        'icon',
        'route',
        'sort_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'menu_id' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the menu that owns this submenu.
     */
    public function menu(): BelongsTo
    {
        return $this->belongsTo(Menu::class);
    }

    /**
     * Get the role access permissions for this submenu.
     */
    public function roleAccess(): HasMany
    {
        return $this->hasMany(RoleMenuAccess::class);
    }

    /**
     * Get the roles that have access to this submenu.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_menu_access')
            ->withPivot(['can_view', 'can_create', 'can_edit', 'can_delete'])
            ->withTimestamps();
    }

    /**
     * Scope a query to only include active submenus.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}