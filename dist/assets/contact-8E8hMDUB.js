import"./main-_CSjskSg.js";/* empty css            */function k(e){if(e.__esModule)return e;var n=e.default;if(typeof n=="function"){var r=function o(){return this instanceof o?Reflect.construct(n,arguments,this.constructor):n.apply(this,arguments)};r.prototype=n.prototype}else r={};return Object.defineProperty(r,"__esModule",{value:!0}),Object.keys(e).forEach(function(o){var a=Object.getOwnPropertyDescriptor(e,o);Object.defineProperty(r,o,a.get?a:{enumerable:!0,get:function(){return e[o]}})}),r}var p={exports:{}};const A={},j=Object.freeze(Object.defineProperty({__proto__:null,default:A},Symbol.toStringTag,{value:"Module"})),_=k(j),R="dotenv",x="16.4.5",S="Loads environment variables from .env file",K="lib/main.js",C="lib/main.d.ts",F={".":{types:"./lib/main.d.ts",require:"./lib/main.js",default:"./lib/main.js"},"./config":"./config.js","./config.js":"./config.js","./lib/env-options":"./lib/env-options.js","./lib/env-options.js":"./lib/env-options.js","./lib/cli-options":"./lib/cli-options.js","./lib/cli-options.js":"./lib/cli-options.js","./package.json":"./package.json"},P={"dts-check":"tsc --project tests/types/tsconfig.json",lint:"standard","lint-readme":"standard-markdown",pretest:"npm run lint && npm run dts-check",test:"tap tests/*.js --100 -Rspec","test:coverage":"tap --coverage-report=lcov",prerelease:"npm test",release:"standard-version"},Y={type:"git",url:"git://github.com/motdotla/dotenv.git"},B="https://dotenvx.com",M=["dotenv","env",".env","environment","variables","config","settings"],G="README.md",U="BSD-2-Clause",H={"@definitelytyped/dtslint":"^0.0.133","@types/node":"^18.11.3",decache:"^4.6.1",sinon:"^14.0.1",standard:"^17.0.0","standard-markdown":"^7.1.0","standard-version":"^9.5.0",tap:"^16.3.0",tar:"^6.1.11",typescript:"^4.8.4"},q={node:">=12"},W={fs:!1},J={name:R,version:x,description:S,main:K,types:C,exports:F,scripts:P,repository:Y,funding:B,keywords:M,readmeFilename:G,license:U,devDependencies:H,engines:q,browser:W};var E={};const D=_,N=_,Q=_,z=_,X=J,O=X.version,Z=/(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;function ee(e){const n={};let r=e.toString();r=r.replace(/\r\n?/mg,`
`);let o;for(;(o=Z.exec(r))!=null;){const a=o[1];let s=o[2]||"";s=s.trim();const t=s[0];s=s.replace(/^(['"`])([\s\S]*)\1$/mg,"$2"),t==='"'&&(s=s.replace(/\\n/g,`
`),s=s.replace(/\\r/g,"\r")),n[a]=s}return n}function te(e){const n=L(e),r=c.configDotenv({path:n});if(!r.parsed){const t=new Error(`MISSING_DATA: Cannot parse ${n} for an unknown reason`);throw t.code="MISSING_DATA",t}const o=w(e).split(","),a=o.length;let s;for(let t=0;t<a;t++)try{const i=o[t].trim(),l=oe(r,i);s=c.decrypt(l.ciphertext,l.key);break}catch(i){if(t+1>=a)throw i}return c.parse(s)}function ne(e){console.log(`[dotenv@${O}][INFO] ${e}`)}function re(e){console.log(`[dotenv@${O}][WARN] ${e}`)}function h(e){console.log(`[dotenv@${O}][DEBUG] ${e}`)}function w(e){return e&&e.DOTENV_KEY&&e.DOTENV_KEY.length>0?e.DOTENV_KEY:E.DOTENV_KEY&&E.DOTENV_KEY.length>0?E.DOTENV_KEY:""}function oe(e,n){let r;try{r=new URL(n)}catch(i){if(i.code==="ERR_INVALID_URL"){const l=new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");throw l.code="INVALID_DOTENV_KEY",l}throw i}const o=r.password;if(!o){const i=new Error("INVALID_DOTENV_KEY: Missing key part");throw i.code="INVALID_DOTENV_KEY",i}const a=r.searchParams.get("environment");if(!a){const i=new Error("INVALID_DOTENV_KEY: Missing environment part");throw i.code="INVALID_DOTENV_KEY",i}const s=`DOTENV_VAULT_${a.toUpperCase()}`,t=e.parsed[s];if(!t){const i=new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${s} in your .env.vault file.`);throw i.code="NOT_FOUND_DOTENV_ENVIRONMENT",i}return{ciphertext:t,key:o}}function L(e){let n=null;if(e&&e.path&&e.path.length>0)if(Array.isArray(e.path))for(const r of e.path)D.existsSync(r)&&(n=r.endsWith(".vault")?r:`${r}.vault`);else n=e.path.endsWith(".vault")?e.path:`${e.path}.vault`;else n=N.resolve(process.cwd(),".env.vault");return D.existsSync(n)?n:null}function b(e){return e[0]==="~"?N.join(Q.homedir(),e.slice(1)):e}function se(e){ne("Loading env from encrypted .env.vault");const n=c._parseVault(e);let r=E;return e&&e.processEnv!=null&&(r=e.processEnv),c.populate(r,n,e),{parsed:n}}function ae(e){const n=N.resolve(process.cwd(),".env");let r="utf8";const o=!!(e&&e.debug);e&&e.encoding?r=e.encoding:o&&h("No encoding is specified. UTF-8 is used by default");let a=[n];if(e&&e.path)if(!Array.isArray(e.path))a=[b(e.path)];else{a=[];for(const l of e.path)a.push(b(l))}let s;const t={};for(const l of a)try{const d=c.parse(D.readFileSync(l,{encoding:r}));c.populate(t,d,e)}catch(d){o&&h(`Failed to load ${l} ${d.message}`),s=d}let i=E;return e&&e.processEnv!=null&&(i=e.processEnv),c.populate(i,t,e),s?{parsed:t,error:s}:{parsed:t}}function ie(e){if(w(e).length===0)return c.configDotenv(e);const n=L(e);return n?c._configVault(e):(re(`You set DOTENV_KEY but you are missing a .env.vault file at ${n}. Did you forget to build it?`),c.configDotenv(e))}function ce(e,n){const r=Buffer.from(n.slice(-64),"hex");let o=Buffer.from(e,"base64");const a=o.subarray(0,12),s=o.subarray(-16);o=o.subarray(12,-16);try{const t=z.createDecipheriv("aes-256-gcm",r,a);return t.setAuthTag(s),`${t.update(o)}${t.final()}`}catch(t){const i=t instanceof RangeError,l=t.message==="Invalid key length",d=t.message==="Unsupported state or unable to authenticate data";if(i||l){const u=new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");throw u.code="INVALID_DOTENV_KEY",u}else if(d){const u=new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");throw u.code="DECRYPTION_FAILED",u}else throw t}}function le(e,n,r={}){const o=!!(r&&r.debug),a=!!(r&&r.override);if(typeof n!="object"){const s=new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");throw s.code="OBJECT_REQUIRED",s}for(const s of Object.keys(n))Object.prototype.hasOwnProperty.call(e,s)?(a===!0&&(e[s]=n[s]),o&&h(a===!0?`"${s}" is already defined and WAS overwritten`:`"${s}" is already defined and was NOT overwritten`)):e[s]=n[s]}const c={configDotenv:ae,_configVault:se,_parseVault:te,config:ie,decrypt:ce,parse:ee,populate:le};p.exports.configDotenv=c.configDotenv;p.exports._configVault=c._configVault;p.exports._parseVault=c._parseVault;p.exports.config=c.config;p.exports.decrypt=c.decrypt;p.exports.parse=c.parse;p.exports.populate=c.populate;p.exports=c;var de=p.exports,f={};const g={};f.DOTENV_CONFIG_ENCODING!=null&&(g.encoding=f.DOTENV_CONFIG_ENCODING);f.DOTENV_CONFIG_PATH!=null&&(g.path=f.DOTENV_CONFIG_PATH);f.DOTENV_CONFIG_DEBUG!=null&&(g.debug=f.DOTENV_CONFIG_DEBUG);f.DOTENV_CONFIG_OVERRIDE!=null&&(g.override=f.DOTENV_CONFIG_OVERRIDE);f.DOTENV_CONFIG_DOTENV_KEY!=null&&(g.DOTENV_KEY=f.DOTENV_CONFIG_DOTENV_KEY);var ue=g;const fe=/^dotenv_config_(encoding|path|debug|override|DOTENV_KEY)=(.+)$/;var pe=function(n){return n.reduce(function(r,o){const a=o.match(fe);return a&&(r[a[1]]=a[2]),r},{})};(function(){de.config(Object.assign({},ue,pe(process.argv)))})();var me={};const y=document.getElementById("getLocation"),v=document.getElementById("itineraryForm"),I=document.getElementById("itineraryResults"),ge={enableHighAccuracy:!0,timeout:5e3,maximumAge:0};y==null||y.addEventListener("click",()=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(async function(e){const n=e.coords.latitude,r=e.coords.longitude,o=document.getElementById("fromLat"),a=document.getElementById("fromLon");o&&a&&(o.value=n.toString(),a.value=r.toString()),y.style.display="none",v&&(v.style.display="block")},e=>{alert("Error retrieving location: "+e.message)},ge):alert("Geolocation failed. Try switching your broweser or refresh the page.")});v==null||v.addEventListener("submit",async e=>{e.preventDefault();const n=document.getElementById("fromLat"),r=n?n.value:"",o=document.getElementById("fromLon"),a=o?o.value:"",s=60.1699,t=24.9384,i=1,l=document.getElementById("walkSpeed"),d=l?l.value:"";try{const m=await(await fetch("https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",{method:"POST",headers:{"Content-Type":"application/json","digitransit-subscription-key":me.dtKey||""},body:JSON.stringify({query:`
          query {
            plan(
              fromPlace: "User Location::${r},${a}",
              toPlace: "Tataki, Helsinki::${s},${t}",
              numItineraries: ${i},
              transportModes: [{mode: BUS}, {mode: RAIL}, {mode: TRAM}, {mode: FERRY}, {mode: WALK}],
              walkReluctance: 2.1,
              minTransferTime: 600,
              walkSpeed: ${d}
            ) {
              itineraries {
                walkDistance
                duration
                legs {
                  mode
                  startTime
                  endTime
                  from {
                    lat
                    lon
                    name
                    stop {
                      code
                      name
                    }
                  }
                  to {
                    lat
                    lon
                    name
                    stop {
                      code
                      name
                    }
                  }
                  trip {
                    tripHeadsign
                    routeShortName
                  }
                  distance
                  legGeometry {
                    length
                    points
                  }
                }
              }
            }
          }
        `})})).json();m.data&&m.data.plan&&m.data.plan.itineraries?(Ee(m.data.plan.itineraries),I&&(I.style.display="block")):alert("No itineraries found. Please try again.")}catch(u){console.error("Error fetching itinerary data:",u),alert("There was an error fetching the itinerary.")}});function Ee(e){const n=document.getElementById("itineraryList");n&&(n.innerHTML=""),e.forEach((r,o)=>{const a=document.createElement("li"),s=ve(r.duration);a.innerHTML=`
      <h3>Itinerary ${o+1}</h3>
      <p>Duration: ${s}</p>
      <ul>
        ${r.legs.map(t=>{var i,l,d,u,m,$,T;return`
          <li>
            ${t.mode?`<strong>Mode:</strong> ${t.mode} ${(i=t.trip)!=null&&i.tripHeadsign?`(Line: ${t.trip.tripHeadsign} ${t.trip.routeShortName||""})`:""} <br>`:""}
            ${(l=t.from)!=null&&l.name?`<strong>From:</strong> ${t.from.name} (${t.from.lat}, ${t.from.lon})<br>`:""}
            ${(u=(d=t.from)==null?void 0:d.stop)!=null&&u.name?`<strong>Stop Name:</strong> ${t.from.stop.name} <br>`:""}
            ${($=(m=t.from)==null?void 0:m.stop)!=null&&$.code?`<strong>Stop Code:</strong> ${t.from.stop.code} <br>`:""}<br>
            ${(T=t.to)!=null&&T.name?`<strong>To:</strong> ${t.to.name} (${t.to.lat}, ${t.to.lon})<br>`:""}
            ${t.startTime?`<strong>Start Time:</strong> ${V(t.startTime)} <br>`:""}
            ${t.endTime?`<strong>End Time:</strong> ${V(t.endTime)} <br>`:""}
            ${typeof t.distance=="number"?`<strong>Distance:</strong> ${t.distance.toFixed(0)} meters <br>`:""}
          </li>
        `}).join("")}
      </ul>
    `,n==null||n.appendChild(a)})}function ve(e){const n=Math.floor(e/3600),r=Math.floor(e%3600/60),o=e%60,a=n>0?`${n} hours `:"",s=r>0?`${r} minutes `:"",t=o>0?`${o} seconds`:"";return`${a}${s}${t}`.trim()}function V(e){return new Date(e).toLocaleString()}
