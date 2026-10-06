import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { getStoreById } from "@/data/stores";
import ActivateCashbackButton from "@/components/ActivateCashbackButton";

describe("regression: Nike cashback activation", () => {
  it("activates cashback and shows a confirmation on the Nike store page", async () => {
    const user = userEvent.setup();
    render(<ActivateCashbackButton store={getStoreById("nike")!} />);

    await user.click(screen.getByRole("button", { name: "Activate Cashback" }));

    const confirmation = await screen.findByTestId("activation-confirmation");
    expect(confirmation).toHaveTextContent("Cashback activated!");
    expect(confirmation).toHaveTextContent("5% cash back at Nike");
  });
});
