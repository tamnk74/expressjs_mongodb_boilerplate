const { execFile } = require('child_process');

execFile('sh', ['./internals/scripts/hook-commit.sh'], (error, stdout, stderr) => {
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  if (error !== null) {
    console.log(`exec error: ${error}`);
  }
});
