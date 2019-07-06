import { render, cleanup } from "@testing-library/react";
import Index from "../../pages/index";

afterEach(cleanup);

describe("index", () => {
	it('should render "Welcome to Next.js!"', () => {
		const { getByText } = render(<Index />);
		expect(getByText("Welcome to Next.js!")).toBeTruthy();
	});
});
