'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class UpdateAssetWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        this.contractId = this.roundArguments.contractId;
        this.assetIds = ['asset1', 'asset2', 'asset3', 'asset4', 'asset5', 'asset6'];
    }

    async submitTransaction() {
        const randomAssetId = this.assetIds[Math.floor(Math.random() * this.assetIds.length)];
        const colors = ['red', 'blue', 'green', 'yellow', 'black', 'white', 'purple', 'orange'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.floor(Math.random() * 20) + 1;
        const randomOwner = 'UpdatedOwner_' + Math.floor(Math.random() * 100);
        const randomValue = Math.floor(Math.random() * 1000) + 100;

        const request = {
            contractId: this.contractId,
            contractFunction: 'UpdateAsset',
            invokerIdentity: 'User1',
            contractArguments: [randomAssetId, randomColor, randomSize.toString(), randomOwner, randomValue.toString()],
            readOnly: false
        };

        await this.sutAdapter.sendRequests(request);
    }
}

function createWorkloadModule() {
    return new UpdateAssetWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
