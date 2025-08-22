<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sesi;
use App\Models\Ujian;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AdminSesiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $request->session()->put('idujian', 0);

        $sesi = Sesi::leftJoin('ujian', 'ujian.id', '=', 'sesi.id_ujian')
            ->select('ujian.nama_ujian', 'sesi.*')
            ->orderBy('id', 'desc')->paginate(10);

        return Inertia::render('Sesi/Index', [
            'ujian' => Ujian::all(),
            'sesi' => $sesi,
            'id' => 0
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $ujianaktif = $request->session()->get('idujian');
        return Inertia::render('Sesi/Create', [
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
            'id_ujian' => 'required',
            'nama_sesi' => 'required',
            'mulai' => 'required',
            'selesai' => 'required',
        ]);

        Sesi::create([
            'id_ujian' => $request->id_ujian,
            'nama_sesi' => $request->nama_sesi,
            'mulai' => date('Y-m-d H:i:s', strtotime($request->mulai)),
            'selesai' => date('Y-m-d H:i:s', strtotime($request->selesai)),
        ]);

        return Redirect::route('admin.sesi.show', $request->id_ujian)
            ->with(['message' => 'Data berhasil ditambahkan']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        if ($id != 0) $request->session()->put('idujian', $id);
        else  $request->session()->put('idujian', "");

        $sesi = Sesi::leftJoin('ujian', 'ujian.id', '=', 'sesi.id_ujian')
            ->select('ujian.nama_ujian', 'sesi.*')
            ->orderBy('id', 'desc');

        if ($id != 0) $sesi = $sesi->where('id_ujian', '=', $id);
        $sesi = $sesi->get();

        return Inertia::render('Sesi/Index', [
            'ujian' => Ujian::all(),
            'sesi' => $sesi,
            'id' => $id
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Sesi $sesi)
    {
        $ujianaktif = $request->session()->get('idujian');
        return Inertia::render('Sesi/Edit', [
            'sesi' => $sesi,
            'ujian' => Ujian::all(),
            'ujianaktif' => $ujianaktif
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sesi $sesi)
    {
        $request->validate([
            'id_ujian' => 'required',
            'nama_sesi' => 'required',
            'mulai' => 'required',
            'selesai' => 'required',
        ]);

        $sesi->update([
            'id_ujian' => $request->id_ujian,
            'nama_sesi' => $request->nama_sesi,
            'mulai' => date('Y-m-d H:i:s', strtotime($request->mulai)),
            'selesai' => date('Y-m-d H:i:s', strtotime($request->selesai)),
        ]);

        return Redirect::route('admin.sesi.show', $request->id_ujian)
            ->with(['message' => 'Data berhasil diedit']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Sesi $sesi)
    {
        $sesi->delete();

        $ujian = $request->session()->get('idujian');
        return Redirect::route('admin.sesi.show', $ujian)
            ->with(['message' => 'Data berhasil dihapus']);
    }
}
