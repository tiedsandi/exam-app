import { Inertia } from "@inertiajs/inertia";
import React from "react";

export default ({ openDialog, closeDialog, route }) => {
    const handleYakin = () => {
        Inertia.delete(route).then(() => {
            closeDialog();
        });
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity ${
                openDialog ? "visible opacity-100" : "invisible opacity-0"
            }`}
        >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                <div className="px-4 py-3 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Konfirmasi
                    </h3>
                </div>
                <div className="p-4">
                    <p className="text-gray-600">Yakin akan menghapus data?</p>
                </div>
                <div className="flex justify-end gap-2 px-4 py-3 border-t">
                    <button
                        onClick={closeDialog}
                        type="button"
                        className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleYakin}
                        type="button"
                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Yakin
                    </button>
                </div>
            </div>
        </div>
    );
};
