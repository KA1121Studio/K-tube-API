export async function handler(event) {

const videoId = event.queryStringParameters?.v;

if(!videoId){
return {
statusCode:400,
body:JSON.stringify({error:"missing video id"})
};
}

const apis = [
"https://nyc1.iv.ggtyler.dev",
"https://invid-api.poketube.fun",
"https://cal1.iv.ggtyler.dev",
"https://invidious.nikkosphere.com",
"https://lekker.gay",
"https://invidious.f5.si",
"https://invidious.lunivers.trade"
];

for (const api of apis) {

try{

const res = await fetch(`${api}/api/v1/videos/${videoId}`);

if(res.ok){

const data = await res.json();

return {
statusCode:200,
headers:{
"Content-Type":"application/json",
"Access-Control-Allow-Origin":"*"
},
body:JSON.stringify(data)
};

}

}catch(e){
console.log("API failed:", api);
}

}

return {
statusCode:500,
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({error:"All APIs failed"})
};

}
