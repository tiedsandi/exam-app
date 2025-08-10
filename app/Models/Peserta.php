<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Peserta extends Model
{
    protected $table = 'peserta';
    protected $fillable = [
        'no_ujian',
        'password',
        'nama_peserta',
        'jenis_kelamin',
        'nama_sekolah',
        'kelas',
    ];
}
