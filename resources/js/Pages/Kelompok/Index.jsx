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

    // state untuk select ujian
    const [ujian, setUjian] = useState(props.id ?? 0);
    const isMount = useRef(false);

    const changeUjian = (e) => {
        setUjian(e.target.value);
    };

    useEffect(() => {
        if (isMount.current) {
            Inertia.get(route("admin.kelompok.show", ujian));
        } else {
            isMount.current = true;
        }
    }, [ujian]);

    const kelompok = props.kelompok;

    console.log(props);
    console.log(kelompok);

    return (
        <AuthenticatedLayout>
            <Head title="Kelompok Ujian" />

            <div className="max-w-6xl p-6 mx-auto">
                <div className="p-6 bg-white rounded-lg shadow">
                    {/* Header */}
                    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Kelompok Ujian
                        </h3>

                        <div>
                            <Link
                                href={route("admin.kelompok.create")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition bg-green-600 rounded-md shadow hover:bg-green-700"
                            >
                                <i className="mr-2 fas fa-plus-circle"></i>{" "}
                                Tambah
                            </Link>
                        </div>
                    </div>

                    {/* Filter Ujian */}
                    <div className="mb-4">
                        <select
                            name="ujian"
                            id="ujian"
                            value={ujian}
                            onChange={changeUjian}
                            className="w-full max-w-xs px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                        >
                            <option value="0">Pilih Ujian</option>
                            {props.ujian.map((uji) => (
                                <option key={uji.id} value={uji.id}>
                                    {uji.nama_ujian}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Table Kelompok */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        No
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        No. Ujian
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Nama Peserta
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Sesi
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {kelompok?.map((klp, index) => (
                                    <tr key={klp.id}>
                                        <td className="px-4 py-2">
                                            {(kelompok.from ?? 0) + index}
                                        </td>
                                        <td className="px-4 py-2">
                                            {klp.no_ujian ?? "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {klp.nama_peserta ?? "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {klp.nama_sesi ?? "-"}
                                        </td>
                                        <td className="flex gap-2 px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    handleDialogOpen(
                                                        route(
                                                            "admin.kelompok.destroy",
                                                            klp.id
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

                        <Pagination links={kelompok.links ?? []} />
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
