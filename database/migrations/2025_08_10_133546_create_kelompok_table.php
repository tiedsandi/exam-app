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
        Schema::create('kelompok', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_peserta')->references('id')->on('peserta')->cascadeOnDelete();
            $table->foreignId('id_ujian')->references('id')->on('ujian')->cascadeOnDelete();
            $table->foreignId('id_sesi')->references('id')->on('sesi')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelompok');
    }
};
