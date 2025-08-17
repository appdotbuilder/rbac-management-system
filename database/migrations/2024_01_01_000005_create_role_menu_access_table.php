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
        Schema::create('role_menu_access', function (Blueprint $table) {
            $table->id();
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
            $table->foreignId('menu_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('submenu_id')->nullable()->constrained()->onDelete('cascade');
            $table->boolean('can_view')->default(true)->comment('Can view permission');
            $table->boolean('can_create')->default(false)->comment('Can create permission');
            $table->boolean('can_edit')->default(false)->comment('Can edit permission');
            $table->boolean('can_delete')->default(false)->comment('Can delete permission');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index(['role_id', 'menu_id']);
            $table->index(['role_id', 'submenu_id']);
            $table->index(['role_id', 'menu_id', 'submenu_id']);
            
            // Unique constraint to prevent duplicate permissions
            $table->unique(['role_id', 'menu_id', 'submenu_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_menu_access');
    }
};