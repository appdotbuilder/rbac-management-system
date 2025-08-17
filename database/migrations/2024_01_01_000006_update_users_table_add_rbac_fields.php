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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('user_type_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('is_active')->default(true)->comment('User status');
            $table->timestamp('last_login_at')->nullable()->comment('Last login timestamp');
            
            // Add indexes for performance
            $table->index('role_id');
            $table->index('user_type_id');
            $table->index('is_active');
            $table->index('last_login_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role_id']);
            $table->dropIndex(['user_type_id']);
            $table->dropIndex(['is_active']);
            $table->dropIndex(['last_login_at']);
            
            $table->dropForeign(['role_id']);
            $table->dropForeign(['user_type_id']);
            
            $table->dropColumn(['role_id', 'user_type_id', 'is_active', 'last_login_at']);
        });
    }
};