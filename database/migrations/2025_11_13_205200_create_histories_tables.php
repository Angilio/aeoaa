<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Table historique pour les entrées
        Schema::create('entrees_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entree_id');
            $table->string('field_name', 100);
            $table->text('old_value')->nullable();
            $table->text('new_value')->nullable();
            $table->enum('action_type', ['create', 'update', 'delete', 'annulation']);
            $table->text('reason')->nullable();
            $table->unsignedBigInteger('modified_by');
            $table->timestamp('modified_at')->useCurrent();
            $table->string('ip_address', 45)->nullable();

            $table->index(['entree_id', 'modified_at', 'modified_by']);

            $table->foreign('entree_id')
                  ->references('id')
                  ->on('entrees')
                  ->onDelete('cascade');
        });

        // Table historique pour les sorties
        Schema::create('sorties_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sortie_id');
            $table->string('field_name', 100);
            $table->text('old_value')->nullable();
            $table->text('new_value')->nullable();
            $table->enum('action_type', ['create', 'update', 'delete', 'annulation']);
            $table->text('reason')->nullable();
            $table->unsignedBigInteger('modified_by');
            $table->timestamp('modified_at')->useCurrent();
            $table->string('ip_address', 45)->nullable();

            $table->index(['sortie_id', 'modified_at', 'modified_by']);

            $table->foreign('sortie_id')
                  ->references('id')
                  ->on('sorties')
                  ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sorties_history');
        Schema::dropIfExists('entrees_history');
    }
};
