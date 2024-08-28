import React from "react";
import BecomeSellerContain from "@/components/Containers/BecomeSellerContain";
import PageTitleArea from "@/components/Common/PageTitleArea";
export function generateMetadata() {
  return {
    title: "Become Seller",
  };
}
function Page() {
  return (
    <>
      <BecomeSellerContain />
    </>
  );
}

export default Page;
