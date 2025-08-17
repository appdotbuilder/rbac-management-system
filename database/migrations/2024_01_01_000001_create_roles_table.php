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
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->comment('Role name');
            $table->string('slug')->unique()->comment('Role slug for system reference');
            $table->text('description')->nullable()->comment('Role description');
            $table->boolean('is_active')->default(true)->comment('Role status');
            $table->timestamps();
            
            // Add indexes for performance
            $table->index('name');
            $table->index('slug');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};