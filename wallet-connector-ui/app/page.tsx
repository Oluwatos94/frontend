import {subtitle, title} from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center leading-[3]">
        <h1 className={title()}>wallet connector UI</h1>
        <br/>
        <h1 className={title({color: "violet"})}> for Starknet</h1>
        <br/>
        <h2 className={subtitle({class: "mt-4"})}>
          Modern wallet connector UI on starknet
        </h2>
      </div>
    </section>
  );
}
