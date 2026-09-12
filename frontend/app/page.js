import Hero from "@/component/Hero";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
  return (
    <Hero />
  );
}
