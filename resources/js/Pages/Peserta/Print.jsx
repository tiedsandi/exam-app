import { Head, Link } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

export default function PrintPeserta(props) {
    return (
        <AuthenticatedLayout user={props.auth.user}>
            <Head title="Cetak Kartu Peserta" />

            <div className="py-6">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Back Button */}
                            <Link
                                href={route("admin.peserta.index")}
                                className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                            >
                                <i className="mr-2 fas fa-arrow-left"></i>
                                Kembali
                            </Link>

                            {/* Iframe Preview */}
                            <div className="w-full overflow-hidden border rounded-lg shadow">
                                <iframe
                                    src={route("admin.peserta.kartupdf")}
                                    width="100%"
                                    height="600"
                                    className="border-0"
                                    title="Kartu Peserta"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
