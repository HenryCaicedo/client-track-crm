import { useAppDispatch } from "@/store/hooks";
import { Product } from "@/models/product";
import { useEffect, useState } from "react";
import { addProduct, updateProduct } from "@/store/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface FormProps {
    productId?: number;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function ProductForm({ productId, onSubmit, onCancel }: FormProps) {
    const dispatch = useAppDispatch();

    // Form data state
    const [formData, setFormData] = useState<Omit<Product, "id">>({
        name: "",
        level: "",
        duration: "",
    });
    // Form field state
    const [touched, setTouched] = useState({ name: false, level: false, duration: false });


    // Only fetch products if an id is passed (we are editing)
    const products = useSelector((state: RootState) =>
        productId ? state.products.list : []
    );

    useEffect(() => {
        if (productId) {
            const product = products.find((c) => c.id === productId);
            if (product) {
                setFormData(prev => {
                    // only update if different
                    if (
                        prev.name !== product.name ||
                        prev.level !== product.level ||
                        prev.duration !== product.duration
                    ) {
                        return {
                            name: product.name,
                            level: product.level,
                            duration: product.duration,
                        };
                    }
                    return prev;
                });
            }
        } else {
            setFormData(prev => {
                if (prev.name || prev.level || prev.duration) {
                    return { name: "", level: "", duration: "" };
                }
                return prev;
            });
        }
    }, [productId]);



    // --- VALIDATORS ---
    const validate = {
        name: (value: string) => {
            if (!value.trim()) return "Name is required";
            if (/\d/.test(value)) return "Name must not contain numbers";
            return "";
        },
        level: (value: string) => {
            if (!value) return "Select a level";
            return "";
        },
        duration: (value: string) => {
            if (!value) return "Duration is required";
            if (Number(value) <= 0) return "Must be greater than 0";
            return "";
        },
    };

    // --- ERRORS ---
    const errors = {
        name: validate.name(formData.name),
        level: validate.level(formData.level),
        duration: validate.duration(formData.duration),
    };

    const isFormValid = !Object.values(errors).some((err) => err !== "");
    const isFormTouched = Object.values(touched).some((t) => t);

    // --- HANDLERS ---
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isFormValid) return;

        if (productId) {
            dispatch(updateProduct({ id: productId, ...formData, duration: formData.duration }));
        } else {
            dispatch(addProduct({ ...formData, duration: formData.duration }));
        }
        onSubmit();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <input
                        type="text"
                        value={formData.name}
                        placeholder="Product Name"
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            setTouched({ ...touched, name: true });
                        }}
                        className="w-full border rounded-2xl px-3 py-2"
                    />
                    {touched.name && errors.name && (
                        <p className="text-red-500 ps-1 text-sm">{errors.name}</p>
                    )}
                </div>

                {/* Level */}
                <div>
                    <select
                        value={formData.level}
                        onChange={(e) => {
                            setFormData({ ...formData, level: e.target.value });
                            setTouched({ ...touched, level: true });
                        }}
                        className="w-full border rounded-2xl px-3 py-2"
                    >
                        <option value="">Select a level</option>
                        <option value="basic">Basic</option>
                        <option value="enterprise">Enterprise</option>
                        <option value="pro">Pro</option>
                    </select>
                    {touched.level && errors.level && (
                        <p className="text-red-500 ps-1 text-sm">{errors.level}</p>
                    )}
                </div>

                {/* Duration */}
                <div>
                    <input
                        type="number"
                        value={formData.duration}
                        placeholder="Product duration (months)"
                        onChange={(e) => {
                            setFormData({ ...formData, duration: e.target.value });
                            setTouched({ ...touched, duration: true });
                        }}
                        className="w-full border rounded-2xl px-3 py-2"
                    />
                    {touched.duration && errors.duration && (
                        <p className="text-red-500 ps-1 text-sm">{errors.duration}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="space-x-2 w-full flex justify-end">
                    <button
                        type="button"
                        onClick={() =>
                            onCancel()
                        }
                        className="px-4 py-2 bg-gray-600 text-white rounded-2xl hover:bg-gray-700"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={!isFormValid || !isFormTouched}
                        className={`px-4 py-2 rounded-2xl text-white 
                                ${(!isFormValid || !isFormTouched)
                                ? "bg-blue-300"
                                : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {productId ? 'Save changes' : 'Create product'}
                    </button>
                </div>
            </form>
        </div>
    );
}