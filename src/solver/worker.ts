/* Web worker to solve sudoku without halting main thread */

onmessage = (e: MessageEvent) => {
    // wait for 'solve' command

    // upon receive, solve using the provided params, and update while solving
    console.log('hello');
    setTimeout(() => {
        console.log('Message received from main script');
        const workerResult = `Result: ${e.data[0] * e.data[1]}`;
        console.log('Posting message back to main script');
        postMessage(workerResult);
    }, 1000);
}

export default {};