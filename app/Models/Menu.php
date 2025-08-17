<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * App\Models\Menu
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $icon
 * @property string|null $route
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Submenu> $submenus
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\RoleMenuAccess> $roleAccess
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Role> $roles
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Menu newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu query()
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereRoute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Menu active()
 * @method static \Database\Factories\MenuFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Menu extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
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
        'sort_order' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the submenus for this menu.
     */
    public function submenus(): HasMany
    {
        return $this->hasMany(Submenu::class)->orderBy('sort_order');
    }

    /**
     * Get the role access permissions for this menu.
     */
    public function roleAccess(): HasMany
    {
        return $this->hasMany(RoleMenuAccess::class);
    }

    /**
     * Get the roles that have access to this menu.
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_menu_access')
            ->withPivot(['can_view', 'can_create', 'can_edit', 'can_delete'])
            ->withTimestamps();
    }

    /**
     * Scope a query to only include active menus.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}