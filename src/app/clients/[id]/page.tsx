"use client";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { use } from "react";

export default function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  // unwrap params with React.use
  const { id } = use(params);

  const clients = useSelector((state: RootState) => state.clients.list);
  const productsList = useSelector((state: RootState) => state.products.list);

  const client = clients.find((a) => a.id === Number(id));
  const products = productsList.filter((c) => client?.productIds.includes(c.id));

  if (!client) {
    return <div>Client not found</div>;
  }

  return (
    <div className="overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{client.name}</h2>
      <p className="text-gray-600">Email: {client.email}</p>
      <p className="text-gray-600">
        Status:
        <span
          className={`text-sm font-bold px-2 py-0.5 rounded-md uppercase ${client.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-600"
            }`}
        >
          {client.status}
        </span>
      </p>
      <p className="text-gray-600">Products:</p>
      <ul className="list-disc list-inside">
        {products.map((product) => (
          <li key={product.id} className="text-gray-600">
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
