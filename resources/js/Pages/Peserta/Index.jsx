import { Head, Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dialog from "@/Components/Dialog";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination";

export default function Index({ peserta }) {
    const { flash } = usePage().props;
    const [alert, setAlert] = useState(true);

    // toast flash message
    if (flash.message && alert) {
        toast.success(flash.message);
        setAlert(false);
    }

    // dialog state
    const [dialog, setDialog] = useState({
        open: false,
        route: null,
    });

    const handleDialogOpen = (route) => setDialog({ open: true, route });
    const handleDialogClose = () => setDialog({ open: false, route: null });

    return (
        <AuthenticatedLayout>
            <Head title="Peserta Ujian" />

            <div className="max-w-6xl p-4 mx-auto sm:p-6">
                <div className="p-4 bg-white rounded-lg shadow">
                    {/* Header + Button */}
                    <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Peserta Ujian
                        </h3>

                        <div className="flex flex-wrap gap-2">
                            <Link
                                href={route("admin.peserta.create")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition bg-green-600 rounded-md shadow hover:bg-green-700"
                            >
                                <i className="mr-2 fas fa-plus-circle"></i>{" "}
                                Tambah
                            </Link>
                            <Link
                                href={route("admin.peserta.importform")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
                            >
                                <i className="mr-2 fas fa-upload"></i> Import
                            </Link>
                            <a
                                href={route("admin.peserta.export")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-md shadow hover:bg-blue-700"
                            >
                                <i className="mr-2 fas fa-download"></i> Export
                            </a>
                            <Link
                                href={route("admin.peserta.print")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition bg-purple-600 rounded-md shadow hover:bg-purple-700"
                            >
                                <i className="mr-2 fas fa-print"></i> Cetak
                                Kartu
                            </Link>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-3 py-2 text-left">No</th>
                                    <th className="px-3 py-2 text-left">
                                        No. Ujian
                                    </th>
                                    <th className="px-3 py-2 text-left">
                                        Nama Peserta
                                    </th>
                                    <th className="hidden px-3 py-2 text-left sm:table-cell">
                                        JK
                                    </th>
                                    <th className="hidden px-3 py-2 text-left sm:table-cell">
                                        Sekolah
                                    </th>
                                    <th className="hidden px-3 py-2 text-left sm:table-cell">
                                        Kelas
                                    </th>
                                    <th className="hidden px-3 py-2 text-left sm:table-cell">
                                        Password
                                    </th>
                                    <th className="px-3 py-2 text-left">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {peserta.data.map((pst, index) => (
                                    <tr key={pst.id}>
                                        <td className="px-3 py-2">
                                            {(peserta.from ?? 0) + index}
                                        </td>
                                        <td className="px-3 py-2">
                                            {pst.no_ujian}
                                        </td>
                                        <td className="px-3 py-2">
                                            {pst.nama_peserta}
                                        </td>
                                        <td className="hidden px-3 py-2 sm:table-cell">
                                            {pst.jenis_kelamin}
                                        </td>
                                        <td className="hidden px-3 py-2 sm:table-cell">
                                            {pst.nama_sekolah}
                                        </td>
                                        <td className="hidden px-3 py-2 sm:table-cell">
                                            {pst.kelas}
                                        </td>
                                        <td className="hidden px-3 py-2 sm:table-cell">
                                            {pst.password}
                                        </td>
                                        <td className="px-3 py-2">
                                            <div className="flex flex-col gap-2 sm:flex-row">
                                                <button
                                                    onClick={() =>
                                                        Inertia.get(
                                                            route(
                                                                "admin.peserta.edit",
                                                                pst.id
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
                                                                "admin.peserta.destroy",
                                                                pst.id
                                                            )
                                                        )
                                                    }
                                                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={peserta.links} />
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
