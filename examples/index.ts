import { streamifier } from "../src";

// Stream using buffer
streamifier.createReadStream(Buffer.from([65, 66, 67])).pipe(process.stdout);
// Output: ABC

// Stream using object
streamifier.createReadStream({ a: 1, b: 2 }).pipe(process.stdout);
// Output: {a:1,b:2}

// Stream using string
streamifier.createReadStream("hello-world").pipe(process.stdout);
// Output: hello-world