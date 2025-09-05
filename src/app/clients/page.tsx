"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import Dialog from "@/components/Dialog";
import ProductForm from "../products/components/ProductForm";
import { useState } from "react";
import ClientForm from "./components/ClientForm";
import { useToast } from "@/components/ToastProvider";

export default function ClientsPage() {
    const clients = useAppSelector((state) => state.clients.list);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { showToast } = useToast();

    const openDialog = () => {
        setIsDialogOpen(true);
    }

    const handleSubmit = () => {
        setIsDialogOpen(false);
        showToast("Client created successfully", { type: "success" });
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Client list</h1>
            {/* Card grid */}
            <div className="grid md:grid-cols-3 gap-4">
                {clients.map((a) => (
                    <div key={a.id} className="bg-white p-4 rounded-2xl shadow">
                        {/* Name and status */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">{a.name}</h2>
                            <span
                                className={`border text-xs font-bold px-2 py-0.5 rounded-md uppercase ${a.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {a.status}
                            </span>
                        </div>

                        {/* Email and products */}
                        <p className="text-gray-600">Email: {a.email}</p>
                        <p className="text-gray-600">Products: {a.productIds.length}</p>

                        {/* Actions */}
                        <div className="mt-3 flex gap-3 items-center justify-start">
                            <Link className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-xl text-white text-sm" href={`/clients/${a.id}`}>
                                View Details
                            </Link>
                            <Link className="text-blue-600 hover:underline text-sm" href={`/clients/${a.id}/edit`}>
                                Edit
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={openDialog} className="fixed bottom-12 right-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg text-2xl h-16 w-16 flex items-center justify-center cursor-pointer">
                +
            </button>

            <Dialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="Add New Client"
            >
                <ClientForm
                    onSubmit={handleSubmit}
                    onCancel={() => setIsDialogOpen(false)}
                />
            </Dialog>
        </div>
    );
}
