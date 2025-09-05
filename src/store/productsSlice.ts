import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/models/product";
import { PRODUCTS as initialProducts } from "@/data/products";

type NewProduct = Omit<Product, "id">;

interface ProductsState {
    list: Product[];
}

const productsSlice = createSlice({
    name: "products",
    initialState: {
        list: initialProducts
    } as ProductsState,
    reducers: {

        // Add product
        addProduct: (state, action: PayloadAction<NewProduct>) => {
            const id = state.list.length > 0 ? Math.max(...state.list.map(c => c.id)) + 1 : 1;
            const newProduct = { id, ...action.payload };
            state.list.push(newProduct);
        },

        // Update product
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.list.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },

        // Delete product
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(c => c.id !== action.payload);
        }
    }
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
