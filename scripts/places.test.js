const rewire = require("rewire")
const places = rewire("./places")
const initMap = places.__get__("initMap")
// @ponicode
describe("initMap", () => {
    test("0", () => {
        let callFunction = () => {
            initMap()
        }
    
        expect(callFunction).not.toThrow()
    })
})
