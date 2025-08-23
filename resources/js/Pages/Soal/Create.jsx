import "react-quill/dist/quill.snow.css";

import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import ReactQuill from "react-quill";

export default function Create({ auth, ujian, ujianaktif }) {
    const { data, setData, post, processing, errors } = useForm({
        soal: "",
        id_ujian: ujianaktif || "",
        pilihan_1: "",
        pilihan_2: "",
        pilihan_3: "",
        pilihan_4: "",
        pilihan_5: "",
        kunci: "",
    });

    const pilihan = [
        { val: 1, label: "Pilihan 1", name: "pilihan_1" },
        { val: 2, label: "Pilihan 2", name: "pilihan_2" },
        { val: 3, label: "Pilihan 3", name: "pilihan_3" },
        { val: 4, label: "Pilihan 4", name: "pilihan_4" },
        { val: 5, label: "Pilihan 5", name: "pilihan_5" },
    ];

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEditorChange = (name, value) => {
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.soal.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Soal Ujian" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-6 text-xl font-bold">
                                Tambah Soal Ujian
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
                                        {ujian.map((kat) => (
                                            <option key={kat.id} value={kat.id}>
                                                {kat.nama_ujian}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.id_ujian}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Soal */}
                                <div>
                                    <InputLabel htmlFor="soal" value="Soal" />
                                    <ReactQuill
                                        theme="snow"
                                        modules={modules}
                                        formats={formats}
                                        value={data.soal}
                                        onChange={(value) =>
                                            handleEditorChange("soal", value)
                                        }
                                        className="mt-2"
                                    />
                                    <InputError
                                        message={errors.soal}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Pilihan Jawaban */}
                                {pilihan.map((pil) => (
                                    <div key={pil.val}>
                                        <InputLabel
                                            htmlFor={pil.name}
                                            value={pil.label}
                                        />
                                        <ReactQuill
                                            theme="snow"
                                            modules={modules}
                                            formats={formats}
                                            value={data[pil.name]}
                                            onChange={(value) =>
                                                handleEditorChange(
                                                    pil.name,
                                                    value
                                                )
                                            }
                                            className="mt-2"
                                        />
                                        <InputError
                                            message={errors[pil.name]}
                                            className="mt-2"
                                        />
                                    </div>
                                ))}

                                {/* Kunci Jawaban */}
                                <div>
                                    <InputLabel
                                        htmlFor="kunci"
                                        value="Jawaban Benar"
                                    />
                                    <select
                                        id="kunci"
                                        name="kunci"
                                        value={data.kunci}
                                        onChange={handleChange}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="">
                                            -Pilih Jawaban Benar-
                                        </option>
                                        {pilihan.map((pil) => (
                                            <option
                                                key={pil.val}
                                                value={pil.val}
                                            >
                                                {pil.label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.kunci}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Simpan
                                    </PrimaryButton>

                                    <Link
                                        href={route(
                                            "admin.soal.show",
                                            ujianaktif
                                        )}
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
