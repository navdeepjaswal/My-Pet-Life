import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className=" flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  );
}
