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
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique()->comment('User type name');
            $table->string('slug')->unique()->comment('User type slug for system reference');
            $table->text('description')->nullable()->comment('User type description');
            $table->boolean('is_active')->default(true)->comment('User type status');
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
        Schema::dropIfExists('user_types');
    }
};