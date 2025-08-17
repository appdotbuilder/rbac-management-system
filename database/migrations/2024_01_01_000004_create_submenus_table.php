<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('submenus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained()->onDelete('cascade');
            $table->string('name')->comment('Submenu name');
            $table->string('slug')->comment('Submenu slug for system reference');
            $table->string('icon')->nullable()->comment('Submenu icon');
            $table->string('route')->nullable()->comment('Submenu route');
            $table->integer('sort_order')->default(0)->comment('Sort order');
            $table->boolean('is_active')->default(true)->comment('Submenu status');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index(['menu_id', 'name']);
            $table->index('slug');
            $table->index('sort_order');
            $table->index('is_active');
            
            // Unique constraint for slug within menu
            $table->unique(['menu_id', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submenus');
    }
};