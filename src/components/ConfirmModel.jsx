import React from "react";

export const ConfirmModal = ({ isOpen, onConfirm }) => {
    if (!isOpen) return null; 

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Konfirmasi Penghapusan</h3>
                <p className="text-gray-600">Apakah Anda yakin ingin menghapus data ini?</p>
                <div className="flex justify-end mt-6 gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                        onClick={() => onConfirm(false)}
                    >
                        Batal
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => onConfirm(true)}
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
}