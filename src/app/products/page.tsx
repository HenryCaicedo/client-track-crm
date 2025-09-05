"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/store/hooks";
import { deleteProduct } from "@/store/productsSlice";
import { Trash, Pencil } from "lucide-react";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import ProductForm from "./components/ProductForm";
import { useToast } from "@/components/ToastProvider";

const colorDict: Record<string, string> = {
  basic: "bg-green-100 text-green-800",
  enterprise: "bg-yellow-100 text-yellow-800",
  pro: "bg-purple-100 text-purple-800",
};

export default function Page() {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.list);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const { showToast } = useToast();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedProductId(null);
  };

  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
    showToast("Product deleted successfully", { type: "success" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Product List</h1>
      <ul className="grid md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li key={product.id} className="p-4 rounded-lg shadow group">
            <div className="flex justify-between relative">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <span
                className={`flex items-center px-2 py-0.5 uppercase text-xs font-bold rounded
                                group-hover:opacity-0 transition h-fit ${colorDict[product.level]}`}
              >
                {product.level}
              </span>

              <div className="top-0 right-0 opacity-0 absolute group-hover:opacity-100 transition flex space-x-4">
                <Pencil
                  className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                  onClick={() => {
                    setSelectedProductId(product.id);
                    setIsDialogOpen(true);
                  }}
                />
                <Trash
                  className="w-5 h-5 text-gray-400 hover:text-red-800 cursor-pointer"
                  onClick={() => handleDeleteProduct(product.id)}
                />
              </div>
            </div>
            <p className="text-gray-600">Duration: {product.duration} month{product.duration !== "1" ? "s" : ""}</p>
          </li>
        ))}
      </ul>

      <button
        onClick={openDialog}
        className="fixed bottom-12 right-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg text-2xl h-16 w-16 flex items-center justify-center cursor-pointer"
      >
        +
      </button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => closeDialog()}
        title={selectedProductId ? "Edit product" : "Create product"}
      >
        <ProductForm
          productId={selectedProductId || undefined}
          onSubmit={() => {
            closeDialog();
            showToast("Product saved successfully", { type: "success" });
          }}
          onCancel={() => {
            closeDialog();
          }}
        />
      </Dialog>
    </div>
  );
}
