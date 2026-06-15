import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Navigation consciente de la locale : ces helpers ajoutent automatiquement
// le prefixe de langue aux URLs (Link, redirect, usePathname, useRouter...).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
