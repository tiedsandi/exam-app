import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ImportPeserta({ auth }) {
    const { data, setData, post, processing, errors, progress } = useForm({
        file_import: null,
    });

    const handleUpload = (e) => {
        setData("file_import", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.peserta.import"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Impor Peserta" />

            <div className="py-10">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-md rounded-xl">
                        <div className="p-8">
                            {/* Title */}
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Impor Peserta
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Unggah file Excel sesuai format untuk
                                menambahkan data peserta dengan cepat.
                            </p>

                            {/* Info box */}
                            <div className="p-4 mt-6 text-sm text-indigo-700 border border-indigo-100 rounded-lg bg-indigo-50">
                                Gunakan file template resmi agar data terbaca
                                dengan benar. Kolom password boleh dikosongkan,
                                nanti sistem akan membuat otomatis.
                                <br />
                                <a
                                    href={route("admin.peserta.format")}
                                    className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700"
                                >
                                    <i className="mr-2 fas fa-download"></i>
                                    Unduh Template
                                </a>
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={handleSubmit}
                                encType="multipart/form-data"
                                className="mt-8 space-y-6"
                            >
                                {/* Upload Box */}
                                <div>
                                    <label
                                        htmlFor="file_import"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        File Excel
                                    </label>
                                    <div className="flex justify-center px-6 py-10 mt-2 border border-gray-300 border-dashed rounded-lg bg-gray-50">
                                        <div className="text-center">
                                            <i className="text-4xl text-green-600 fa fa-file-excel"></i>
                                            <div className="mt-2 text-sm text-gray-600">
                                                <label
                                                    htmlFor="file_import"
                                                    className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-800"
                                                >
                                                    <span>Pilih file</span>
                                                    <input
                                                        id="file_import"
                                                        name="file_import"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleUpload}
                                                    />
                                                </label>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    .xlsx saja, max 5MB
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <InputError
                                        message={errors.file_import}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Progress Bar */}
                                {progress && (
                                    <div className="mt-4">
                                        <p className="mb-1 text-xs text-gray-500">
                                            Mengunggah... {progress.percentage}%
                                        </p>
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-2 transition-all bg-indigo-600 rounded-full"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        <i className="mr-2 fa fa-upload"></i>{" "}
                                        Impor Data
                                    </PrimaryButton>

                                    <Link
                                        href={route("admin.peserta.index")}
                                        className="text-sm font-medium text-gray-500 hover:text-red-600"
                                    >
                                        <i className="mr-1 fa fa-ban"></i> Batal
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
