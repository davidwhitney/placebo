import http from 'http';
import { DefaultRouter } from "../src/DefaultRouter";

describe("DefaultRouter", () => {

    let sut: DefaultRouter;
    beforeEach(() => {
        sut = new DefaultRouter([
            { name: "Home", path: "HomeModule", route: "/" }
        ]);
    })

    it("AAA", async () => {
        const request = {} as http.IncomingMessage;

        const result = await sut.route(request);

        expect(result).toBe("abc");
    });
});