# Hyperledger Caliper Performance Testing

This folder contains all the configuration files needed to run performance benchmarks on the Fabric network using **Hyperledger Caliper**.

## 📁 Folder Structure

```
caliper-workspace/
├── networks/
│   ├── networkConfig.yaml       # Main network configuration
│   ├── connection-org1.yaml     # Connection profile for Org1
│   └── connection-org2.yaml     # Connection profile for Org2
├── benchmarks/
│   └── benchConfig.yaml         # Benchmark test configuration
├── workload/
│   ├── createAsset.js           # Workload for creating assets
│   ├── readAsset.js             # Workload for reading assets
│   ├── updateAsset.js           # Workload for updating assets
│   └── queryAllAssets.js        # Workload for querying all assets
└── package.json                 # Node.js dependencies
```

---

## 🚀 How to Run the Benchmark

### Prerequisites

1. **Fabric Network Must Be Running:**
   Make sure you have already started the test network and deployed the chaincode:
   ```bash
   cd ../test-network
   ./network.sh up createChannel
   ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go -ccl go
   ```

2. **Install Caliper:**
   ```bash
   cd caliper-workspace
   npm install --only=prod @hyperledger/caliper-cli@0.4.2
   npx caliper bind --caliper-bind-sut fabric:2.2
   ```

---

## ▶️ Run the Benchmark

Execute the following command to start the performance test:

```bash
npx caliper launch manager \
  --caliper-workspace ./ \
  --caliper-networkconfig networks/networkConfig.yaml \
  --caliper-benchconfig benchmarks/benchConfig.yaml \
  --caliper-flow-only-test
```

---

## 📊 Expected Output

After the test completes, Caliper will generate a **`report.html`** file in the current directory.

Open it in a browser to view:
- **Transaction throughput (TPS)**
- **Latency metrics (min, max, avg)**
- **Success/Failure rates**
- **Performance charts**

---

## 🧪 Test Rounds

The benchmark includes **4 test rounds**:

| Round | Description | Duration | TPS |
|-------|-------------|----------|-----|
| **Create Asset** | Create new assets on the ledger | 30s | 50 |
| **Read Asset** | Query a single asset by ID | 30s | 100 |
| **Update Asset** | Update an existing asset | 30s | 30 |
| **Query All Assets** | Query all assets on the ledger | 30s | 20 |

---

## 🔧 Troubleshooting

### Issue: "Error: Endorsement has failed"
- Make sure the Fabric network is running (`docker ps` should show peers and orderer).
- Verify that the chaincode is deployed: `peer chaincode list --installed`

### Issue: "Cannot find module"
- Run `npm install` again in the `caliper-workspace` folder.

### Issue: "Connection timeout"
- Check that the paths in `networkConfig.yaml` point to the correct crypto materials.
- Ensure `localhost` ports (7051, 9051, 7050) are accessible.

---

## 📝 Notes

- This configuration is designed for the **test-network** with 2 organizations (Org1, Org2).
- The workload scripts target the **basic** chaincode (Asset Transfer).
- You can modify `benchConfig.yaml` to adjust test duration, TPS, or add more rounds.

---

**Good luck with your graduation project!** 🎓
