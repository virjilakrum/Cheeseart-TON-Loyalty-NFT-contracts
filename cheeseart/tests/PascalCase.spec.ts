import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { PascalCase } from '../wrappers/PascalCase';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('PascalCase', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('PascalCase');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let pascalCase: SandboxContract<PascalCase>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        pascalCase = blockchain.openContract(PascalCase.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await pascalCase.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: pascalCase.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and pascalCase are ready to use
    });
});
