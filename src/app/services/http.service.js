import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";

const http = axios.create({
    baseURL: config.apiEndPoint
});

http.interceptors.request.use(
    function (cfg) {
        if (config.isFireBase) {
            const containSlash = /\/$/gi.test(cfg.url);
            cfg.url = (containSlash ? cfg.url.slice(0, -1) : cfg.url) + ".json";
            return cfg;
        }
    }, function (error) {
        return Promise.reject(error);
    }
);
function transformData(data) {
    return data ? Object.keys(data).map(key => ({
        ...data[key]
    })) : [];
}
http.interceptors.response.use(
    (res) => {
        // if (config.isFireBase) {
        res.data = { content: transformData(res.data) };
        // }
        return res;
    },
    function (error) {
        const expectedErrors = error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log(error);
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
