'use client'

import UIContainer from "@/components/UIContainer";
import { SignIn } from "@clerk/nextjs";

export default function Page() {


  // Use the theme to set Clerk's appearance
  return (
    <UIContainer className="flex justify-center">
      <SignIn />
    </UIContainer>
  );
}
