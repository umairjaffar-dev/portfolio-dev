import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { profile } from "@/lib/data";
import { sections } from "@/lib/navigation";
import { MobileNav } from "./mobile-nav";

describe("MobileNav", () => {
  it("toggles the menu and closes on link click and Escape", () => {
    render(<MobileNav />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(toggle);
    const nav = screen.getByRole("navigation", { name: "Mobile" });
    expect(nav.querySelectorAll('a[href^="/#"]')).toHaveLength(sections.length);
    for (const social of profile.socials) {
      expect(screen.getByRole("link", { name: social.label })).toHaveAttribute("href", social.href);
    }

    fireEvent.click(screen.getByRole("link", { name: /projects/i }));
    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("navigation", { name: "Mobile" })).toBeNull();
  });
});
