import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

export function runPythonModule(moduleName, payload = {}) {
  return new Promise((resolve, reject) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const scriptPath = path.join(__dirname, '..', 'backend', 'run_module.py');
    const args = [scriptPath, '--module', moduleName, '--payload', JSON.stringify(payload)];

    const py = spawn('python', args);

    let stdout = '';
    let stderr = '';

    py.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    py.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    py.on('error', (err) => {
      reject(new Error(`Failed to start Python process: ${err.message}`));
    });

    py.on('close', (code) => {
      if (code !== 0) {
        try {
          const errObj = JSON.parse(stderr);
          reject(new Error(errObj.error || `Python exited with code ${code}`));
        } catch (e) {
          reject(new Error(stderr || `Python exited with code ${code}`));
        }
        return;
      }
      try {
        const result = JSON.parse(stdout);
        resolve(result);
      } catch (e) {
        reject(new Error('Invalid JSON output from Python'));
      }
    });
  });
}
