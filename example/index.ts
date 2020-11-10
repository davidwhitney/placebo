import { Bootstrapper } from "../src/index";

(async () => {

    const server = new Bootstrapper(__dirname);
    await server.registerModules();
    await server.registerStatic("/static", "/");
    server.listen(8080);

})();
