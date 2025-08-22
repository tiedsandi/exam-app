import "react-datepicker/dist/react-datepicker.css";

import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DatePicker from "react-datepicker";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
import TextInput from "@/Components/TextInput";

export default function Create({ auth, ujian, ujianaktif }) {
    const { data, setData, post, processing, errors } = useForm({
        id_ujian: ujianaktif || "",
        nama_sesi: "",
        mulai: null,
        selesai: null,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleDateChange = (name, value) => {
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.sesi.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Sesi Ujian" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-6 text-xl font-bold">
                                Tambah Sesi Ujian
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
                                        <option value="">
                                            - Pilih Ujian -
                                        </option>
                                        {ujian.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.nama_ujian}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError
                                        message={errors.id_ujian}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Nama Sesi */}
                                <div>
                                    <InputLabel
                                        htmlFor="nama_sesi"
                                        value="Nama Sesi"
                                    />
                                    <TextInput
                                        id="nama_sesi"
                                        type="text"
                                        name="nama_sesi"
                                        value={data.nama_sesi}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.nama_sesi}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Mulai */}
                                <div>
                                    <InputLabel htmlFor="mulai" value="Mulai" />
                                    <DatePicker
                                        selected={data.mulai}
                                        onChange={(date) =>
                                            handleDateChange("mulai", date)
                                        }
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <InputError
                                        message={errors.mulai}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Selesai */}
                                <div>
                                    <InputLabel
                                        htmlFor="selesai"
                                        value="Selesai"
                                    />
                                    <DatePicker
                                        selected={data.selesai}
                                        onChange={(date) =>
                                            handleDateChange("selesai", date)
                                        }
                                        showTimeSelect
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <InputError
                                        message={errors.selesai}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tombol */}
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Simpan
                                    </PrimaryButton>

                                    <Link
                                        href={route(
                                            "admin.sesi.show",
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
