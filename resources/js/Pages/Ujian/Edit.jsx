import "react-quill/dist/quill.snow.css";

import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import ReactQuill from "react-quill";

export default function Edit({ auth, ujian }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_ujian: ujian.nama_ujian || "",
        nama_mapel: ujian.nama_mapel || "",
        jumlah_soal: ujian.jumlah_soal || "",
        durasi: ujian.durasi || "",
        deskripsi: ujian.deskripsi || "",
        acak_soal: ujian.acak_soal || "Y",
        acak_jawaban: ujian.acak_jawaban || "Y",
        tampilkan_hasil: ujian.tampilkan_hasil || "N",
    });

    const optionAcak = [
        { val: "Y", text: "Ya" },
        { val: "N", text: "Tidak" },
    ];

    const arrayInput = [
        { label: "Nama Ujian", name: "nama_ujian", type: "text" },
        { label: "Nama Mapel", name: "nama_mapel", type: "text" },
        { label: "Jumlah Soal", name: "jumlah_soal", type: "number" },
        { label: "Durasi (menit)", name: "durasi", type: "number" },
        {
            label: "Acak Soal",
            name: "acak_soal",
            type: "select",
            option: optionAcak,
        },
        {
            label: "Acak Jawaban",
            name: "acak_jawaban",
            type: "select",
            option: optionAcak,
        },
        {
            label: "Tampilkan Hasil",
            name: "tampilkan_hasil",
            type: "select",
            option: optionAcak,
        },
    ];

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEditorChange = (value) => {
        setData("deskripsi", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.ujian.update", ujian.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Ujian" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white shadow sm:rounded-lg">
                        <h2 className="mb-6 text-lg font-semibold">
                            Edit Ujian
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {arrayInput.map((inp) => (
                                <div key={inp.name}>
                                    <label className="block mb-1 text-sm font-medium text-gray-700">
                                        {inp.label}
                                    </label>
                                    {inp.type === "select" ? (
                                        <select
                                            name={inp.name}
                                            value={data[inp.name]}
                                            onChange={handleChange}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                        >
                                            {inp.option.map((opt) => (
                                                <option
                                                    key={opt.val}
                                                    value={opt.val}
                                                >
                                                    {opt.text}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={inp.type}
                                            name={inp.name}
                                            value={data[inp.name]}
                                            onChange={handleChange}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                                        />
                                    )}
                                    {errors[inp.name] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[inp.name]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label className="block mb-1 text-sm font-medium text-gray-700">
                                    Deskripsi
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={data.deskripsi}
                                    onChange={handleEditorChange}
                                />
                                {errors.deskripsi && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.deskripsi}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    Simpan
                                </button>
                                <Link
                                    href={route("admin.ujian.index")}
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
