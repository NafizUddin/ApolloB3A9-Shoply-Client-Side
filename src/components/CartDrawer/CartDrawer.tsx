"use client";
import {
  removeProduct,
  updateQuantity,
} from "@/src/lib/redux/features/products/productSlice";
import { useAppDispatch, useAppSelector } from "@/src/lib/redux/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCircleXmark } from "react-icons/fa6";

const CartDrawer = () => {
  const { products, quantities, subtotal } = useAppSelector(
    (state) => state.products
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const increment = (id: string) => {
    const selectedProduct = products.find((item) => item.id === id);
    if (selectedProduct) {
      const currentQuantity = quantities[id] || 0;
      if (currentQuantity < selectedProduct.inStock) {
        dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
      }
    }
  };

  const decrement = (id: string) => {
    const currentQuantity = quantities[id];
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeProduct(id));
    toast.success("Product removed from Cart!");
  };

  return (
    <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4 flex flex-col">
      <div>
        <div className="mt-6 flex justify-between mx-5 items-center">
          <h1 className="text-4xl font-semibold text-white">Cart</h1>
          <div>
            <label htmlFor="my-drawer-4" className="drawer-button">
              <FaCircleXmark className="text-2xl text-white cursor-pointer" />
            </label>
          </div>
        </div>
        <div className="divider" />
        {/* <p className="text-lg ml-3">Your Cart is currently empty</p> */}
        {products?.length > 0 ? (
          <div className="overflow-y-auto max-h-96 w-[95%]">
            {products.map((singleProduct) => (
              <div key={singleProduct.id} className="flex border-b py-3">
                <img
                  src={singleProduct.image}
                  className="w-16 h-16 object-contain rounded-lg"
                  alt="Product name"
                />
                <div className="ml-1 w-11/12">
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm font-bold text-white">
                      {singleProduct.name}
                    </h1>
                    <FaCircleXmark
                      onClick={() => handleRemoveFromCart(singleProduct.id)}
                      className="text-primary cursor-pointer text-lg"
                    />
                  </div>

                  <div className="flex justify-between items-center gap-5">
                    <div className="flex items-center border border-primary rounded mt-3">
                      <button
                        onClick={() => decrement(singleProduct.id)}
                        className="px-3 py-1 text-white hover:bg-primary hover:text-white border-r border-primary"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-white">
                        {quantities[singleProduct.id]}
                      </span>
                      <button
                        onClick={() => increment(singleProduct.id)}
                        className="px-3 py-1 text-white hover:bg-primary hover:text-white border-l border-primary"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-sm md:text-base font-bold mt-1 text-white">
                      <span>$</span>
                      {singleProduct.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg ml-3">Your Cart is currently empty</p>
        )}
      </div>
      {products.length > 0 && (
        <div className="mt-auto border-t border-white">
          <div className="p-4">
            <h2 className="text-lg font-bold text-white">SUBTOTAL</h2>
            <p className="font-semibold text-white">
              <span>$</span>
              {subtotal.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
          </div>

          <label htmlFor="my-drawer-4" className="drawer-button">
            <span
              onClick={handleCheckout}
              className="w-11/12 flex text-center cursor-pointer  relative h-12 origin-top transform rounded-lg border-2 border-primary text-primary before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-primary uppercase font-bold items-center justify-center"
            >
              Checkout
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
