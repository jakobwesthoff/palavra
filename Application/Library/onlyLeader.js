function onlyLeader(leaderFn, nextFn) {
  let leaderTime = 0;
  return (...args) => {
    const ownTime = Date.now();
    leaderTime = ownTime;

    const leaderNext = (...nextArgs) => {
      if (ownTime < leaderTime) {
        return;
      }

      nextFn(...nextArgs);
    };

    return leaderFn(...args, leaderNext);
  }
}

export default onlyLeader;