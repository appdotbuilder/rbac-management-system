<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuRequest;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Menu::withCount('submenus');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        $menus = $query->orderBy('sort_order')->paginate(10)->withQueryString();
        
        return Inertia::render('rbac/menus/index', [
            'menus' => $menus,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('rbac/menus/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuRequest $request)
    {
        $menu = Menu::create($request->validated());

        return redirect()->route('menus.show', $menu)
            ->with('success', 'Menu created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Menu $menu)
    {
        $menu->load(['submenus' => function ($query) {
            $query->orderBy('sort_order');
        }]);
        
        return Inertia::render('rbac/menus/show', [
            'menu' => $menu
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        return Inertia::render('rbac/menus/edit', [
            'menu' => $menu
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreMenuRequest $request, Menu $menu)
    {
        $menu->update($request->validated());

        return redirect()->route('menus.show', $menu)
            ->with('success', 'Menu updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Menu $menu)
    {
        $menu->delete();

        return redirect()->route('menus.index')
            ->with('success', 'Menu deleted successfully.');
    }
}