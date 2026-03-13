export async function handler(event){

const videoId = event.queryStringParameters?.v;

const apis = [
"https://nyc1.iv.ggtyler.dev",
"https://invid-api.poketube.fun",
"https://cal1.iv.ggtyler.dev",
"https://invidious.nikkosphere.com",
"https://lekker.gay",
"https://invidious.f5.si",
"https://invidious.lunivers.trade"
];

const promises = apis.map(api =>
  fetch(`${api}/api/v1/videos/${videoId}`)
    .then(r=>{
      if(!r.ok) throw new Error();
      return r.json();
    })
);

try{

const data = await Promise.any(promises);

return{
statusCode:200,
headers:{
"Content-Type":"application/json",
"Access-Control-Allow-Origin":"*"
},
body:JSON.stringify(data)
};

}catch{

return{
statusCode:500,
body:JSON.stringify({error:"all apis failed"})
};

}

}
