import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function ImportSoal(props) {
    const { data, setData, post, processing, errors, progress } = useForm({
        id_ujian: props.ujianaktif || "",
        file_import: "",
    });

    // handle select change
    function handleChange(e) {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    // handle file upload
    function handleUpload(e) {
        setData((prev) => ({
            ...prev,
            file_import: e.target.files[0],
        }));
    }

    // handle submit
    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.soal.import"), data);
    }

    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Impor Soal" />

            <div className="py-8">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md rounded-xl">
                        <div className="p-8 text-gray-900">
                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Impor Soal
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Unggah file Excel sesuai format untuk
                                menambahkan soal dengan cepat.
                            </p>

                            {/* Info Box */}
                            <div className="flex items-start gap-3 p-4 mt-6 text-sm text-blue-800 border border-blue-200 rounded-lg bg-blue-50">
                                <i className="mt-1 fa fa-info-circle"></i>
                                <p>
                                    Gunakan file Excel template agar data
                                    terbaca dengan benar. Jika soal mengandung
                                    gambar, import hanya teksnya saja, lalu
                                    tambahkan gambar secara manual.
                                    <br />
                                    <a
                                        href={route("admin.soal.format")}
                                        className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-white bg-green-600 rounded-md shadow hover:bg-green-700"
                                    >
                                        <i className="mr-2 fa fa-download"></i>
                                        Unduh Template
                                    </a>
                                </p>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-6"
                            >
                                {/* Select Ujian */}
                                <div>
                                    <label
                                        htmlFor="id_ujian"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Pilih Ujian
                                    </label>
                                    <select
                                        id="id_ujian"
                                        name="id_ujian"
                                        value={data.id_ujian}
                                        onChange={handleChange}
                                        className={`mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                            errors.id_ujian
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    >
                                        <option value="">
                                            -- Pilih Ujian --
                                        </option>
                                        {props.ujian.map((uji) => (
                                            <option key={uji.id} value={uji.id}>
                                                {uji.nama_ujian}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.id_ujian && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.id_ujian}
                                        </p>
                                    )}
                                </div>

                                {/* File Input */}
                                <div>
                                    <label
                                        htmlFor="file_import"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        File Excel
                                    </label>
                                    <div className="flex justify-center px-6 py-10 mt-2 border border-gray-300 border-dashed rounded-lg bg-gray-50">
                                        <div className="text-center">
                                            <i className="text-4xl text-green-600 fa fa-file-excel"></i>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <label
                                                    htmlFor="file_import"
                                                    className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-800"
                                                >
                                                    <span>Pilih file</span>
                                                    <input
                                                        id="file_import"
                                                        name="file_import"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleUpload}
                                                    />
                                                </label>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    Format .xlsx, max 5MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.file_import && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.file_import}
                                        </p>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                {progress && (
                                    <div>
                                        <p className="mb-1 text-xs text-gray-500">
                                            Mengunggah... {progress.percentage}%
                                        </p>
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 transition-all bg-indigo-600 rounded-full"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        <i className="mr-2 fa fa-upload"></i>{" "}
                                        Impor Soal
                                    </button>
                                    <Link
                                        href={route(
                                            "admin.soal.show",
                                            props.ujianaktif
                                        )}
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        <i className="mr-2 fa fa-ban"></i> Batal
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
