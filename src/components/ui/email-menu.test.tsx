import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { emailFromHref } from "@/lib/email";
import { EmailMenu } from "./email-menu";

const email = "hello@example.com";

describe("EmailMenu", () => {
  it("offers webmail, mail app and copy options", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    render(
      <EmailMenu email={email} triggerLabel="Email options">
        icon
      </EmailMenu>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Email options" }));

    expect(screen.getByRole("link", { name: /gmail/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mail.google.com"),
    );
    expect(screen.getByRole("link", { name: /outlook/i })).toHaveAttribute(
      "href",
      expect.stringContaining(encodeURIComponent(email)),
    );
    expect(screen.getByRole("link", { name: /mail app/i })).toHaveAttribute(
      "href",
      `mailto:${email}`,
    );

    fireEvent.click(screen.getByRole("button", { name: /copy email/i }));
    expect(writeText).toHaveBeenCalledWith(email);
    expect(await screen.findByText(/copied to clipboard/i)).toBeInTheDocument();
  });

  it("extracts the address from a mailto href", () => {
    expect(emailFromHref("mailto:a%40b.com?subject=Hi")).toBe("a@b.com");
  });
});
