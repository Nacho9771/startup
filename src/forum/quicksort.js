export const quickSort = (leaderboard) => {
    if (leaderboard.length <= 1) return leaderboard;
  
    const pivot = leaderboard[leaderboard.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < leaderboard.length - 1; i++) {
      if (parseFloat(leaderboard[i].balance) <= parseFloat(pivot.balance)) {
        left.push(leaderboard[i]);
      } else {
        right.push(leaderboard[i]);
      }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
  };
  