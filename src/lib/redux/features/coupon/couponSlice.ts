export type TCoupon = {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
};

type TAuthState = {
  coupon: null | TCoupon;
};

const initialState: TAuthState = {
  coupon: null,
};
