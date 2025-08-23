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

    // state untuk select ujian
    const [ujian, setUjian] = useState(props.id);
    const isMount = useRef(false);

    const changeUjian = (e) => {
        setUjian(e.target.value);
    };

    useEffect(() => {
        if (isMount.current) {
            Inertia.get(route("admin.soal.show", ujian));
        } else {
            isMount.current = true;
        }
    }, [ujian]);

    const soal = props.soal;

    return (
        <AuthenticatedLayout>
            <Head title="Data Soal" />

            <div className="max-w-6xl p-6 mx-auto">
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Data Soal
                        </h3>

                        <div className="flex gap-2">
                            <Link
                                href={route("admin.soal.create")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition bg-green-600 rounded-md shadow hover:bg-green-700"
                            >
                                <i className="mr-2 fas fa-plus-circle"></i>{" "}
                                Tambah
                            </Link>
                            <Link
                                href={route("admin.soal.importform")}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white transition bg-indigo-600 rounded-md shadow hover:bg-indigo-700"
                            >
                                <i className="mr-2 fas fa-upload"></i> Import
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

                    {/* Table Soal */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        No
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Soal
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {soal.data.map((so, index) => {
                                    const pilihan = [
                                        { no: 1, teks: so.pilihan_1 },
                                        { no: 2, teks: so.pilihan_2 },
                                        { no: 3, teks: so.pilihan_3 },
                                        { no: 4, teks: so.pilihan_4 },
                                        { no: 5, teks: so.pilihan_5 },
                                    ];

                                    return (
                                        <tr key={so.id}>
                                            <td className="px-4 py-2">
                                                {(soal.from ?? 0) + index}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: so.soal,
                                                    }}
                                                />
                                                <ol
                                                    type="A"
                                                    className="ml-5 list-disc"
                                                >
                                                    {pilihan.map((pil) => (
                                                        <li
                                                            key={pil.no}
                                                            className={
                                                                so.kunci ===
                                                                pil.no
                                                                    ? "font-bold text-blue-600"
                                                                    : ""
                                                            }
                                                            dangerouslySetInnerHTML={{
                                                                __html: pil.teks,
                                                            }}
                                                        />
                                                    ))}
                                                </ol>
                                            </td>
                                            <td className="flex gap-2 px-4 py-2">
                                                <button
                                                    onClick={() =>
                                                        Inertia.get(
                                                            route(
                                                                "admin.soal.edit",
                                                                so.id
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
                                                                "admin.soal.destroy",
                                                                so.id
                                                            )
                                                        )
                                                    }
                                                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <Pagination links={soal.links} />
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
