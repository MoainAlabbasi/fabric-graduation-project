'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class QueryAllAssetsWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        this.contractId = this.roundArguments.contractId;
    }

    async submitTransaction() {
        const request = {
            contractId: this.contractId,
            contractFunction: 'GetAllAssets',
            invokerIdentity: 'User1',
            contractArguments: [],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(request);
    }
}

function createWorkloadModule() {
    return new QueryAllAssetsWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
