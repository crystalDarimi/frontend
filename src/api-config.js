let backendHost;

const hostname = window && window.location && window.location.hostname;

if(hostname ==="localhost"){
    backendHost = "http://eple-api-service.ap-northeast-2.elasticbeanstalk.com";
}else {
    backendHost = "http://eple-api-service.ap-northeast-2.elasticbeanstalk.com";
}

export const API_BASE_URL = `${backendHost}`;
