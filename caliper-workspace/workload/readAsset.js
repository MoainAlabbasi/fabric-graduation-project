'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class ReadAssetWorkload extends WorkloadModuleBase {
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

        const request = {
            contractId: this.contractId,
            contractFunction: 'ReadAsset',
            invokerIdentity: 'User1',
            contractArguments: [randomAssetId],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(request);
    }
}

function createWorkloadModule() {
    return new ReadAssetWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
