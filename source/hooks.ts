import { IBuildTaskOption, BuildHook, IBuildResult } from '../@types';
import {exec} from 'child_process';

// import axios from "axios/dist/axios.min.js";

interface IOptions {
    isReopenProject: string;
    weDevPath: string;
}

const PACKAGE_NAME = 'wechat-reopen-plugin';

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        'wechat-reopen-plugin': IOptions;
    };
}

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

const getContent = function(url) {
// return new pending promise
return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https') ? require('https') : require('http');
    const request = lib.get(url, (response) => {
    // handle http errors
    if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
    // temporary data holder
    const body = [];
    // on every content chunk, push it to the data array
    response.on('data', (chunk) => body.push(chunk));
    // we are done, resolve promise with those joined chunks
    response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
    })
};

export const throwError: BuildHook.throwError = true;

export const onAfterBuild: BuildHook.onAfterBuild = async function(options: ITaskOptions, result: IBuildResult) {
    log("After Build!!!!!!!! options", options);
    log("After Build!!!!!!!! Result", result);
    log(options.packages['wechat-reopen-plugin'].isReopenProject)
    log(options.packages['wechat-reopen-plugin'].weDevPath)
    
    if (options.packages['wechat-reopen-plugin'].isReopenProject) {
        const command = `"${options.packages['wechat-reopen-plugin'].weDevPath}"  close --project ${result.dest}`
        log(command);

        await exec(command, (err, stdout, stderr) => {
            if(err) {
                log(err);
                return;
            }
    
            log(`stdout: ${stdout}, stderr: ${stderr}`);
        })
        
        await wait(5000);
    }

    // test onError hook
    // throw new Error('Test onError');
};


