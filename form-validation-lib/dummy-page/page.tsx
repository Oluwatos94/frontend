import SignINForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";

export default function Page(){
    return(
       <div className="w-full min-h-screen flex flex-col gap-4 items-center justify-center  ">
         <SignupForm/>
         <SignINForm/>
       </div>
    )
}