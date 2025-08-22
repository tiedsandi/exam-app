import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Dialog from "@/Components/Dialog";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination";

export default function Index(props) {
    const { flash } = usePage().props;
    const [alert, setAlert] = useState(true);

    // flash toast
    if (flash.message && alert) {
        toast.success(flash.message);
        setAlert(false);
    }

    // state dialog
    const [dialog, setDialog] = useState({ open: false, route: null });
    const handleDialogOpen = (route) => setDialog({ open: true, route });
    const handleDialogClose = () => setDialog({ open: false, route: null });

    // state filter ujian
    const [ujian, setUjian] = useState(props.id ?? 0);

    // ref agar effect tidak jalan di render pertama
    const isMount = useRef(false);
    useEffect(() => {
        if (isMount.current) {
            Inertia.get(route("admin.sesi.show", ujian));
        } else {
            isMount.current = true;
        }
    }, [ujian]);

    const sesi = props.sesi;

    return (
        <AuthenticatedLayout>
            <Head title="Sesi Ujian" />

            <div className="max-w-6xl p-6 mx-auto">
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Sesi Ujian
                        </h3>
                        <Link
                            href={route("admin.sesi.create")}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
                        >
                            <i className="mr-2 fas fa-plus-circle"></i> Tambah
                        </Link>
                    </div>

                    {/* Filter Ujian */}
                    <div className="mb-4">
                        <select
                            name="ujian"
                            id="ujian"
                            value={ujian}
                            onChange={(e) => setUjian(e.target.value)}
                            className="p-2 border rounded-md"
                        >
                            <option value="0">Semua Ujian</option>
                            {props.ujian.map((uji) => (
                                <option key={uji.id} value={uji.id}>
                                    {uji.nama_ujian}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        No
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Nama Ujian
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Nama Sesi
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Mulai
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Selesai
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sesi.data.map((se, index) => (
                                    <tr key={se.id}>
                                        <td className="px-4 py-2">
                                            {(sesi.from ?? 0) + index}
                                        </td>
                                        <td className="px-4 py-2">
                                            {se.nama_ujian}
                                        </td>
                                        <td className="px-4 py-2">
                                            {se.nama_sesi}
                                        </td>
                                        <td className="px-4 py-2">
                                            {se.mulai}
                                        </td>
                                        <td className="px-4 py-2">
                                            {se.selesai}
                                        </td>
                                        <td className="flex gap-2 px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    Inertia.get(
                                                        route(
                                                            "admin.sesi.edit",
                                                            se.id
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
                                                            "admin.sesi.destroy",
                                                            se.id
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

                        <Pagination links={sesi.links} />
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
