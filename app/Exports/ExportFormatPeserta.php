<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExportFormatPeserta implements FromArray, ShouldAutoSize
{
    
    public function array(): array
    {
        $data = array();
        
        $data[] = array(
            "NO", 
            "NO UJIAN", 
            "NAMA PESERTA", 
            "JENIS KELAMIN",
            "NAMA SEKOLAH",
            "KELAS",
            "PASSWORD",
        );

        $data[] = array(
            1,
            "No Unik",
            "Contoh Nama",
            "L/P",
            "Asal Sekolah",
            "Nama Rombel",
            "Terserah/kosongkan",
        );
      
        return $data;
    }
}
