function countdown () {
    let i = 10
    while (i-- > 0) {
        if (i == 9) {
            console.log(`Battle starts in ${i + 1}`);
        } else {
            console.log(i);
        }
    }
    console.log('Round One: Capture the Objective!');
}

countdown();