import { ethers } from "hardhat";

async function deployV2() {
  const [me] = await ethers.getSigners();

  // WETH deploy

  const wethDeployer = await ethers.getContractFactory("WETH");
  const weth = await wethDeployer.deploy();
  await weth.waitForDeployment();

  const wethAddress = await weth.getAddress();

  console.log("WETH deployed ->", wethAddress);

  // Factory deploy

  const factoryDeployer = await ethers.getContractFactory("UniswapV2Factory");
  const factory = await factoryDeployer.deploy(me.address);
  await factory.waitForDeployment();

  const factoryAddress = await factory.getAddress();

  console.log("Factory deployed ->", factoryAddress);

  // Router deploy

  const routerDeployer = await ethers.getContractFactory("UniswapV2Router01");
  const router = await routerDeployer.deploy(factoryAddress, wethAddress);
  await router.waitForDeployment();

  const routerAddress = await router.getAddress();

  console.log("Router deployed ->", routerAddress);

  // Token deploy

  const exampleTokenDeployer = await ethers.getContractFactory("ExampleERC20");
  const exampleToken = await exampleTokenDeployer.deploy("Apple", "APL");
  await exampleToken.waitForDeployment();

  const exampleTokenAddress = await exampleToken.getAddress();

  console.log("Example token deployed ->", exampleTokenAddress);

  // Masterchef deploy

  const masterchefDeployer = await ethers.getContractFactory("MasterChef");
  const masterchef = await masterchefDeployer.deploy(
    exampleTokenAddress,
    me.address,
    1,
    await ethers.provider.getBlockNumber()
  );
  await masterchef.waitForDeployment();

  const masterchefAddress = await masterchef.getAddress();

  console.log("Masterchef deployed ->", masterchefAddress);

  // Approving router for Token to put into LP

  await exampleToken.approve(
    await router.getAddress(),
    ethers.parseEther("100000")
  );

  const blockNumBefore = await ethers.provider.getBlockNumber();
  const blockBefore = await ethers.provider.getBlock(blockNumBefore);
  const timestamp = blockBefore!.timestamp + 1200;

  // Adding liquidity

  const addLiquidityTx = await router.addLiquidityETH(
    exampleTokenAddress,
    ethers.parseEther("100000"),
    ethers.parseEther("100000"),
    1,
    me.address,
    timestamp,
    { value: ethers.parseEther("0.01") }
  );
  await addLiquidityTx.wait();

  // Checks if pool created successfully

  const pairAddress = await factory.getPair(exampleTokenAddress, wethAddress);

  console.log("Added pair ->", pairAddress);

  const exampleWethPool = await ethers.getContractAt(
    "UniswapV2Pair",
    pairAddress
  );

  console.log("Reserves ->", await exampleWethPool.getReserves());
}

async function runChecks() {
  const factory = await ethers.getContractAt(
    "UniswapV2Factory",
    "0xb861D48d4F2b946DA83841b280A8b9c81c0eA539"
  );

  const pairsFirst = await factory.allPairs(0);
  console.log(pairsFirst);

  const pair = await ethers.getContractAt("UniswapV2Pair", pairsFirst);

  console.log(await pair.getReserves());
}

deployV2().catch((error) => {
  // runChecks().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
