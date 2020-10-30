import { Bootstrapper } from "../src/index";

(async () => {

    const server = new Bootstrapper();
    await server.registerModules();
    server.listen(8080);

})();
