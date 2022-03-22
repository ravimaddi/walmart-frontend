import { UserProfile } from "../components"
import ShallowRenderer from "react-test-renderer/shallow"

it("check for the userPorfile component", () => {
  const renderer = new ShallowRenderer()
  const view = renderer.render(<UserProfile />)
  expect(view).toMatchSnapshot()
})
