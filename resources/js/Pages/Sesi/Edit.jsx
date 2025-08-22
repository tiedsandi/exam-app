import "react-datepicker/dist/react-datepicker.css";

import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DatePicker from "react-datepicker";
import React from "react";

export default function Edit({ auth, sesi, ujian, ujianaktif }) {
    const { data, setData, put, processing, errors } = useForm({
        id_ujian: sesi.id_ujian || "",
        nama_sesi: sesi.nama_sesi || "",
        mulai: sesi.mulai ? new Date(sesi.mulai) : "",
        selesai: sesi.selesai ? new Date(sesi.selesai) : "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleDateChange = (name, value) => {
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.sesi.update", sesi.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Sesi Ujian" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white shadow sm:rounded-lg">
                        <h2 className="mb-6 text-lg font-semibold">
                            Edit Sesi Ujian
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Pilih Ujian */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Ujian
                                </label>
                                <select
                                    id="id_ujian"
                                    name="id_ujian"
                                    value={data.id_ujian}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">-Pilih Ujian-</option>
                                    {ujian.map((kat) => (
                                        <option key={kat.id} value={kat.id}>
                                            {kat.nama_ujian}
                                        </option>
                                    ))}
                                </select>
                                {errors.id_ujian && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.id_ujian}
                                    </p>
                                )}
                            </div>

                            {/* Nama Sesi */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Nama Sesi
                                </label>
                                <input
                                    type="text"
                                    name="nama_sesi"
                                    value={data.nama_sesi}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.nama_sesi && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.nama_sesi}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal Mulai */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Mulai
                                </label>
                                <DatePicker
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    selected={data.mulai}
                                    onChange={(date) =>
                                        handleDateChange("mulai", date)
                                    }
                                />
                                {errors.mulai && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.mulai}
                                    </p>
                                )}
                            </div>

                            {/* Tanggal Selesai */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Selesai
                                </label>
                                <DatePicker
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    selected={data.selesai}
                                    onChange={(date) =>
                                        handleDateChange("selesai", date)
                                    }
                                />
                                {errors.selesai && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.selesai}
                                    </p>
                                )}
                            </div>

                            {/* Tombol Aksi */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Simpan
                                </button>
                                <Link
                                    href={route("admin.sesi.show", ujianaktif)}
                                    className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                                >
                                    Batal
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
