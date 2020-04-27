import fetch from 'node-fetch';
import '../../app.mjs';
import '../../lib/api/rest-api/app.mjs';

import Base from './Base.mjs';

class RestAPITester extends Base {
    constructor(...params) {
        super(...params);
    }

    async testUseCasePositive({ requestBuilder, input = {}, expected = {} } = {}) {
        const apiPrefix = this.#getApiPrefix();

        async function useCaseRunner() {
            const request = requestBuilder(input);
            const response = await fetch(`${apiPrefix}${request.url}`, {
                method  : request.method,
                headers : {
                    ...(request.headers || {}),
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(request.body)
            });

            return response.json();
        }

        return this._testUseCasePositiveAbstract({
            useCaseRunner,
            expected : {
                ...expected,
                status : { is: 1 }
            }
        });
    }

    async testUseCaseNegative({ requestBuilder, input = {}, exception = {} } = {}) {
        const apiPrefix = this.#getApiPrefix();

        async function useCaseRunner() {
            const request = requestBuilder(input);
            const response = await fetch(`${apiPrefix}${request.url}`, {
                method  : request.method,
                headers : {
                    ...(request.headers || {}),
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(request.body)
            });

            return response.json();
        }

        return this._testUseCaseNegativeAbstract({
            useCaseRunner,
            exception : {
                status : 0,
                error  : exception
            }
        });
    }

    #getApiPrefix = () => {
        // global.REST_API_PORT is defined in RestAPI app.
        // TODO: better way is to import app and use server.address() to get the port
        return  `http://localhost:${global.REST_API_PORT}`;
    }
}

export default RestAPITester;
