import { Head, Link, useForm } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";

export default function Create({ auth, ujian, ujianaktif }) {
    const { data, setData, post, processing, errors } = useForm({
        id_ujian: ujianaktif || "",
        id_sesi: "",
        peserta: [],
    });

    const [selectedPeserta, setSelectedPeserta] = useState([]);
    const [sesi, setSesi] = useState([]);
    const [peserta, setPeserta] = useState([]);

    // ambil sesi & peserta saat id_ujian berubah
    useEffect(() => {
        if (data.id_ujian) {
            axios
                .get(route("admin.kelompok.getSesi", data.id_ujian))
                .then((res) => {
                    setSesi(res.data);
                    setData("id_sesi", ""); // reset sesi
                });

            axios
                .get(route("admin.kelompok.getPeserta", data.id_ujian))
                .then((res) => {
                    setPeserta(res.data);
                    setSelectedPeserta([]); // reset peserta terpilih
                    setData("peserta", []);
                });
        } else {
            setSesi([]);
            setPeserta([]);
            setData("id_sesi", "");
            setData("peserta", []);
        }
    }, [data.id_ujian]);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleCheck = (no_ujian) => {
        let updated = [...selectedPeserta];
        if (updated.includes(no_ujian)) {
            updated = updated.filter((p) => p !== no_ujian);
        } else {
            updated.push(no_ujian);
        }
        setSelectedPeserta(updated);
        setData("peserta", updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.kelompok.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Kelompok Ujian" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-6 text-xl font-bold">
                                Tambah Kelompok Ujian
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Pilih Ujian */}
                                <div>
                                    <InputLabel
                                        htmlFor="id_ujian"
                                        value="Ujian"
                                    />
                                    <select
                                        id="id_ujian"
                                        name="id_ujian"
                                        value={data.id_ujian}
                                        onChange={handleChange}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">-Pilih Ujian-</option>
                                        {ujian.map((uji) => (
                                            <option key={uji.id} value={uji.id}>
                                                {uji.nama_ujian}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.id_ujian}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Pilih Sesi */}
                                <div>
                                    <InputLabel
                                        htmlFor="id_sesi"
                                        value="Sesi"
                                    />
                                    <select
                                        id="id_sesi"
                                        name="id_sesi"
                                        value={data.id_sesi}
                                        onChange={handleChange}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        disabled={!data.id_ujian}
                                    >
                                        <option value="">-Pilih Sesi-</option>
                                        {sesi.map((se) => (
                                            <option key={se.id} value={se.id}>
                                                {se.nama_sesi}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.id_sesi}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tabel Peserta */}
                                <div>
                                    <InputLabel
                                        htmlFor="peserta"
                                        value="Pilih Peserta"
                                    />
                                    <div className="overflow-x-auto border rounded-md">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                                                        Pilih
                                                    </th>
                                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                                                        No. Ujian
                                                    </th>
                                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                                                        Nama Peserta
                                                    </th>
                                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                                                        JK
                                                    </th>
                                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                                                        Sekolah
                                                    </th>
                                                    <th className="px-4 py-2 text-sm font-medium text-left text-gray-500">
                                                        Kelas
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {peserta.map((pst) => (
                                                    <tr key={pst.id}>
                                                        <td className="px-4 py-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedPeserta.includes(
                                                                    pst.no_ujian
                                                                )}
                                                                onChange={() =>
                                                                    handleCheck(
                                                                        pst.no_ujian
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 text-sm">
                                                            {pst.no_ujian}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm">
                                                            {pst.nama_peserta}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm">
                                                            {pst.jenis_kelamin}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm">
                                                            {pst.nama_sekolah}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm">
                                                            {pst.kelas}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <InputError
                                        message={errors.peserta}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Simpan
                                    </PrimaryButton>
                                    <Link
                                        href={route("admin.kelompok.index")}
                                        className="text-sm text-red-500 hover:underline"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
