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

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-4 text-xl font-semibold">
                                Impor Soal
                            </h2>

                            {/* Info Box */}
                            <div className="p-4 mb-6 text-sm text-gray-700 border border-blue-200 rounded-md bg-blue-50">
                                Gunakan format Excel yang disediakan untuk
                                import data dari Excel. Jika soal mengandung
                                gambar, import teksnya saja. Gambar diinput
                                secara manual.
                                <br />
                                <a
                                    href={route("admin.soal.format")}
                                    className="inline-block px-4 py-2 mt-3 text-white bg-green-600 rounded-md hover:bg-green-700"
                                >
                                    Download Format
                                </a>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Select Ujian */}
                                <div>
                                    <label
                                        htmlFor="id_ujian"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Ujian
                                    </label>
                                    <select
                                        id="id_ujian"
                                        name="id_ujian"
                                        value={data.id_ujian}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                            errors.id_ujian
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    >
                                        <option value="">
                                            - Pilih Ujian -
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
                                        File Impor
                                    </label>
                                    <input
                                        type="file"
                                        id="file_import"
                                        onChange={handleUpload}
                                        className={`mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none ${
                                            errors.file_import
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.file_import && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.file_import}
                                        </p>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                {progress && (
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                        <div
                                            className="bg-blue-600 h-2.5 rounded-full"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        ></div>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-4 space-x-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        Impor
                                    </button>
                                    <Link
                                        href={route(
                                            "admin.soal.show",
                                            props.ujianaktif
                                        )}
                                        className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
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
