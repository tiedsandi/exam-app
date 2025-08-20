import "react-quill/dist/quill.snow.css";

import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import ReactQuill from "react-quill";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nama_ujian: "",
        nama_mapel: "",
        jumlah_soal: "",
        durasi: "",
        deskripsi: "",
        acak_soal: "Y",
        acak_jawaban: "Y",
        tampilkan_hasil: "N",
    });

    const optionAcak = [
        { val: "Y", text: "Ya" },
        { val: "N", text: "Tidak" },
    ];

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleEditorChange = (value) => {
        setData("deskripsi", value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.ujian.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Ujian" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-6 text-xl font-bold">
                                Tambah Ujian
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel
                                        htmlFor="nama_ujian"
                                        value="Nama Ujian"
                                    />
                                    <TextInput
                                        id="nama_ujian"
                                        type="text"
                                        name="nama_ujian"
                                        value={data.nama_ujian}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.nama_ujian}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="nama_mapel"
                                        value="Nama Mapel"
                                    />
                                    <TextInput
                                        id="nama_mapel"
                                        type="text"
                                        name="nama_mapel"
                                        value={data.nama_mapel}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.nama_mapel}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="jumlah_soal"
                                            value="Jumlah Soal"
                                        />
                                        <TextInput
                                            id="jumlah_soal"
                                            type="number"
                                            name="jumlah_soal"
                                            value={data.jumlah_soal}
                                            className="block w-full mt-1"
                                            onChange={handleChange}
                                        />
                                        <InputError
                                            message={errors.jumlah_soal}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="durasi"
                                            value="Durasi (menit)"
                                        />
                                        <TextInput
                                            id="durasi"
                                            type="number"
                                            name="durasi"
                                            value={data.durasi}
                                            className="block w-full mt-1"
                                            onChange={handleChange}
                                        />
                                        <InputError
                                            message={errors.durasi}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* Select inputs */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <InputLabel
                                            htmlFor="acak_soal"
                                            value="Acak Soal"
                                        />
                                        <select
                                            id="acak_soal"
                                            name="acak_soal"
                                            value={data.acak_soal}
                                            onChange={handleChange}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {optionAcak.map((opt) => (
                                                <option
                                                    key={opt.val}
                                                    value={opt.val}
                                                >
                                                    {opt.text}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.acak_soal}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="acak_jawaban"
                                            value="Acak Jawaban"
                                        />
                                        <select
                                            id="acak_jawaban"
                                            name="acak_jawaban"
                                            value={data.acak_jawaban}
                                            onChange={handleChange}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {optionAcak.map((opt) => (
                                                <option
                                                    key={opt.val}
                                                    value={opt.val}
                                                >
                                                    {opt.text}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.acak_jawaban}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="tampilkan_hasil"
                                            value="Tampilkan Hasil"
                                        />
                                        <select
                                            id="tampilkan_hasil"
                                            name="tampilkan_hasil"
                                            value={data.tampilkan_hasil}
                                            onChange={handleChange}
                                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            {optionAcak.map((opt) => (
                                                <option
                                                    key={opt.val}
                                                    value={opt.val}
                                                >
                                                    {opt.text}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError
                                            message={errors.tampilkan_hasil}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* ReactQuill */}
                                <div>
                                    <InputLabel
                                        htmlFor="deskripsi"
                                        value="Deskripsi"
                                    />
                                    <ReactQuill
                                        theme="snow"
                                        value={data.deskripsi}
                                        onChange={handleEditorChange}
                                        className="mt-2"
                                    />
                                    <InputError
                                        message={errors.deskripsi}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Simpan
                                    </PrimaryButton>

                                    <Link
                                        href={route("admin.ujian.index")}
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
