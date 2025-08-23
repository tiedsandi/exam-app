<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ExportFormatSoal;
use App\Http\Controllers\Controller;
use App\Imports\ImportSoal;
use App\Models\Soal;
use App\Models\Ujian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AdminSoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->session()->put('idujian', "");

        $soal = Soal::where('id_ujian', 0)->paginate(10);

        return Inertia::render('Soal/Index', [
            'ujian' => Ujian::all(),
            'soal' => $soal,
            'id' => 0
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $ujianaktif = $request->session()->get('idujian');
        return Inertia::render('Soal/Create', [
            'ujian' => Ujian::all(),
            'ujianaktif' => $ujianaktif
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'soal' => 'required',
            'id_ujian' => 'required',
            'pilihan_1' => 'required',
            'pilihan_2' => 'required',
            'kunci' => 'required',
        ]);

        $soal = new Soal();
        $soal->soal = $request->soal;
        $soal->id_ujian = $request->id_ujian;
        $soal->pilihan_1 = $request->pilihan_1;
        $soal->pilihan_2 = $request->pilihan_2;
        $soal->pilihan_3 = $request->pilihan_3;
        $soal->pilihan_4 = $request->pilihan_4;
        $soal->pilihan_5 = $request->pilihan_5;
        $soal->kunci = $request->kunci;
        $soal->save();

        return Redirect::route('admin.soal.show', $request->id_ujian)
            ->with(['message' => 'Data berhasil ditambahkan']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        if ($id != 0) {
            $request->session()->put('idujian', $id);
        } else {
            $request->session()->put('idujian', "");
        }

        $soal = Soal::orderBy('id', 'desc')
            ->where('id_ujian', '=', $id)
            ->paginate(10);

        return Inertia::render('Soal/Index', [
            'ujian' => Ujian::all(),
            'soal' => $soal,
            'id' => $id
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Soal $soal)
    {
        $ujianaktif = $request->session()->get('idujian');
        return Inertia::render('Soal/Edit', [
            'soal' => $soal,
            'ujian' => Ujian::all(),
            'ujianaktif' => $ujianaktif
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Soal $soal)
    {
        $request->validate([
            'soal' => 'required',
            'id_ujian' => 'required',
            'pilihan_1' => 'required',
            'pilihan_2' => 'required',
            'kunci' => 'required',
        ]);

        $soal->update($request->all());

        return Redirect::route('admin.soal.show', $request->id_ujian)
            ->with(['message' => 'Data berhasil diedit']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Soal $soal)
    {
        $soal->delete();

        $ujian = $request->session()->get('idujian');
        return Redirect::route('admin.soal.show', $ujian)
            ->with(['message' => 'Data berhasil dihapus']);
    }

    //tampilkan halaman impor data
    public function importForm(Request $request)
    {
        $ujianaktif = $request->session()->get('idujian');
        return Inertia::render('Soal/Import', [
            'ujian' => Ujian::all(),
            'ujianaktif' => $ujianaktif
        ]);
    }

    //proses import data
    public function import(Request $request)
    {
        $request->validate([
            'id_ujian' => 'required',
            'file_import' => 'required|mimes:xlsx'
        ]);

        $file = $request->file('file_import');
        $soal = new ImportSoal($request->id_ujian);

        Excel::import($soal, $file);

        return Redirect::route('admin.soal.show', $request->id_ujian)
            ->with(['message' => 'Data peserta berhasil diimpor']);
    }

    //download format untuk impor
    public function downloadFormat()
    {
        $format = new ExportFormatSoal();
        return Excel::download($format, 'Format Soal.xlsx');
    }
}
