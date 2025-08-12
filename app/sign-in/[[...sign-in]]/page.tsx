import { SignIn } from "@clerk/nextjs";

export default function Page() {
  // Use the theme to set Clerk's appearance
  return (
    <section className="container-x container-y flex justify-center">
      <SignIn />
    </section>
  );
}
