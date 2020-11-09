import http from 'http';
import { DefaultRouter } from "../src/DefaultRouter";

describe("DefaultRouter", () => {

    let sut: DefaultRouter;
    beforeEach(() => {
        sut = new DefaultRouter([
            { name: "Home", path: "HomeModule", route: "/" },
            { name: "Foo", path: "FooModule", route: "/foo" },
        ]);
    })

    it("route, request for /, home module returned", async () => {
        const request = { url: "/" } as http.IncomingMessage;

        const result = await sut.route(request);

        expect(result.name).toBe("Home");
    });

    it("route, request for unknown url, returns 404", async () => {
        const request = { url: "/unknown" } as http.IncomingMessage;

        const result = await sut.route(request);

        expect(result.name).toBe("FourZeroFour");
    });

    it("route, request for none-home url, correct module returned", async () => {
        const request = { url: "/foo" } as http.IncomingMessage;

        const result = await sut.route(request);

        expect(result.name).toBe("Foo");
    });

    it("route, request is for default, supports DefaultModule", async () => {
        sut = new DefaultRouter([{ name: "Default", path: "DefaultModule", route: "/" }]);
        const request = { url: "/" } as http.IncomingMessage;

        const result = await sut.route(request);

        expect(result.name).toBe("Default");
    });

    it("route, request is for default, supports HomeModule", async () => {
        sut = new DefaultRouter([{ name: "Home", path: "HomeModule", route: "/" }]);
        const request = { url: "/" } as http.IncomingMessage;

        const result = await sut.route(request);

        expect(result.name).toBe("Home");
    });

    it("route, request is for default, supports IndexModule", async () => {
        sut = new DefaultRouter([{ name: "Index", path: "IndexModule", route: "/" }]);
        const request = { url: "/" } as http.IncomingMessage;

        const result = await sut.route(request);

        expect(result.name).toBe("Index");
    });
});