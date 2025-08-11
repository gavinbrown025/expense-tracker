'use client'

import UIContainer from "@/components/UIContainer";
import { SignIn } from "@clerk/nextjs";

export default function Page() {


  // Use the theme to set Clerk's appearance
  const appearance = {
    elements: {
      formButtonPrimary:
        "btn btn-primary border-0 rounded-xl w-full !btn !btn-primary !border-0 !rounded-xl !w-full",
      formFieldInput:
        "input input-bordered w-full !input !input-bordered !w-full",
      formFieldLabel: "label-text font-semibold !label-text !font-semibold",
    },
  };

  return (
    <UIContainer className="flex justify-center">
      <SignIn appearance={appearance} />
    </UIContainer>
  );
}
