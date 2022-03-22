import App from "../App"
import renderer from "react-test-renderer"

it("check if the Route componets exists", () => {
  const tree = renderer.create(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})
