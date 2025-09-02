<?php

namespace App\Http\Controllers\Admin;

use App\Exports\ExportFormatPeserta;
use App\Exports\ExportPeserta;
use App\Http\Controllers\Controller;
use App\Imports\ImportPeserta;
use App\Models\Jawaban;
use App\Models\Kelompok;
use App\Models\Nilai;
use App\Models\Peserta;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class AdminPesertaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $peserta = Peserta::orderBy('no_ujian', 'asc')->paginate(10);

        return Inertia::render('Peserta/Index', [
            'peserta' => $peserta
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Peserta/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'no_ujian' => 'required|unique:peserta',
            'nama_peserta' => 'required',
            'jenis_kelamin' => 'required',
            'nama_sekolah' => 'required',
            'kelas' => 'required',
        ]);

        if ($request->password == "") $password = substr(md5($request->no_ujian), 0, 5);
        else $password = $request->password;

        Peserta::create([
            'no_ujian' => $request->no_ujian,
            'nama_peserta' => $request->nama_peserta,
            'jenis_kelamin' => $request->jenis_kelamin,
            'nama_sekolah' => $request->nama_sekolah,
            'kelas' => $request->kelas,
            'password' => $password
        ]);

        return Redirect::route('admin.peserta.index')
            ->with(['message' => 'Data berhasil ditambahkan']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Peserta/Edit', [
            'peserta' => Peserta::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'no_ujian' => 'required',
            'nama_peserta' => 'required',
            'jenis_kelamin' => 'required',
            'nama_sekolah' => 'required',
            'kelas' => 'required',
        ]);
        $peserta = Peserta::find($id);

        if ($request->password != "") $password = $request->password;
        else $password = $peserta->password;

        $peserta->update([
            'no_ujian' => $request->no_ujian,
            'nama_peserta' => $request->nama_peserta,
            'jenis_kelamin' => $request->jenis_kelamin,
            'nama_sekolah' => $request->nama_sekolah,
            'kelas' => $request->kelas,
            'password' => $password
        ]);

        return Redirect::route('admin.peserta.index')
            ->with(['message' => 'Data berhasil diedit']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Peserta::find($id)->delete();

        Kelompok::where('id_peserta', '=', $id)->delete();
        Jawaban::where('id_peserta', '=', $id)->delete();
        Nilai::where('id_peserta', '=', $id)->delete();

        return Redirect::route('admin.peserta.index')
            ->with(['message' => 'Data berhasil dihapus']);
    }

    public function importForm()
    {
        return Inertia::render('Peserta/Import');
    }

    //proses import data
    public function import(Request $request)
    {
        $request->validate([
            'file_import' => 'required'
        ]);

        $file = $request->file_import;

        $peserta = new ImportPeserta();

        Excel::import($peserta, $file);

        return Redirect::route('admin.peserta.index')
            ->with(['message' => 'Data peserta berhasil diimpor']);
    }

    //download excel
    public function export()
    {
        $peserta = new ExportPeserta();
        return Excel::download($peserta, 'Data Peserta.xlsx');
    }

    //download format untuk impor
    public function downloadFormat()
    {
        $format = new ExportFormatPeserta();
        return Excel::download($format, 'Format Data Peserta.xlsx');
    }

    //halaman cetak kartu
    public function print()
    {
        return Inertia::render('Peserta/Print');
    }

    //kartu pdf
    public function kartuPdf()
    {
        $peserta = Peserta::orderBy('peserta.no_ujian', 'asc')->get();

        $pdf = Pdf::loadView('kartu_pdf', compact('peserta'));

        return $pdf->stream('kartu_peserta.pdf', ["Attachment" => false]);
    }
}
