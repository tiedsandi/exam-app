import { Head, Link, useForm } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        no_ujian: "",
        nama_peserta: "",
        jenis_kelamin: "L",
        nama_sekolah: "",
        kelas: "",
        password: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.peserta.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Peserta" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="mb-6 text-xl font-bold">
                                Tambah Peserta
                            </h2>

                            <div className="p-3 mb-4 text-sm text-blue-600 bg-blue-100 rounded-md">
                                Jika password dikosongkan, password akan dibuat
                                oleh sistem.
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* No Ujian */}
                                <div>
                                    <InputLabel
                                        htmlFor="no_ujian"
                                        value="No. Ujian"
                                    />
                                    <TextInput
                                        id="no_ujian"
                                        name="no_ujian"
                                        value={data.no_ujian}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.no_ujian}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Nama Peserta */}
                                <div>
                                    <InputLabel
                                        htmlFor="nama_peserta"
                                        value="Nama Peserta"
                                    />
                                    <TextInput
                                        id="nama_peserta"
                                        name="nama_peserta"
                                        value={data.nama_peserta}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.nama_peserta}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <InputLabel
                                        htmlFor="jenis_kelamin"
                                        value="Jenis Kelamin"
                                    />
                                    <select
                                        id="jenis_kelamin"
                                        name="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        onChange={handleChange}
                                        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option value="L">Laki-laki</option>
                                        <option value="P">Perempuan</option>
                                    </select>
                                    <InputError
                                        message={errors.jenis_kelamin}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Nama Sekolah */}
                                <div>
                                    <InputLabel
                                        htmlFor="nama_sekolah"
                                        value="Nama Sekolah"
                                    />
                                    <TextInput
                                        id="nama_sekolah"
                                        name="nama_sekolah"
                                        value={data.nama_sekolah}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.nama_sekolah}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Kelas */}
                                <div>
                                    <InputLabel htmlFor="kelas" value="Kelas" />
                                    <TextInput
                                        id="kelas"
                                        name="kelas"
                                        value={data.kelas}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.kelas}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={data.password}
                                        className="block w-full mt-1"
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                {/* Tombol Aksi */}
                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Simpan
                                    </PrimaryButton>

                                    <Link
                                        href={route("admin.peserta.index")}
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
