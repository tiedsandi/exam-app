import { Head, Link, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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

    // state untuk select ujian
    const [ujian, setUjian] = useState(props.id);
    const isMount = useRef(false);

    const changeUjian = (e) => {
        setUjian(e.target.value);
    };

    useEffect(() => {
        if (isMount.current) {
            Inertia.get(route("admin.nilai.show", ujian));
        } else {
            isMount.current = true;
        }
    }, [ujian]);

    const nilai = props.nilai;

    return (
        <AuthenticatedLayout>
            <Head title="Nilai" />

            <div className="max-w-6xl p-6 mx-auto">
                <div className="p-6 bg-white rounded-lg shadow">
                    <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
                        <h3 className="text-xl font-semibold text-gray-700">
                            Hasil Ujian
                        </h3>

                        <div className="flex gap-2">
                            {props.id != 0 && (
                                <>
                                    <a
                                        href={route(
                                            "admin.nilai.export",
                                            ujian
                                        )}
                                        className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded shadow hover:bg-green-700"
                                    >
                                        <i className="mr-2 fas fa-file-excel"></i>{" "}
                                        Export Nilai
                                    </a>
                                    <a
                                        href={route(
                                            "admin.nilai.export_jawaban",
                                            ujian
                                        )}
                                        className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded shadow hover:bg-indigo-700"
                                    >
                                        <i className="mr-2 fas fa-file-excel"></i>{" "}
                                        Export Jawaban
                                    </a>
                                </>
                            )}
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

                    {/* Table Nilai */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        No
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        NO. Ujian
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Nama Peserta
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Mulai
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Selesai
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Jml. Benar
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Nilai
                                    </th>
                                    <th className="px-4 py-2 text-left text-gray-600">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {nilai.data.map((nil, index) => (
                                    <tr key={nil.id}>
                                        <td className="px-4 py-2">
                                            {(nilai.from ?? 0) + index}
                                        </td>
                                        <td className="px-4 py-2">
                                            {nil.no_ujian}
                                        </td>
                                        <td className="px-4 py-2">
                                            {nil.nama_peserta}
                                        </td>
                                        <td className="px-4 py-2">
                                            {nil.mulai}
                                        </td>
                                        <td className="px-4 py-2">
                                            {nil.selesai}
                                        </td>
                                        <td className="px-4 py-2">
                                            {nil.jml_benar}
                                        </td>
                                        <td className="px-4 py-2">
                                            {nil.nilai}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    Inertia.get(
                                                        route(
                                                            "admin.nilai.view",
                                                            nil.id_peserta
                                                        )
                                                    )
                                                }
                                                className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                            >
                                                <i className="fas fa-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={nilai.links} />
                    </div>
                </div>
            </div>

            <Toaster position="top-center" />
        </AuthenticatedLayout>
    );
}
