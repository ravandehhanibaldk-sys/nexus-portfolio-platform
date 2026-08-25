import { redirect } from "next/navigation";

/** Workstream 3: canonical route is now /en/projects/villa-efe (or /da/...). */
export default function VillaEfeRedirect() {
  redirect("/en/projects/villa-efe");
}
