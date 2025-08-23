import "react-quill/dist/quill.snow.css";

import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import ReactQuill from "react-quill";

export default function Edit({ auth, soal, ujian, ujianaktif }) {
    const { data, setData, put, processing, errors } = useForm({
        soal: soal.soal || "",
        id_ujian: soal.id_ujian || "",
        pilihan_1: soal.pilihan_1 || "",
        pilihan_2: soal.pilihan_2 || "",
        pilihan_3: soal.pilihan_3 || "",
        pilihan_4: soal.pilihan_4 || "",
        pilihan_5: soal.pilihan_5 || "",
        kunci: soal.kunci || "",
    });

    const pilihan = [
        { val: 1, label: "Pilihan 1", name: "pilihan_1" },
        { val: 2, label: "Pilihan 2", name: "pilihan_2" },
        { val: 3, label: "Pilihan 3", name: "pilihan_3" },
        { val: 4, label: "Pilihan 4", name: "pilihan_4" },
        { val: 5, label: "Pilihan 5", name: "pilihan_5" },
    ];

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEditorChange = (name, value) => {
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.soal.update", soal.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Soal Ujian" />

            <div className="py-6">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white shadow sm:rounded-lg">
                        <h2 className="mb-6 text-lg font-semibold">
                            Edit Soal Ujian
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Ujian Select */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Ujian
                                </label>
                                <select
                                    name="id_ujian"
                                    value={data.id_ujian}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">- Pilih Ujian -</option>
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

                            {/* Soal */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Soal
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={data.soal}
                                    onChange={(val) =>
                                        handleEditorChange("soal", val)
                                    }
                                />
                                {errors.soal && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.soal}
                                    </p>
                                )}
                            </div>

                            {/* Pilihan */}
                            {pilihan.map((pil) => (
                                <div key={pil.val}>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        {pil.label}
                                    </label>
                                    <ReactQuill
                                        theme="snow"
                                        value={data[pil.name]}
                                        onChange={(val) =>
                                            handleEditorChange(pil.name, val)
                                        }
                                    />
                                    {errors[pil.name] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[pil.name]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Kunci Jawaban */}
                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Jawaban Benar
                                </label>
                                <select
                                    name="kunci"
                                    value={data.kunci}
                                    onChange={handleChange}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                >
                                    <option value="">
                                        - Pilih Jawaban Benar -
                                    </option>
                                    {pilihan.map((pil) => (
                                        <option key={pil.val} value={pil.val}>
                                            {pil.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.kunci && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.kunci}
                                    </p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Simpan
                                </button>
                                <Link
                                    href={route("admin.soal.show", ujianaktif)}
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
