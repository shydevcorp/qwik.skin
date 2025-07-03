import React from "react";

export default function RefundPolicy() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-8 relative overflow-hidden px-4 md:px-16 lg:px-[500px] pb-16 bg-[#1A1625]">
      {/* Header section */}
      <div className="w-full bg-[#2D2438] py-8 absolute top-0 left-0 self-start">
        <h1
          className="absolute -translate-x-[50px] left-0 bottom-[50%] translate-y-1/4 text-[4rem] px-4 md:px-16 lg:px-[525px] font-bold select-none tracking-tight text-transparent leading-[0.85] mt-12 hidden sm:block"
          style={{ WebkitTextStroke: "1.5px rgb(82, 82, 91, 0.3)" }}
        >
          Refund Policy
        </h1>
        <h1
          className="text-white z-[500] relative text-4xl font-bold px-4 md:px-16 lg:px-[525px]"
          style={{ fontFamily: "var(--font-space)" }}
        >
          Refund Policy
        </h1>
        <p className="text-white/60 text-sm mt-2 px-4 md:px-16 lg:px-[525px]">
          Last updated: Mar 13, 2023
        </p>
      </div>

      {/* Content sections */}
      <div className="mt-32 pt-16 text-gray-300/70 text-sm space-y-4">
        <h2
          className="text-white text-xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space)" }}
        >
          PLEASE READ THIS REFUND POLICY CAREFULLY BEFORE MAKING ANY PURCHASE OR
          EXCHANGE ON <span className="text-[#9D5CFF]">SKINSMONKEY.COM</span>.
        </h2>
        <p>
          This document is intended to be used as a supplement to the{" "}
          <span className="text-[#9D5CFF]">SkinsMonkey.com</span> Terms of
          Service, which together constitute a legally binding agreement between
          you and <span className="text-[#9D5CFF]">SkinsMonkey.com</span>.
        </p>
        <p>
          By making a purchase or an exchange you certify that you have read,
          understood, and agree with this Refund Policy.
        </p>
        <p>This Refund Policy covers the following purchases:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-300/70">
          <li className="mb-2">SkinsMonkey.com Drawing Rights</li>
          <li className="mb-2">
            which all together referred to as "Products".
          </li>
        </ul>

        <h2
          className="text-white text-xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space)" }}
        >
          WHEN ARE PRODUCTS ELIGIBLE FOR A REFUND?
        </h2>
        <p>
          Our Products are qualified as digital content (virtual items) which is
          exempt from the general withdrawal right due to their specifics upon
          the consumer's prior express consent.
        </p>
        <p>
          <span className="text-[#9D5CFF]">
            BY AGREEING TO THIS REFUND POLICY AND MAKING A PURCHASE YOU
            EXPRESSLY CONSENT TO THE LOSS OF YOUR RIGHT OF WITHDRAWAL AND WAIVE
            ANY RIGHTS IN CONNECTION THERETO.
          </span>
        </p>

        <h2
          className="text-white text-xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space)" }}
        >
          YOU MAY REQUEST FOR A REFUND UPON THE FOLLOWING REASONS:
        </h2>
        <h3
          className="text-white text-lg font-bold mb-3"
          style={{ fontFamily: "var(--font-space)" }}
        >
          1. The Product was not received
        </h3>
        <p>Please keep in mind, that:</p>
        <ul className="list-disc pl-6 mb-4 text-gray-300/70">
          <li className="mb-2">
            We start processing your purchase after your payment has been
            approved. Normally, it takes seconds to confirm your payment but may
            take up to 7 days depending on your payment method. You may check
            the status of your payment in your{" "}
            <span className="text-[#9D5CFF]">SkinsMonkey.com</span> account.
          </li>
          <li className="mb-2">
            If you purchase a skin that is on hold period, you will receive a
            virtual copy of this skin that you'll be able to trade during the
            hold period. You will be able to receive this skin into your
            inventory only after the expiration of the hold period.
          </li>
          <li className="mb-2">
            If you have not received the ordered Product for any other reason
            please contact{" "}
            <span className="text-[#9D5CFF]">SkinsMonkey.com</span> Support team
            by any means stated below. Once we confirm the non-delivery we will
            proceed with the refund.
          </li>
        </ul>

        <h3
          className="text-white text-lg font-bold mb-3"
          style={{ fontFamily: "var(--font-space)" }}
        >
          2. Fraudulent transactions
        </h3>
        <p>
          If the purchase was made not by you and your payment credentials were
          used fraudulently, please contact{" "}
          <span className="text-[#9D5CFF]">SkinsMonkey.com</span> Support team
          by any means stated below as soon as possible. We will investigate the
          case and if the money is still in our system we will proceed with the
          refund, otherwise, the refund is not possible.
        </p>

        <h2
          className="text-white text-xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space)" }}
        >
          WHEN CAN I EXPECT A REFUND?
        </h2>
        <p>
          By default, purchases will be refunded to the payment method used to
          make the purchase, in the currency of the purchase, with deduction of
          the payment processor's fee. Depending on your payment method a refund
          may take up to 45 days. In the event your payment method does not
          support refunds, we will credit the amount of the refund to your{" "}
          <span className="text-[#9D5CFF]">SkinsMonkey.com</span> balance.
        </p>

        <h2
          className="text-white text-xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space)" }}
        >
          HOW TO CONTACT US
        </h2>
        <p>
          You can request a refund or get other assistance with your{" "}
          <span className="text-[#9D5CFF]">SkinsMonkey.com</span> purchases at
          our Support team via online chat on{" "}
          <span className="text-[#9D5CFF]">SkinsMonkey.com</span>.
        </p>
        <p>
          We will take all reasonable efforts to solve your request in a good
          faith and in accordance with the legislation of your country.
        </p>

        {/* Bottom company info block */}
        <div className="flex flex-col items-center justify-center mt-16 mb-8 text-center">
          <div className="text-gray-300/40 text-2xl mb-2">• • •</div>
          <p className="text-gray-300/60 font-medium">
            Virtual Asset Empire Limited
          </p>
          <p className="text-gray-300/60">
            a provider of{" "}
            <span className="text-[#9D5CFF]">SkinsMonkey.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
