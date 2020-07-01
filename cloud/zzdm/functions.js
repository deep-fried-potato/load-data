const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const request = require('request');

process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + "/bin"
const tload = process.hrtime();

var runbm = (event,context,callback) => {
  const t = process.hrtime();

  const macAddr = execSync('/sbin/ip link | grep "link/ether" | cut -f 6 -d " "').toString()
  const cpuModel = execSync('grep "model name" /proc/cpuinfo | head -n 1 | cut -f 2 -d : | xargs').toString()
  exec('./outputfile', function(error, stdout, stderr) {
    const t2 = process.hrtime(t);
    const tload_diff = process.hrtime(tload);

    const response = {
      statusCode: 200,
      body: {
        ts:   (new Date()).toString(),
        exec: {"stdout": stdout, "stderr": stderr, "error": error},
        time: [t2[0], t2[1]],
        time_since_loaded: [tload_diff[0], tload_diff[1]],
        macAddr: macAddr,
        cpuModel: cpuModel
      },
    };
    callback(response);
  });
};

var data_transfer = (event,context,callback)=>{
  const t = process.hrtime();

  const macAddr = execSync('/sbin/ip link | grep "link/ether" | cut -f 6 -d " "').toString()
  const cpuModel = execSync('grep "model name" /proc/cpuinfo | head -n 1 | cut -f 2 -d : | xargs').toString()
  exec('curl https://raw.githubusercontent.com/deep-fried-potato/load-data/master/smallfile.txt --output dlfile', function(error, stdout, stderr) {
    const t2 = process.hrtime(t);
    const tload_diff = process.hrtime(tload);

    const response = {
      statusCode: 200,
      body: {
        ts:   (new Date()).toString(),
        exec: {"stdout": stdout, "stderr": stderr, "error": error},
        time: [t2[0], t2[1]],
        time_since_loaded: [tload_diff[0], tload_diff[1]],
        macAddr: macAddr,
        cpuModel: cpuModel
      },
    };
    callback(response);
  });
}

module.exports = {runbm,data_transfer}
