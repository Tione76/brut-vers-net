"use client";

import { NavDropdownMenu } from "./NavDropdownMenu";
import { smicNavigation } from "./smic";

export function SmicNavMenu() {
  return (
    <NavDropdownMenu label="SMIC" menuAriaLabel="SMIC" items={smicNavigation} />
  );
}
