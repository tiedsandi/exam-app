import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dialog from "@/Components/Dialog";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { flash } = usePage().props;
    const [alert, setAlert] = useState(true);

    // toast flash message
    if (flash.message && alert) {
        toast.success(flash.message);
        setAlert(false);
    }

    // state dialog
    const [dialog, setDialog] = useState({
        open: false,
        route: null,
    });

    const handleDialogOpen = (route) => {
        setDialog({ open: true, route });
    };

    const handleDialogClose = () => {
        setDialog({ open: false, route: null });
    };

    // data ujian
    const ujian = props.ujian;
    // console.log(ujian);

    return (
        <AuthenticatedLayout>
            <Head title="Data Ujian" />

            <div className="max-w-6xl p-6 mx-auto">
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Data Ujian
                        </h3>
                        <Link
                            href={route("admin.ujian.create")}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
                        >
                            <i className="mr-2 fas fa-plus-circle"></i> Tambah
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        No
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Nama Ujian
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Nama Mapel
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Jumlah Soal
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Durasi
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Acak Soal
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Acak Jawaban
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Tampilkan Hasil
                                    </th>
                                    <th className="px-4 py-2 font-medium text-left text-gray-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {ujian.data.map((uj, index) => (
                                    <tr key={uj.id}>
                                        <td className="px-4 py-2">
                                            {(ujian.from ?? 0) + index}
                                        </td>
                                        <td className="px-4 py-2">
                                            {uj.nama_ujian}
                                        </td>
                                        <td className="px-4 py-2">
                                            {uj.nama_mapel}
                                        </td>
                                        <td className="px-4 py-2">
                                            {uj.jumlah_soal}
                                        </td>
                                        <td className="px-4 py-2">
                                            {uj.durasi} menit
                                        </td>
                                        <td className="px-4 py-2">
                                            {uj.acak_soal === "Y"
                                                ? "Ya"
                                                : "Tidak"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {uj.acak_jawaban === "Y"
                                                ? "Ya"
                                                : "Tidak"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {uj.tampilkan_hasil === "Y"
                                                ? "Ya"
                                                : "Tidak"}
                                        </td>
                                        <td className="flex gap-2 px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    Inertia.get(
                                                        route(
                                                            "admin.ujian.edit",
                                                            uj.id
                                                        )
                                                    )
                                                }
                                                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDialogOpen(
                                                        route(
                                                            "admin.ujian.destroy",
                                                            uj.id
                                                        )
                                                    )
                                                }
                                                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={ujian.links} />
                    </div>
                </div>
            </div>

            <Dialog
                openDialog={dialog.open}
                closeDialog={handleDialogClose}
                route={dialog.route}
            />

            <Toaster position="top-center" />
        </AuthenticatedLayout>
    );
}
