import {
  createJoymap,
  createQueryModule,
  QueryModule,
  StickResult,
} from "joymap";

const joymap = createJoymap({
  // onPoll() {
  //   // console.log("default poll still here");
  //   players.forEach((playerModule) => {
  //     if (playerModule && playerModule.module.getPadId()) {
  //       const dPadUp = playerModule.module.getButton("dpadUp").pressed;
  //       const dPadDown = playerModule.module.getButton("dpadDown").pressed;
  //       const dPadLeft = playerModule.module.getButton("dpadLeft").pressed;
  //       const dPadRight = playerModule.module.getButton("dpadRight").pressed;
  //       const L1 = playerModule.module.getButton("L1").pressed;
  //       const L2 = playerModule.module.getButton("L2").pressed;
  //       const L = playerModule.module.getButton("L").pressed;
  //       const R = playerModule.module.getButton("R").pressed;
  //       const A = playerModule.module.getButton("A").pressed;
  //       const X = playerModule.module.getButton("X").pressed;
  //       const B = playerModule.module.getButton("B").pressed;
  //       const Y = playerModule.module.getButton("Y").pressed;
  //       const home = playerModule.module.getButton("home").pressed;
  //       const select = playerModule.module.getButton("select").pressed;
  //       const start = playerModule.module.getButton("start").pressed;
  //       const [x, y] = playerModule.module.getStick("L").value;
  //     }
  //   });
  // },
  autoConnect: true,
});

// Only 1 player for now - but add more here
const players = ["Player-one"].map((player, index) => {
  const module = createQueryModule();
  joymap.addModule(module);

  return {
    name: player,
    module,
  };
});

// Start joymap polling
joymap.start();

export { players, joymap };
