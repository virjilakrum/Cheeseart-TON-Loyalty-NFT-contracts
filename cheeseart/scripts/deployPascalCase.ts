import { toNano } from '@ton/core';
import { PascalCase } from '../wrappers/PascalCase';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const pascalCase = provider.open(PascalCase.createFromConfig({}, await compile('PascalCase')));

    await pascalCase.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(pascalCase.address);

    // run methods on `pascalCase`
}
