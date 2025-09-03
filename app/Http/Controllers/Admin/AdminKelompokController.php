<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kelompok;
use App\Models\Peserta;
use App\Models\Sesi;
use App\Models\Ujian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminKelompokController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Kelompok::with(['ujian', 'sesi', 'peserta'])->latest();

        if ($request->has('ujian_id') && $request->ujian_id) {
            $query->where('id_ujian', $request->ujian_id);
        }

        $kelompok = $query->paginate(10)->through(fn($klp) => [
            'id' => $klp->id,
            'no_ujian' => $klp->peserta->no_ujian ?? '-',
            'nama_peserta' => $klp->peserta->nama_peserta ?? '-',
            'nama_sesi' => $klp->sesi->nama_sesi ?? '-',
        ]);

        return Inertia::render('Kelompok/Index', [
            'ujian' => Ujian::all(),
            'kelompok' => $kelompok,
            'id' => $request->ujian_id ?? 0,
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $ujianaktif = $request->session()->get('idujian');
        $peserta_kelompok = Kelompok::where('id_ujian', '=', $ujianaktif)->pluck('id_peserta')->all();
        $peserta = Peserta::whereNotIn('id', $peserta_kelompok)->get();
        return Inertia::render('Kelompok/Create', [
            'peserta' => $peserta,
            'ujian' => Ujian::all(),
            'sesi' => Sesi::where('id_ujian', '=', $ujianaktif)->get(),
            'ujianaktif' => $ujianaktif
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'peserta' => 'required',
            'id_ujian' => 'required',
            'id_sesi' => 'required',
        ]);

        foreach ($request->peserta as $pst) {
            $peserta = Peserta::where('no_ujian', '=', $pst)->first();
            if ($peserta !== null) {
                $kelompok = new Kelompok();
                $kelompok->id_peserta = $peserta->id;
                $kelompok->id_ujian = $request->id_ujian;
                $kelompok->id_sesi = $request->id_sesi;
                $kelompok->save();
            }
        }

        return Redirect::route('admin.kelompok.index', ['ujian_id' => $request->id_ujian])
            ->with(['message' => 'Data berhasil ditambahkan']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Kelompok $kelompok)
    {
        $kelompok->delete();

        $ujian = $request->session()->get('idujian');
        return Redirect::route('admin.kelompok.index', ['ujian_id' => $ujian])
            ->with(['message' => 'Data berhasil dihapus']);
    }

    public function setUjian(Request $request, $id)
    {
        $request->session()->put('idujian', $id);
        return Redirect::route('admin.kelompok.create');
    }

    public function getSesi($id)
    {
        $sesi = Sesi::where('id_ujian', $id)->get();
        return response()->json($sesi);
    }

    public function getPeserta($id)
    {
        $peserta_kelompok = Kelompok::where('id_ujian', $id)->pluck('id_peserta')->all();
        $peserta = Peserta::whereNotIn('id', $peserta_kelompok)->get();

        return response()->json($peserta);
    }
}
