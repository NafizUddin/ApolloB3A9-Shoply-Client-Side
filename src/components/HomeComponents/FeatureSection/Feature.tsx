import {
  FaShippingFast,
  FaHeadset,
  FaHandshake,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function FeatureSection() {
  return (
    <div className="bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="border border-dashed border-white rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between items-start gap-6 sm:gap-10">
          {/* Feature 1 */}
          <div className="flex items-start gap-6">
            <div className="border border-dashed border-white rounded-full p-4">
              <FaShippingFast className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Free Shipping</h3>
              <p className="text-sm text-gray-400">
                You get your items delivered without any extra cost.
              </p>
            </div>
          </div>
          {/* Feature 2 */}
          <div className="flex items-start gap-6">
            <div className="border border-dashed border-white rounded-full p-4">
              <FaHeadset className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Great Support 24/7</h3>
              <p className="text-sm text-gray-400">
                Our customer support team is available around the clock.
              </p>
            </div>
          </div>
          {/* Feature 3 */}
          <div className="flex items-start gap-6">
            <div className="border border-dashed border-white rounded-full p-4">
              <FaHandshake className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Return Available</h3>
              <p className="text-sm text-gray-400">
                Making it easy to return any items if you&apos;re not satisfied.
              </p>
            </div>
          </div>
          {/* Feature 4 */}
          <div className="flex items-start gap-6">
            <div className="border border-dashed border-white rounded-full p-4">
              <FaMoneyBillWave className="text-3xl text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Secure Payment</h3>
              <p className="text-sm text-gray-400">
                Shop with confidence knowing that our secure payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
