import { redirect } from "next/navigation";

/** Workstream 3: canonical route is now /en/projects/villa-red-sun (or /da/...). */
export default function VillaRedSunRedirect() {
  redirect("/en/projects/villa-red-sun");
}
