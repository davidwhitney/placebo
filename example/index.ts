import { Bootstrapper } from "../src/index";

(async () => {

    const server = new Bootstrapper(__dirname);
    await server.registerModules();
    server.listen(8080);

})();
