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
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Menu name');
            $table->string('slug')->unique()->comment('Menu slug for system reference');
            $table->string('icon')->nullable()->comment('Menu icon');
            $table->string('route')->nullable()->comment('Menu route');
            $table->integer('sort_order')->default(0)->comment('Sort order');
            $table->boolean('is_active')->default(true)->comment('Menu status');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('name');
            $table->index('slug');
            $table->index('sort_order');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};