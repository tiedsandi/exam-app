<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kelompok extends Model
{
    protected $table = 'kelompok';

    protected $fillable = [
        'id_peserta',
        'id_ujian',
        'id_sesi',
    ];

    // Relasi ke Ujian
    public function ujian()
    {
        return $this->belongsTo(Ujian::class, 'id_ujian');
    }

    // Relasi ke Sesi
    public function sesi()
    {
        return $this->belongsTo(Sesi::class, 'id_sesi');
    }

    // Relasi ke Peserta
    public function peserta()
    {
        return $this->belongsTo(Peserta::class, 'id_peserta');
    }
}
