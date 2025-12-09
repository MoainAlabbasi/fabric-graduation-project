'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class CreateAssetWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        this.contractId = this.roundArguments.contractId;
        this.workerIndex = workerIndex;
    }

    async submitTransaction() {
        const randomId = 'asset_' + this.workerIndex + '_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
        const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.floor(Math.random() * 20) + 1;
        const randomOwner = 'Owner_' + Math.floor(Math.random() * 100);
        const randomValue = Math.floor(Math.random() * 1000) + 100;

        const request = {
            contractId: this.contractId,
            contractFunction: 'CreateAsset',
            invokerIdentity: 'User1',
            contractArguments: [randomId, randomColor, randomSize.toString(), randomOwner, randomValue.toString()],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(request);
    }
}

function createWorkloadModule() {
    return new CreateAssetWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
