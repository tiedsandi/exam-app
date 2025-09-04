<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ExportJawaban;
use App\Exports\ExportNilai;
use App\Http\Controllers\Controller;
use App\Models\Jawaban;
use App\Models\Nilai;
use App\Models\Ujian;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AdminNilaiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Nilai/Index', [
            'ujian' => Ujian::all(),
            'nilai' => [
                'data' => [],
                'links' => [],
                'from' => 0,
            ],
            'id' => 0
        ]);
    }

    public function show(Request $rq, $id)
    {
        $rq->session()->put('idujian', $id);

        $nilai = Nilai::leftJoin('peserta', 'peserta.id', '=', 'nilai.id_peserta')
            ->select('peserta.no_ujian', 'peserta.nama_peserta', 'nilai.*')
            ->orderBy('peserta.no_ujian', 'asc')
            ->where('id_ujian', '=', $id)
            ->paginate(10); // pakai pagination

        return Inertia::render('Nilai/Index', [
            'ujian' => Ujian::all(),
            'nilai' => $nilai,
            'id' => $id
        ]);
    }


    public function view(Request $rq, $id)
    {
        $ujian = $rq->session()->get('idujian');

        $soal = Jawaban::leftJoin('soal', 'soal.id', '=', 'jawaban.id_soal')
            ->leftJoin('peserta', 'peserta.id', '=', 'jawaban.id_peserta')
            ->select('jawaban.jawaban', 'soal.*')
            ->where([
                'jawaban.id_ujian' => $ujian,
                'jawaban.id_peserta' => $id
            ])
            ->orderBy('jawaban.urut')
            ->get();

        return Inertia::render('Nilai/View', [
            'soal' => $soal,
            'ujianaktif' => $ujian
        ]);
    }

    public function export($id)
    {
        $ujian = Ujian::find($id);
        $file = $ujian->nama_ujian;

        $nilai = new ExportNilai($id);
        return Excel::download($nilai, 'Nilai ' . $file . '.xlsx');
    }

    public function exportJawaban($id)
    {
        $ujian = Ujian::find($id);
        $file = $ujian->nama_ujian;

        $jawaban = new ExportJawaban($id);
        return Excel::download($jawaban, 'Jawaban ' . $file . '.xlsx');
    }
}
