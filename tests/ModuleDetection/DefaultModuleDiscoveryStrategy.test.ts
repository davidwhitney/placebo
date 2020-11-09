import http from 'http';
import { DefaultModuleDiscoveryStrategy } from "../../src/ModuleDetection/DefaultModuleDiscoveryStrategy";
import { ProcessContext } from '../../src/types';

describe("DefaultModuleDiscoveryStrategy", () => {

    let sut: DefaultModuleDiscoveryStrategy;
    let context: ProcessContext;
    beforeEach(() => {
        context = { root: "c:\\" } as ProcessContext;
        sut = new DefaultModuleDiscoveryStrategy(context);
    })

    it("discover, one module found, creates a module definition", async () => {
        const files = ["\\HomeModule.ts"];
        sut["recursiveGetFiles"] = () => { return files; };

        const results = await sut.discover();

        expect(results.length).toBe(1);
    });

    it("discover, module found, maps to module definition accurately", async () => {
        sut["recursiveGetFiles"] = () => { return ["\\HomeModule.ts"]; };

        const results = await sut.discover();

        expect(results[0].name).toBe("\\Home");
        expect(results[0].path).toBe("\\HomeModule");
        expect(results[0].route).toBe("/Home");
    });

    it("discover, more than one module found, creates multiple module definitions", async () => {
        const files = [
            "\\Home1Module.ts",
            "\\Home2Module.ts",
            "\\Home3Module.ts",
        ];
        sut["recursiveGetFiles"] = () => { return files; };

        const results = await sut.discover();

        expect(results.length).toBe(3);
    });
});
